import LoginButton from "./login-button";

const LandingPageHeader: React.FC = () => {
  return (
    <header className="flex flex-row justify-between pt-6 p-4 md:px-36 items-center">
      <div className="flex flex-row items-center space-x-4">
        <h1 className="text-white">Gejor 😎</h1>
      </div>
      <LoginButton />
    </header>
  );
};

export default LandingPageHeader;