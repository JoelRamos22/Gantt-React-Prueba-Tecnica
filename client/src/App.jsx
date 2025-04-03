  import { useState, useEffect } from "react";
  import GanttView from "./components/Gantt";


  /**
   * @description Formatea la fecha para ser utilizada en el Gantt
   * @param {Date | string} date - Fecha en formato Date o string
   * @returns {string} Fecha formateada como "DD-MM-YYYY HH:mm"
   */
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
    
      /**
       * @description Función que se ejecuta cuando se carga la página
       */ 
      async function fetchData() {
        try {
          const res = await fetch("https://gantt-react-prueba-tecnica-production.up.railway.app/tasks");
          const data = await res.json();
          console.log("Datos recibidos:", data);
    
          const processedTasks = [];
    
          /** @description Iterar sobre cada tarea y sus subtareas para crear el formato esperado por el Gantt */
          data.forEach((t) => {
            const startDate = new Date(t.startDate);
            const endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + t.duration);
        
            processedTasks.push({
                id: t.id,
                text: t.name,
                start_date: formatDateForGantt(startDate),
                duration: t.duration,
                end_date: formatDateForGantt(endDate),
                parent: t.parentId || 0, 
            });
        
            if (t.subtasks && Array.isArray(t.subtasks) && t.subtasks.length > 0) {
                t.subtasks.forEach((sub) => {
                    const subStartDate = new Date(sub.startDate);
                    const subEndDate = new Date(subStartDate);
                    subEndDate.setDate(subStartDate.getDate() + sub.duration);
        
                    processedTasks.push({
                        id: sub.id,
                        text: sub.name,
                        start_date: formatDateForGantt(subStartDate),
                        duration: sub.duration,
                        end_date: formatDateForGantt(subEndDate),
                        parent: sub.parentId || t.id, 
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
  