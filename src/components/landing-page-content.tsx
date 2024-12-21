import Carousel from "./carousel";

const LandingPageContent: React.FC = () => {
  const images = [
    {
      src: "/image1.jpeg",
      alt: "Imagen 1 de los premios",
    },
    {
      src: "/image2.jpeg",
      alt: "Imagen 2 de los premios",
    },
    {
      src: "/image3.jpeg",
      alt: "Imagen 3 de los premios",
    },
  ];

  return (
    <div className="flex flex-col space-y-8 animate-fade-in items-center">
      <h1 className="text-5xl md:text-7xl text-[#f3f3f3] font-semibold mb-4">
        Bienvenidos a la tercera edición de <br />
        <span className="bg-gradient-to-br from-[#eaff00] to-[#ff7b00] bg-clip-text text-transparent">
          los Premios haus
        </span>
      </h1>
      <Carousel images={images} />
    </div>
  );
};

export default LandingPageContent;
