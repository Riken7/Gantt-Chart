"use client"
import exp from 'constants';
import React, { ReactElement, useState } from 'react';
export interface Process {
    processId: number;
    arrivalTime: number;
    burstTime: number;
    priority?: number;
    Btime?:number;
    Start?:number;
    End?:number;
}
interface DisplayProps {
    numProcesses: number;
    select: string;
    quantum?: number;
    contextSwitch?: number;
}

export default function Display({ numProcesses, select ,quantum , contextSwitch }: DisplayProps) {
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
                        <div >Process {i}</div>
                        <input type="number" className='ml-2' id={`AT-${i}`} step={1} name="arrivalTime" pattern="^[0-9]*$" placeholder={`Process ${i} Arrival Time`} onChange={(e) => {
                            handleInputChange(i - 1, 'arrivalTime', e.target.value);
                        }}></input>
                        <input type="number" className="ml-2"id={`BT-${i}`} step={1} name="burstTime" pattern="^[0-9]*$" placeholder={`Process ${i} Burst Time`} onChange={(e) => {
                            handleInputChange(i - 1, 'burstTime', e.target.value);
                        }}></input>
                        {(select === "PRIORITY") && (
                            <input type="number" className='ml-2'  id={`P-${i}`} step={1} name="priority" pattern="^[0-9]*$" placeholder={`Process ${i} Priority`} onChange={(e) => {
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
                    let Execute = { ...p, Start : arrivalTime, End : arrivalTime + p.burstTime}
                    // console.log(Execute);
                    executedP.push(Execute);
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
                let executedP: Process[] = [];
                let newArr: Process[] = [];
                calArr.sort((a, b) => a.burstTime - b.burstTime); // sort by arrival time, then by burst time
                let time = 0;
                let turnAroundTime = 0, waitingTime = 0;
                let totalTurnAroundTime = 0, totalWaitingTime = 0;
                while (calArr.length > 0) {
                        let current = calArr.shift()!;
                        if (current.arrivalTime > time) {
                            calArr.push(current);
                        }else{
                            let Execute = { ...current, Start : time, End : time + current.burstTime}
                            executedP.push(Execute);
                            waitingTime = time - current.arrivalTime;
                            turnAroundTime = waitingTime + current.burstTime;
                            totalTurnAroundTime += turnAroundTime;
                            totalWaitingTime += waitingTime;
                            time += current.burstTime;
                            calArr.sort((a, b) => a.burstTime - b.burstTime); // sort again after removing a process
                        }
                        }
                setExecutedP(executedP);
                let avgTurnAroundTime = ((totalTurnAroundTime / processes.length).toFixed(2));
                let avgWaitingTime = ((totalWaitingTime / processes.length).toFixed(2));
                let result = { avgTurnAroundTime, avgWaitingTime };
                console.log(executedP);
                return result;
            }
            else if (select === "PRIORITY") {
                console.log("calculating data for Priority");
                let calArr: Process[] = [...processes]; // create a copy of processes
                let executedP: Process[] = [];
                calArr.sort((a, b) => a.arrivalTime - b.arrivalTime || a.priority! - b.priority!); // sort by arrival time, then by priority
                let time = 0;
                let turnAroundTime = 0, waitingTime = 0;
                let totalTurnAroundTime = 0, totalWaitingTime = 0;
                while (calArr.length > 0) {
                        let current = calArr.shift()!;
                        if (current.arrivalTime > time) {
                            calArr.push(current);
                        }else{
                            let Execute = { ...current, Start : time, End : time + current.burstTime}
                            executedP.push(Execute);
                            waitingTime = time - current.arrivalTime;
                            turnAroundTime = waitingTime + current.burstTime;
                            totalTurnAroundTime += turnAroundTime;
                            totalWaitingTime += waitingTime;
                            time += current.burstTime;
                            calArr.sort((a, b) => a.priority! - b.priority!); // sort again after removing a process
                        }
                    }
                setExecutedP(executedP);
                console.log(executedP);
                let avgTurnAroundTime = (totalTurnAroundTime / processes.length).toFixed(2);
                let avgWaitingTime = (totalWaitingTime / processes.length).toFixed(2);
                let result = { avgTurnAroundTime, avgWaitingTime };
                return result;
            }
            else if (select === "Round Robin") {
                console.log("calculating data for Round Robin");
                let calArr: Process[] = processes.map((p)=>({...p, Btime: p.burstTime}));
                let executedP: Process[] = [];
                calArr.sort((a, b) => a.arrivalTime - b.arrivalTime);
                let newArr: Process[] = [];
                let qt:number = quantum!;
                let csgo:number = contextSwitch!;
                let time = 0;
                let turnAroundTime = 0, waitingTime = 0;
                let totalTurnAroundTime = 0, totalWaitingTime = 0;
                while(calArr.length > 0  || newArr.length > 0){
                    // console.log("First loop");
                    while(calArr.length > 0 && calArr[0].arrivalTime <= time){
                        // console.log("Second loop  ")
                        newArr.push(calArr.shift()!);
                    }
                    if(newArr.length > 0){
                        let current = newArr.shift()!;
                        let Execute = { ...current, Start : time, End : time + ((current.burstTime -qt > 0) ? qt : current.burstTime)}
                        executedP.push({...Execute});
                        // console.log(executedP)
                        if(current.burstTime > qt){
                            time+=qt;
                            current.burstTime -= qt;
                            while(calArr.length > 0 && calArr[0].arrivalTime <= time){
                                newArr.push(calArr.shift()!);
                            }
                            newArr.push(current);
                            time += csgo;
                        }else{
                            time += current.burstTime;
                            turnAroundTime = time - current.arrivalTime;
                            waitingTime = turnAroundTime - (current.Btime || 0);
                            totalTurnAroundTime += turnAroundTime;
                            totalWaitingTime += waitingTime;
                            time += csgo;
                        }
                        setExecutedP(executedP);
                        
                }else{
                    time++;
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
                    <button className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 mt-2  dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                     onClick={() => {
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
                    {executedP.length > 0 && numProcesses > 0 && (
                        <div>
                            <h2 className='text-xl m-2'>Gantt Chart : </h2>
                            <div className='w-max mt-4 flex flex-row items-center justify-center'>
                                {select!=="Round Robin" && executedP.map((process, index) => (
                                    <div key={index} className='flex'>
                                        { //gap between processes
                                            index>0 && (process.Start ?? 0) > (executedP[index-1].End ?? 0)  && (
                                            <div key={`p-gap-${index}`}className='text-2xl border-solid border-2 text-center' style={{ width: `${((process.Start ?? 0) - (executedP[index-1].End ?? 0))*20}px` }} ></div>)
                                        }
                                        <div key={`p-child-${index}`} className='text-2xl border-solid border-2 text-center' style={{ width: `${process.burstTime * 20}px` }} >
                                            <div className='p-1 text-lg '>
                                             P{process.processId}
                                            </div>
                                    </div>
                                    {/* <div className='flex justify-between ml-1 mr-1'>
                                        <div>{process.Start}</div>
                                        <div>{process.End}</div>
                                    </div> */}
                                    </div>

                                ))
                                }
                                {select==="Round Robin" && executedP.map((process, index) => (
                                    <div key={`RR-p-${index}`} className='flex'>
                                        { //gap between processes
                                            index>0 && (process.Start??0) > ((executedP[index-1].End ??0) + (contextSwitch??0)) && (
                                            <div className='text-2xl border-solid border-2 text-center  ' style={{ width: `${((process.Start??0) - (executedP[index-1].End??0))*20}px` }} ></div>)
                                        }
                                    <div key={`RR-c1-${index}`} className='flex text-2xl border-solid border-2 text-center justify-center items-center ' style={{ width: `${ (process.burstTime -(quantum??0) > 0) ? (quantum??0)* 20 : (process.burstTime)*20}px` }} >
                                        
                                        <div className='p-1 text-lg'>
                                            P{process.processId}    
                                        </div>
                                    </div>
                                    {index < executedP.length - 1 && (executedP[index+1].Start??0) <= ((process.End??0) + (contextSwitch??0)) && (
                                        <div className='text-2xl border-solid border-2 text-center' style={{ width: `${(contextSwitch??0>0)? (contextSwitch??0)*20 : 0}px` }} ></div>
                                            )}
                                    </div>
                                ))}
                                
                                </div>
                                <div className='w-max flex flex-row justify-center'>
                                {select!=="Round Robin" && executedP.map((process, index) => (
                                    <div key={index} className='flex'>{
                                        index>0 && ((process.Start??0) > (executedP[index-1].End??0)) && (
                                            <div style={{ width: `${((process.Start??0) - (executedP[index-1].End??0))*20}px` }}></div>
                            
                                        )     
                                    }
                                    <div key={`c-${index}`} className='flex justify-between text-base' style={{ width: `${process.burstTime * 20}px` }}>
                                    { index === 0 && (
                                        <div>{process.Start}</div>
                                    )}
                                    { index > 0 && (process.Start !== executedP[index-1].End) && (
                                        <div>{process.Start}</div>
                                    )}
                                    <div></div>
                                    <div>{process.End}</div>
                                    
                                    </div></div>))
                                }    
                                {select==="Round Robin" && executedP.map((process, index) => (
                                        <>{
                                            index >0 && (process.Start??0) > (executedP[index-1].End??0) && (
                                                <div style={{ width: `${((process.Start??0) - (executedP[index-1].End??0))*20}px` }}></div>
                                            )     
                                        }
                                    <div key={`RR-c2-${index}`} className='flex justify-between' style={{ width: `${ (process.burstTime -(quantum??0) > 0) ? (quantum??0)* 20 : (process.burstTime)*20}px` }}>
                                    { index === 0 && (
                                        <div>{process.Start}</div>
                                    )}
                                    { index > 0 && (process.Start !== executedP[index-1].End) && (
                                        <div>{process.Start}</div>
                                    
                                    )}
                                    <div></div>
                                    <div>{process.End}</div>
                                    
                                    </div></>)
                                )}
                                </div></div>
                    )}
                </div>
                    
            </div>
        );
    }
}