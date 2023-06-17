import {UserFilters} from "./users";
import {User} from "./user";

export interface Fetcher {
  startFetchTask(filters: UserFilters): {
    promise: Promise<User[]>,
    controller: { abort(): void }
  }
}
