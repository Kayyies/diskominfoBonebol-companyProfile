import { Metadata } from "next";
import DefaultLayout from "@/components/AdminPage/Layouts/DefaultLayout";
import ProfilSlug from "@/components/AdminPage/Dashboard/ProfilSlug";

export default function ProfilPage() {
  return (
    <>
      <DefaultLayout>
        <ProfilSlug />
      </DefaultLayout>
    </>
  );
}
