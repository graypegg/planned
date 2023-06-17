import {User, UserFilters} from "./users";

export interface Fetcher {
  fetch(filters: UserFilters): {
    userList: Promise<User[]>,
    controller: { abort(): void }
  }
}
