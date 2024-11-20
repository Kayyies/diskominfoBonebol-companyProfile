//app/(admin)/layanan/editdata/[id]/page.tsx

import { Metadata } from "next";
import DefaultLayout from "@/components/AdminPage/Layouts/DefaultLayout";
import { getBeritaHoaxById } from "@/lib/data";
import { notFound } from "next/navigation";
import { BeritaHoaxUpdate } from "@/components/AdminPage/Dashboard/BeritaHoaxComps/beritahoax-form";

export const metadata: Metadata = {
  title: "Edit Data Dokumen | Diskominfo Bone Bolango",
};

const DokumenEditPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const item = await getBeritaHoaxById(id);

  if (!item) {
    notFound;
  }

  return (
    <>
      <DefaultLayout>
        <BeritaHoaxUpdate item={item} />
      </DefaultLayout>
    </>
  );
};

export default DokumenEditPage;
