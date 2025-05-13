"use client";
import { useState } from "react";
import { googleGemini } from "@/lib/googleGemini";
import { Patient } from "@/types/appwrite.types";
import MarkdownOutput from "./MarkDownOutput";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { ScrollArea } from "./ui/scroll-area";
import Loader from "./loader/loader";
import Image from "next/image";

export default function GeminiRecommendation({ data }: { data: Patient }) {

  const [recommendation, setRecommendation] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    setOpen(true);
    if(!recommendation){
      const str = JSON.stringify(data);
      console.log(typeof str);
      const result = await googleGemini(str);
      setRecommendation(result || "No recommendation available.");
    }
  };

  return (
    <div className="">
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger onClick={handleSubmit} className='w-[80%]'>
            <Image src="/assets/icons/gemini.png" alt="Gemini Logo" width={32} height={32} />
          </TooltipTrigger>
          <TooltipContent className='bg-dark-200'>
            Get AI Recommendations
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="shad-dialog max-w-4xl w-full h-[600px] border-4 bg-gradient-to-br from-[#19193b] to-[#18315b] text-white shadow-2xl rounded-2xl">
          <DialogHeader className='space-y-4'>
            <DialogTitle className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">AI Recommendations</DialogTitle>
            <DialogDescription className="text-sm text-muted mt-2">
                These recommendations are powered by <span className="font-semibold text-blue-300">Google Gemini</span>.
                They are suggestions, not actual medical treatments.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>

            {recommendation ?
              <ScrollArea className="px-4 h-[460px]">
                <MarkdownOutput content={recommendation} />
              </ScrollArea>
              :
              <Loader />
            }
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}