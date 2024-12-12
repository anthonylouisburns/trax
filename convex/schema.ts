import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
  conversations: defineTable({
    when: v.string(), 
    company: v.string(), 
    person: v.string(), 
    desc: v.string()
  })
  .index("company", ["company", "when"])
  .index("person", ["person", "when"]),
  tasks: defineTable({
    text: v.string(),
    file_id: v.optional(v.id("_storage")),
    new_file_id: v.optional(v.id("_storage"))
  })
  .index("text", ["text"])
});
export default schema;