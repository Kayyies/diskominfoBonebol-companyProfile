import NewsRecom from "@/components/News/NewsRecom";

function SectionBerandaBerita() {
  return (
    <div className="3xl:px-[400px] container mx-auto mb-32 px-40 ">
      <div className="flex w-full flex-col">
        <div className="divider divider-start mb-10 text-4xl font-semibold">
          Informasi Publik
        </div>
      </div>
      <NewsRecom />
    </div>
  );
}
export default SectionBerandaBerita;
