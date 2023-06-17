import {Fetcher} from "./fetcher";
import {User, UserFilters} from "./users";

enum ComparisonResult {
  A_LOWER_THAN_B = -1,
  A_SAME_AS_B = 0,
  A_HIGHER_THAN_B = 1
}

export class CompositeUsersFetcher implements Fetcher {
  constructor(private fetchers: Fetcher[]) {
  }

  fetch(filters: UserFilters) {
    const fetchTasks = this.fetchers.map(fetcher => fetcher.fetch(filters))

    const abort = () => {
      fetchTasks.forEach(task => task.controller.abort())
    }

    const userList = Promise.all(fetchTasks.map(task => task.userList))
      .then(this.flattenUserLists)
      .then(users => users.sort(this.compareUsers))

    return {
      userList,
      controller: { abort }
    }
  }

  private flattenUserLists(userLists: User[][]) {
    return userLists.flat(1)
  }

  private compareUsers(userA: User, userB: User): ComparisonResult {
    const nameComparisonResult = this.getFullName(userA).localeCompare(this.getFullName(userB))

    if (nameComparisonResult === ComparisonResult.A_SAME_AS_B) {
      const diff = userA.age - userB.age
      if (diff > 0) return ComparisonResult.A_HIGHER_THAN_B
      if (diff < 0) return ComparisonResult.A_LOWER_THAN_B
      return ComparisonResult.A_SAME_AS_B
    }

    return nameComparisonResult
  }

  private getFullName(user: User) {
    return `${user.name.firstName} ${user.name.lastName}`;
  }
}
