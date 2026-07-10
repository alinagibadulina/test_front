import { deletePost } from "@/api/posts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { showErrorToast } from "./showErrorToast";
import type { IPost } from "@/interfaces/post";
import { Button } from "@/components/ui/button";

interface IPostCardsProps {
  posts?: IPost[];
}

export const PostCards = ({ posts }: IPostCardsProps) => {
  const queryClient = useQueryClient();

  const deletePostMutation = useMutation({
    mutationFn: deletePost,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      toast.success("Post deleted successfully!");
    },
    onError: showErrorToast,
  });
  return (
    <main className="flex-1 p-6 md:p-10 lg:p-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 lg:gap-16">
        {posts?.map((post) => (
          <article
            key={post.id}
            className="border rounded bg-white p-6 flex flex-col justify-between min-h-80"
          >
            <div>
              <h2 className="text-2xl font-bold mb-6 line-clamp-1">
                {post.title}
              </h2>

              <p className="text-gray-400 text-lg line-clamp-5">{post.text}</p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link to={`/post/${post.id}`}>View Post</Link>
              </Button>

              <Button
                onClick={() => deletePostMutation.mutate(post.id)}
                className=" bg-red-500 text-white"
              >
                Delete Post
              </Button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
};
