import Link from "next/link"
import { cn } from "@/lib/utils"

interface GoldButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  href?: string
  className?: string
  icon?: React.ReactNode
}

export function GoldButton({ children, href, className, icon, ...props }: GoldButtonProps) {
  const baseStyles = "inline-flex items-center justify-center px-8 py-4 text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-500 bg-[#0F172A] text-white hover:bg-[#2563EB] hover:text-[#0F172A] shadow-2xl"

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
