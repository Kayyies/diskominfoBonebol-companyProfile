import Profil from "@/components/AdminPage/Dashboard/ProfilComps/ProfilComp";
import { Metadata } from "next";
import DefaultLayout from "@/components/AdminPage/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Profile | Diskominfo Bone Bolango",
};

export default function ProfilPage() {
  return (
    <>
      <DefaultLayout>
        <Profil />
      </DefaultLayout>
    </>
  );
}
