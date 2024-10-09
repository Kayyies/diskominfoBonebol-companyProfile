//app/(admin)/banner/editdata/[id]/page.tsx

import { Metadata } from "next";
import { BannerEdit } from "@/components/AdminPage/Dashboard/BannerComps/banner-form";
import DefaultLayout from "@/components/AdminPage/Layouts/DefaultLayout";
import { getBannerById } from "@/lib/data";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit Data Banner | Diskominfo Bone Bolango",
};

const bannerEditPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const item = await getBannerById(id);

  if (!item) {
    notFound;
  }

  return (
    <>
      <DefaultLayout>
        <BannerEdit item={item} />
      </DefaultLayout>
    </>
  );
};

export default bannerEditPage;
