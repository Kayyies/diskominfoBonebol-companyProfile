import { Metadata } from "next";
import DefaultLayout from "@/components/AdminPage/Layouts/DefaultLayout";
import BeritaHoaxComp from "@/components/AdminPage/Dashboard/BeritaHoaxComps/BeritaHoaxComp";

export const metadata: Metadata = {
  title: "Dokumen | Diskominfo Bone Bolango",
};

export default function ProfilPage() {
  return (
    <>
      <DefaultLayout>
        <BeritaHoaxComp />
      </DefaultLayout>
    </>
  );
}
