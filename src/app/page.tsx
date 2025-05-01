'use client';

import PatientForm from "@/components/forms/PatientForm";
import PasskeyModal from "@/components/PasskeyModal";
import ProfileMenu from "@/components/profileMenu";
import { getUser } from "@/lib/actions/accounts.actions";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useLoader } from "./context/LoaderContext";

export default function Home() {

  const searchParams = useSearchParams();
  const isAdmin = searchParams.get("admin") === "true";
  const [user, setUser] = useState(null);
  const [wish, setWish] = useState('');
  const router = useRouter();
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    const updateWish = () => {
      const hours = new Date().getHours();
      if (hours >= 0 && hours < 12) {
        setWish("Good Morning");
      } else if (hours >= 12 && hours < 17) {
        setWish("Good Afternoon");
      } else {
        setWish("Good Evening");
      }
    };

    updateWish();

    setInterval(updateWish, 60 * 1000); // Update every minute
  }, []);

  const [name, setName] = useState('');
  const [doctor, setDoctor] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        showLoader();
        const loggedDoc = await getUser();
        if (loggedDoc){
          console.log(loggedDoc);
          setUser(loggedDoc);
          setDoctor(loggedDoc.$id);
          setName(loggedDoc.name);
        }
        else {
          router.push('/login');
        }
        hideLoader();
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="flex h-screen min-h-[768px] my-auto max-h-screen">

      {isAdmin && <PasskeyModal 
        doctor={doctor}
      />}

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

            {user && <ProfileMenu />}
          </div>
          <p className="text-2xl font-semibold">{wish}!<span className="text-green-500"> Dr.{name}</span></p>
          <PatientForm />

          <div className="text-14-regular flex justify-between py-12">
            <p className="justify-items-end text-dark-600 xl:text-left">© 2025 HealthOS</p>
            <Link href="/?admin=true" className="text-green-500">
              Skip to Dashboard
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
