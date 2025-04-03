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


  async function fetchData() {
    try {
        // 1️⃣ Hacer las dos peticiones en paralelo
        const [tasksRes, projectsRes] = await Promise.all([
            fetch("https://gantt-react-prueba-tecnica-production.up.railway.app/tasks"),
            fetch("https://gantt-react-prueba-tecnica-production.up.railway.app/projects")
        ]);

        const [tasksData, projectsData] = await Promise.all([
            tasksRes.json(),
            projectsRes.json()
        ]);

        console.log("Datos de tareas:", tasksData);
        console.log("Datos de proyectos:", projectsData);

        const processedTasks = [];

        // 2️⃣ Procesar PROYECTOS como tareas raíz
        projectsData.forEach((p) => {
            processedTasks.push({
                id: `project-${p.id}`, // Prefijo para evitar colisión con tareas
                text: p.name, 
                start_date: formatDateForGantt(p.startDate),
                duration: p.duration,
                end_date: formatDateForGantt(new Date(p.startDate).setDate(new Date(p.startDate).getDate() + p.duration)),
                type: "project",
                parent: 0
            });
        });

        tasksData.forEach((t) => {
            processedTasks.push({
                id: t.id,
                text: t.name,
                start_date: formatDateForGantt(t.startDate),
                duration: t.duration,
                end_date: formatDateForGantt(new Date(t.startDate).setDate(new Date(t.startDate).getDate() + t.duration)),
                parent: t.parentId || `project-${t.projectId}`, // Asociar tareas a proyectos
            });

            if (Array.isArray(t.subtasks) && t.subtasks.length > 0) {
                t.subtasks.forEach((sub) => {
                    processedTasks.push({
                        id: sub.id,
                        text: sub.name,
                        start_date: formatDateForGantt(sub.startDate),
                        duration: sub.duration,
                        end_date: formatDateForGantt(new Date(sub.startDate).setDate(new Date(sub.startDate).getDate() + sub.duration)),
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
  