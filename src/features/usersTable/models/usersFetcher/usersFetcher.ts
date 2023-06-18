import {Fetcher} from "../fetcher";
import {UserFilters} from "../../hooks/useUsers";
import {User, JSONUserResponse} from "../user";

interface JSONUsersResponse {
  data: JSONUserResponse[]
}

export class UsersFetcher implements Fetcher {
  protected API_HOST = 'http://localhost:8099'
  protected cache: User[] | null = null

  constructor(private readonly type: string) {}

  startFetchTask(filters: UserFilters) {
    const abortController = new AbortController()
    const usersList = this.requestOrUncacheUsersList(abortController)
    const filteredUserList = usersList.then(usersList => this.applyFilter(filters, usersList))

    return {
      promise: filteredUserList,
      controller: abortController
    }
  }

  protected applyFilter(filters: UserFilters, usersList: User[]) {
    return usersList.filter(user => {
      return (filters.age.min <= user.age) && (filters.age.max >= user.age) && (user.getFullName().includes(filters.textFilter))
    })
  }

  protected requestOrUncacheUsersList(abortController: AbortController) {
    if (this.cache) return Promise.resolve(this.cache)

    return fetch(this.makeUrl(), {signal: abortController.signal})
      .then(this.unpackResponse)
      .then(this.castUsers)
      .then(this.cacheStore.bind(this))
  }

  protected makeUrl() {
    return `${this.API_HOST}/users/${this.type ?? ''}`
  }

  protected async unpackResponse(response: Response) {
    const object = await response.json() as JSONUsersResponse
    return object.data
  }

  protected castUsers(singletonUsers: JSONUserResponse[]) {
    return singletonUsers.map(singletonUser => new User(singletonUser))
  }

  protected cacheStore(userList: User[]): User[] {
    this.cache = userList
    return userList
  }
}
