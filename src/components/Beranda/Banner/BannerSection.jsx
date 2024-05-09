import Banner from "./Banner";

function BannerSection() {
  return (
    <div className="mb-40">
      <div
        className="pt-[71px] pb-40 mt-20 mb-20 bg-blue-600"
        style={{
          backgroundImage: "url(blueBase.png)",
          backgroundRepeat: "no-repeat ",
          backgroundPosition: "center",
          margin: "0 auto",
          maxWidth: "container",
        }}
      >
        <div className="container mx-auto px-40">
          <p className="text-center text-white text-3xl font-bold pb-10">
            Banner
          </p>
          <Banner />
        </div>
      </div>
    </div>
  );
}
export default BannerSection;
