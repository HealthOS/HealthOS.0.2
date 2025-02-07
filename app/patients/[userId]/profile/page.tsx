import IPN from '@/components/IPN';
import { Button } from '@/components/ui/button';
import { getPatient } from '@/lib/actions/patient.actions';
import { ChevronRight, SquarePen, UserMinus, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'


const profilePage = async ({ params: { userId } }: SearchParamProps) => {
    const user = await getPatient(userId); 

    console.log(user);
    return (
        <div className='mx-auto flex max-w-7xl h-screen pb-6 flex-col space-y-10'>
            <header className='admin-header'>
                <div className='flex items-center gap-2'>
                    <Link href="/" className="cursor-pointer">
                        <Image
                            src="/assets/icons/logo-full.svg"
                            height={32}
                            width={162}
                            alt='logo'
                            className='h-8 w-fit'
                        />
                    </Link>
                    <ChevronRight className='h-5 w-5' />
                    <p className='text-14-bold'>{user.name}</p>
                </div>
                <div className='flex gap-2 relative'>
                    <Button variant="outline">New Appointment</Button>
                    <Button variant="outline">Add Bill</Button>
                </div>
            </header>

            <main className='mx-auto flex h-full w-[90%] max-w-6xl gap-x-4'>
                <section className='flex flex-col justify-center w-full h-full max-w-[30%] bg-dark-400 rounded-lg gap-y-4'>
                    <div className='flex flex-col items-center justify-center gap-y-1'>
                        <div className='h-24 w-24 flex items-center justify-center rounded-full bg-dark-600 border-4 border-dark-400'>
                            <p className='text-5xl font-medium text-dark-300'> {user.name[0]}</p>
                        </div>
                        <p>{user.name}</p>
                        <p className='text-14-regular text-dark-700'>{user.phone}</p>
                        <div className='text-14-regular text-dark-700'>{user.gender}-{user.birthDate}</div>
                        <p className='flex justify-center text-14-regular text-dark-700'>Address: {user.address}</p>
                        <p>Occupation-{user.occupation}</p>
                        <div className='flex gap-2 my-4'>
                            <div className='circles group'>
                                <Mail className='h-5 w-5 text-dark-400 group-hover:text-white' />
                            </div>
                            <div className='circles group'>
                                <SquarePen className='h-5 w-5 text-dark-400 group-hover:text-white' />
                            </div>
                            <div className='circles group'>
                                <UserMinus className='h-5 w-5 text-red-700 group-hover:text-white' />
                            </div>
                        </div>
                    </div>
                </section>
                <section className='w-full max-w-[70%]'>
                    <div className='flex w-full flex-row justify-between px-4'>
                        <h2 className='text-2xl font-megium'>Medical condition</h2>
                        <SquarePen className='h-5 w-5' />
                    </div>
                    <div className="flex flex-col px-4 mt-2 gap-y-2">
                        <div>
                            <p className='text-16-medium'>Description</p>
                            <p className='text-14-regular text-dark-700'>user.description</p>
                        </div>
                        <div>
                            <p className='text-16-medium'>Quick look</p>
                            <p className='text-14-regular text-dark-700'>user.description</p>
                        </div>
                        <div>
                            <p className='text-16-medium'>Serious conditions</p>
                            <p className='text-14-regular text-dark-700'>user.seriousConditions</p>
                        </div>
                        <div>
                            <p className='text-16-medium'>Allergies</p>
                            {user.allergies.length > 0 ? <p className='text-14-regular text-dark-700'>user.description</p> : <p className='text-14-regular text-dark-600'>nil</p>}
                        </div>
                        <p className='text-16-medium'>Physician: <span className='text-16-regular text-dark-700'>Dr. {user.primaryPhysician}</span></p>
                        <div>
                            <p className='text-16-medium'>Current Medication</p>
                            <p className='text-14-regular text-dark-700'>{user.currentMedication}</p>
                        </div>
                        <div>
                            <p className='text-16-medium'>Past Medical History</p>
                            <p className='text-14-regular text-dark-700'>{user.pastMedicalHistory}</p>
                        </div>
                        <div>
                            <p className='text-16-medium'>Family Medical History</p>
                            <p className='text-14-regular text-dark-700'>{user.familyMedicalHistory}</p>
                        </div>

                        <IPN insurancePolicyNumber={user.insurancePolicyNumber} insuranceProvider={user.insuranceProvider} />

                        <div>
                            <p className='text-16-medium'>Family Medical History</p>
                            <p className='text-14-regular text-dark-700'>{user.familyMedicalHistory}</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default profilePage