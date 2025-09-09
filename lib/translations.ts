export const severityTranslations = {
  LOW: "Bajo",
  MEDIUM: "Medio",
  HIGH: "Alto",
  CRITICAL: "Crítico",
} as const;

export const severityColors = {
  LOW: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  MEDIUM:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  HIGH: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  CRITICAL: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
} as const;

export const commonTranslations = {
  // Navigation
  back: "Volver",
  view: "Ver",
  edit: "Editar",
  delete: "Eliminar",
  create: "Crear",
  add: "Añadir",
  save: "Guardar",
  cancel: "Cancelar",

  // Actions
  simulate: "Simular",
  analyze: "Analizar",
  filter: "Filtrar",
  search: "Buscar",

  // Status
  active: "Activo",
  inactive: "Inactivo",
  pending: "Pendiente",
  completed: "Completado",

  // Time
  today: "Hoy",
  yesterday: "Ayer",
  lastWeek: "Semana pasada",
  lastMonth: "Mes pasado",

  // Common phrases
  requiresAttention: "Requiere atención",
  readyForProcessing: "Listo para procesar",
  fromLastMonth: "desde el mes pasado",
  fromYesterday: "desde ayer",
} as const;
