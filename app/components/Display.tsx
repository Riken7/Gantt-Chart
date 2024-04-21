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
    let render = numProcesses;
    console.log(render);
    const addProcesses = ()=>{
        const inputs : ReactElement[] = [];
        for(let i=1; i<=render; i++){
            inputs.push(
                <div key={i}>
                    <div>Process {i}</div>
                    <input type="number" id={`AT-${i}`} step={0.1} name="arrivalTime" placeholder={`Process ${i} Arrival Time`}></input>
                    <input type="number" id={`BT-${i}`} step={0.1} name="burstTime" placeholder={`Process ${i} Burst Time`}></input>
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
const [calc , setcalc] = useState<{ AT: number; BT: number; }>({ AT: 0, BT: 0 });
const updatecalc = () => {
    const resp = calculationPart();
    setcalc(resp);
}
    return (
        <div>
            {addProcesses()}
            {
            addProcesses().length>0 && (
                <div>
                        <div>Average Arrival Time: {calc.AT}</div>
                        <div>Average Burst Time: {calc.BT}</div>
                    </div>
            )
        }
        
        </div>
           
    );
}
}