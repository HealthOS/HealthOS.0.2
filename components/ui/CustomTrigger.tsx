'use client'

import { useSidebar } from "@/components/ui/sidebar"
import { PanelLeft } from "lucide-react"

export function CustomTrigger() {
  const { toggleSidebar } = useSidebar()

  return <button 
  className="sticky h-10 w-10 top-6 flex items-center justify-center z-50 bg-dark-300 text-white p-2 rounded-full shadow-md hover:bg-dark-500 transition duration-500"
    onClick={toggleSidebar}>
        <PanelLeft className="h-6 w-6 font-light text-white" />
    </button>
}
