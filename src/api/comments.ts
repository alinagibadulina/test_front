import type { IComment } from "@/interfaces/comment";
import { api } from "./axios";

export const getComments = async (): Promise<IComment[]> => {
  const { data } = await api.get("/comments");
  return data;
};

export const createComment = async ({
  comment,
  postId,
}: {
  comment: string;
  postId: number;
}) => {
  const { data } = await api.post("/comments", {
    comment,
    postId,
  });

  return data;
};

export const deleteComment = async (id: number) => {
  const { data } = await api.delete(`/comments/${id}`);
  return data;
};
