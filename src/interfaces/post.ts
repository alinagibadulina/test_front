export interface IPost {
  id: number;
  text: string;
  title: string;
}

export interface ICreatePost {
  title: string;
  text: string;
}

export interface IGetPostsParams {
  sortField?: "id" | "title";
  sortOrder?: "asc" | "desc";
  userId?: number | null;
}
