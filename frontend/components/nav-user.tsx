'use client'

import { ChevronsUpDown, LogOut, User2 } from 'lucide-react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { useLogoutApi } from '@/services/react-query/hooks/useAuthApi'
import { useRouter } from 'next/navigation'

export function NavUser({ user }: { user: { name: string; email: string } }) {
  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')

  const router = useRouter()
  const logout = useLogoutApi()

  const handleLogout = async () => {
    try {
      await logout.mutateAsync()
      router.push('/login')
      router.refresh() // forces middleware to re-check auth on next navigation
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg">
              <Avatar className="size-8 rounded-lg">
                <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-medium">{user.name}</span>
                <span className="text-xs text-muted-foreground">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[--radix-popper-anchor-width]" align="start" side="top">
            <DropdownMenuItem>
              <User2 />
              Account
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
