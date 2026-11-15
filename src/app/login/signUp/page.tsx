import SignupForm from "@/components/signup-form"
import Image from "next/image"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center space-y-8 justify-center bg-dark-400">
      <Image
              src="\assets\icons\logo-full.svg"
              height={32}
              width={144}
              alt="logo"
            />
      <div className="w-full max-w-sm md:max-w-3xl">
        <SignupForm/>
      </div>
    </div>
  )
}
