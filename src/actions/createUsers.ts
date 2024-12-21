"use server"

import User from "@/models/User";

export const createUsers = async () => {
  const users = [
    "ffer",
    "pedro",
    "alberto",
    "cositi",
    "coves",
    "dani",
    "gabri",
    "gejor",
    "gioser",
    "pomares",
    "iker",
    "isma",
    "arroyo",
    "josele",
    "marti",
    "german",
    "nacho",
    "nico",
  ];

  try {
    for (const name of users) {
      const userExists = await User.findOne({ name });
      if (!userExists) {
        await User.create({
          name,
          password: `${name}123`,
          hasVoted: false,
        });
      }
    }
    return { success: true, message: "Usuarios creados con éxito" };
  } catch (error) {
    console.error("Error creando:", error);
    return { success: false, message: "Error creando usuarios" };
  }
};
