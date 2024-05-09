import { Metadata } from "next";
import DefaultLayout from "@/components/AdminPage/Layouts/DefaultLayout";
import LayananKami from "@/components/AdminPage/Dashboard/LayananComps/LayananComp";

export const metadata: Metadata = {
  title: "Dokumen | Diskominfo Bone Bolango",
};

export default function LayananPage() {
  return (
    <>
      <DefaultLayout>
        <LayananKami />
      </DefaultLayout>
    </>
  );
}
