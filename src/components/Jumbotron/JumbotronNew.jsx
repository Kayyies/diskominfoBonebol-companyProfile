function JumbotronNew({ title, descColor, descNormal, subdesc }) {
  return (
    <div>
      <div
        className="py-10 w-full h-[480px]"
        style={{
          backgroundImage: "url(assets/dividerBg.png)",
          backgroundPosition: "center top",
          backgroundSize: "cover",
        }}
      >
        <div className="mt-7 container mx-auto lg:px-40">
          <div className="flex flex-col gap-5 justify-center items-center text-center">
            <span className="border-[0C62F7] border rounded-xl inline-block px-4 py-2 text-sm text-gray-900 max-w-fit font-semibold">
                {title}
            </span>
            <div>
                <h1 className="text-5xl font-bold text-[0C1124] mb-5">
                    <span className="text-[38BDF8]">{descColor} </span> 
                    {descNormal}
                </h1>
                <p className="text-gray-900 text-lg font-light">{subdesc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JumbotronNew;
