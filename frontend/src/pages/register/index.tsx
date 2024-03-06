import PageLayout from "@/layouts/PageLayout";
import LoginEndRegister from "@/components/autentication/LoginEndRegister";

export default function Register() {
  return (
    <PageLayout title="Registrar - Market" type="empty">
      <LoginEndRegister typeRegister />
    </PageLayout>
  );
}
