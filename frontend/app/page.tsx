'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useMeApi } from '@/services/react-query/hooks/useAuthApi'
import logo from '@/assets/logo/Website-Logo-NeuraTech-Ltd.png'
import { LayoutDashboard, LogIn, Loader2, ShieldCheck } from 'lucide-react'

export default function Home() {
  const router = useRouter()
  const { data: user, isLoading } = useMeApi()

  return (
    <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,theme(colors.slate.700/0.3)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.slate.700/0.3)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_45%,black_0%,transparent_75%)] [-webkit-mask-image:radial-gradient(ellipse_65%_55%_at_50%_45%,black_0%,transparent_75%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,theme(colors.indigo.500/0.12),transparent_60%)]" />
      <main className="relative z-10 flex w-full max-w-md flex-col items-center px-6 text-center">
        <div className="mb-8 flex items-center gap-2 rounded-full border border-gray-300  px-3 py-1 font-mono text-xs uppercase tracking-widest text-black/70 backdrop-blur">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400" />
          </span>
          Asset Management System
        </div>

        <div className="relative mb-8">
          <span className="absolute -left-2 -top-2 h-4 w-4 border-l-2 border-t-2 border-indigo-400/70" />
          <span className="absolute -right-2 -top-2 h-4 w-4 border-r-2 border-t-2 border-indigo-400/70" />
          <span className="absolute -bottom-2 -left-2 h-4 w-4 border-b-2 border-l-2 border-indigo-400/70" />
          <span className="absolute -bottom-2 -right-2 h-4 w-4 border-b-2 border-r-2 border-indigo-400/70" />
          <div className="rounded-lg border-2 border-gray-300 bg-white shadow-md p-4 backdrop-blur">
            <img src={logo.src} alt="Neuratech Limited" width={150} height={150} className="h-30 w-30 object-contain" />
          </div>
        </div>

        <div className="w-full rounded-2xl border border-gray-300 bg-white p-8 shadow-2xl shadow-black/40 backdrop-blur/50">
          <h1 className="mb-2  text-2xl font-bold tracking-tight text-black/70 sm:text-3xl">
            Welcome to Neuratech's Asset Management System
          </h1>
          <p className="mb-6 text-sm text-slate-400">Track and manage assets from a single dashboard.</p>

          {isLoading ? (
            <div className="flex items-center justify-center gap-2 py-2 text-sm text-slate-400">
              <Loader2 className="h-4 w-4 animate-spin text-indigo-400" />
              Checking your session…
            </div>
          ) : user ? (
            <Button className="w-full gap-2" onClick={() => router.push('/dashboard')}>
              <LayoutDashboard className="h-4 w-4" />
              Go to dashboard
            </Button>
          ) : (
            <Button
              className="w-full gap-2 bg-indigo-500 text-white hover:bg-indigo-400"
              onClick={() => router.push('/login')}
            >
              <LogIn className="h-4 w-4" />
              Login to continue
            </Button>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 flex items-center gap-1.5 font-mono text-[11px] text-slate-500">
          <ShieldCheck className="h-3.5 w-3.5" />
          Secured internal access · Neuratech Limited
        </div>
      </main>
    </div>
  )
}
