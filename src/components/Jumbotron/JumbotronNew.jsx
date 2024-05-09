function JumbotronNew({ title, desc }) {
  return (
    <div>
      <div
        className="py-10 bg-gray-300 h-[363px]"
        style={{
          backgroundImage: "url(dividerBg.png)",
          backgroundPosition: "center top",
          backgroundSize: "cover",
        }}
      >
        <div className="mt-10 container mx-auto lg:px-40 flex justify-center items-center">
          <div className="flex flex-col gap-3 justify-center text-center px-52">
            <h1 className="text-4xl font-bold">{title}</h1>
            <p className="text-gray-600">{desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JumbotronNew;
