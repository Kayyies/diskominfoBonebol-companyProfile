import { FaNewspaper } from "react-icons/fa";
import { MdOutlineWeb, MdNetworkCheck } from "react-icons/md";
import { ResponsibilityData } from "@/data/ResponsibilityData";

function Responsibility() {
  return (
    <div className="container mx-auto mb-20 xl:px-40 3xl:px-[400px]">
      <div className="flex flex-row justify-between gap-5">
        {ResponsibilityData.map((res, index) => (
          <div
            key={index}
            className={`flex w-card gap-2 ${
              index < ResponsibilityData.length - 1
                ? "border-gray border-r-2 pr-2"
                : ""
            }`}
          >
            <div className="pt-1 text-2xl text-blue-700">
              {res.logo === "FaNewspaper" && <FaNewspaper />}
              {res.logo === "MdOutlineWeb" && <MdOutlineWeb />}
              {res.logo === "MdNetworkCheck" && <MdNetworkCheck />}
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-lg font-semibold">{res.title}</h1>
              <p className="text-sm text-gray-500">{res.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Responsibility;
