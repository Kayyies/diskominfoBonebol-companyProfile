import Image from "next/image";

const HeroImage = () => {
  return (
    <div className="py-10 justify-center">
      <Image src="/hero.png" alt="hero" width={1300} height={100} />
    </div>
  );
};
export default HeroImage;
