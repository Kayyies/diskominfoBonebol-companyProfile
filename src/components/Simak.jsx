import Link from "next/link";
import Image from "next/image";

export default function Simak() {
  return (
    <div className="container mx-auto pb-40 px-10 lg:px-40 xl:px-40 2xl:px-64 overflow-hidden">
      <div
        className="bg-[0C62F7] md:pt-10 rounded-3xl"
        style={{
          backgroundImage: "url(Simak.png)",
          objectFit: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col gap-5 mx-10 md:mx-0 md:pl-20">
            <div className="md:pr-42">
              <div
                style={{ position: "relative", width: "50px", left: "600px" }}
              >
                <Image
                  src="/tupaikaydal.png"
                  alt="tupaikaydal"
                  width={50}
                  height={50}
                />
              </div>
              <p className="font-semibold text-xl md:text-4xl text-white outline-dashed p-5">
                Jalipata Bilohu to Instagram ode Olami waa...
              </p>
            </div>
            <Link href="/" className="btn btn-sm md:btn-md w-52">
              <p
                style={{
                  backgroundClip: "text",
                  backgroundImage:
                    "linear-gradient(to right, #f9ce34, #ee2a7b, #6228d7)",
                  color: "transparent",
                }}
              >
                @DISKOMINFOBONEBOL
              </p>
            </Link>
          </div>
          <Image
            src="/instagram.png"
            alt="instagram"
            width={349.83}
            height={300}
            className="w-[300px] pt-10 pl-30 h-auto md:pt-0 md:pr-3 md:h-[300px] md:w-[349.83px]"
          />
        </div>
      </div>
    </div>
  );
}
