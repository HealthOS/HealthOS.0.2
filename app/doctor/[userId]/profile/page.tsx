import AccountSection from '@/components/AccountSection';
import ProfileMenu from '@/components/profileMenu';
import { getDoctor } from '@/lib/actions/doctor.actions';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const page = async ({ params: { userId } }: SearchParamProps) => {

  const user = await getDoctor(userId);
  console.log("current Doctor", user);

  return (
    <div className="mx-auto flex max-w-7xl min-h-[768px] h-screen pb-5 flex-col space-y-8">
      <header className='admin-header'>
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/icons/logo-full.svg"
            height={32}
            width={162}
            alt='logo'
            className='h-8 w-fit'
          />
        </Link>

        <ProfileMenu />
      </header>
      
      <AccountSection 
        user={user}
      />
      <p className="justify-items-end text-dark-600 xl:text-left">© 2025 HealthOS</p>

    </div>
  )
}

export default page
