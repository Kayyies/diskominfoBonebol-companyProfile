import { Metadata } from "next";
import DefaultLayout from "@/components/AdminPage/Layouts/DefaultLayout";
import BannerComp from "@/components/AdminPage/Dashboard/BannerComps/BannerComp";

export const metadata: Metadata = {
  title: "Banner | Diskominfo Bone Bolango",
};

export default function ProfilPage() {
  return (
    <>
      <DefaultLayout>
        <BannerComp />
      </DefaultLayout>
    </>
  );
}
