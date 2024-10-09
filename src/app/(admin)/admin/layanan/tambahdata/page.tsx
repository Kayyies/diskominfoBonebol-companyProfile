import { Metadata } from "next";
import DefaultLayout from "@/components/AdminPage/Layouts/DefaultLayout";
import { LayananAdd } from "@/components/AdminPage/Dashboard/LayananComps/layanan-form";

export const metadata: Metadata = {
  title: "Dokumen | Diskominfo Bone Bolango",
};

export default function LayananPage() {
  return (
    <>
      <DefaultLayout>
        <LayananAdd />
      </DefaultLayout>
    </>
  );
}
