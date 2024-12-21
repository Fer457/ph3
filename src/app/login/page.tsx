"use client";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const res = await signIn("credentials", {
      name: formData.get("name"),
      password: formData.get("password"),
      redirect: false,
    });
    if (res?.error) {
      setError(res.error as string);
    }
    if (res?.ok) {
      return router.push("/dashboard");
    }
  };

  return (
    <section className="w-full h-screen flex items-center justify-center md:bg-[#121212]">
      <form
        className="p-12 w-full max-w-[400px] flex flex-col gap-4 bg-[#1C1C1C] text-white rounded-lg shadow-lg"
        onSubmit={handleSubmit}
      >
        {error && (
          <div className="bg-red-500 text-white text-sm p-2 rounded">
            {error}
          </div>
        )}
        <h1 className="font-bold text-4xl bg-gradient-to-br from-[#eaff00] to-[#ff7b00] bg-clip-text text-transparent">
          Iniciar sesión
        </h1>
        <p className="mb-4 text-sm text-gray-400">Entra para poder fumar.</p>

        <label className="w-full text-sm font-medium text-gray-300">
          Nombre
        </label>
        <div className="flex items-center w-full bg-[#2A2A2A] rounded p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9a4.5 4.5 0 00-7.5 0m7.5 0a4.5 4.5 0 01-7.5 0m7.5 0V9a6.75 6.75 0 01-13.5 0V9m13.5 0a6.75 6.75 0 00-13.5 0"
            />
          </svg>
          <input
            type="text"
            placeholder="Introduce tu nombre"
            className="w-full bg-transparent border-none outline-none text-sm text-white placeholder-gray-500 ml-2"
            name="name"
          />
        </div>

        <label className="w-full text-sm font-medium text-gray-300">
          Contraseña
        </label>
        <div className="flex items-center w-full bg-[#2A2A2A] rounded p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V9a4.5 4.5 0 00-9 0v1.5m-3 0h15m-12 0v6.75a2.25 2.25 0 002.25 2.25h4.5a2.25 2.25 0 002.25-2.25V10.5m-9 0h9"
            />
          </svg>
          <input
            type="password"
            placeholder="Introduce tu contraseña"
            className="w-full bg-transparent border-none outline-none text-sm text-white placeholder-gray-500 ml-2"
            name="password"
          />
        </div>

        <button className="w-full mt-4 py-2 bg-yellow-400 text-black font-medium rounded hover:bg-yellow-500 transition duration-200">
          Entrar
        </button>
      </form>
    </section>
  );
}
