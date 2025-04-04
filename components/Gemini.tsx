"use client";
import { useState } from "react";
import { googleGemini } from "@/lib/googleGemini";
import { Patient } from "@/types/appwrite.types";
import { useLoader } from "@/app/context/LoaderContext";

export default function GeminiRecommendation({data}: {data: Patient}) {

  const [recommendation, setRecommendation] = useState("");
  const {showLoader, hideLoader} = useLoader();
  
  const handleSubmit = async () => {
    showLoader();
    const str = JSON.stringify(data);
    console.log(typeof str);
    const result = await googleGemini(str);
    setRecommendation(result);
    hideLoader();
  };

  return (
    <div className="fixed inset-0 z-[50] p-4">
      <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 mt-2 rounded">
        Get Recommendation
      </button>
      {recommendation && <p className="mt-4">{recommendation}</p>}
    </div>
  );
}
