import { Metadata } from "next";
import DefaultLayout from "@/components/AdminPage/Layouts/DefaultLayout";
import BannerAdmin from "@/components/AdminPage/Dashboard/BannerComps/BannerAdmin";

export const metadata: Metadata = {
  title: "Banner | Diskominfo Bone Bolango",
};

export default function ProfilPage() {
  return (
    <>
      <DefaultLayout>
        <BannerAdmin />
      </DefaultLayout>
    </>
  );
}
