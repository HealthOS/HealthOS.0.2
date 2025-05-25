import { CalendarIcon } from 'lucide-react'
import React from 'react'

const EarningCards = ( {title, amount}: {
    title: string
    amount: number
}) => {
    return (
            <div className="">
                {/* Today's Earnings */}
                <div className="p-6">
                    <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                        <h3 className="text-sm font-medium">{title}</h3>
                    </div>
                    <div className="flex items-baseline">
                        <span className="text-3xl font-bold">₹{amount.toLocaleString()}</span>
                    </div>
                    
                </div>
            </div>
            )
}

            export default EarningCards