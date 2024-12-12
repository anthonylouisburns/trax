import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { Id } from "./_generated/dataModel";
import { todo } from "node:test";
import { internal } from "./_generated/api";

const http = httpRouter();

export const getFile = httpAction(async (ctx, request) => {
  const { searchParams } = new URL(request.url);
  const storageId = searchParams.get("storageId")! as Id<"_storage">;
  const blob = await ctx.storage.get(storageId);
  if (blob === null) {
    return new Response("Image not found", {
      status: 404,
    });
  }
  return new Response(blob);
})



export const postComplete = httpAction(async (ctx, request) => {
  // const { author, body } = await request.json();
  const body = await request.json()
  console.log("post recieved", body)
  await ctx.runMutation(internal.conversations.updateTaskNewFile, {task_id:body['task_id'], new_file_id:body['storage_id']})
  return new Response(null, {
    status: 200,
  });
});

http.route({
  path: "/getFile",
  method: "GET",
  handler: getFile
});

http.route({
  path: "/postComplete",
  method: "POST",
  handler: postComplete,
});

export default http;