"use client";

import { Button } from "@/components/ui/button";

type DeletePostFormProps = {
  postId: number;
  action: (formData: FormData) => Promise<void>;
};

export function DeletePostForm({ postId, action }: DeletePostFormProps) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm("Delete this post?")) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={postId} />
      <Button type="submit" size="sm" variant="destructive">
        Delete
      </Button>
    </form>
  );
}
