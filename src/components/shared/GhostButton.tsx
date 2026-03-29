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
  const baseStyles = "inline-flex items-center justify-center px-10 py-4 text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-500 border rounded-2xl hover:-translate-y-1"
  
  const colorStyles = light 
    ? "border-white/20 text-white hover:bg-white hover:text-[#0F172A]" 
    : "border-[#0F172A]/10 text-[#0F172A] hover:bg-[#0F172A] hover:text-white"

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {icon && <span className="ml-3 relative z-10 transition-transform duration-500 group-hover:translate-x-1">{icon}</span>}
    </>
  )

  if (href) {
    return (
      <Link href={href} className={cn(baseStyles, colorStyles, "group", className)} {...(props as any)}>
        {content}
      </Link>
    )
  }

  return (
    <button className={cn(baseStyles, colorStyles, "group", className)} {...props}>
      {content}
    </button>
  )
}
