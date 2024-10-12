function JumbotronNew({ title, desc }) {
  return (
    <div>
      <div
        className="h-[363px] bg-gray-300 py-10"
        style={{
          backgroundImage: "url(dividerBg.png)",
          backgroundPosition: "center top",
          backgroundSize: "cover",
        }}
      >
        <div className="container mx-auto mt-10 flex items-center justify-center lg:px-40">
          <div className="flex flex-col justify-center gap-3 px-52 text-center">
            <h1 className="text-4xl font-bold">{title}</h1>
            <p className="text-gray-600">{desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JumbotronNew;
