"use client";

import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useAction, useMutation, useQuery } from "convex/react";
import Link from "next/link";

const storage_link = function (url: string, storage_id: Id<"_storage">) {
  return url + "/getFile?storageId=" + storage_id
}
export default function Home() {
  const tasks = useQuery(api.conversations.getTasks)
  const process = useMutation(api.conversations.startProcessFile)


  const fileLink = function FileLink(task: Doc<"tasks">) {

    return <div key={task.file_id} className="border-2 border-red-700 rounded-md max-w-sm m-10">
      {(task.file_id)?(<>
        <a href={storage_link(tasks!.url!, task.file_id!)} className="hover:underline hover:text-blue-600">{task.text}</a>:
      <button
        className="hover:underline hover:text-blue-600"
        onClick={() => {
          process({ task_id: task._id })
        }}>process</button>
      </>):(<></>)
      }
      {(task.new_file_id)?(<>
        :<a href={storage_link(tasks!.url!, task.new_file_id!)} className="hover:underline hover:text-blue-600">processed file</a>
      </>):(<></>)
      }
    </div>
  }

  return (
    <main className="">
      {tasks?.tasks?.map((task) =>
        fileLink(task)
      )}
    </main>
    // [x] TODO 12-12-2024 call convex/conversations.ts proceessFile
  );
}
