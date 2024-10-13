function JumbotronNew({ title, descColor, descNormal, subdesc }) {
  return (
    <div>
      <div className="h-[480px] w-full bg-[url(/dividerBg.png)] bg-contain bg-top py-10 dark:bg-[url(/dividerBg-dark.png)]">
        <div className="container mx-auto mt-7 px-6 lg:px-30 2xl:px-48">
          <div className="flex flex-col items-center justify-center gap-5 text-center">
            <span className="text-darkPrimary dark:via-darkPrimary inline-block max-w-fit rounded-xl border border-[0C62F7] px-4 py-2 text-sm font-semibold dark:border-none dark:bg-gradient-to-b dark:from-[#283877] dark:to-[#283877] dark:text-white">
              {title}
            </span>
            <div>
              <h1 className="mb-5 text-5xl font-bold text-[0C1124] dark:text-white">
                <span className="text-[38BDF8]">{descColor} </span>
                {descNormal}
              </h1>
              <p className="text-lg font-light text-gray-900 dark:text-white/70">
                {subdesc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JumbotronNew;
