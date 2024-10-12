import { Metadata } from "next";
import DefaultLayout from "@/components/AdminPage/Layouts/DefaultLayout";
import UserAdmin from "@/components/AdminPage/Dashboard/userComps/userComp";

export const metadata: Metadata = {
  title: "User | Diskominfo Bone Bolango",
};

export default function AdminPage() {
  return (
    <>
      <DefaultLayout>
        <UserAdmin />
      </DefaultLayout>
    </>
  );
}
