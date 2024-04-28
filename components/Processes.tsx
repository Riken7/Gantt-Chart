"use client"
import React, { ChangeEvent, ReactElement, useState } from "react";
import Display from "./Display";
interface select {
    select: string;
}
export default function Processes({ select }: select) {
    const [numProcesses, setNumProcesses] = useState<number>(0);
    const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (isNaN(value)) {
            setNumProcesses(0);
        } else {
            setNumProcesses(value);
        }
    }
    const [quantum, setQuantum] = useState<number>(0);
    const [contextSwitch, setContextSwitch] = useState<number>(0);
    const handleInputChange = (name: string, value: number) => {
        switch (name) {
            case 'quantum':
                if (value < 0) {
                    alert("Quantum Time cannot be negative");
                    return;
                }
                setQuantum(value);
                break;
            case 'contextSwitch':
                if (value < 0) {
                    alert("Context Switch Time cannot be negative");
                    return;
                }
                setContextSwitch(value);
                break;
        }
    }

    return (
        <div className="text-base">
            Enter the number of processes:
            <input type="number" id="processes" name="processes" value={numProcesses} max={10} onChange={inputChange}></input>
            {(select === "Round Robin") && (
                <div >
                    Enter Quantum Time and Context Switch Time :
                    <input className="m-2" type="number" id="quantum" name="quantum" placeholder="Enter Quantum Time" onChange={(e)=>{
                        handleInputChange('quantum', parseInt(e.target.value));
                        console.log(e.target.value);
                    }}></input>
                    <input className="m-2" type="number" id="contextSwitch" name="contextSwitch" placeholder="Enter Context Switch" onChange={(e)=>{
                        handleInputChange('contextSwitch', parseInt(e.target.value));
                        console.log(e.target.value);
                    }}></input>
                </div>
            )}
            <Display numProcesses={numProcesses} select={select} quantum={quantum} contextSwitch={contextSwitch} />

        </div>
    );

}