import { activity } from "@/app/fake-data";
import { getUserMeLoader } from "../data/loaders";
import Link from "next/link";

interface ActivityItemProps {
  id: number;
  person: {
    name: string;
  };
  dateTime: string;
  date: string;
  comment: string;
}

export default async function Comments() {
  const user = await getUserMeLoader();
  return (
    <div>
      <div className="my-6">
        <div className="h-[500px] overflow-scroll">
          <ul className="space-y-6">
            {activity.map((activityItem: ActivityItemProps) => (
              <li key={activityItem.id} className="relative flex gap-x-4">
                <div className="flex-auto rounded-md p-3 ring-1 ring-inset ring-base-300">
                  <div className="flex justify-between gap-x-4">
                    <div className="py-0.5 text-xs leading-5 flex gap-2">
                      <span className="font-medium text-secondary">
                        {activityItem.person.name}
                      </span>
                      <span className="font-medium text-primary">
                        commented
                      </span>
                    </div>
                    <time
                      dateTime={activityItem.dateTime}
                      className="flex-none py-0.5 text-xs leading-5"
                    >
                      {activityItem.date}
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
        <form action="#" className="w-full">
          <textarea
            placeholder="Comment"
            className="textarea textarea-bordered border-base-300 textarea-lg w-full "
          ></textarea>
          {user.ok ? (
            <button type="submit" className="btn btn-primary float-right mt-2">
              Comment
            </button>
          ) : (
            <Link href="/login" className="btn btn-secondary float-right mt-2">
              Login to Comment
            </Link>
          )}
        </form>
      </div>
    </div>
  );
}
