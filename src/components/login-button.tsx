import Link from "next/link";

const LoginButton:React.FC = () => {
  return (
    <button
      className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white
        rounded-lg group bg-gradient-to-br from-[#eaff00] to-[#ff7b00] hover:text-white"
    >
      <Link className="relative px-5 py-3 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0" href={"/login"}>
        Iniciar sesión
      </Link>
    </button>
  );
};

export default LoginButton;