import ButtonActions from '@/components/ButtonActions';
import EditButton from '@/components/EditButton';
import GeminiRecommendation from '@/components/Gemini';
import IPN from '@/components/IPN';
import ListField from '@/components/ListField';
import ProfileCard from '@/components/ProfileCard';
import RoundedContainers from '@/components/RoundedContainers';
import { getAppointmentsByUser } from '@/lib/actions/appointment.actions';
import { getBillsByUser } from '@/lib/actions/bill.action';
import { getPatient } from '@/lib/actions/patient.actions';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from '@/components/ui/app-sidebar'
import { CustomTrigger } from '@/components/ui/CustomTrigger'


const profilePage = async ({ params }: { params: Promise<{ userId: string }> }) => {

    const { userId } = await params;
    const user = await getPatient(userId);
    const appointments = await getAppointmentsByUser(userId);
    const bills = await getBillsByUser(userId);

    return (
        <SidebarProvider>
            <AppSidebar />
            <CustomTrigger />
            <div className='mx-auto flex max-w-7xl w-full h-screen min-h-[768px]  max-h-screen pb-6 flex-col space-y-10'>
                <header className='admin-header'>
                    <div className='flex items-center gap-2'>
                        <Image
                            src="/assets/icons/logo-full.svg"
                            height={32}
                            width={162}
                            alt='logo'
                            className='h-8 w-fit'
                        />
                        <ChevronRight className='h-5 w-5' />
                        {user.room && <div className='flex'>
                            <p className='text-14-bold'>Room: {user.room}</p>
                            <ChevronRight className='h-5 w-5' />
                        </div>
                        }
                        <p className='text-14-bold'>{user.name}</p>
                    </div>

                    <ButtonActions user={user} />

                </header>

                <main className='mx-auto flex h-full max-h-[80%] w-[90%] max-w-6xl gap-x-4'>
                    <section className='flex flex-col justify-center w-full h-full max-w-[25%] bg-dark-400 rounded-lg gap-y-4'>
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
                            identificationDocumentUrl={user.identificationDocumentUrl}
                            report={user.report}
                        />
                    </section>
                    <section className='remove-scrollbar relative flex-1 overflow-y-auto px-[2%] w-full max-w-[55%]'>
                        <div className="mx-auto flex flex-col py-0">
                            <div className='flex w-full flex-row justify-between mb-4'>
                                <h2 className='text-2xl font-megium'>Medical condition</h2>
                                <div className='flex gap-4 items-center'>
                                    <GeminiRecommendation data={user} />
                                    <EditButton userId={userId} />
                                </div>

                            </div>
                            <div className='flex flex-col gap-y-2'>
                                <div>
                                    <p className='text-16-medium'>Description</p>
                                    <p className='text-14-regular text-dark-700'>{user.description}</p>
                                </div>
                                <div className='remove-scrollbar flex my-2 gap-2 w-full items-center overflow-auto'>
                                    <p className='text-16-medium'>Quick look: </p>

                                    {user.temperature && <RoundedContainers
                                        value={user.temperature} field='temperature'
                                    />}
                                    {user.bloodPressure && <RoundedContainers
                                        value={user.bloodPressure} field='bloodPressure'
                                    />}
                                    {user.hypertension && <RoundedContainers
                                        value={user.hypertension} field="hypertension"
                                    />}
                                    {user.diabetes && <RoundedContainers
                                        value={user.diabetes} field="diabetes"
                                    />}
                                    {user.tachycardia && <RoundedContainers
                                        value={user.tachycardia} field="tachycardia"
                                    />}
                                    {user.hypoxia && <RoundedContainers
                                        value={user.hypoxia} field="hypoxia"
                                    />}
                                    {user.respiratoryDistress && <RoundedContainers
                                        value={user.respiratoryDistress} field="respiratoryDistress"
                                    />}
                                    {user.hypercholesterolemia && <RoundedContainers
                                        value={user.hypercholesterolemia} field="hypercholesterolemia"
                                    />}
                                    {user.anemia && <RoundedContainers
                                        value={user.anemia} field="anemia"
                                    />}
                                    {user.chronicKidneyDisease && <RoundedContainers
                                        value={user.chronicKidneyDisease} field="chronicKidneyDisease"
                                    />}
                                    {user.hypothyroidism && <RoundedContainers
                                        value={user.hypothyroidism} field="hypothyroidism"
                                    />}
                                    {user.hyperthyroidism && <RoundedContainers
                                        value={user.hyperthyroidism} field="hyperthyroidism"
                                    />}
                                    {user.obesity && <RoundedContainers
                                        value={user.obesity} field="obesity"
                                    />}
                                    {user.gout && <RoundedContainers
                                        value={user.gout} field="gout"
                                    />}
                                    {user.coagulationDisorder && <RoundedContainers
                                        value={user.coagulationDisorder} field="coagulationDisorder"
                                    />}

                                </div>
                                <div>
                                    <p className='text-16-medium'>Serious conditions</p>
                                    <p className='text-14-regular text-dark-700'>{user.seriousConditions}</p>
                                </div>
                                <div>
                                    <p className='text-16-medium'>Allergies</p>
                                    {user.allergies.length > 0 ? <p className='text-14-regular text-dark-700'>{user.allergies}</p> : <p className='text-14-regular text-dark-600'>nil</p>}
                                </div>

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
                        </div>
                    </section>
                    <section className='flex flex-col w-full space-y-2 max-w-[15%]'>
                        <ListField
                            head="Appointments"
                            count={appointments.totalCount}
                            data={appointments.documents}
                        />
                        <ListField
                            head="Bills"
                            count={bills.totalCount}
                            data={bills.documents}
                        />
                    </section>
                </main>
            </div>

        </SidebarProvider>
    )
}

export default profilePage