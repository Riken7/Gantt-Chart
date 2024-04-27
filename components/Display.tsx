"use client"
import React, { ReactElement, useState } from 'react';
export interface Process {
    processId: number;
    arrivalTime: number;
    burstTime: number;
    priority?: number;
}
interface DisplayProps {
    numProcesses: number;
    select: string;
}

export default function Display({ numProcesses, select }: DisplayProps) {
    {
        const [processes, setProcesses] = useState<Process[]>([]);
        const [calcResult, setCalcResult] = useState<{ avgTurnAroundTime: string, avgWaitingTime: string }>();
        const [executedP, setExecutedP] = useState<Process[]>([]);

        const handleInputChange = (index: number, key: string, value: string): void => {
            const updatedProcesses = [...processes];
            updatedProcesses[index] = { ...updatedProcesses[index], [key]: parseFloat(value), processId: index + 1 };
            setProcesses(updatedProcesses);
        }

        const calcHandle = (processes: Process[], selected: string): void => {
            let result: {
                avgTurnAroundTime: string;
                avgWaitingTime: string;
            } = calc(processes, selected);
            let ans = { avgTurnAroundTime: result.avgTurnAroundTime, avgWaitingTime: result.avgWaitingTime };
            setCalcResult(ans);
        };

        const addProcesses = () => {
            const inputs: ReactElement[] = [];

            for (let i = 1; i <= numProcesses; i++) {
                inputs.push(
                    <div key={i}>
                        <div>Process {i}</div>
                        <input type="number" id={`AT-${i}`} step={0.1} name="arrivalTime" pattern="^[0-9]*$" placeholder={`Process ${i} Arrival Time`} onChange={(e) => {
                            handleInputChange(i - 1, 'arrivalTime', e.target.value);
                        }}></input>
                        <input type="number" id={`BT-${i}`} step={0.1} name="burstTime" pattern="^[0-9]*$" placeholder={`Process ${i} Burst Time`} onChange={(e) => {
                            handleInputChange(i - 1, 'burstTime', e.target.value);
                        }}></input>
                        {(select === "PRIORITY") && (
                            <input type="number" id={`P-${i}`} step={1} name="priority" pattern="^[0-9]*$" placeholder={`Process ${i} Priority`} onChange={(e) => {
                                handleInputChange(i - 1, 'priority', e.target.value);
                            }}></input>

                        )}
                    </div>
                );
            }

            return inputs;
        }

        const calc = (processes: Process[], select: string): {
            avgTurnAroundTime: string;
            avgWaitingTime: string;
        } => {
            console.log(select);
            if (select === "FCFS") {
                console.log("Calculating data for FCFS");
                const calArr: Process[] = processes;
                let executedP: Process[] = [];
                calArr.sort((a, b) => a.arrivalTime - b.arrivalTime);
                let arrivalTime = 0, finishTime = 0;
                let turnAroundTime = 0, waitingTime = 0;
                let totalTurnAroundTime = 0, totalWaitingTime = 0;
                for (let p of processes) {
                    if (p.arrivalTime > arrivalTime) {
                        arrivalTime = p.arrivalTime;
                    }
                    executedP.push(p);
                    finishTime = arrivalTime + p.burstTime;
                    turnAroundTime = finishTime - p.arrivalTime;
                    waitingTime = turnAroundTime - p.burstTime;
                    totalTurnAroundTime += turnAroundTime;
                    totalWaitingTime += waitingTime;
                    arrivalTime = finishTime;
                }
                setExecutedP(executedP);
                let avgTurnAroundTime = (totalTurnAroundTime / calArr.length).toFixed(2);
                let avgWaitingTime = ((totalWaitingTime / calArr.length).toFixed(2));
                let result = { avgTurnAroundTime, avgWaitingTime };
                return result;
            }
            else if (select === "SJF") {
                console.log("calculating data for SJF");
                let calArr: Process[] = [...processes]; // copy of processes
                calArr.sort((a, b) => a.arrivalTime - b.arrivalTime || a.burstTime - b.burstTime); // sort by arrival time, then by burst time
                let time = 0;
                let turnAroundTime = 0, waitingTime = 0;
                let totalTurnAroundTime = 0, totalWaitingTime = 0;
                while (calArr.length > 0) {
                    for (let i = 0; i < calArr.length; i++) {
                        if (calArr[i].arrivalTime > time) {
                            time++;
                            break;
                        }
                        let current = calArr.splice(i, 1)[0];
                        waitingTime = time - current.arrivalTime;
                        turnAroundTime = waitingTime + current.burstTime;
                        totalTurnAroundTime += turnAroundTime;
                        totalWaitingTime += waitingTime;
                        time += current.burstTime;
                        calArr.sort((a, b) => a.arrivalTime - b.arrivalTime || a.burstTime - b.burstTime); // sort again after removing a process
                        break;
                    }
                }
                let avgTurnAroundTime = ((totalTurnAroundTime / processes.length).toFixed(2));
                let avgWaitingTime = ((totalWaitingTime / processes.length).toFixed(2));
                let result = { avgTurnAroundTime, avgWaitingTime };
                return result;
            }
            else if (select === "PRIORITY") {
                console.log("calculating data for Priority");
                let calArr: Process[] = [...processes]; // create a copy of processes
                calArr.sort((a, b) => a.arrivalTime - b.arrivalTime || a.priority! - b.priority!); // sort by arrival time, then by priority
                let time = 0;
                let turnAroundTime = 0, waitingTime = 0;
                let totalTurnAroundTime = 0, totalWaitingTime = 0;
                while (calArr.length > 0) {
                    for (let i = 0; i < calArr.length; i++) {
                        if (calArr[i].arrivalTime > time) {
                            time++;
                            break;
                        }
                        let current = calArr.splice(i, 1)[0]; // remove the current process from calArr
                        waitingTime = time - current.arrivalTime;
                        turnAroundTime = waitingTime + current.burstTime;
                        totalTurnAroundTime += turnAroundTime;
                        totalWaitingTime += waitingTime;
                        time += current.burstTime;
                        calArr.sort((a, b) => a.priority! - b.priority!); // sort again after removing a process
                        break;
                    }
                }
                let avgTurnAroundTime = (totalTurnAroundTime / processes.length).toFixed(2);
                let avgWaitingTime = (totalWaitingTime / processes.length).toFixed(2);
                let result = { avgTurnAroundTime, avgWaitingTime };
                return result;
            }
            else {
                return { avgTurnAroundTime: "NaN", avgWaitingTime: "NaN" };
            }
        }


        return (
            <div>
                {addProcesses()}
                {numProcesses > 0 && (
                    <button onClick={() => {
                        calcHandle(processes, select);
                    }}>Calculate</button>
                )}
                <div>
                    {calcResult && (
                        <div>
                            <div>Average Turn Around Time : {calcResult.avgTurnAroundTime}</div>
                            <div>Average Waiting Time : {calcResult.avgWaitingTime}</div>
                        </div>)}
                </div>
                <div>
                    {executedP.length > 0 && (
                        <div>
                            <h2>Gantt Chart : </h2>
                            <div className='flex flex-row '>
                                {executedP.map((process, index) => (
                                    <div key={index} className='text-2xl border-solid border-2 text-center  ' style={{ width: `${process.burstTime * 20}px` }} >
                                        <div className='p-1'>
                                            P{process.processId} </div>
                                    </div>
                                ))}</div></div>
                    )}
                </div>

            </div>
        );
    }
}