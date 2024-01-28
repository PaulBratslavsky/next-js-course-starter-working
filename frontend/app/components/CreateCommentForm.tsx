"use client";
import Link from "next/link";
import { createCommentAction } from "@/app/data/actions";
import { useFormState } from "react-dom";

const INITIAL_STATE = {
  zodErrors: null,
  strapiErrors: null,
  data: null,
  message: null,
};

function FieldError({ error }: { error: string[] }) {
  if (!error) return null;
  return error.map((err: string) => (
    <div className="text-warning text-xs italic mt-1 py-2">{err}</div>
  ));
}

function StrapiErrors({ error }: { error: string }) {
  if (!error) return null;
  return <div className="text-warning text-xs italic py-2">{error}</div>;
}

export default function CreateCommentForm({
  postId,
  userId,
  slug
}: {
  postId: number;
  userId: number;
  slug: string;
}) {
  const updateCommentPostId = createCommentAction.bind(null,{ postId, userId, slug });
  const [formState, formAction] = useFormState(
    updateCommentPostId,
    INITIAL_STATE
  );

  const updatedCommentId = formState.data?.data?.id;
  return (
    <form action={formAction} className="w-full" key={updatedCommentId}>
      <textarea
        key={formState.data?.comment}
        name="comment"
        placeholder="Comment"
        className="textarea textarea-bordered border-base-300 textarea-lg w-full"
      ></textarea>
      <FieldError error={formState.zodErrors?.comment} />
      <StrapiErrors error={formState.strapiErrors?.message} />
      {userId ? (
        <button type="submit" className="btn btn-primary float-right mt-2">
          Comment
        </button>
      ) : (
        <Link href="/login" className="btn btn-secondary float-right mt-2">
          Login to Comment
        </Link>
      )}
    </form>
  );
}
