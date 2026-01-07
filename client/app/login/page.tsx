import { AuthForm } from "@/components/auth-form"
import Hero from './hero'

export default function LoginPage() {
  return (
    <div className="dark h-screen flex flex-col bg-background text-foreground">
      <main className="flex-1 flex w-full relative">
        <div className="flex flex-1 flex-col lg:flex-row h-full">
          {/* Left Side: Auth Form */}
          <div className="flex flex-1 flex-col justify-center items-center p-6 bg-card z-10">
            <AuthForm />
          </div>

          {/* Right Side: Hero */}
          <Hero />
        </div>
      </main>
    </div>
  )
}
