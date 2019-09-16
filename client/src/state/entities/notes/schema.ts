import { schema } from "normalizr";
import { userEntity } from "../users/schema";

export const noteSchema = new schema.Entity("notes", {
  updatedBy: userEntity,
  createdBy: userEntity
});
