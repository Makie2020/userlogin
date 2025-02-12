"use client"

import { useState } from "react"
import { LockClosedIcon, UserCircleIcon, UserIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { Button, Input } from '@headlessui/react'
import { useRouter } from 'next/navigation'
import AuthService from '@/src/services/api/auth'

export function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      await AuthService.login({
        username: username,
        password: password
      })
      
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto p-8">
      <div className="flex flex-col items-center mb-8">
        <UserCircleIcon className="w-16 h-16 text-white/80 mb-4" />
        <div className="flex items-center gap-4 w-full">
          <div className="h-[1px] flex-1 bg-white/20" />
          <h2 className="text-2xl font-light text-white">Sign In</h2>
          <div className="h-[1px] flex-1 bg-white/20" />
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 text-sm text-red-200 bg-red-500/20 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            disabled={isLoading}
            className="w-80 p-2 bg-white/15 border-white/25 text-white pl-11 placeholder:text-white/60 focus:border-white/40 focus:ring-0"
          />
        </div>
        <div className="relative">
          <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
          <Input
            id="password"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
            className="w-80 p-2 bg-white/15 border-white/25 text-white pl-11 placeholder:text-white/60 focus:border-white/40 focus:ring-0"
          />
        </div>
        <div className="flex items-center justify-end text-sm text-white/70">
          <Link href="/forgot-password" className="hover:text-white">
            Forgot password?
          </Link>
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#ffa726] hover:bg-[#ff9800] text-white font-normal py-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </form>

      <div className="mt-8 text-center text-white/70">
        Not a user?{" "}
        <Link href="/create-account" className="text-[#ffa726] hover:text-[#ff9800]">
          Sign up
        </Link>
      </div>
    </div>
  )
}