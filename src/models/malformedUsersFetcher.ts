import {UsersFetcher} from "./usersFetcher";
import {User} from "./user";

type MalformedUsersResponse = User[]

export class MalformedUsersFetcher extends UsersFetcher {
  protected async unpackResponse(response: Response): Promise<User[]> {
    return await response.json() as MalformedUsersResponse
  }
}
