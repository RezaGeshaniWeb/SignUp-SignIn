import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    requireed: true,
  },
  password: {
    type: String,
    requireed: true,
  },
  name: {
    type: String,
  },
  lastName: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

const User = models.User || model("User", userSchema);

export default User;
