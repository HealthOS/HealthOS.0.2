import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"



const RoundedContainers = ({ value, field }: {
    value: string
    field: string
}) => {

    let name, unit, symbol;

    switch (field) {
        case "temperature":
            symbol = "T";
            name = "Temperature";
            unit = "°F";
            break;
        case "bloodPressure":
            symbol = "BP";
            name = "Hypertension";
            unit = "mmHg";
            break;
        case "diabetes":
            symbol = "Sg";
            name = "Diabetes Mellitus";
            unit = "mg/dL";
            break;
        case "tachycardia":
            symbol = "HR";
            name = "Tachycardia";
            unit = "bpm";
            break;
        case "hypoxia":
            symbol = "SpO2";
            name = "Hypoxia";
            unit = "%";
            break;
        case "respiratoryDistress":
            symbol = "RR";
            name = "Respiratory Distress";
            unit = "breaths/min";
            break;
        case "hypercholesterolemia":
            symbol = "Ch";
            name = "Hypercholesterolemia";
            unit = "mg/dL";
            break;
        case "anemia":
            symbol = "Hb";
            name = "Anemia";
            unit = "g/dL";
            break;
        case "chronicKidneyDisease":
            symbol = "eGFR";
            name = "Chronic Kidney Disease";
            unit = "mL/min/1.73m²";
            break;
        case "hypothyroidism":
            symbol = "TSH";
            name = "Hypothyroidism";
            unit = "µIU/mL";
            break;
        case "hyperthyroidism":
            symbol = "TSH";
            name = "Hyperthyroidism";
            unit = "µIU/mL";
            break;
        case "obesity":
            symbol = "BMI";
            name = "Obesity";
            unit = "kg/m²";
            break;
        case "gout":
            symbol = "UA";
            name = "Gout";
            unit = "mg/dL";
            break;
        case "coagulationDisorder":
            symbol = "INR";
            name = "Coagulation Disorder";
            unit = "Ratio";
            break;
        case "osteoporosis":
            symbol = "BDM";
            name = "Osteoporosis";
            unit = "T-Score";
            break;
        default:
            symbol = "";
            name = "Unknown Disease";
            unit = "";
    }

    return (
        <div className='h-16 w-16 min-w-16 bg-white flex flex-col space-y-1 rounded-xl items-center justify-center shadow-inner shadow-dark-300'>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger className='w-[80%]'>
                        <p className='text-10-regular  text-dark-300'>{symbol}</p>
                        <p className='text-14-regular text-dark-300'>{value} </p>
                        <p className='text-10-regular  text-dark-300 truncate'>{unit}</p>
                    </TooltipTrigger>
                    <TooltipContent className='bg-dark-200'>
                        <p>{name}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    )
}

export default RoundedContainers
