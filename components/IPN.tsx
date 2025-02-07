'use client';

import React, { useState } from 'react'

const IPN = ({ insurancePolicyNumber, insuranceProvider }: {
    insurancePolicyNumber: string
    insuranceProvider: string
}) => {

    const [copied, setCopied] = useState("");
    const handleIPNCopy = () => {
        setCopied(insurancePolicyNumber);
        navigator.clipboard.writeText(insurancePolicyNumber);
        setTimeout(() => setCopied(""), 3000);
    }

    return (
        <div className="flex">
            <p className='text-16-medium' onClick={handleIPNCopy} >Insurance Provider: <span className='text-16-regular text-dark-700'>{insuranceProvider} </span> Policy number: <span className='text-16-regular text-dark-700 cursor-pointer'>{insurancePolicyNumber}</span></p>
            <p className='text-16-regular text-dark-600'> (click to copy)</p>
        </div>
    )
}

export default IPN