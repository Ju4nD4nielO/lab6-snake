# lab6-snake# 🐍 Snake — React + Vite

Implementación del clásico juego Snake utilizando **React con Vite**, estructurada en componentes reutilizables con manejo de estado mediante hooks.

## 🚀 Instalación y ejecución

### Opción A — con Docker (recomendado)

```bash
# Construir y levantar el contenedor
docker compose up --build

# O con el Dockerfile directamente
docker build -t snake-game .
docker run -p 8080:80 snake-game
```

Abre tu navegador en `http://localhost:8080`

### Opción B — desarrollo local con Node

```bash
npm install
npm run dev
```

Abre tu navegador en `http://localhost:5173`

## 🎮 Cómo jugar

- Presiona **Start Game** para comenzar
- Usa las **teclas de flecha** o **WASD** para mover la serpiente
- Come la comida 🟠 para crecer y sumar puntos
- Evita chocar con las paredes o con tu propio cuerpo
- La velocidad aumenta conforme sumas puntos

## 📈 Niveles de dificultad

| Nivel | Puntaje mínimo |
|-------|---------------|
| 1     | 0             |
| 2     | 5             |
| 3     | 12            |
| 4     | 22            |

## 🗂️ Estructura del proyecto

```
src/
├── components/
│   ├── Board.jsx          # Tablero del juego (grid visual)
│   ├── Snake.jsx          # Segmentos de la serpiente
│   ├── Food.jsx           # Comida animada
│   ├── Score.jsx          # Panel de puntaje y nivel
│   ├── StartScreen.jsx    # Pantalla de inicio / game over
│   ├── MobileControls.jsx # D-pad táctil para móviles
│   └── Game.jsx           # Contenedor principal (estado y lógica)
├── hooks/
│   ├── useGameLoop.js     # Loop del juego con setInterval
│   └── useKeyboardInput.js# Captura de teclas de dirección
└── utils/
    └── gameUtils.js       # Constantes, generación de comida, colisiones
```

## ⚙️ Tecnologías

- **React 18** — componentes, props, `useState`, `useEffect`, `useCallback`
- **Vite** — servidor de desarrollo y build
- **CSS Modules** — estilos por componente
