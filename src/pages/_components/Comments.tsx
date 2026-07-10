import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createComment, deleteComment, getComments } from "@/api/comments";
import { toast } from "react-toastify";
import { showErrorToast } from "./showErrorToast";
import { Button } from "@/components/ui/button";

type Props = {
  postId: number;
  user?: {
    id: number;
    email: string;
  };
};

export const Comments = ({ postId, user }: Props) => {
  const [comment, setComment] = useState("");

  const queryClient = useQueryClient();

  const { data: comments = [] } = useQuery({
    queryKey: ["comments"],
    queryFn: getComments,
  });

  const createMutation = useMutation({
    mutationFn: createComment,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
      toast.success("Comment created successfully!");
      setComment("");
    },
    onError: showErrorToast,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteComment,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
      toast.success("Comment deleted successfully!");
    },
    onError: showErrorToast,
  });

  return (
    <section className="mt-10">
      <h2 className="text-3xl font-bold mb-6">Comments</h2>

      <div className="space-y-4">
        {comments.map((item) => (
          <div key={item.id} className="border rounded p-5">
            <p className="text-sm text-gray-500 mb-2">{user?.email}</p>
            <p className="mb-4">{item.comment}</p>

            <Button
              onClick={() => deleteMutation.mutate(item.id)}
              className="bg-red-500 text-white"
            >
              Delete
            </Button>
          </div>
        ))}
      </div>

      <div className="border rounded p-5 mt-8">
        <label className="block font-semibold mb-2">Comment</label>

        <textarea
          rows={5}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border rounded p-3"
        />

        <div className="flex justify-end mt-5">
          <Button
            onClick={() =>
              createMutation.mutate({
                comment,
                postId,
              })
            }
          >
            Add comment
          </Button>
        </div>
      </div>
    </section>
  );
};
