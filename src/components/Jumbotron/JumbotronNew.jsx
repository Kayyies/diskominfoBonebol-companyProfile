function JumbotronNew({ title, descColor, descNormal, subdesc }) {
  return (
    <div>
      <div className="container mx-auto mt-20 px-6 lg:px-30 2xl:px-48">
        <div className="flex flex-col items-center justify-center gap-5 text-center">
          <span className="inline-block max-w-fit rounded-xl border border-[0C62F7] px-4 py-2 text-xs font-semibold text-darkPrimary dark:border-none dark:bg-gradient-to-b dark:from-[#283877] dark:via-darkPrimary dark:to-[#283877] dark:text-white">
            {title}
          </span>
          <div>
            <h1 className="mb-5 text-2xl font-bold text-[0C1124] dark:text-white md:text-5xl">
              <span className="text-[38BDF8]">{descColor} </span>
              {descNormal}
            </h1>
            <p className="text-xs font-light text-gray-900 dark:text-white/70 md:text-lg">
              {subdesc}
            </p>
          </div>
        </div>
      </div>
      <div className="-mt-15 h-[130px] w-full bg-[url(/dividerBg.png)] bg-contain bg-top py-10 dark:bg-[url(/dividerBg-dark.png)] md:-mt-60 md:h-[480px]"></div>
    </div>
  );
}

export default JumbotronNew;
