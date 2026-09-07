import { Metadata } from "next";
import SigninPageForm from "./components/SigninPageForm";

export const metadata: Metadata = {
  title: "ورود",
  description: "ورود به حساب کاربری در بلاگینو",
};
export default function LoginPage() {
  return <SigninPageForm />;
}
