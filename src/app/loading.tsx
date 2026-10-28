import { NexoraLogo } from '@/components/common/logo'
import { Spinner } from '@/components/ui/spinner'
import React from 'react'

export default function Loading() {
  return (
    <div className='flex flex-col items-center justify-center min-h-[75vh] gap-6 bg-background text-foreground transition-colors'>
      <div className="flex justify-center items-center gap-3">
        <NexoraLogo size={42} withGlow className="shadow-lg shadow-purple-500/25" />
        <span className="font-extrabold text-2xl tracking-tight">Nexora</span>
      </div>
      <Spinner className="size-10 text-primary" />
    </div>
  )
}
