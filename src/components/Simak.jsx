import Link from "next/link";
import Image from "next/image";

export default function Simak() {
  return (
    <div className="container mx-auto px-64">
      <div
        className="bg-blue-600 pt-10 rounded-t-3xl"
        style={{
          backgroundImage: "url(Simak.png)",
          objectFit: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-5 pl-20">
            <div className="pr-42">
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
              <p className="font-semibold text-4xl text-white outline-dashed p-5">
                Jalipata Bilohu to Instagram ode Olami waa...
              </p>
            </div>
            <Link href="/" className="btn btn-md w-52">
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
            className="pr-3"
          />
        </div>
      </div>
    </div>
  );
}
