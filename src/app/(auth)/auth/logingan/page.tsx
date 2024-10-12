import { Metadata } from "next";
import { LoginUI } from "@/components/login-ui";

export const metadata: Metadata = {
  title: "Login | Diskominfo Bone Bolango",
};

export default function LoginPage() {
  return (
    <>
      <div>
        <LoginUI />
      </div>
    </>
  );
}
