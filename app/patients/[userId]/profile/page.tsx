import ButtonActions from '@/components/ButtonActions';
import EditButton from '@/components/EditButton';
import IPN from '@/components/IPN';
import ProfileCard from '@/components/ProfileCard';
import { Button } from '@/components/ui/button';
import { getPatient } from '@/lib/actions/patient.actions';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'


const profilePage = async ({ params: { userId } }: SearchParamProps) => {
    const user = await getPatient(userId); // 677421f4003129054d37

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
                
                <ButtonActions userId={userId} patientId={user.$id}/>
        
            </header>

            <main className='mx-auto flex h-full w-[90%] max-w-6xl gap-x-4'>
                <section className='flex flex-col justify-center w-full h-full max-w-[30%] bg-dark-400 rounded-lg gap-y-4'>
                    <ProfileCard
                        userId={user.userId}
                        name={user.name}
                        phone={user.phone}
                        gender={user.gender}
                        birthDate={user.birthDate}
                        address={user.address}
                        occupation={user.occupation}
                        email={user.email}
                        emergencyContactName={user.emergencyContactName}
                        emergencyContactNumber={user.emergencyContactNumber}
                    />
                </section>
                <section className='w-full max-w-[70%]'>
                    <div className='flex w-full flex-row justify-between px-4'>
                        <h2 className='text-2xl font-megium'>Medical condition</h2>
                        
                        <EditButton userId={userId} />
                        
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
                            {user.allergies.length > 0 ? <p className='text-14-regular text-dark-700'>{user.allergies}</p> : <p className='text-14-regular text-dark-600'>nil</p>}
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