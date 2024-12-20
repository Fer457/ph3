"use server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const register = async (values: any) => {
  const { name, password } = values;

  try {
    await connectDB();
    const userFound = await User.findOne({ name });
    if (userFound) {
      return {
        error: "name already exists!",
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      password: hashedPassword,
      hasVoted: false,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const savedUser = await user.save();
  } catch (e) {
    console.log(e);
  }
};
