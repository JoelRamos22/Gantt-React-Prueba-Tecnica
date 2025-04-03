  import { useState, useEffect } from "react";
  import GanttView from "./components/Gantt";

  const formatDateForGantt = (date) => {
    if (!date) return "";


    if (date instanceof Date) {
      date = date.toISOString().slice(0, 16).replace("T", " ");
    }

    if (typeof date !== "string") return ""; 

    let d;
    if (date.includes("-")) {
      const parts = date.split(" ");
      const dateParts = parts[0].split("-");

      
      if (dateParts[0].length === 4) {
        d = new Date(`${dateParts[0]}-${dateParts[1]}-${dateParts[2]}T${parts[1] || "00:00"}`);
      } 
      
      else {
        d = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}T${parts[1] || "00:00"}`);
      }
    } else {
      d = new Date(date);
    }

    if (isNaN(d)) return "";

    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");

    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };



  function App() {
    const [tasks, setTasks] = useState({ data: [] });
    const [refreshTrigger, setRefreshTrigger] = useState(false);
  
    async function fetchData() {
      try {
        const tasksRes = await fetch("https://gantt-react-prueba-tecnica-production.up.railway.app/tasks");
        const tasksData = await tasksRes.json();
  
        const projectsRes = await fetch("https://gantt-react-prueba-tecnica-production.up.railway.app/projects");
        const projectsData = await projectsRes.json();
  
        console.log("Datos de tareas:", tasksData);
        console.log("Datos de proyectos:", projectsData);
  
        const processedTasks = [];
  
        projectsData.forEach((p) => {
          processedTasks.push({
            id: p.id,
            text: p.name,
            start_date: formatDateForGantt(p.startDate),
            duration: p.duration,
            end_date: formatDateForGantt(
              new Date(p.startDate).setDate(new Date(p.startDate).getDate() + p.duration)
            ),
            type: "project", 
            parent: 0,
          });
          projectMap[p.id] = p.id;
        });
  
        // Procesar tareas
        tasksData.forEach((t) => {
          const parentId = t.parentId ? t.parentId : (projectMap[t.projectId] || 0)
          processedTasks.push({
            id: t.id,
            text: t.name,
            start_date: formatDateForGantt(t.startDate),
            duration: t.duration,
            end_date: formatDateForGantt(
              new Date(t.startDate).setDate(new Date(t.startDate).getDate() + t.duration)
            ),
            parent: parentId 
          });
  
          if (Array.isArray(t.subtasks) && t.subtasks.length > 0) {
            t.subtasks.forEach((sub) => {
              processedTasks.push({
                id: sub.id,
                text: sub.name,
                start_date: formatDateForGantt(sub.startDate),
                duration: sub.duration,
                end_date: formatDateForGantt(
                  new Date(sub.startDate).setDate(new Date(sub.startDate).getDate() + sub.duration)
                ),
                parent: t.id,
              });
            });
          }
        });
  
  
        setTasks({ data: processedTasks });
      } catch (error) {
        console.error("Error al obtener datos del Gantt:", error);
      }
    }
  
    useEffect(() => {
      fetchData();
    }, [refreshTrigger]); 
  
    return <GanttView task={tasks} triggerRefresh={() => setRefreshTrigger(prev => !prev)} />;
  }
  
  export default App;
  