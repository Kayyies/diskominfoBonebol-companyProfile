import { GoTriangleUp } from "react-icons/go";

export const StatsItem = ({ when, number, past }) => {
  return (
    <div>
      <div className="text-darkPrimary flex flex-col gap-3 dark:text-white">
        <h2 className="text-lg font-light tracking-wide">{when}</h2>
        <h1 className="text-5xl font-bold tracking-wide">{number}</h1>
        <div className="flex flex-row gap-3">
          <div className="h-auto w-[100px] flex-wrap tracking-wide">
            vs {past}
          </div>
          <div className="flex flex-row items-center font-bold">
            17%{" "}
            <span>
              <GoTriangleUp />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
