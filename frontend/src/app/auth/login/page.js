import { LoginForm } from "@/components";

export default function LoginPage() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-6 sm:px-10 py-6 sm:py-10 ">
       <h1 className="text-5xl md:text-7xl font-bold mb-8 text-center">Bienvenido</h1>
       <LoginForm/>
    </div>
  );
}