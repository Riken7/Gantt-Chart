"use client"
import React , {ReactElement, useState} from 'react';

interface Process{
    processId:number;
    arrivalTime:number;
    burstTime:number;
}

interface DisplayProps{
    numProcesses:number;
}
export default function Display({numProcesses}:DisplayProps){ {
    const [processes ,setProcesses] = useState<Process[]>([]);
    const [calculationResult, setCalculationResult] = useState<JSX.Element | null>(null);
    const handleInputChange = (index:number,key:string,value:string)=>{
        const updatedProcesses = [...processes];
        updatedProcesses[index] = {...updatedProcesses[index],[key]:parseFloat(value),processId:index+1};
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
    const Calculate = (processes: Process[])=>{
        const calArr : Process[] = processes;
        // for(let i=0;i<calArr.length-1;i++){
        //     if(processes[i].arrivalTime>processes[i+1].arrivalTime){
        //         const temp = processes[i];
        //         processes[i] = processes[i+1];
        //         processes[i+1] = temp;
        //     }
        //  =>will not work 
        // }

        calArr.sort((a,b)=>a.arrivalTime-b.arrivalTime);
        let arrivalTime = 0,finishTime = 0;
        let turnAroundTime = 0, waitingTime = 0;
        let avgTurnAroundTime = 0 , avgWaitingTime = 0;
        for(let p of processes){
            if(p.arrivalTime>arrivalTime){
                arrivalTime = p.arrivalTime;
            }
            finishTime = arrivalTime + p.burstTime; 
            turnAroundTime = finishTime - p.arrivalTime; 
            waitingTime = turnAroundTime - p.burstTime;
            avgTurnAroundTime += turnAroundTime; 
            avgWaitingTime += waitingTime; 

            arrivalTime = finishTime;
        }
        avgTurnAroundTime /= processes.length;
        avgWaitingTime /= processes.length;

        console.log(calArr);
        
        return (
            <div>
                <div>Average Turn Around Time : {avgTurnAroundTime}</div>
                <div>Average Waiting Time : {avgWaitingTime}</div>
            </div>
        );
    }
    
    return (
        <div>
            {addProcesses()}
            <button onClick={()=>{
                setCalculationResult(Calculate(processes));
            }}>Calculate</button>
            {calculationResult}
        
        </div>
           
    );
}
}