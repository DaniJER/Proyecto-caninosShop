import { RegisterForm } from "@/components";
import Image from "next/image";

export default function RegisterPage() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white">
       <div className="flex flex-col-reverse lg:flex-row  justify-center items-center pt-4 ">
        <h1 className="text-5xl md:text-7xl font-bold text-center"> Registrate</h1>
        <Image
            src="/logo.png"
            alt="Logo"
            width={200}
            height={200}

        />
       </div>
       <RegisterForm/>
       
    </div>
  );
}