import { SidebarTrigger } from '../ui/sidebar'
import { Separator } from '../ui/separator'

const Header = () => {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <h1 className="text-sm font-medium">Dashboard</h1>
    </header>
  )
}

export default Header
