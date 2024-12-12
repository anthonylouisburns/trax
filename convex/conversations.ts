import { v } from "convex/values";
import { action, internalAction, internalMutation, internalQuery, mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";
import { api, internal } from "./_generated/api";
import { get } from "http";
const MODAL_READ_AND_CREATE_FILE = "https://anthonylouisburns--has-simple-web-endpoint-readfileandcr-c406ea.modal.run";




export const getConversations = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("conversations").collect();
  },
});

export const addConversation = mutation({
  args: {when: v.string(), 
    company: v.string(), 
    person: v.string(), 
    desc: v.string()},
  handler: async (ctx, { when,company,person,desc}) => {
    await ctx.db.insert("conversations", { when,company,person,desc });
  },
});

export const startCreateFile = mutation({
  handler: async (ctx) => {
    const text = "create file"
    const task_id = await ctx.db.insert("tasks", { "text":text });
    await ctx.scheduler.runAfter(0, internal.conversations.createFile, {
      task_id,
      text,
    });
  },
});

export const updateTask = internalMutation({
  args: { task_id: v.id("tasks"), file_id: v.id("_storage")},
  handler: async (ctx, args) => {
    await ctx.db.patch(args.task_id, {file_id: args.file_id})
  },
});

export const updateTaskNewFile = internalMutation({
  args: { task_id: v.id("tasks"), new_file_id: v.id("_storage")},
  handler: async (ctx, args) => {
    await ctx.db.patch(args.task_id, {new_file_id: args.new_file_id})
  },
});

export const createFile = internalAction({
  args: { task_id: v.id("tasks"), text: v.string() },
  handler: async (ctx, args) => {
    const conversations = await ctx.runQuery(api.conversations.getConversations)
    const blob = new Blob([JSON.stringify(conversations, null, 2)], { type : 'application/json' });

    const storageId: Id<"_storage"> = await ctx.storage.store(blob);

    await ctx.runMutation(internal.conversations.updateTask, {task_id: args.task_id, file_id: storageId})
  },
});

export const getTasks = query({
  args: {},
  handler: async (ctx) => {
    const tasks = await ctx.db.query("tasks").filter((q)=>q.neq(q.field("file_id"), undefined)).collect();
    return {url:process.env.CONVEX_SITE_URL, tasks:tasks }
  },
});

export const getTask = query({
  args: {task_id: v.id("tasks")},
  handler: async (ctx, args) => {
    return await ctx.db.get(args.task_id);
  },
});

export const triggerProcessFile = internalAction({
  args: { task_id: v.id("tasks")},
  handler: async (ctx, args) => {
    // [x] TODO 12-12-2024 create getURL and uploadURL - https://docs.convex.dev/file-storage/upload-files
    const upload_url = await ctx.storage.generateUploadUrl();

    // [x] TODO 12-12-2024 get storage id - get URL
    const task = await ctx.runQuery(api.conversations.getTask, {task_id:args.task_id});
    const download_url = process.env.CONVEX_SITE_URL + "/getFile?storageId=" + task?.file_id
    const finished_url = process.env.CONVEX_SITE_URL + "/postComplete"
    // [x] TODO 12-12-2024 post to Modal with task_id
    const body = {task_id: args.task_id, 
      download_url: download_url, 
      upload_url: upload_url,
      finished_url: finished_url}
      
      console.log("POSTing")
    // [x] TODO 12-12-2024 implement processFile - call modal/App.py/readFileAndCreateFile send task_id, download_url, upload_url
    await fetch(MODAL_READ_AND_CREATE_FILE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
  }
})


export const startProcessFile = mutation({
  args: { task_id: v.id("tasks")},
  handler: async (ctx, args) => {
    await ctx.db.patch(args.task_id, {text: "start process file"})

    await ctx.scheduler.runAfter(0, internal.conversations.triggerProcessFile, {
      task_id:args.task_id
    });
  },
});
