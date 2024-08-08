import { Metadata } from "next";
import DefaultLayout from "@/components/AdminPage/Layouts/DefaultLayout";
import ProfilAdd from "@/components/AdminPage/Dashboard/ProfilComps/profil-add";
import Profil from "@/components/AdminPage/Dashboard/DokumenComps/DokumenComp";

export const metadata: Metadata = {
  title: "Profil | Diskominfo Bone Bolango",
};

export default function profilAddPage() {
  return (
    <>
      <DefaultLayout>
        <ProfilAdd />
      </DefaultLayout>
    </>
  );
}
