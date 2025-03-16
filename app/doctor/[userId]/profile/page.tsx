import ProfileMenu from '@/components/profileMenu';
import { getUser } from '@/lib/actions/patient.actions'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const page = async ({ params: { userId } }: SearchParamProps) => {

  const user = await getUser(userId);

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
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
      <main className='admin-main'>content</main>
    </div>
  )
}

export default page
