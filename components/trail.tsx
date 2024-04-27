import React, { useState } from 'react';

interface DisplayProps {
  numProcesses: number;
}

const Display: React.FC<DisplayProps> = ({ numProcesses }) => {
  const [processes, setProcesses] = useState<{ arrivalTime: number; burstTime: number }[]>([]);

  const handleInputChange = (index: number, key: string, value: string) => {
    const updatedProcesses = [...processes];
    updatedProcesses[index] = { ...updatedProcesses[index], [key]: parseFloat(value) };
    setProcesses(updatedProcesses);
  };

  const calculationPart = () => {
    if (processes.length === 0) {
      return { AT: 0, BT: 0 };
    }

    let totalArrivalTime = 0;
    let totalBurstTime = 0;

    processes.forEach((process) => {
      totalArrivalTime += process.arrivalTime;
      totalBurstTime += process.burstTime;
    });

    const averageArrivalTime = totalArrivalTime / processes.length;
    const averageBurstTime = totalBurstTime / processes.length;

    return { AT: averageArrivalTime, BT: averageBurstTime };
  };

  

  const renderInputs = () => {
    const inputs: JSX.Element[] = [];
    for (let i = 1; i <= numProcesses; i++) {
      inputs.push(
        <div key={i}>
          <div>Process {i}</div>
          <input
            type="number"
            step={0.1}
            placeholder={`Process ${i} Arrival Time`}
            onChange={(e) => handleInputChange(i - 1, 'arrivalTime', e.target.value)}
          />
          <input
            type="number"
            step={0.1}
            placeholder={`Process ${i} Burst Time`}
            onChange={(e) => handleInputChange(i - 1, 'burstTime', e.target.value)}
          />
        </div>
      );
    }
    return inputs;
  };

  return (
    <div>
      {renderInputs()}
      {processes.length > 0 && (
        <div>
          <h1>Results</h1>
          <h2>Average Arrival Time : {calculationPart().AT.toFixed(2)}</h2>
          <h2>Average Burst Time : {calculationPart().BT.toFixed(2)}</h2>
        </div>
      )}
    </div>
  );
};

export default Display;
