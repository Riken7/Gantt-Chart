"use client"
import React , { useState } from 'react';
import Processes from './Processes';
export interface select{
    selected:string;
}
export default function Dropdown() {
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
        case "Round Robin":
            present = (
                <div>
                    <h1>Round Robin</h1>
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
                <option value="Round Robin" onClick={()=>{console.log("Round Robin selected")}}>Round Robin</option>
            </select>
            {present}
            {
                selected && (
                    <Processes select={selected} />
                )
            }


        </div>

        
        
    );
}