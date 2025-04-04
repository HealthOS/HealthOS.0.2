'use Client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import Loader from './loader/loader';

const Name = ({ name, userId }: { name: string; userId: string }) => {
  const router = useRouter();

  const [loader, setLoader] = useState(false);
  const pageJump = (userId: string) => {

    try {
      router.push(`/patients/${userId}/profile`);
    } catch (error) {
      console.log(error);
    }
    router.push(`/patients/${userId}/profile`);
  };


  return (
    <div
      onClick={() => pageJump(userId)}
      className="pl-2 py-1.5 rounded-full cursor-pointer hover:bg-dark-500"
    >
      <p className="text-14-bold" onClick={() => setLoader(true)}>{name}</p>
      {
        loader && <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-[9999]">
          <Loader />
        </div>
      }
    </div>
  );
};

export default Name;
