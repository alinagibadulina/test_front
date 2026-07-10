import { api } from "./axios";
import type { ICreatePost, IPost, IGetPostsParams } from "@/interfaces/post";

export const createPost = async (data: ICreatePost) => {
  const response = await api.post("/post/create", data);

  return response.data;
};

export const deletePost = async (id: number): Promise<IPost> => {
  const response = await api.delete(`/post/${id}`);

  return response.data;
};

export const getPost = async (id: number): Promise<IPost> => {
  const response = await api.get(`/post/${id}`);

  return response.data;
};

export const patchPost = async ({
  id,
  title,
  text,
}: {
  id: number;
  title: string;
  text: string;
}): Promise<IPost> => {
  const response = await api.patch(`/post/${id}`, {
    title,
    text,
  });

  return response.data;
};

export const getPosts = async ({
  sortField = "id",
  sortOrder = "asc",
  userId,
}: IGetPostsParams = {}): Promise<IPost[]> => {
  const response = await api.get("/post", {
    params: {
      sort_direction: sortField,
      sort_by: sortOrder,
      ...(userId && { userId }),
    },
  });

  return response.data;
};
