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

    return (
        <div>
            Enter the number of processes you want to simulate :
            <input type="number" id="processes" name="processes" value={numProcesses} max={10} onChange={inputChange}></input>
            {(select === "Round Robin") && (
                <div>
                    Enter Quantum Time and Context Switch Time :
                    <input className="m-2" type="number" id="quantum" name="quantum" placeholder="Enter Quantum"></input>
                    <input className="m-2" type="number" id="contextSwitch" name="contextSwitch" placeholder="Enter Context Switch"></input>
                </div>
            )}
            <Display numProcesses={numProcesses} select={select} />

        </div>
    );

}