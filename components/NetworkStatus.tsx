"use client";

import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { WifiOff } from "lucide-react";

const NetworkStatus = () => {
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        const updateStatus = () => setIsOnline(navigator.onLine);

        window.addEventListener("online", updateStatus);
        window.addEventListener("offline", updateStatus);

        // Initial check
        updateStatus();

        return () => {
            window.removeEventListener("online", updateStatus);
            window.removeEventListener("offline", updateStatus);
        };
    }, []);

    if (isOnline) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-sm bg-black/30">
            <div className="w-[90%] max-w-md">
                <Alert variant="destructive" className="px-8 py-10 shadow-xl border-2 bg-dark-400 border-red-500">
                    <div className="flex flex-col items-center gap-2">
                        <WifiOff className="h-24 w-24 text-red-400" />
                        <AlertTitle className="font-semibold text-[30px]">No Internet Connection</AlertTitle>
                    </div>
                    <AlertDescription className="mt-6 mx-10 text-center">
                        You are currently offline. Please check your connection and try again.
                    </AlertDescription>
                </Alert>
            </div>
        </div>
    );
};

export default NetworkStatus;
