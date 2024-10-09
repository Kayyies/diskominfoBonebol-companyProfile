//app/(admin)/layanan/editdata/[id]/page.tsx

import { Metadata } from "next";
import { DokumenEdit } from "@/components/AdminPage/Dashboard/DokumenComps/dokumen-form";
import DefaultLayout from "@/components/AdminPage/Layouts/DefaultLayout";
import { getDokumenById } from "@/lib/data";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit Data Dokumen | Diskominfo Bone Bolango",
};

const DokumenEditPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const item = await getDokumenById(id);

  if (!item) {
    notFound;
  }

  return (
    <>
      <DefaultLayout>
        <DokumenEdit item={item} />
      </DefaultLayout>
    </>
  );
};

export default DokumenEditPage;
