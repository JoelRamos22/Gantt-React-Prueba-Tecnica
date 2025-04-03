import { useEffect, useRef } from "react";
import { Gantt } from "@dhx/trial-gantt";
import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";

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


export default function GanttView({ task, triggerRefresh }) {
  const container = useRef();
  const ganttInstance = useRef(null);

  useEffect(() => {
    if (!ganttInstance.current) {
      ganttInstance.current = Gantt.getGanttInstance();
      ganttInstance.current.init(container.current);

      ganttInstance.current.config.duration_step = 2;
      ganttInstance.current.config.start_date = new Date(2010, 0, 1);
      ganttInstance.current.config.end_date = new Date(2027, 11, 31);

      /**
       * @description Evento que se ejecuta después de agregar una tarea
       * @param {number} id - ID temporal de la tarea en el frontend
       * @param {object} task - Datos de la tarea creada
       */
      ganttInstance.current.attachEvent("onAfterTaskAdd", async (id, task) => {
        try {
          const parentId = task.parent && task.parent !== "0" ? Number(task.parent) : null;
          
          const res = await fetch("gantt-react-prueba-tecnica-production.up.railway.app/tasks/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: task.text,
              startDate: formatDateForGantt(task.start_date),
              duration: task.duration,
              endDate: formatDateForGantt(
                new Date(task.start_date).setDate(new Date(task.start_date).getDate() + task.duration)
              ),
              parentId: parentId, 
            }),
          });

          const data = await res.json();
          ganttInstance.current.changeTaskId(id, data.id);
          console.log("Tarea creada con ID real:", data.id);

          triggerRefresh(); // 🔹 Recarga App después de agregar una tarea
        } catch (error) {
          console.error("Error al crear la tarea:", error);
        }
      });

      /**
       * @description Evento que se ejecuta después de actualizar una tarea
       * @param {number} id - ID de la tarea
       * @param {object} task - Datos de la tarea actualizada
       */
      ganttInstance.current.attachEvent("onAfterTaskUpdate", async (id, task) => {
        try {
          await fetch(`gantt-react-prueba-tecnica-production.up.railway.app/tasks/update/${id}`, {
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
          triggerRefresh(); // 🔹 Recarga App después de actualizar una tarea
        } catch (error) {
          console.error("Error al actualizar la tarea:", error);
        }
      });

      /**
       * @description Evento que se ejecuta después de eliminar una tarea
       * @param {number} id - ID de la tarea eliminada
       */
      ganttInstance.current.attachEvent("onAfterTaskDelete", async (id) => {
        try {
          await fetch(`gantt-react-prueba-tecnica-production.up.railway.app/tasks/delete/${id}`, { method: "DELETE" });
          console.log("Tarea eliminada.");
          triggerRefresh(); // 🔹 Recarga App después de eliminar una tarea
        } catch (error) {
          console.error("Error al eliminar la tarea:", error);
        }
      });
    }
  }, []);

  /**
   * @description Efecto que actualiza el Gantt cuando cambian las tareas
   */
  useEffect(() => {
    if (ganttInstance.current) {
      ganttInstance.current.clearAll();
      ganttInstance.current.parse(task);
    }
  }, [task]);

  return <div ref={container} style={{ width: "100%", height: "100%" }}></div>;
}
