import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type CreatePostProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: { title: string; text: string }) => void;
};

export const CreatePost = ({
  open,
  onOpenChange,
  onSubmit,
}: CreatePostProps) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      title,
      text,
    });

    setTitle("");
    setText("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-6 bg-white">
        <form onSubmit={handleSubmit}>
          <DialogTitle className="text-4xl font-bold">
            Create New Post
          </DialogTitle>

          <div className="space-y-8">
            <div>
              <label className="mb-2 block text-lg font-semibold">Title</label>

              <Input
                placeholder="Post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-2 block text-lg font-semibold">
                Content
              </label>

              <textarea
                placeholder="Post content"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-40 w-full rounded-md border px-3 py-2 resize-none"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <Button type="button" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>

            <Button
              type="submit"
              className="bg-black text-white hover:bg-black/90"
            >
              Create Post
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
