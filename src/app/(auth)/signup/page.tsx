import { Metadata } from "next";
import SignupPageForm from "./components/SignupPageForm";

export const metadata: Metadata = {
  title: "ثبت نام",
  description: "ثبت نان در حساب کاربری بلاگینو",
};
export default function SignupPage() {
  return <SignupPageForm />;
}
