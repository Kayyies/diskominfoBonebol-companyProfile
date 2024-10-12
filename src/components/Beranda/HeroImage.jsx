import Image from "next/image";

const HeroImage = () => {
  return (
    <div className="flex justify-center py-10">
      <Image
        src="/hero.png"
        alt="hero"
        width={1300}
        height={100}
        className="object-contain"
      />
    </div>
  );
};

export default HeroImage;
