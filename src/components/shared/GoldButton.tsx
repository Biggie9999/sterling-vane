import Link from "next/link"
import { cn } from "@/lib/utils"

interface GoldButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  href?: string
  className?: string
  icon?: React.ReactNode
}

export function GoldButton({ children, href, className, icon, ...props }: GoldButtonProps) {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 text-sm font-mono tracking-widest uppercase transition-all duration-300 bg-gold text-black border border-gold hover:bg-gold-light hover:border-gold-light hover:-translate-y-0.5"

  if (href) {
    return (
      <Link href={href} className={cn(baseStyles, className)}>
        {children}
        {icon && <span className="ml-2">{icon}</span>}
      </Link>
    )
  }

  return (
    <button className={cn(baseStyles, className)} {...props}>
      {children}
      {icon && <span className="ml-2">{icon}</span>}
    </button>
  )
}
