import { useState, useEffect } from "react";
import GanttView from "./components/Gantt";

const formatDateForGantt = (date) => {
  if (!date) return "";
  const d = new Date(date);
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

      const ganttData = {
        data: data.map((t) => ({
          id: t.id,
          text: t.name,
          start_date: formatDateForGantt(t.startDate), // 🔹 Formatear fecha
          duration: t.duration,
          end_date: formatDateForGantt(
            new Date(t.startDate).setDate(new Date(t.startDate).getDate() + t.duration)
          ),
          parent: t.parentId || 0,
        })),
      };

      setTasks(ganttData);
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
