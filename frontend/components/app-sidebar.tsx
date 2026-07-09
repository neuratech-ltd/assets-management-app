'use client'

import * as React from 'react'
import { Settings } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { NavUser } from '@/components/nav-user'

import { siteMap } from '@/components/layout/sitemap'
import { useMeApi } from '@/services/react-query/hooks/useAuthApi'
import logo from '@/assets/logo/logo.png'

const workspaces = [{ name: 'NeuraTech Ltd' }]

export function AppSidebar() {
  const me = useMeApi()

  return (
    <Sidebar variant="floating" className="bg-muted" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-primary-foreground">
              <img src={logo.src} alt="Neuratech Limited" className="h-7 w-7 ml" />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Options</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {siteMap.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton onClick={() => (window.location.href = item.href)}>
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            {/* <SidebarMenuButton asChild>
              <a href="#settings">
                <Settings />
                <span>Settings</span>
              </a>
            </SidebarMenuButton> */}
          </SidebarMenuItem>
        </SidebarMenu>
        <NavUser user={{ name: me.data?.fullName || 'Admin User', email: me.data?.email || 'admin@user.com' }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
