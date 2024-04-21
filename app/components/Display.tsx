"use client"
import React , {ReactElement, useState} from 'react';
import number from './Processes';
interface Process{
    id:number;
    arrivalTime:number;
    burstTime:number;
}

interface DisplayProps{
    numProcesses:number;
}
export default function Display({numProcesses}:DisplayProps){ {
    const [processes ,setProcesses] = useState<Process[]>([]);
    const handleInputChange = (index:number,key:string,value:string)=>{
        const updatedProcesses = [...processes];
        updatedProcesses[index] = {...updatedProcesses[index],[key]:parseFloat(value)};
        setProcesses(updatedProcesses);
    }
    const addProcesses = ()=>{
        const inputs : ReactElement[] = [];
        for(let i=1; i<=numProcesses; i++){
            inputs.push(
                <div key={i}>
                    <div>Process {i}</div>
                    <input type="number" id={`AT-${i}`} step={0.1} name="arrivalTime" placeholder={`Process ${i} Arrival Time`} onChange={(e)=>{
                        handleInputChange(i-1,'arrivalTime',e.target.value);
                    }}></input>
                    <input type="number" id={`BT-${i}`} step={0.1} name="burstTime" placeholder={`Process ${i} Burst Time`} onChange={(e)=>{
                        handleInputChange(i-1,'burstTime',e.target.value);
                    }}></input>
                </div>
            );
        }
        return inputs;
    }
    
    const calculationPart = ()=>{
        let AT = 0;
        let BT = 0;
        if(processes.length===0){
            return{
                AT:0,
                BT:0
            };
        }
        processes.forEach((process)=>{
                AT += process.arrivalTime;
                BT += process.burstTime;
        });
        console.log(AT,BT);
        return {
            AT:AT/processes.length,
            BT:BT/processes.length,
        }
        
}

    return (
        <div>
            {addProcesses()}
            {
            processes.length>0 && (
                <div>
                        <div>Average Arrival Time: {calculationPart().AT}</div>
                        <div>Average Burst Time: {calculationPart().BT}</div>
                    </div>
            )
        }
        
        </div>
           
    );
}
}