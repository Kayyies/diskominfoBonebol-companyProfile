export const TitleFirst = ({ title, descColor, descNormal, subdesc }) => {
  return (
    <div className=" flex flex-col items-center justify-center gap-5 text-center lg:mb-15">
      <span className="inline-block max-w-fit rounded-xl border border-[0C62F7] px-4 py-2 text-sm font-semibold text-darkPrimary dark:border-none dark:bg-gradient-to-b dark:from-[#283877] dark:via-darkPrimary dark:to-[#283877] dark:text-white">
        {title}
      </span>
      <div className="flex flex-col gap-3 lg:gap-5">
        <h1 className="text-3xl font-bold text-[#38bdf8] lg:text-5xl">
          <span className="text-darkPrimary dark:text-white">
            {descNormal}{" "}
          </span>
          {descColor}
        </h1>
        <p className="text-sm font-light text-darkPrimary dark:text-white lg:text-lg">
          {subdesc}
        </p>
      </div>
    </div>
  );
};
export const TitleLast = ({ title, descColor, descNormal, subdesc }) => {
  return (
    <div className="mb-7 flex flex-col items-center justify-center gap-5 text-center lg:mb-15">
      <span className="inline-block max-w-fit rounded-xl border border-[0C62F7] px-4 py-2 text-sm font-semibold text-darkPrimary dark:border-none dark:bg-gradient-to-b dark:from-[#283877] dark:via-darkPrimary dark:to-[#283877] dark:text-white">
        {title}
      </span>
      <div className="flex flex-col gap-3 lg:gap-5">
        <h1 className="text-3xl font-bold text-darkPrimary dark:text-white lg:text-5xl">
          <span className="text-[#38bdf8]">{descColor} </span>
          {descNormal}
        </h1>
        <p className="text-sm font-light text-darkPrimary dark:text-white">
          {subdesc}
        </p>
      </div>
    </div>
  );
};

export const TitleOnly = () => {
  return (
    <div className="mb-7 flex flex-col items-center justify-center gap-5 text-center">
      <div className="flex max-w-fit items-center justify-center rounded-xl border border-[0C62F7] px-4 py-2 text-xs font-semibold text-darkPrimary dark:border-2 dark:border-textAccent dark:bg-transparent dark:text-white  lg:text-sm">
        <span className="text-base lg:text-xl">👋🏻</span> Selamat Datang!
      </div>
    </div>
  );
};

export const TitleDoang = ({ title }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center lg:hidden">
      <p className="inline-block max-w-fit rounded-xl border border-[0C62F7] px-4 py-2 text-sm font-semibold text-darkPrimary dark:border-none dark:bg-gradient-to-b dark:from-[#283877] dark:via-darkPrimary dark:to-[#283877] dark:text-white">
        {title}
      </p>
    </div>
  );
};
