import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { DoctorParams } from '@/types/appwrite.types'

const DeleteComponent = ({ user }: { user: DoctorParams }) => {
    return (
        <div className='w-full'>
            <h1 className='text-3xl font-semibold px-10 py-8'>Delete Profile</h1>
            <section className='border-t'>
                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                        <div className='pl-10 pr-20 m-10 flex flex-col gap-6'>
                            <p>To delete your account enter your full name and click below button</p>
                            <Input
                                type='input'
                                placeholder='Your full name'
                                name='name'
                            >
                            </Input>
                            {('1' === '1') ? 
                            <Button type="button" className="w-full bg-red-500 hover:bg-red-950 hover:text-white">Delete Account</Button>
                            : <div className="inline-flex items-center justify-center bg-dark-400 p-2 gap-2 whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring pointer-events-none opacity-50">Delete Account</div>
                            }
                        </div>
                    </div></div>
            </section>
        </div>
    )
}

export default DeleteComponent