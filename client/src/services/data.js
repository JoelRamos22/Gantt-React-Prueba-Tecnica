export default function data() {
    const tasks = {
        data: [
        // 🔹 Proyecto 1 (Agrupa varias actividades)
        { id: 1, text: "Proyecto A", type: "project", open: true, start_date: "2024-04-01", duration: 15 },
        
        // 🔸 Actividad Principal dentro del Proyecto A
        { id: 2, text: "Actividad Principal 1", start_date: "2024-04-02", duration: 6, parent: 1 },
            { id: 3, text: "Subactividad 1.1", start_date: "2024-04-03", duration: 3, parent: 2 },
            { id: 4, text: "Subactividad 1.2", start_date: "2024-04-06", duration: 4, parent: 2 },
        
        // 🔸 Otra Actividad Principal dentro del Proyecto A
        { id: 5, text: "Actividad Principal 2", start_date: "2024-04-08", duration: 5, parent: 1 },
            { id: 6, text: "Subactividad 2.1", start_date: "2024-04-09", duration: 2, parent: 5 },
            { id: 7, text: "Subactividad 2.2", start_date: "2024-04-10", duration: 3, parent: 5 },
    
        // 🔹 Proyecto 2 (Agrupa varias actividades)
        { id: 8, text: "Proyecto B", type: "project", open: true, start_date: "2024-04-12", duration: 10 },
        
        // 🔸 Actividad Principal dentro del Proyecto B
        { id: 9, text: "Actividad Principal 3", start_date: "2024-04-13", duration: 6, parent: 8 },
            { id: 10, text: "Subactividad 3.1", start_date: "2024-04-14", duration: 3, parent: 9 },
            { id: 11, text: "Subactividad 3.2", start_date: "2024-04-15", duration: 4, parent: 9 },
        ],
        links: [],
    };
    return tasks;
}