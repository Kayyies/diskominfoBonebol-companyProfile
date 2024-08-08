import { Metadata } from "next";
import DefaultLayout from "@/components/AdminPage/Layouts/DefaultLayout";
import BannerAdd from "@/components/AdminPage/Dashboard/BannerComps/banner-add";

export const metadata: Metadata = {
  title: "Banner Add Data | Diskominfo Bone Bolango",
};

export default function bannerAddPage() {
  return (
    <>
      <DefaultLayout>
        <BannerAdd />
      </DefaultLayout>
    </>
  );
}
