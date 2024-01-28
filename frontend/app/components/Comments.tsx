import { formatDate } from "@/app/utils";
import { getUserMeLoader, getCommentsByPostId } from "@/app/data/loaders";
import CreateCommentForm from "./CreateCommentForm";

interface CommentItemProps {
  id: number;
  user: {
    username: string;
  };
  createdAt: string;
  comment: string;
}

interface CommentProps {
  postId: number;
  slug: string;
}

export default async function Comments({ postId, slug }: Readonly<CommentProps>) {
  const user = await getUserMeLoader();
  const data = await getCommentsByPostId(postId);
  const userId = user.ok ? user.data.id : null;
  
  if (!data.data) return <p className="p-8  text-center">No comments found.</p>;
  const comments = data.data;
  return (
    <div>
      <div className="my-6">
        <div className="h-[500px] overflow-scroll">
          <ul className="space-y-6">
            {comments.map((activityItem: CommentItemProps) => (
              <li key={activityItem.id} className="relative flex gap-x-4">
                <div className="flex-auto rounded-md p-3 ring-1 ring-inset ring-base-300">
                  <div className="flex justify-between gap-x-4">
                    <div className="py-0.5 text-xs leading-5 flex gap-2">
                      <span className="font-medium text-secondary">
                        {activityItem.user.username}
                      </span>
                      <span className="font-medium text-primary">
                        commented
                      </span>
                    </div>
                    <time
                      dateTime={formatDate(activityItem.createdAt)}
                      className="flex-none py-0.5 text-xs leading-5"
                    >
                      {formatDate(activityItem.createdAt)}
                    </time>
                  </div>
                  <p className="text-sm leading-6">{activityItem.comment}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-6">
        <CreateCommentForm postId={postId} userId={userId} slug={slug} />
      </div>
    </div>
  );
}
