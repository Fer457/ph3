/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { useState } from "react";
import { saveVotes } from "@/actions/saveVotes";
import { useSession } from "next-auth/react";

const premios = [
  "Más racista",
  "Más maricón",
  "Más tonto (Nacho)",
  "Más misógino",
  "MVP",
  "Más mandi",
  "Más alcohólico/drogadicto",
  "Más cagao",
  "Más empanao",
  "Más Inútil",
  "Más Depravado",
  "Menos Evolucionado",
  "Más Enfermo Mental",
  "Más Rata",
  "Menos Respetable",
  "Menos Discernimiento",
];

const nominados = [
  "Fer",
  "Calvo",
  "Alberto chatarerro",
  "Cositi gay",
  "Croweriks",
  "Dani Rico",
  "Gabri",
  "Gejor",
  "Gioser",
  "Guarrares",
  "Iker",
  "Isma",
  "Javier Arroyo",
  "Josete rminator",
  "Martínez",
  "Manger",
  "Nacho",
  "Nico Rumano",
];

const AwardsForm: React.FC = () => {
  const { data: session } = useSession();

  const [votes, setVotes] = useState<{ [key: string]: string }>(
    premios.reduce((acc, premio) => ({ ...acc, [premio]: "" }), {}),
  );
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleVoteChange = (premio: string, value: string) => {
    setVotes((prevVotes) => ({ ...prevVotes, [premio]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    //@ts-expect-error
    const response = await saveVotes({ userId: session?.user.id, votes });
    if (response?.error) {
      setError(response.error);
    } else {
      setSuccess(true);
    }
  };

  // Verificar si todos los premios tienen un ganador seleccionado
  const allVotesSelected = Object.values(votes).every((vote) => vote !== "");

  return (
    <section className="md:m-12 flex items-center justify-center">
      <form
        className="p-12 w-full max-w-[600px] flex flex-col gap-6 bg-[#1C1C1C] text-white rounded-lg shadow-lg"
        onSubmit={handleSubmit}
      >
        <h1 className="font-bold text-4xl bg-gradient-to-br from-[#eaff00] to-[#ff7b00] bg-clip-text text-transparent">
          Votación anal
        </h1>
        <p className="mb-4 text-sm text-gray-400">
          Selecciona un ganador para cada categoría.
        </p>

        {premios.map((premio, index) => (
          <div key={index} className="flex flex-col gap-2">
            <label
              htmlFor={`premio-${index}`}
              className="text-sm font-medium text-gray-300"
            >
              {premio}
            </label>
            <select
              id={`premio-${index}`}
              value={votes[premio]}
              onChange={(e) => handleVoteChange(premio, e.target.value)}
              className="w-full bg-[#2A2A2A] rounded p-2 text-sm text-white border-none outline-none"
            >
              <option value="">Selecciona un ganador</option>
              {nominados.map((nominado) => (
                <option key={nominado} value={nominado}>
                  {nominado}
                </option>
              ))}
            </select>
          </div>
        ))}

        <button
          type="submit"
          disabled={!allVotesSelected}
          className={`w-full py-2 font-medium rounded transition duration-200 ${
            allVotesSelected
              ? "bg-yellow-400 text-black hover:bg-yellow-500"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Enviar Votaciones
        </button>

        {success && (
          <div className="text-center mt-10 text-green-400 font-medium">
            ¡Gracias por votar!
          </div>
        )}
        {error && (
          <div className="bg-red-500 text-white text-sm p-2 rounded">
            {error}
          </div>
        )}
      </form>
    </section>
  );
};

export default AwardsForm;
