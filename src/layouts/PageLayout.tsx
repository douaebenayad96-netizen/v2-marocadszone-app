import { cn } from "../utils/helpers"

type PageLayoutProps = {
  children: React.ReactNode
  className?: string
}

const PageLayout = ({ children, className }: PageLayoutProps) => {
  return (
    <div className={cn('min-h-screen pt-[var(--nav-height-mobile)] sm:pt-[var(--nav-height)]', className)}>
      {children}
    </div>
  )
}

export default PageLayout