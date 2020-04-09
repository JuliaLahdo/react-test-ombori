import IUser from "./IUser";

export default interface IPageInformation {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: IUser[];
}
