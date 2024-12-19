import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h1 className="text-5xl font-bold mb-4">Entrega de Premios</h1>
      <p className="text-xl mb-8">Participa y vota por tus favoritos.</p>
      <Link href="/login">Iniciar Sesión</Link>
    </div>
  );
}
