import mongoose, { Schema, model } from "mongoose";

export interface UserDocument {
  _id: string;
  password: string;
  hasVoted: boolean;
  name: string;
}

const UserSchema = new Schema<UserDocument>(
  {
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    hasVoted: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.models?.User || model<UserDocument>("User", UserSchema);
export default User;
