import Image from "next/image";
import vector from "../../../public/profil.svg";

export default function Jumbotron({ title, desc, image }) {
  return (
    <div
      className="bg-blue-500 w-full
    "
    >
      <div className="container mx-auto lg:px-40 flex justify-between items-center">
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-bold text-white">{title}</h1>
          <p className="text-white">{desc}</p>
        </div>
        <div>
          <Image src={image} height={300} alt="illustration" />
        </div>
      </div>
    </div>
  );
}
