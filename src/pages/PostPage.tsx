import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deletePost, getPost, patchPost } from "@/api/posts";
import { useState } from "react";
import { Comments } from "./_components/Comments";
import { toast } from "react-toastify";
import { showErrorToast } from "./_components/showErrorToast";
import { Footer } from "./_components/Footer";
import { ROUTES } from "@/routes/router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const PostPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const { id } = useParams();
  const postId = Number(id);

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { data: post } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(postId!),
    enabled: !!id,
  });

  const deleteMutation = useMutation({
    mutationFn: deletePost,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      toast.success("Post deleted successfully!");
      navigate(ROUTES.HOME);
    },
    onError: showErrorToast,
  });

  const updateMutation = useMutation({
    mutationFn: patchPost,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post", id],
      });

      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      toast.success("Post updated successfully!");
      setIsEditing(false);
    },
    onError: showErrorToast,
  });

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1 p-4">
        <Link
          to={ROUTES.HOME}
          className="inline-block bg-black text-white px-6 py-3 rounded mb-8"
        >
          Back to posts
        </Link>

        <article className="border rounded bg-white p-6">
          {isEditing ? (
            <>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />

              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={10}
                className="w-full border rounded p-3"
              />
            </>
          ) : (
            <>
              <h1 className="text-4xl font-bold mb-6">{post.title}</h1>

              <p className="text-gray-500 text-lg leading-8">{post.text}</p>
            </>
          )}

          <div className="flex justify-between mt-10">
            {isEditing ? (
              <>
                <div className="flex gap-3">
                  <Button
                    onClick={() =>
                      updateMutation.mutate({
                        id: post.id,
                        title,
                        text,
                      })
                    }
                  >
                    Save
                  </Button>

                  <Button
                    onClick={() => {
                      setTitle(post.title);
                      setText(post.text);
                      setIsEditing(false);
                    }}
                  >
                    Cancel
                  </Button>
                </div>

                <Button
                  onClick={() => deleteMutation.mutate(post.id)}
                  className="bg-red-500 text-white"
                >
                  Delete Post
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => {
                    setTitle(post.title);
                    setText(post.text);
                    setIsEditing(true);
                  }}
                >
                  Edit Post
                </Button>

                <Button
                  onClick={() => deleteMutation.mutate(post.id)}
                  className="bg-red-500 text-white"
                >
                  Delete Post
                </Button>
              </>
            )}
          </div>
        </article>
        <Comments postId={postId} />
      </main>
      <Footer />
    </div>
  );
};
