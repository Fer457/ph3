/* eslint-disable @typescript-eslint/ban-ts-comment */
"use server";

import { connectDB } from "@/lib/mongodb";
import Vote from "@/models/Vote";

export const getResults = async () => {
  try {
    await connectDB();

    const votes = await Vote.find();

    console.log("Votos recuperados de la base de datos:", votes);

    const results: { [key: string]: { [key: string]: number } } = {};

    votes.forEach((vote) => {
      // Convierte el Map a un objeto plano
      const voteEntries = Array.from(vote.votes.entries()); // Convertimos el Map en un array
      console.log("Voto individual:", voteEntries);

      //@ts-expect-error
      voteEntries.forEach(([premio, candidato]) => {
        if (!results[premio]) {
          results[premio] = {};
        }
        if (!results[premio][candidato]) {
          results[premio][candidato] = 0;
        }
        results[premio][candidato]++;
      });
    });

    console.log("Resultados finales generados:", results);

    return results; // Devuelve un objeto plano listo para el frontend
  } catch (error) {
    console.error("Error obteniendo resultados:", error);
    throw new Error("Error interno del servidor.");
  }
};
