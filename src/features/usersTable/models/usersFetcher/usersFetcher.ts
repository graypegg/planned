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

    if (this.cache) {
      return {
        promise: Promise.resolve(this.cache),
        controller: abortController
      }
    }

    const userList = fetch(this.makeUrl(), {signal: abortController.signal})
      .then(this.unpackResponse)
      .then(this.castUsers)
      .then(this.cacheStore.bind(this))

    return {
      promise: userList,
      controller: abortController
    }
  }

  protected cacheStore(userList: User[]): User[] {
    this.cache = userList
    return userList
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
}
