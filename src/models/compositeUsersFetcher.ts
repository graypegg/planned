import {Fetcher} from "./fetcher";
import {UserFilters} from "./users";
import {User} from "./user";

export class CompositeUsersFetcher implements Fetcher {
  constructor(private fetchers: Fetcher[]) {
  }

  startFetchTask(filters: UserFilters) {
    const fetchTasks = this.fetchers.map(fetcher => fetcher.startFetchTask(filters))

    const abort = () => {
      fetchTasks.forEach(task => task.controller.abort())
    }

    const userList = Promise.all(fetchTasks.map(task => task.promise))
      .then(this.flattenUserLists)
      .then(this.sortUsers)

    return {
      promise: userList,
      controller: { abort }
    }
  }

  private flattenUserLists(userLists: User[][]) {
    return userLists.flat(1)
  }

  private sortUsers(usersList: User[]) {
    return usersList.sort((userA, userB) => userA.compareTo(userB))
  }
}
