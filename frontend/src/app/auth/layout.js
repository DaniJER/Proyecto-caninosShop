import Image from "next/image";

export default async function AuthLayout({
 children
}) {
  return (
    <main className="bg-sky-400 min-h-screen flex justify-center items-center ">
      <div className="w-full md:w-2/4 min-h-screen">
        {children}
      </div>
      <div className="hidden md:flex justify-center w-2/4 px-10" >
        <Image
            src="/perro_auth.png"
            alt="perro"
            width={550}
            height={650}
        />
      </div>
    </main>
  );
}