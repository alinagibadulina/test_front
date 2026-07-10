import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPost, getPosts } from "@/api/posts";
import { CreatePost } from "./Dialogs/CreatePost";
import { useNavigate } from "react-router-dom";
import { getUsers, logout } from "@/api/auth";
import { toast } from "react-toastify";
import { showErrorToast } from "./_components/showErrorToast";
import { Footer } from "./_components/Footer";
import { ROUTES } from "@/routes/router";
import { PostCards } from "./_components/PostCards";
import { Button } from "@/components/ui/button";

export const HomePage = () => {
  const [open, setOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [userId, setUserId] = useState<number | null>(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: posts } = useQuery({
    queryKey: ["posts", sortOrder, userId],
    queryFn: () =>
      getPosts({
        sortField: "id",
        sortOrder,
        userId,
      }),
  });

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const createPostMutation = useMutation({
    mutationFn: createPost,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      console.log("SUCCESS");
      toast.success("Post created successfully!");
    },

    onError: showErrorToast,
  });

  const logOutMutation = useMutation({
    mutationFn: logout,

    onSuccess: () => {
      sessionStorage.removeItem("isAuth");
      toast.success("Logged out successfully");
      navigate(ROUTES.HOME);
    },
    onError: showErrorToast,
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5]">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
              Posts
            </h1>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:flex lg:items-center lg:gap-4">
              <Button onClick={() => logOutMutation.mutate()}>
                {logOutMutation.isPending ? "Loading..." : "Log out"}
              </Button>

              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
                className="h-12 rounded border px-3 bg-white"
              >
                <option value="asc">Asc</option>
                <option value="desc">Desc</option>
              </select>

              <select
                value={userId ?? ""}
                onChange={(e) =>
                  setUserId(e.target.value ? Number(e.target.value) : null)
                }
                className="h-12 rounded border px-3 bg-white w-full lg:w-56"
              >
                <option value="">All Users</option>

                {users?.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.email}
                  </option>
                ))}
              </select>

              <Button onClick={() => setOpen(true)}>Create Post</Button>

              <CreatePost
                open={open}
                onOpenChange={setOpen}
                onSubmit={(data) => createPostMutation.mutate(data)}
              />
            </div>
          </div>
        </div>
      </header>
      <PostCards posts={posts} />
      <Footer />
    </div>
  );
};
