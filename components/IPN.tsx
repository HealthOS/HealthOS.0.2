'use client';

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Clipboard } from "lucide-react";

import React from 'react'
import { Bounce, ToastContainer, toast } from 'react-toastify';

const IPN = ({ insurancePolicyNumber, insuranceProvider }: {
    insurancePolicyNumber: string
    insuranceProvider: string
}) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(insurancePolicyNumber);
        toast("Insurance Policy Number:" + insurancePolicyNumber + " Copied",
            {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                style: { backgroundColor: "#363A3D", color: "white" },
                transition: Bounce,
            }
        );
    }

    return (
        <div className="flex items-center">
            <p className='text-16-medium' >Insurance Provider: <span className='text-16-regular text-dark-700'>{insuranceProvider} </span> Policy number:</p>
            <TooltipProvider>
                <Tooltip>
                    <div className="flex" onClick={handleCopy}>
                        <p className='text-16-regular text-dark-700 ml-1 cursor-pointer'>{insurancePolicyNumber}</p>
                        <TooltipTrigger>
                            <div className="bg-dark-400 h-6 w-6 mx-2 rounded-lg flex items-center justify-center border border-dark-500">
                                <Clipboard className="h-4 w-4 text-dark-600" />
                            </div>
                        </TooltipTrigger>
                    </div>
                    <TooltipContent>
                        <p>Click to copy</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <ToastContainer />
        </div>
    )
}

export default IPN