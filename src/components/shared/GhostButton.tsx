import Link from "next/link"
import { cn } from "@/lib/utils"

interface GhostButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  href?: string
  className?: string
  icon?: React.ReactNode
  light?: boolean
}

export function GhostButton({ children, href, className, icon, light = false, ...props }: GhostButtonProps) {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 text-sm font-mono tracking-widest uppercase transition-all duration-300 border bg-transparent hover:-translate-y-0.5"
  
  const colorStyles = light 
    ? "border-white/20 text-white hover:border-gold hover:text-gold" 
    : "border-slate-300 text-slate-800 hover:border-brand-accent hover:text-brand-accent"

  if (href) {
    return (
      <Link href={href} className={cn(baseStyles, colorStyles, className)}>
        {children}
        {icon && <span className="ml-2">{icon}</span>}
      </Link>
    )
  }

  return (
    <button className={cn(baseStyles, colorStyles, className)} {...props}>
      {children}
      {icon && <span className="ml-2">{icon}</span>}
    </button>
  )
}
