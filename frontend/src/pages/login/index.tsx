import PageLayout from "@/layouts/PageLayout";
import LoginEndRegister from "@/components/autentication/LoginEndRegister";

export default function Login() {
  return (
    <PageLayout title=">Iniciar sesión - Markes Places" type="empty">
      <LoginEndRegister />
    </PageLayout>
  );
}
