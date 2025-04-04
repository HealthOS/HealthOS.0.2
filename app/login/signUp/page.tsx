import SignupForm from "@/components/signup-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen min-h-[768px] flex-col items-center justify-center bg-[url('/assets/images/register-img.png')] bg-cover bg-fixed bg-center">
      <div className="w-full max-w-sm md:max-w-3xl">
        <SignupForm className=" py-10"/>
      </div>
    </div>
  )
}
