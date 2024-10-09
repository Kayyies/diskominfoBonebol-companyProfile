//app/(admin)/layanan/editdata/[id]/page.tsx

import { Metadata } from "next";
import { LayananEdit } from "@/components/AdminPage/Dashboard/LayananComps/layanan-form";
import DefaultLayout from "@/components/AdminPage/Layouts/DefaultLayout";
import { getLayananById } from "@/lib/data";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit Data Layanan | Diskominfo Bone Bolango",
};

const layananEditPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const item = await getLayananById(id);

  if (!item) {
    notFound;
  }

  return (
    <>
      <DefaultLayout>
        <LayananEdit item={item} />
      </DefaultLayout>
    </>
  );
};

export default layananEditPage;
