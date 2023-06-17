import {UsersFetcher} from "./usersFetcher";
import {User} from "../user";

type MalformedUsersResponse = User[]

export class MalformedUsersFetcher extends UsersFetcher {
  protected async unpackResponse(response: Response): Promise<User[]> {
    /**
     * /users/seniors endpoint does not wrap output in { data: [...] },
     * so we need this subclass that just uses the json data straight.
     */
    return await response.json() as MalformedUsersResponse
  }
}
