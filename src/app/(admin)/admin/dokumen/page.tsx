import { Metadata } from "next";
import DefaultLayout from "@/components/AdminPage/Layouts/DefaultLayout";
import Dokumen from "@/components/AdminPage/Dashboard/DokumenComps/Dokumen";

export const metadata: Metadata = {
  title: "Dokumen | Diskominfo Bone Bolango",
};

export default function ProfilPage() {
  return (
    <>
      <DefaultLayout>
        <Dokumen />
      </DefaultLayout>
    </>
  );
}
