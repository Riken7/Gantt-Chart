import { Process } from "./Process";
import data from "@/global/data.json";

export function Gantt() {
  let i: number = 0;

  let totaltime: number = parseInt(data.TotalTime);

  return (<div className="flex-row inline-flex min-w-full">
    {data.Processes.map((d, i) => {
      i++;

      // let n = (parseInt(d.CT) - parseInt(d.AT))*100;

      let n = parseInt(d.BT)*100;
      
      let val = n/totaltime; 

      return(<div key={i} className={"basis-[" + val + "%]"}><div className="m-0 py-2 border-solid border-y border-r border-black"><Process id={d.pid} AT={d.AT} BT={d.BT} CT={d.CT} ST={"0"}></Process></div></div>)
  })}
  </div>)
}