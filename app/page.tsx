'use client';

import PatientForm from "@/components/forms/PatientForm";
import PasskeyModal from "@/components/PasskeyModal";
import ProfileMenu from "@/components/profileMenu";
import { getUser } from "@/lib/actions/accounts.actions";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {

const searchParams = useSearchParams();
  const isAdmin = searchParams.get("admin") === "true";


  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        if(userData){
          setUser(userData);
        }
        else{
          router.push('/login');
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="flex h-screen my-auto max-h-screen">

      {isAdmin && <PasskeyModal />}

      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[496px]">
          <div className="flex justify-between">
            <Image
              src="/assets/icons/logo-full.svg"
              height={1000}
              width={1000}
              alt="patient"
              className="mb-12 h-8 w-fit"
            />

            { user && <ProfileMenu /> }
          </div>

          <PatientForm />

          <div className="text-14-regular flex justify-between py-12">
            <p className="justify-items-end text-dark-600 xl:text-left">© 2025 HealthOS</p>
            <Link href="/?admin=true" className="text-green-500">
              Doctor Dash
            </Link>
          </div>

        </div>
      </section>

      <Image
        src="/assets/images/onboarding-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img w-[50%]"
      />
    </div>
  );
}
