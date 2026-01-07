"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  )
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("fill-current", className)} viewBox="0 0 24 24">
      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.35-1.09-.56-2.09-.48-3.08.06-1.06.58-2.18.57-3.17-.5C5.9 18.25 4.35 14.54 5.92 10.9c.77-1.78 2.22-2.81 4.14-2.85 1.1-.02 2.15.54 2.88.54.77 0 2.09-.69 3.52-.58 1.48.11 2.68.84 3.41 2.05-3.08 1.87-2.55 6.01.6 7.28-.62 1.54-1.47 2.92-2.43 3.95.01-.01.01-.01 0-.01zM14.93 5.3c-1.36.14-2.64.93-3.23 2.37.99 1.15 2.5 1.34 3.66 1.07.69-1.57-.1-3.23-.43-3.44z" />
    </svg>
  )
}

export function AuthForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className={cn("w-full max-w-[420px] flex flex-col gap-6", className)} {...props}>
      <div className="text-center lg:text-left mb-2">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Start your journey</h1>
        <p className="text-muted-foreground text-base">Build better habits, one day at a time.</p>
      </div>

      <Tabs defaultValue="signup" className="w-full">
        <TabsList className="w-full h-auto p-1 rounded-xl">
          <TabsTrigger value="login" className="flex-1 py-2.5 rounded-lg text-sm font-medium">
            Log In
          </TabsTrigger>
          <TabsTrigger value="signup" className="flex-1 py-2.5 rounded-lg text-sm font-medium">
            Sign Up
          </TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <form className="flex flex-col gap-5 mt-4" onSubmit={(e) => e.preventDefault()}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="login-email">Email Address</FieldLabel>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="name@example.com"
                  className="h-12 rounded-lg px-4 shadow-md shadow-black/50"
                  required
                />
              </Field>
              <Field>
                <div className="flex justify-between items-center">
                  <FieldLabel htmlFor="login-password">Password</FieldLabel>
                  <a href="#" className="text-xs font-medium text-primary hover:text-primary/80">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="h-12 rounded-lg px-4 pr-12 shadow-md shadow-black/50"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                  </button>
                </div>
              </Field>
              <Field>
                <Button type="submit" size="lg" className="w-full h-12 rounded-lg font-bold shadow-lg shadow-primary/20">
                  Log In
                </Button>
              </Field>
              <FieldSeparator>Or continue with</FieldSeparator>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" type="button" className="h-11 rounded-lg">
                  <GoogleIcon className="size-5" />
                  Google
                </Button>
                <Button variant="outline" type="button" className="h-11 rounded-lg">
                  <AppleIcon className="size-5" />
                  Apple
                </Button>
              </div>
              <FieldDescription className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="#" className="underline underline-offset-4 hover:text-foreground">
                  Sign up
                </a>
              </FieldDescription>
            </FieldGroup>
          </form>
        </TabsContent>

        <TabsContent value="signup">
          <form className="flex flex-col gap-5 mt-4" onSubmit={(e) => e.preventDefault()}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="signup-email">Email Address</FieldLabel>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="name@example.com"
                  className="h-12 rounded-lg px-4 shadow-md shadow-black/50"
                  required
                />
              </Field>
              <Field>
                <div className="flex justify-between items-center">
                  <FieldLabel htmlFor="signup-password">Password</FieldLabel>
                  <a href="#" className="text-xs font-medium text-primary hover:text-primary/80">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    className="h-12 rounded-lg px-4 pr-12 shadow-md shadow-black/50"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                  </button>
                </div>
              </Field>
              <Field>
                <Button type="submit" size="lg" className="w-full h-12 rounded-lg font-bold shadow-lg shadow-primary/20">
                  Create Account
                </Button>
              </Field>
              <FieldSeparator>Or continue with</FieldSeparator>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" type="button" className="h-11 rounded-lg">
                  <GoogleIcon className="size-5" />
                  Google
                </Button>
                <Button variant="outline" type="button" className="h-11 rounded-lg">
                  <AppleIcon className="size-5" />
                  Apple
                </Button>
              </div>
              <FieldDescription className="text-center text-sm">
                By continuing, you agree to our{" "}
                <a href="#" className="underline underline-offset-4 hover:text-foreground">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="underline underline-offset-4 hover:text-foreground">
                  Privacy Policy
                </a>
                .
              </FieldDescription>
            </FieldGroup>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  )
}
