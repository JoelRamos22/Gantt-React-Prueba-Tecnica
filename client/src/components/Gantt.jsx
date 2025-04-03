import { useEffect, useRef } from "react";
import { Gantt } from "@dhx/trial-gantt";
import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";

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

export default function GanttView({ task }) {
  const container = useRef();
  const ganttInstance = useRef(null);

  async function fetchUpdatedData() {
    try {
      const res = await fetch("http://localhost:3000/tasks/");
      const data = await res.json();

      const updatedData = {
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

      ganttInstance.current.clearAll(); 
      ganttInstance.current.parse(updatedData);
    } catch (error) {
      console.error("Error al obtener datos del Gantt:", error);
    }
  }

  useEffect(() => {
    if (!ganttInstance.current) {
      ganttInstance.current = Gantt.getGanttInstance();
      ganttInstance.current.init(container.current);

      ganttInstance.current.config.start_date = new Date(2010, 0, 1);
      ganttInstance.current.config.end_date = new Date(2027, 11, 31);

      ganttInstance.current.attachEvent("onAfterTaskAdd", async (id, task) => {
        try {
          const res = await fetch("http://localhost:3000/tasks/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: task.text,
              startDate: formatDateForGantt(task.start_date),
              duration: task.duration,
              endDate: formatDateForGantt(
                new Date(task.end_date).setDate(new Date(task.start_date).getDate() + task.duration)
              ),
              parentId: task.parent !== "0" ? task.parent : null,
            }),
          });

          const data = await res.json();
          ganttInstance.current.changeTaskId(id, data.id);
          console.log("Tarea creada con ID real:", data.id);

          await fetchUpdatedData();
          ganttInstance.current.render();
        } catch (error) {
          console.error("Error al crear la tarea:", error);
        }
      });

      ganttInstance.current.attachEvent("onAfterTaskUpdate", async (id, task) => {
        try {
          await fetch(`http://localhost:3000/tasks/update/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: task.text,
              startDate: task.start_date,
              duration: task.duration,
              endDate: task.end_date,
              parentId: task.parent !== 0 ? task.parent : null,
            }),
          });

          console.log("Tarea actualizada.");
          fetchUpdatedData();
        } catch (error) {
          console.error("Error al actualizar la tarea:", error);
        }
      });

      ganttInstance.current.attachEvent("onAfterTaskDelete", async (id) => {
        try {
          await fetch(`http://localhost:3000/tasks/delete/${id}`, { method: "DELETE" });
          console.log("Tarea eliminada.");
          fetchUpdatedData();
        } catch (error) {
          console.error("Error al eliminar la tarea:", error);
        }
      });

      fetchUpdatedData();
    }
  }, []);

  useEffect(() => {
    if (ganttInstance.current) {
      ganttInstance.current.clearAll();
      ganttInstance.current.parse(task);
    }
  }, [task]);

  return <div ref={container} style={{ width: "100%", height: "100%" }}></div>;
}
