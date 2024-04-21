"use client"
import React,{ChangeEvent, ReactElement, useState} from "react";
import Display from "./Display";
export default function Processes() {
    const [numProcesses, setNumProcesses] = useState<number>(0);
    const inputChange = (e : ChangeEvent<HTMLInputElement>)=>{
        const value = parseInt(e.target.value);
        setNumProcesses(value);
        console.log(value);
    }
    const number = numProcesses;
    return (
        <div>
            Enter the number of processes you want to simulate :
            <input type="number" id="processes" name="processes" value={numProcesses} min={0} max={10} onChange={inputChange}></input>
            {numProcesses>0 && (
                <Display numProcesses={numProcesses}/>
            )}
        </div>
    );
    
}