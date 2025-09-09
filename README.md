# Kissu Tech Interview - Frontend

## 📋 Descripción

Frontend de la aplicación Signal Watcher desarrollado con Next.js 14, App Router, TypeScript y Tailwind CSS. Esta aplicación permite gestionar listas de observación y visualizar eventos con análisis de IA.

## 🚀 Tecnologías

- **Next.js 14** con App Router
- **TypeScript** estricto
- **Tailwind CSS** + **shadcn/ui**
- **React Hook Form** + **Zod** para formularios
- **Jest** + **React Testing Library** para testing
- **Lucide React** para iconos

## 📦 Instalación

```bash
# Instalar dependencias
npm install
# o
pnpm install
# o
yarn install
```

## 🔧 Configuración

1. Copia el archivo de variables de entorno:
```bash
cp .env.example .env.local
```

2. Configura las variables de entorno en `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 🏃‍♂️ Comandos de Desarrollo

```bash
# Desarrollo
npm run dev          # Ejecutar en modo desarrollo (puerto 3000)
npm run build        # Build de producción
npm run start        # Ejecutar build de producción
npm run lint         # Linting con ESLint
npm run check-types  # Verificar tipos TypeScript

# Testing
npm run test         # Ejecutar tests
npm run test:watch   # Tests en modo watch
npm run test:coverage # Tests con coverage
npm run test:ci      # Tests para CI/CD
```

## 📁 Estructura del Proyecto

```
kissu-tech-interview-front/
├── app/                    # App Router de Next.js
│   ├── events/            # Páginas de eventos
│   ├── watchlists/        # Páginas de listas de observación
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página principal
├── components/            # Componentes React
│   ├── ui/               # Componentes UI (shadcn/ui)
│   ├── forms/            # Formularios
│   ├── skeletons/        # Componentes de loading
│   └── ...               # Otros componentes
├── hooks/                # Custom hooks
├── lib/                  # Utilidades y configuración
│   ├── actions/          # Server Actions
│   ├── api-client.ts     # Cliente HTTP
│   └── utils.ts          # Utilidades generales
├── packages/             # Paquetes locales
│   ├── schemas/          # Esquemas de validación Zod
│   ├── eslint-config/    # Configuración ESLint
│   └── typescript-config/ # Configuración TypeScript
└── public/               # Archivos estáticos
```

## 🎨 Componentes Principales

### Páginas
- **Dashboard** (`/`) - Vista general del sistema
- **Watchlists** (`/watchlists`) - Gestión de listas de observación
- **Events** (`/events`) - Visualización de eventos

### Componentes UI
- **WatchlistCard** - Tarjeta de lista de observación
- **EventCard** - Tarjeta de evento
- **SimulateEventForm** - Formulario para simular eventos
- **AIAnalysisPanel** - Panel con análisis de IA

## 🔗 Integración con Backend

El frontend se conecta al backend a través de:
- **Server Actions** para operaciones del servidor
- **API Client** para llamadas HTTP
- **Variables de entorno** para configuración de URLs

## 🧪 Testing

```bash
# Ejecutar todos los tests
npm run test

# Tests en modo watch
npm run test:watch

# Tests con coverage
npm run test:coverage

# Tests para CI/CD
npm run test:ci
```

## 📦 Build y Deploy

```bash
# Build de producción
npm run build

# Ejecutar build localmente
npm run start
```

Para deploy en Vercel:
1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno
3. Deploy automático en cada push

## 🔧 Variables de Entorno

```env
# URL del backend API
NEXT_PUBLIC_API_URL=http://localhost:3001

# Otros ajustes de Next.js
NEXT_PUBLIC_APP_NAME=Signal Watcher
```

## 📚 Documentación Adicional

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es parte de una prueba técnica y es de uso interno.# CI/CD Pipeline Test
# Fix Vercel ORG ID
