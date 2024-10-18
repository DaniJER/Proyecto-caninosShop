import { RestoreForm } from "@/components";
import Link from "next/link";

export default function RestorePage() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-5">
        <RestoreForm/>  
    </div>
  );
}