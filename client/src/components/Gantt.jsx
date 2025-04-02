import { useEffect, useRef } from "react";
import { Gantt } from "@dhx/trial-gantt";
import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";

export default function GanttView() { 
  let container = useRef(); 
 
  useEffect(() => { 
    let gantt = Gantt.getGanttInstance(); 
    gantt.init(container.current); 
 
    return () => { 
      gantt.clearAll();
      gantt.destructor(); 
    }; 
  }, []); 
 
  return <div ref={container} style={ {width: "100%", height: "100%"} }></div>; 
}