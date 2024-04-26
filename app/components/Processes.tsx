"use client"
import React,{ChangeEvent, ReactElement, useState} from "react";
import Display from "./Display";
export default function Processes() {
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
            {<Display numProcesses={numProcesses}/>}
        </div>
    );
    
}