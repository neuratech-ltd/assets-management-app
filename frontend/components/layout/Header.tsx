import { SidebarTrigger } from '../ui/sidebar'
import { Separator } from '../ui/separator'
import { title } from 'process'

interface HeaderProps {
  title?: string
}

const Header = ({ title }: HeaderProps) => {
  return (
    <header className="flex rounded-md fixed z-10 bg-white w-full h-14 shrink-0 items-center gap-2 border-b px-4 shadow-sm">
      <SidebarTrigger className="-ml-1" />
      <h1 className="text-md font-medium">{title}</h1>
    </header>
  )
}

export default Header
