import JumbotronNew from "@/components/Jumbotron/JumbotronNew";
import NewsCard from "@/components/News/NewsCard";

function BeritaPage() {
  return (
    <div className="bg-base-100">
      <JumbotronNew
        title="Berita"
        desc="Cari informasi melalui tulisan tangan tim Diskominfo seputar Bone Bolango"
      />
      <div
        style={{
          background: "linear-gradient(#EDF1FD,#FFFFFF, #FFFFFF)",
        }}
      >
        <div className="container mx-auto lg:px-48 ">
          <div>
            <div className="pt-10">
              <div className="flex flex-col gap-4 mb-10">
                <h1 className="font-bold text-4xl">Berita</h1>
                <p>
                  Temukan informasi yang bersifat faktual dengan sumber data
                  terpercaya yang disajikan dalam bentuk teks.
                </p>
                <div className="form-control">
                  <input
                    type="text"
                    placeholder="Search"
                    className="input input-bordered w-24 md:w-auto"
                  />
                </div>
              </div>
              <NewsCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BeritaPage;
