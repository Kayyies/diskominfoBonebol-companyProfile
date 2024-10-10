//app/(admin)/user/editdata/[id]/page.tsx

import { Metadata } from "next";
import { UserEdit } from "@/components/AdminPage/Dashboard/userComps/user-form";
import DefaultLayout from "@/components/AdminPage/Layouts/DefaultLayout";
import { getUserById } from "@/lib/data";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit Data User | Diskominfo Bone Bolango",
};

const userEditPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const item = await getUserById(id);

  if (!item) {
    notFound();
  }

  return (
    <>
      <DefaultLayout>
        <UserEdit item={item} />
      </DefaultLayout>
    </>
  );
};

export default userEditPage;
