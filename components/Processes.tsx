"use client"
import React,{ChangeEvent, ReactElement, useState} from "react";
import Display from "./Display";
interface select{
    select : String;
}
export default function Processes({select}: select) {
    const [numProcesses, setNumProcesses] = useState<number>(0);
    const inputChange = (e : ChangeEvent<HTMLInputElement>)=>{
        const value = parseInt(e.target.value);
        if(isNaN(value)){
            setNumProcesses(0);
        }else{ 
            setNumProcesses(value);
        }
    }
    return (
        <div>
            Enter the number of processes you want to simulate :
            <input type="number" id="processes" name="processes" value={numProcesses} min={0} max={10} onChange={inputChange}></input>
            <Display numProcesses={numProcesses} select={select} />
            {(select === "Round Robin") && (
                    <div>
                        <input type="number" id="quantum" name="quantum" placeholder="Enter Quantum"></input>
                        <input type="number" id="contextSwitch" name="contextSwitch" placeholder="Enter Context Switch"></input>
                    </div>
                    )}
        </div>
    );
    
}