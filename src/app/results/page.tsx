"use client";

import { useState, useEffect } from "react";
import { getResults } from "@/actions/getResults";
import { generateConfetti } from "@/utils/generateConfetti";

const ResultsPage: React.FC = () => {
  const [results, setResults] = useState<{
    [key: string]: { [key: string]: number };
  }>({});
  const [winners, setWinners] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await getResults();
        console.log(data);

        setResults(data);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };

    fetchResults();
  }, []);

  const revealWinner = (premio: string) => {
    generateConfetti();
    const candidates = Object.entries(results[premio]);
    const winner = candidates.sort((a, b) => b[1] - a[1])[0][0];
    setWinners((prevWinners) => ({ ...prevWinners, [premio]: winner }));
  };

  return (
    <section className="md:m-12 flex items-center justify-center">
      <div className="p-12 w-full max-w-[800px] flex flex-col gap-8 bg-[#1C1C1C] text-white rounded-lg shadow-lg">
        <h1 className="font-bold text-4xl bg-gradient-to-br from-[#eaff00] to-[#ff7b00] bg-clip-text text-transparent text-center">
          Resultados de los Premios
        </h1>

        {Object.entries(results).map(([premio, candidates]) => {
          const sortedCandidates = Object.entries(candidates)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3);

          return (
            <div key={premio} className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold text-gray-200">{premio}</h2>
              <ul className="space-y-2">
                {sortedCandidates.map(([candidato, votes], index) => (
                  <li
                    key={index}
                    className="flex justify-between bg-[#2A2A2A] p-3 rounded text-sm text-gray-300"
                  >
                    <span>{candidato}</span>
                    {winners[premio] && <span>{votes} votos</span>}
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                {winners[premio] ? (
                  <div className="text-green-400 font-bold text-lg">
                    Ganador: {winners[premio]}
                  </div>
                ) : (
                  <button
                    onClick={() => revealWinner(premio)}
                    className="w-full py-2 bg-yellow-400 text-black font-medium rounded hover:bg-yellow-500 transition duration-200"
                  >
                    Revelar Ganador
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ResultsPage;
