import {Fetcher} from "./fetcher";
import {User, UserFilters} from "./users";

interface UsersResponse {
  data: User[]
}

export class UsersFetcher implements Fetcher {
  protected API_HOST = 'http://localhost:8099'
  protected cache: User[] | null = null

  constructor(private readonly type: string) {}

  fetch(filters: UserFilters) {
    const abortController = new AbortController()

    if (this.cache) {
      return {
        userList: Promise.resolve(this.cache),
        controller: abortController
      }
    }

    const userList = fetch(this.makeUrl(), {signal: abortController.signal})
      .then(this.unpackResponse)
      .then(this.cacheStore)

    return {
      userList,
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
    const object = await response.json() as UsersResponse
    return object.data
  }
}
