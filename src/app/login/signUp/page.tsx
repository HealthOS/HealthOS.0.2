import SignupForm from "@/components/signup-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-dark-400">
      <div className="w-full max-w-sm md:max-w-3xl">
        <SignupForm className=" py-10"/>
      </div>
    </div>
  )
}
