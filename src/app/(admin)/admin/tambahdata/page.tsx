import TambahDataComp from "@/components/AdminPage/Dashboard/TambahDataPage/TambahDataPage";
import CreateForm from "@/components/AdminPage/Dashboard/create-form";
import TodosComponent from "@/components/AdminPage/Dashboard/todos-experimental/todos-component";
import DefaultLayout from "@/components/AdminPage/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Tambah Data | Diskominfo Bone Bolango",
};

export default function TambahData() {
  return (
    <>
      <DefaultLayout>
        {/* <TambahDataComp /> */}
        <TodosComponent />
      </DefaultLayout>
    </>
  );
}
