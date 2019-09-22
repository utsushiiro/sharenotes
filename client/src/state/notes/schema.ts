import { schema } from "normalizr";
import { userSchema } from "@state/users/schema";

export const noteSchema = new schema.Entity("notes", {
  updatedBy: userSchema,
  createdBy: userSchema
});

export const notesObjectSchema = new schema.Object({
  notes: new schema.Array(noteSchema)
});
