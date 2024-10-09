import { Metadata } from "next";
import DefaultLayout from "@/components/AdminPage/Layouts/DefaultLayout";
import { DokumenAdd } from "@/components/AdminPage/Dashboard/DokumenComps/dokumen-form";

export const metadata: Metadata = {
  title: "Dokumen | Diskominfo Bone Bolango",
};

export default function dokumenAddPage() {
  return (
    <>
      <DefaultLayout>
        <DokumenAdd />
      </DefaultLayout>
    </>
  );
}
