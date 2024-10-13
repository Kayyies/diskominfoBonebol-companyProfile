export const TitleFirst = ({ title, descColor, descNormal, subdesc }) => {
  return (
    <div className="mb-15 flex flex-col items-center justify-center gap-5 text-center">
      <span className="text-darkPrimary dark:via-darkPrimary inline-block max-w-fit rounded-xl border border-[0C62F7] px-4 py-2 text-sm font-semibold dark:border-none dark:bg-gradient-to-b dark:from-[#283877] dark:to-[#283877] dark:text-white">
        {title}
      </span>
      <div>
        <h1 className="mb-5 text-5xl font-bold text-[#38bdf8]">
          <span className="text-darkPrimary dark:text-white">
            {descNormal}{" "}
          </span>
          {descColor}
        </h1>
        <p className="text-darkPrimary text-lg font-light dark:text-white">
          {subdesc}
        </p>
      </div>
    </div>
  );
};
export const TitleLast = ({ title, descColor, descNormal, subdesc }) => {
  return (
    <div className="mb-15 flex flex-col items-center justify-center gap-5 text-center">
      <span className="text-darkPrimary dark:via-darkPrimary inline-block max-w-fit rounded-xl border border-[0C62F7] px-4 py-2 text-sm font-semibold dark:border-none dark:bg-gradient-to-b dark:from-[#283877] dark:to-[#283877] dark:text-white">
        {title}
      </span>
      <div>
        <h1 className="text-darkPrimary mb-5 text-5xl font-bold dark:text-white">
          <span className="text-[#38bdf8]">{descColor} </span>
          {descNormal}
        </h1>
        <p className="text-darkPrimary text-lg font-light dark:text-white">
          {subdesc}
        </p>
      </div>
    </div>
  );
};
