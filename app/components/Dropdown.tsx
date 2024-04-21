"use client"
import { useRouter } from 'next/router';
import React , { useState } from 'react';
import Processes from './Processes';

export default function Dropdown() {
    // const Router = useRouter();
    const [selected, setSelected] = useState("");
    const selectHandler = (e : any) => {
        setSelected(e.target.value);
    }
    let present : JSX.Element | null  = null;
    switch(selected){
        case "FCFS" :
            present = (
                <div>
                    <h1>FCFS</h1>
                </div>
            );
            break;
        case "SJF" :
            present = (
                <div>
                    <h1>SJF</h1>
                </div>
            );
            break;
        case "PRIORITY" :
            present = (
                <div>
                    <h1>PRIORITY</h1>
                </div>
            );
            break;
        default:
            present = (
                present = (
                    <div>
                        <h1>Select one algo to generate gantt chart</h1>
                    </div>
                )
            )
    }    
    return (
        <div>
            <select onChange={selectHandler} value={selected}>
                <option value="">Select Algorithm</option>
                <option value="FCFS" onClick={()=>{console.log("FCFS selected")
                }}>FCFS (First Come First Server)</option>
                <option value="SJF" onClick={()=>{console.log("SJF selected")}}>SJF (Shortest Job First)</option>
                <option value="PRIORITY" onClick={()=> {console.log("Priority selected")}}>Priority Non-preemptive</option>
            </select>
            {present}
            {
                selected && (
                    <Processes />
                )
            }

        </div>

        
        
    );
}