'use Client';

import { useRouter } from 'next/navigation';
import React from 'react'

const Name = ({ name, userId }: { name: string; userId: string }) => {
    const router = useRouter();
    const pageJump = (userId: string) => {

        try{
            router.push(`/patients/${userId}/profile`);
        } catch(error){
            console.log(error);
        }
        router.push(`/patients/${userId}/profile`);
      };
      
  
    return (
      <div
        onClick={() => pageJump(userId)}
        className="cursor-pointer"
      >
        <p className="text-14-bold">{name}</p>
      </div>
    );
  };
  
  export default Name;
  