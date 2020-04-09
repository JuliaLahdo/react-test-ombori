import IPageInformation from "../Models/IPageInformation";

class UserService {
  async getUsers(page: number): Promise<IPageInformation> {
    const response = await fetch("https://reqres.in/api/users?page=" + page);
    const json: IPageInformation = await response.json();
    return json;
  }
}

export default UserService;
