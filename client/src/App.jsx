import { useState, useEffect } from "react";
import GanttView from "./components/Gantt";

// 🔹 Función para formatear fechas en el formato correcto para Gantt
const formatDateForGantt = (date) => {
  if (!date) return "";

  // 🔹 Convertir a string si es un objeto Date
  if (date instanceof Date) {
    date = date.toISOString().slice(0, 16).replace("T", " ");
  }

  if (typeof date !== "string") return ""; // Si no es string, retorna vacío

  let d;
  if (date.includes("-")) {
    const parts = date.split(" ");
    const dateParts = parts[0].split("-");

    // Si el formato es "YYYY-MM-DD"
    if (dateParts[0].length === 4) {
      d = new Date(`${dateParts[0]}-${dateParts[1]}-${dateParts[2]}T${parts[1] || "00:00"}`);
    } 
    // Si el formato es "DD-MM-YYYY"
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

  async function fetchData() {
    try {
      const res = await fetch("http://localhost:3000/tasks");
      const data = await res.json();
      console.log("Datos recibidos:", data);

      // 🔥 Convertir tareas y sus subtareas en formato válido para Gantt
      const processedTasks = [];

      data.forEach((t) => {
        // Agregar la tarea principal
        processedTasks.push({
          id: t.id,
          text: t.name,
          start_date: formatDateForGantt(t.startDate),
          duration: t.duration,
          end_date: formatDateForGantt(
            new Date(t.startDate).setDate(new Date(t.startDate).getDate() + t.duration)
          ),
          parent: t.parentId || 0,
        });

        // Si la tarea tiene subtareas, agregarlas con su parent asignado
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
              parent: t.id, // 📌 La subtarea tiene como parent el ID de la tarea principal
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
  }, []);

  return <GanttView task={tasks} />;
}

export default App;
