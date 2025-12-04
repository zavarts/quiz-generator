

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface DropdownItem {
  label: string
  onClick: () => void
}

interface QuizDropdownProps {
  trigger: string
  items: DropdownItem[]
  className?: string
}

export function QuizDropdown({ trigger, items, className }: QuizDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={cn("relative", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-sm text-foreground border border-border rounded-lg hover:border-muted-foreground transition-colors"
      >
        {trigger}
        <ChevronDown size={16} className={cn("transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full min-w-[200px] bg-card border border-border rounded-lg shadow-[var(--shadow-e2)] z-50">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.onClick()
                setIsOpen(false)
              }}
              className="w-full px-4 py-3 text-sm text-left text-foreground hover:bg-secondary transition-colors first:rounded-t-lg last:rounded-b-lg"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
