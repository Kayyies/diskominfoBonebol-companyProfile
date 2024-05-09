import ECommerce from "@/components/AdminPage/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/AdminPage/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Diskominfo Dashboard | Diskominfo Bone Bolango",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    </>
  );
}
