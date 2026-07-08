'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useMeApi } from '@/services/react-query/hooks/useAuthApi'
import logo from '@/assets/logo/Website-Logo-NeuraTech-Ltd.png'

export default function Home() {
  const router = useRouter()
  const { data: user, isLoading } = useMeApi()

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <img src={logo.src} alt="Neuratech Limited" className="mb-8" width={300} height={300} />
      <main className="w-full flex-col items-center justify-between px-16 text-center dark:bg-black sm:items-start">
        <h1 className="mb-4 text-3xl font-bold">Welcome to the Asset Management System of Neuratech Limited!</h1>

        {isLoading ? (
          <p>Loading...</p>
        ) : user ? (
          <>
            <p>Click on the button below to go to the dashboard.</p>
            <Button className="mt-4" onClick={() => router.push('/dashboard')} variant="default">
              Go to dashboard
            </Button>
          </>
        ) : (
          <>
            <p>Please login to continue.</p>
            <Button className="mt-4" onClick={() => router.push('/login')} variant="default">
              Login
            </Button>
          </>
        )}
      </main>
    </div>
  )
}
