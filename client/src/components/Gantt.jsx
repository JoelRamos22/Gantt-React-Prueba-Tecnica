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


      ganttInstance.current.config.duration_step = 1;
      ganttInstance.current.config.start_date = new Date(2024, 0, 1);
      ganttInstance.current.config.end_date = new Date(2025, 11, 31);

      /**
       * @description Evento que se ejecuta después de agregar una tarea
       * @param {number} id - ID temporal de la tarea en el frontend
       * @param {object} task - Datos de la tarea creada
       */

      ganttInstance.current.attachEvent("onAfterTaskAdd", async (id, task) => {
        try {
          const parentId = task.parent && task.parent !== "0" ? Number(task.parent) : null;

          const startDate = new Date(task.start_date);
          const endDate = new Date(startDate);
          endDate.setDate(startDate.getDate() + task.duration);

          const res = await fetch("https://gantt-react-prueba-tecnica-production.up.railway.app/tasks/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: task.text,
              startDate: formatDateForGantt(startDate),
              duration: task.duration,
              endDate: formatDateForGantt(endDate),
              parentId: parentId,
            }),
          });

          const data = await res.json();

          if (!data.id) {
            throw new Error("No se recibió un ID válido desde la API.");
          }

          ganttInstance.current.changeTaskId(id, data.id);
          console.log("Tarea creada con ID real:", data.id);

          triggerRefresh();
        } catch (error) {
          console.error("Error al crear la tarea:", error);
        }
      });

      const minDate = new Date(2023, 0, 1);
      ganttInstance.current.attachEvent("onBeforeTaskAdd", function (id, task) {
          const startDate = new Date(task.start_date);
      
          if (startDate < minDate) {
              alert("No puedes crear tareas antes del 01-01-2023.");
              return false; // Bloquea la tarea
          }
      
          return true; // Permite la creación
      });

      /**
       * @description Evento que se ejecuta después de actualizar una tarea
       * @param {number} id - ID de la tarea
       * @param {object} task - Datos de la tarea actualizada
       */
      ganttInstance.current.attachEvent("onAfterTaskUpdate", async (id, task) => {
        try {
          const startDate = new Date(task.start_date);
          const endDate = new Date(startDate);
          endDate.setDate(startDate.getDate() + task.duration);

          await fetch(`https://gantt-react-prueba-tecnica-production.up.railway.app/tasks/update/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: task.text,
              startDate: formatDateForGantt(startDate),
              duration: task.duration,
              endDate: formatDateForGantt(endDate),
              parentId: task.parent !== 0 ? task.parent : null,
            }),
          });

          console.log("Tarea actualizada.");
          triggerRefresh();
        } catch (error) {
          console.error("Error al actualizar la tarea:", error);
        }
      });

      /** 
       * @description Evita que la vista del Gantt se mueva fuera del rango de fechas permitidas 
       */
      ganttInstance.current.attachEvent("onBeforeGanttRender", function () {
        const minDate = new Date(2024, 0, 1);
        const maxDate = new Date(2025, 11, 31);
        const state = ganttInstance.current.getState();

        // Si la vista está fuera de los límites, la ajustamos
        if (state.min_date < minDate) {
          ganttInstance.current.setScrollPosition(ganttInstance.current.dateToPos(minDate), null);
        }
        if (state.max_date > maxDate) {
          ganttInstance.current.setScrollPosition(ganttInstance.current.dateToPos(maxDate), null);
        }
      });

      /**
      * @description Evita que las tareas que están fuera del rango de fechas sean visibles
      * @param {number} id - ID de la tarea
      * @param {object} task - Datos de la tarea
      */
      ganttInstance.current.attachEvent("onBeforeTaskDisplay", function (id, task) {
        const minDate = new Date(2024, 0, 1);
        const maxDate = new Date(2025, 11, 31);

        // Convertimos las fechas de la tarea en objetos Date válidos
        const startDate = new Date(task.start_date);
        const endDate = new Date(task.end_date);

        return startDate >= minDate && endDate <= maxDate;
      });


      /**
       * @description Evento que se ejecuta después de eliminar una tarea
       * @param {number} id - ID de la tarea eliminada
       */
      ganttInstance.current.attachEvent("onAfterTaskDelete", async (id) => {
        try {
          await fetch(`https://gantt-react-prueba-tecnica-production.up.railway.app/tasks/delete/${id}`, { method: "DELETE" });
          console.log("Tarea eliminada.");
          triggerRefresh();
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
