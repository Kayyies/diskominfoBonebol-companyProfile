import CardLayanan from "./CardLayanan";

const LayananSection = () => {
  return (
    <div>
      <div className="container mx-auto flex w-full flex-col px-40">
        <div className="divider mb-5 text-4xl font-semibold 2xl:divider-start">
          Layanan Kami
        </div>
      </div>
      <CardLayanan />
    </div>
  );
};
export default LayananSection;
