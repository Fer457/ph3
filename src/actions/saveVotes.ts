"use server";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Vote from "@/models/Vote";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const saveVotes = async (values: any) => {
  const { userId, votes } = values;

  try {
    await connectDB();

    // Verificar si el usuario existe
    const user = await User.findById(userId);
    if (!user) {
      return { error: "Usuario no encontrado." };
    }

    // Verificar si ya ha votado
    if (user.hasVoted) {
      return { error: "El usuario ya ha votado." };
    }

    // Guardar los votos en la base de datos
    await Vote.create({
      userId,
      votes,
    });

    // Actualizar el estado de hasVoted
    user.hasVoted = true;
    await user.save();

    return { success: "Votos guardados con éxito." };
  } catch (error) {
    console.error("Error guardando votos:", error);
    return { error: "Error interno del servidor." };
  }
};
