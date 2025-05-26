import RegisterForm from '@/components/forms/RegisterForm'
import { getPatient, getUser } from '@/lib/actions/patient.actions'
import Image from 'next/image'
import React from 'react'

const Register = async ({ params }: { params: Promise<{ userId: string }> }) => {

  const { userId } = await params;
  const user = await getUser(userId);
  const profileData = await getPatient(userId);

    return (
    <div className="flex h-screen min-h-[768px] max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[920px] flex-1 flex-col py-10">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-6 w-fit"
          />
          
          <RegisterForm user={user}
              patientData={profileData}
          />

          <p className="copyright py-12">© 2025 HealthOS</p>

        </div>
      </section>

      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="register"
        className="side-img max-w-[190px]"
      />
    </div>
  )
}

export default Register