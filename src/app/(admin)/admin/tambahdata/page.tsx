import TambahDataComp from "@/components/AdminPage/Dashboard/TambahDataPage/TambahDataPage";
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
