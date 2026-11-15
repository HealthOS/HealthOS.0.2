'use client';

import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { SquarePen } from 'lucide-react';
import { useRouter } from 'next/navigation';

const EditButton = ( { userId }: {userId: string} ) => {

    const router = useRouter();
    const handelEdit = () => {

        router.push(`/patients/${userId}/register`)
        
    }
  
    return (
    <div>
        <TooltipProvider>
                    <Tooltip>
                        <div className="flex">
                            <TooltipTrigger>
                                <SquarePen className="h-5 w-5" onClick={handelEdit}/>
                            </TooltipTrigger>
                        </div>
                        <TooltipContent className='bg-dark-300 rounded-md'>
                            <p>Edit Patient details</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
    </div>
  )
}

export default EditButton