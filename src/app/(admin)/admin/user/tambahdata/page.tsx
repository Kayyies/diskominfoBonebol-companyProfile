import { Metadata } from "next";
import DefaultLayout from "@/components/AdminPage/Layouts/DefaultLayout";
import { UserAdd } from "@/components/AdminPage/Dashboard/userComps/user-form";

export const metadata: Metadata = {
  title: "User | Diskominfo Bone Bolango",
};

export default function UserPage() {
  return (
    <>
      <DefaultLayout>
        <UserAdd />
      </DefaultLayout>
    </>
  );
}
