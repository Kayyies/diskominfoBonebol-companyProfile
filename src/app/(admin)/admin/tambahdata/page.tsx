import CompTambahData from "@/components/AdminPage/Dashboard/CompTambahData";
import TambahDataComp from "@/components/AdminPage/Dashboard/TambahDataPage";
import DefaultLayout from "@/components/AdminPage/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Tambah Data | Diskominfo Bone Bolango",
};

export default function TambahData() {
  return (
    <>
      <DefaultLayout>
        <TambahDataComp />
      </DefaultLayout>
    </>
  );
}
