# Guía Completa de React Hooks y React Router

> **Autor:** Fernando Herrera - DevTalles  
> **Compilado por:** Void (Víctor González)  
> **Última actualización:** Diciembre 2024  
> **Versión de React:** 19.x  
> **Versión de React Router:** 6.4+

---

## 📚 Índice

1. [useState - Gestión de Estado](#1-usestate---gestión-de-estado)
2. [useEffect - Efectos Secundarios](#2-useeffect---efectos-secundarios)
3. [Custom Hooks - Reutilización de Lógica](#3-custom-hooks---reutilización-de-lógica)
4. [useRef - Referencias Persistentes](#4-useref---referencias-persistentes)
5. [useReducer - Estado Complejo](#5-usereducer---estado-complejo)
6. [useMemo - Memoización de Valores](#6-usememo---memoización-de-valores)
7. [React.memo y useCallback](#7-reactmemo-y-usecallback)
8. [useOptimistic - Actualizaciones Optimistas](#8-useoptimistic---actualizaciones-optimistas)
9. [use - Hook Universal (React 19)](#9-use---hook-universal-react-19)
10. [React Router - Introducción](#10-introducción-y-configuración)
11. [Loaders - Carga de Datos](#11-loaders---carga-de-datos)
12. [Actions - Mutaciones](#12-actions---mutaciones)
13. [Navigation Hooks](#13-navigation-hooks)
14. [Error Handling](#14-error-handling)
15. [Layouts y Nested Routes](#15-layouts-y-nested-routes)
16. [Ejemplo Completo CRUD](#16-ejemplo-completo-crud)

---

## PARTE 1: HOOKS FUNDAMENTALES

# 1. useState - Gestión de Estado

## 📚 Teoría

`useState` es el hook más básico y fundamental de React. Permite agregar estado local a componentes funcionales.

**Conceptos Clave:**
- El estado es **inmutable** - nunca modifiques directamente
- Actualizar estado causa **re-render** del componente
- El estado persiste entre renders
- Puedes tener múltiples `useState` en un componente

**Sintaxis básica:**
```tsx
const [state, setState] = useState(initialValue);
```

### 🎯 Cuándo Usar useState

✅ **SÍ usar cuando:**
- Necesitas valores que cambien y afecten la UI
- Formularios (inputs, checkboxes, selects)
- Toggles (mostrar/ocultar, abrir/cerrar)
- Contadores, timers
- Estado simple y localizado

❌ **NO usar cuando:**
- El valor no afecta la UI (usa `useRef`)
- Estado complejo con múltiples sub-valores relacionados (usa `useReducer`)
- Estado compartido entre muchos componentes (usa Context o estado global)

## 💡 Formas de Actualizar el Estado

### 1. Actualización Directa
```tsx
const [count, setCount] = useState(0);

// Actualización directa con nuevo valor
setCount(5);
setCount(count + 1);
```

### 2. Actualización Funcional (Recomendada)
```tsx
const [count, setCount] = useState(0);

// Usa el valor anterior para calcular el nuevo
setCount(prevCount => prevCount + 1);
```

**¿Por qué usar la forma funcional?**
```tsx
// ❌ PROBLEMA: Usar el valor directo
const handleClick = () => {
  setCount(count + 1); // count = 0, nuevo valor = 1
  setCount(count + 1); // count sigue siendo 0, nuevo valor = 1
  // Resultado: count = 1 (esperábamos 2)
};

// ✅ SOLUCIÓN: Usar función
const handleClick = () => {
  setCount(prev => prev + 1); // prev = 0, nuevo valor = 1
  setCount(prev => prev + 1); // prev = 1, nuevo valor = 2
  // Resultado: count = 2 ✓
};
```

### 3. Estado con Objetos
```tsx
const [user, setUser] = useState({
  name: 'Juan',
  age: 25,
  email: 'juan@example.com'
});

// ❌ MAL: Mutación directa
user.name = 'Pedro'; // ¡No hagas esto!

// ✅ BIEN: Crear nuevo objeto con spread operator
setUser({
  ...user,
  name: 'Pedro'
});

// ✅ MEJOR: Con función
setUser(prevUser => ({
  ...prevUser,
  name: 'Pedro'
}));
```

### 4. Estado con Arrays
```tsx
const [items, setItems] = useState(['a', 'b', 'c']);

// Agregar elemento
setItems([...items, 'd']);
setItems(prev => [...prev, 'd']);

// Eliminar elemento
setItems(items.filter(item => item !== 'b'));

// Actualizar elemento
setItems(items.map(item => 
  item === 'b' ? 'B' : item
));

// Limpiar array
setItems([]);
```

## 🚀 Ejemplos Prácticos

### Ejemplo 1: Contador Simple

```tsx
import { useState } from "react";

export const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold mb-4">Contador: {count}</h1>
      
      <div className="space-x-2">
        <button 
          onClick={increment}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          +1
        </button>
        
        <button 
          onClick={decrement}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          -1
        </button>
        
        <button 
          onClick={reset}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
};
```

### Ejemplo 2: Semáforo Interactivo

```tsx
import { useState } from "react";

type TrafficLightColor = 'red' | 'yellow' | 'green';

export const TrafficLight = () => {
  const [light, setLight] = useState<TrafficLightColor>('red');

  const nextLight = () => {
    setLight(currentLight => {
      if (currentLight === 'red') return 'green';
      if (currentLight === 'green') return 'yellow';
      return 'red';
    });
  };

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <h1 className="text-2xl font-bold mb-4">Semáforo</h1>
      
      <div className="bg-gray-800 rounded-lg p-4 space-y-3">
        <div 
          className={`w-20 h-20 rounded-full border-4 ${
            light === 'red' 
              ? 'bg-red-500 border-red-600 shadow-lg shadow-red-500' 
              : 'bg-red-900 border-red-950'
          }`}
        />
        <div 
          className={`w-20 h-20 rounded-full border-4 ${
            light === 'yellow' 
              ? 'bg-yellow-500 border-yellow-600 shadow-lg shadow-yellow-500' 
              : 'bg-yellow-900 border-yellow-950'
          }`}
        />
        <div 
          className={`w-20 h-20 rounded-full border-4 ${
            light === 'green' 
              ? 'bg-green-500 border-green-600 shadow-lg shadow-green-500' 
              : 'bg-green-900 border-green-950'
          }`}
        />
      </div>

      <button
        onClick={nextLight}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
      >
        Cambiar Luz
      </button>

      <p className="text-lg">
        Luz actual: <span className="font-bold">{light.toUpperCase()}</span>
      </p>
    </div>
  );
};
```

### Ejemplo 3: Formulario Completo

```tsx
import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  age: number;
  country: string;
}

export const UserForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    age: 0,
    country: 'ES'
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' ? parseInt(value) || 0 : value
    }));
  };

  const validate = (): boolean => {
    const newErrors: string[] = [];

    if (!formData.name.trim()) {
      newErrors.push('El nombre es obligatorio');
    }

    if (!formData.email.includes('@')) {
      newErrors.push('Email inválido');
    }

    if (formData.age < 18) {
      newErrors.push('Debes ser mayor de 18 años');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      setSubmitted(true);
      console.log('Formulario enviado:', formData);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', age: 0, country: 'ES' });
    setErrors([]);
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="p-8 max-w-md mx-auto">
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          <h2 className="font-bold text-xl mb-2">¡Formulario enviado!</h2>
          <p>Nombre: {formData.name}</p>
          <p>Email: {formData.email}</p>
          <p>Edad: {formData.age}</p>
          <p>País: {formData.country}</p>
        </div>
        <button
          onClick={resetForm}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Enviar otro formulario
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Registro de Usuario</h1>

      {errors.length > 0 && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <ul className="list-disc list-inside">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Nombre:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Tu nombre"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="tu@email.com"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Edad:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            min="0"
            max="120"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">País:</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="ES">España</option>
            <option value="MX">México</option>
            <option value="AR">Argentina</option>
            <option value="CO">Colombia</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};
```

## ⚠️ Errores Comunes

### Error 1: Mutación Directa del Estado
```tsx
// ❌ MAL
const [user, setUser] = useState({ name: 'Juan', age: 25 });
user.name = 'Pedro'; // ¡Mutación directa!

// ✅ BIEN
setUser({ ...user, name: 'Pedro' });
```

### Error 2: Múltiples Actualizaciones sin Función
```tsx
// ❌ MAL
setCount(count + 1);
setCount(count + 1); // Usa el mismo valor de count

// ✅ BIEN
setCount(prev => prev + 1);
setCount(prev => prev + 1);
```

### Error 3: Estado Inicial Costoso
```tsx
// ❌ MAL - Se ejecuta en cada render
const [data, setData] = useState(expensiveCalculation());

// ✅ BIEN - Solo se ejecuta una vez
const [data, setData] = useState(() => expensiveCalculation());
```

---

# 2. useEffect - Efectos Secundarios

## 📚 Teoría

`useEffect` permite realizar efectos secundarios en componentes funcionales (operaciones que afectan algo fuera del componente).

**Conceptos Clave:**
- Se ejecuta **después** del render
- Puede tener función de **limpieza (cleanup)**
- Array de **dependencias** controla cuándo se ejecuta
- Reemplaza `componentDidMount`, `componentDidUpdate`, `componentWillUnmount`

**Sintaxis:**
```tsx
useEffect(() => {
  // Código del efecto
  
  return () => {
    // Código de limpieza (opcional)
  };
}, [dependencies]);
```

### 🎯 Tipos de useEffect según Dependencias

#### 1. Sin Array de Dependencias
```tsx
useEffect(() => {
  console.log('Se ejecuta después de CADA render');
});
```

#### 2. Array Vacío `[]`
```tsx
useEffect(() => {
  console.log('Se ejecuta solo en el PRIMER render (mount)');
}, []);
```

#### 3. Con Dependencias
```tsx
useEffect(() => {
  console.log('Se ejecuta cuando count o name cambian');
}, [count, name]);
```

### 🔄 Orden de Ejecución

```
1. Render del componente
2. React actualiza el DOM
3. Se ejecuta useEffect
4. (Si hay cleanup) Se ejecuta al desmontar o antes del próximo efecto
```

## 💡 Casos de Uso Comunes

### 1. Fetch de Datos
### 2. Suscripciones (WebSockets, eventos)
### 3. Timers (setTimeout, setInterval)
### 4. Event Listeners
### 5. Sincronización con APIs externas

## 🚀 Ejemplos Prácticos

### Ejemplo 1: Semáforo Automático

```tsx
import { useState, useEffect } from "react";

type TrafficLightColor = 'red' | 'yellow' | 'green';

const DURATIONS = {
  red: 5000,    // 5 segundos
  yellow: 2000, // 2 segundos
  green: 5000,  // 5 segundos
};

export const TrafficLightWithEffect = () => {
  const [light, setLight] = useState<TrafficLightColor>('red');
  const [countdown, setCountdown] = useState(5);

  // Efecto 1: Cambiar luz automáticamente
  useEffect(() => {
    const duration = DURATIONS[light];
    
    const timer = setTimeout(() => {
      setLight(currentLight => {
        if (currentLight === 'red') return 'green';
        if (currentLight === 'green') return 'yellow';
        return 'red';
      });
    }, duration);

    // Cleanup: Limpiar timer al desmontar o cambiar luz
    return () => clearTimeout(timer);
  }, [light]);

  // Efecto 2: Contador regresivo
  useEffect(() => {
    setCountdown(DURATIONS[light] / 1000);

    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) return DURATIONS[light] / 1000;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [light]);

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <h1 className="text-2xl font-bold mb-4">
        Semáforo Automático
      </h1>
      
      <div className="bg-gray-800 rounded-lg p-4 space-y-3 relative">
        <div 
          className={`w-24 h-24 rounded-full border-4 ${
            light === 'red' 
              ? 'bg-red-500 border-red-600 shadow-2xl shadow-red-500' 
              : 'bg-red-900 border-red-950'
          }`}
        />
        <div 
          className={`w-24 h-24 rounded-full border-4 ${
            light === 'yellow' 
              ? 'bg-yellow-500 border-yellow-600 shadow-2xl shadow-yellow-500' 
              : 'bg-yellow-900 border-yellow-950'
          }`}
        />
        <div 
          className={`w-24 h-24 rounded-full border-4 ${
            light === 'green' 
              ? 'bg-green-500 border-green-600 shadow-2xl shadow-green-500' 
              : 'bg-green-900 border-green-950'
          }`}
        />

        <div className="absolute top-2 right-2 bg-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl">
          {countdown}
        </div>
      </div>

      <p className="text-lg">
        Luz actual: <span className="font-bold uppercase">{light}</span>
      </p>
      <p className="text-sm text-gray-600">
        Cambiará en {countdown} segundos
      </p>
    </div>
  );
};
```

### Ejemplo 2: Fetch de Datos con AbortController

```tsx
import { useState, useEffect } from "react";

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
}

export const PokemonViewer = () => {
  const [pokemonId, setPokemonId] = useState(1);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // AbortController para cancelar petición si el componente se desmonta
    const controller = new AbortController();
    
    const fetchPokemon = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonId}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error('Pokémon no encontrado');
        }

        const data = await response.json();
        setPokemon(data);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemon();

    // Cleanup: Cancelar petición al cambiar pokemonId o desmontar
    return () => {
      controller.abort();
    };
  }, [pokemonId]);

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Pokémon Viewer
      </h1>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setPokemonId(prev => Math.max(1, prev - 1))}
          className="bg-blue-500 text-white px-4 py-2 rounded flex-1"
          disabled={isLoading}
        >
          ← Anterior
        </button>
        <button
          onClick={() => setPokemonId(prev => prev + 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded flex-1"
          disabled={isLoading}
        >
          Siguiente →
        </button>
      </div>

      {isLoading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {pokemon && !isLoading && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-48 h-48 mx-auto"
          />
          <h2 className="text-2xl font-bold text-center capitalize mb-4">
            {pokemon.name}
          </h2>
          <div className="flex gap-2 justify-center">
            {pokemon.types.map(({ type }) => (
              <span
                key={type.name}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm capitalize"
              >
                {type.name}
              </span>
            ))}
          </div>
          <p className="text-center text-gray-600 mt-4">
            ID: #{pokemon.id}
          </p>
        </div>
      )}
    </div>
  );
};
```

### Ejemplo 3: Event Listeners (Window Resize)

```tsx
import { useState, useEffect } from "react";

export const WindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Agregar event listener
    window.addEventListener('resize', handleResize);

    // Cleanup: Remover event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Array vacío = solo en mount/unmount

  const getDeviceType = () => {
    if (windowSize.width < 640) return 'Mobile';
    if (windowSize.width < 1024) return 'Tablet';
    return 'Desktop';
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Tamaño de Ventana</h1>
      
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-6 shadow-lg">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm opacity-75">Ancho</p>
            <p className="text-4xl font-bold">{windowSize.width}px</p>
          </div>
          <div>
            <p className="text-sm opacity-75">Alto</p>
            <p className="text-4xl font-bold">{windowSize.height}px</p>
          </div>
        </div>

        <div className="border-t border-white/20 pt-4">
          <p className="text-sm opacity-75">Tipo de Dispositivo</p>
          <p className="text-2xl font-bold">{getDeviceType()}</p>
        </div>
      </div>

      <p className="text-sm text-gray-600 mt-4">
        Redimensiona la ventana para ver los cambios
      </p>
    </div>
  );
};
```

### Ejemplo 4: Timer/Cronómetro

```tsx
import { useState, useEffect } from "react";

export const Stopwatch = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }

    // Cleanup: Limpiar intervalo
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning]); // Solo se ejecuta cuando isRunning cambia

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-blue-100">
      <div className="bg-white rounded-2xl shadow-2xl p-12">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Cronómetro
        </h1>

        <div className="text-7xl font-mono font-bold text-center mb-8 text-blue-600">
          {formatTime(seconds)}
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={handleStartPause}
            className={`px-8 py-4 rounded-lg font-semibold text-white transition ${
              isRunning
                ? 'bg-yellow-500 hover:bg-yellow-600'
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {isRunning ? 'Pausar' : 'Iniciar'}
          </button>

          <button
            onClick={handleReset}
            className="px-8 py-4 rounded-lg font-semibold bg-red-500 text-white hover:bg-red-600 transition"
          >
            Reiniciar
          </button>
        </div>
      </div>
    </div>
  );
};
```

## ⚠️ Errores Comunes

### Error 1: Olvidar Dependencias
```tsx
// ❌ MAL - Falta count en dependencias
useEffect(() => {
  document.title = `Clicks: ${count}`;
}, []); // ⚠️ count no está en dependencias

// ✅ BIEN
useEffect(() => {
  document.title = `Clicks: ${count}`;
}, [count]);
```

### Error 2: No Limpiar Suscripciones
```tsx
// ❌ MAL - No limpia el intervalo
useEffect(() => {
  const interval = setInterval(() => {
    console.log('Tick');
  }, 1000);
  // ⚠️ Falta cleanup - memory leak!
}, []);

// ✅ BIEN
useEffect(() => {
  const interval = setInterval(() => {
    console.log('Tick');
  }, 1000);
  
  return () => clearInterval(interval);
}, []);
```

### Error 3: Actualizar Estado en Componente Desmontado
```tsx
// ❌ MAL - Puede actualizar estado después de desmontar
useEffect(() => {
  fetchData().then(data => {
    setData(data); // ⚠️ Componente puede estar desmontado
  });
}, []);

// ✅ BIEN - Usar flag isMounted
useEffect(() => {
  let isMounted = true;
  
  fetchData().then(data => {
    if (isMounted) {
      setData(data);
    }
  });
  
  return () => {
    isMounted = false;
  };
}, []);
```

---

# 3. Custom Hooks - Reutilización de Lógica

## 📚 Teoría

Los **Custom Hooks** son funciones que encapsulan lógica reutilizable usando hooks de React.

**Conceptos Clave:**
- Comienzan con el prefijo "use" (convención obligatoria)
- Pueden usar otros hooks internamente
- Retornan valores, funciones, o ambos
- Comparten lógica, NO estado (cada uso es independiente)

**Ventajas:**
- ✅ **Reutilización**: Misma lógica en múltiples componentes
- ✅ **Organización**: Código más limpio y mantenible
- ✅ **Testing**: Más fácil de testear
- ✅ **Separación de Responsabilidades**: UI separada de lógica

## 🎯 Estructura de un Custom Hook

```tsx
function useMyCustomHook(initialValue: number) {
  const [value, setValue] = useState(initialValue);

  const increment = () => setValue(prev => prev + 1);
  const decrement = () => setValue(prev => prev - 1);
  const reset = () => setValue(initialValue);

  return {
    value,
    increment,
    decrement,
    reset,
  };
}
```

## 🚀 Ejemplos de Custom Hooks

### 1. useCounter - Contador Reutilizable

```tsx
import { useState } from "react";

interface UseCounterOptions {
  initialValue?: number;
  min?: number;
  max?: number;
}

interface UseCounterReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setValue: (value: number) => void;
  isAtMax: boolean;
  isAtMin: boolean;
}

export const useCounter = (
  options: UseCounterOptions = {}
): UseCounterReturn => {
  const { initialValue = 0, min, max } = options;
  const [count, setCount] = useState(initialValue);

  const increment = () => {
    setCount(prev => {
      if (max !== undefined && prev >= max) return prev;
      return prev + 1;
    });
  };

  const decrement = () => {
    setCount(prev => {
      if (min !== undefined && prev <= min) return prev;
      return prev - 1;
    });
  };

  const reset = () => {
    setCount(initialValue);
  };

  const setValue = (value: number) => {
    if (min !== undefined && value < min) {
      setCount(min);
    } else if (max !== undefined && value > max) {
      setCount(max);
    } else {
      setCount(value);
    }
  };

  return {
    count,
    increment,
    decrement,
    reset,
    setValue,
    isAtMax: max !== undefined && count >= max,
    isAtMin: min !== undefined && count <= min,
  };
};
```

**Uso del hook:**

```tsx
export const CounterApp = () => {
  const counter = useCounter({ initialValue: 0, min: 0, max: 10 });

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">
        Contador: {counter.count}
      </h1>

      <div className="space-x-2">
        <button
          onClick={counter.decrement}
          disabled={counter.isAtMin}
          className="bg-red-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          -1
        </button>

        <button
          onClick={counter.increment}
          disabled={counter.isAtMax}
          className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          +1
        </button>

        <button
          onClick={counter.reset}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>

      <p className="mt-4 text-sm text-gray-600">
        Min: 0 | Max: 10
      </p>
    </div>
  );
};
```

### 2. useTrafficLight - Semáforo Reutilizable

```tsx
import { useState, useEffect } from "react";

type TrafficLightColor = 'red' | 'yellow' | 'green';

interface UseTrafficLightReturn {
  light: TrafficLightColor;
  countdown: number;
  isPaused: boolean;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  nextLight: () => void;
  percentage: number;
  colors: {
    isRed: boolean;
    isYellow: boolean;
    isGreen: boolean;
  };
}

const DURATIONS = {
  red: 5000,
  yellow: 2000,
  green: 5000,
};

export const useTrafficLight = (): UseTrafficLightReturn => {
  const [light, setLight] = useState<TrafficLightColor>('red');
  const [countdown, setCountdown] = useState(5);
  const [isPaused, setIsPaused] = useState(false);

  // Cambiar luz automáticamente
  useEffect(() => {
    if (isPaused) return;

    const duration = DURATIONS[light];
    const timer = setTimeout(() => {
      setLight(currentLight => {
        if (currentLight === 'red') return 'green';
        if (currentLight === 'green') return 'yellow';
        return 'red';
      });
    }, duration);

    return () => clearTimeout(timer);
  }, [light, isPaused]);

  // Countdown
  useEffect(() => {
    if (isPaused) return;

    setCountdown(DURATIONS[light] / 1000);

    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) return DURATIONS[light] / 1000;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [light, isPaused]);

  const pause = () => setIsPaused(true);
  const resume = () => setIsPaused(false);
  const reset = () => {
    setLight('red');
    setIsPaused(false);
  };

  const nextLight = () => {
    setLight(currentLight => {
      if (currentLight === 'red') return 'green';
      if (currentLight === 'green') return 'yellow';
      return 'red';
    });
  };

  const maxDuration = DURATIONS[light] / 1000;
  const percentage = ((maxDuration - countdown) / maxDuration) * 100;

  return {
    light,
    countdown,
    isPaused,
    pause,
    resume,
    reset,
    nextLight,
    percentage,
    colors: {
      isRed: light === 'red',
      isYellow: light === 'yellow',
      isGreen: light === 'green',
    },
  };
};
```

### 3. useFetch - Peticiones HTTP Reutilizables

```tsx
import { useState, useEffect } from "react";

interface UseFetchReturn<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useFetch<T>(url: string): UseFetchReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(url, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        setData(json);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url, refetchTrigger]);

  const refetch = () => {
    setRefetchTrigger(prev => prev + 1);
  };

  return { data, isLoading, error, refetch };
}
```

**Uso del hook:**

```tsx
interface Post {
  id: number;
  title: string;
  body: string;
}

export const PostsApp = () => {
  const { data: posts, isLoading, error, refetch } = useFetch<Post[]>(
    'https://jsonplaceholder.typicode.com/posts'
  );

  if (isLoading) {
    return <div className="p-8 text-center">Cargando...</div>;
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
        <button
          onClick={refetch}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Posts</h1>
        <button
          onClick={refetch}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Refrescar
        </button>
      </div>

      <div className="grid gap-4">
        {posts?.slice(0, 10).map(post => (
          <div key={post.id} className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600">{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
```

### 4. useLocalStorage - Persistencia Automática

```tsx
import { useState, useEffect } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  // Leer del localStorage al inicializar
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Guardar en localStorage cuando cambie el valor
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
```

**Uso del hook:**

```tsx
interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

export const TodoApp = () => {
  const [todos, setTodos] = useLocalStorage<TodoItem[]>('todos', []);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (!inputValue.trim()) return;

    setTodos(prev => [
      ...prev,
      {
        id: Date.now(),
        text: inputValue,
        completed: false,
      },
    ]);

    setInputValue('');
  };

  const toggleTodo = (id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">TODO App con LocalStorage</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Nueva tarea..."
          className="flex-1 border rounded px-4 py-2"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white px-6 py-2 rounded"
        >
          Agregar
        </button>
      </div>

      <div className="space-y-2">
        {todos.map(todo => (
          <div
            key={todo.id}
            className="flex items-center gap-3 border rounded p-3"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="w-5 h-5"
            />
            <span
              className={`flex-1 ${
                todo.completed ? 'line-through text-gray-500' : ''
              }`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>

      {todos.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          No hay tareas. ¡Agrega una!
        </p>
      )}
    </div>
  );
};
```

### 5. useDebounce - Debouncing para Búsquedas

```tsx
import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

**Uso del hook:**

```tsx
export const SearchApp = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [searchCount, setSearchCount] = useState(0);

  useEffect(() => {
    if (debouncedSearchTerm) {
      // Aquí harías la petición al servidor
      console.log('Buscando:', debouncedSearchTerm);
      setSearchCount(prev => prev + 1);
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Búsqueda con Debounce</h1>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Escribe para buscar..."
        className="w-full border rounded px-4 py-2 mb-4"
      />

      <div className="bg-gray-100 rounded p-4">
        <p className="mb-2">
          <strong>Valor actual:</strong> {searchTerm}
        </p>
        <p className="mb-2">
          <strong>Valor con debounce:</strong> {debouncedSearchTerm}
        </p>
        <p>
          <strong>Búsquedas realizadas:</strong> {searchCount}
        </p>
      </div>

      <p className="text-sm text-gray-600 mt-4">
        El debounce espera 500ms después de que dejes de escribir antes de ejecutar la búsqueda
      </p>
    </div>
  );
};
```

### 6. useMediaQuery - Detección de Media Queries

```tsx
import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    // Establecer valor inicial
    setMatches(media.matches);

    // Listener para cambios
    const listener = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    // Agregar listener
    media.addEventListener('change', listener);

    // Cleanup
    return () => {
      media.removeEventListener('change', listener);
    };
  }, [query]);

  return matches;
}
```

**Uso del hook:**

```tsx
export const ResponsiveApp = () => {
  const isMobile = useMediaQuery('(max-width: 640px)');
  const isTablet = useMediaQuery('(min-width: 641px) and (max-width: 1024px)');
  const isDesktop = useMediaQuery('(min-width: 1025px)');
  const isDark = useMediaQuery('(prefers-color-scheme: dark)');

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Detección de Media Queries</h1>

      <div className="space-y-4">
        <div className="border rounded p-4">
          <h2 className="font-bold mb-2">Tipo de Dispositivo:</h2>
          <p className="text-2xl">
            {isMobile && '📱 Mobile'}
            {isTablet && '📱 Tablet'}
            {isDesktop && '💻 Desktop'}
          </p>
        </div>

        <div className="border rounded p-4">
          <h2 className="font-bold mb-2">Preferencia de Tema:</h2>
          <p className="text-2xl">
            {isDark ? '🌙 Modo Oscuro' : '☀️ Modo Claro'}
          </p>
        </div>

        <div className="border rounded p-4">
          <h2 className="font-bold mb-2">Información Detallada:</h2>
          <ul className="space-y-1 text-sm">
            <li>Mobile: {isMobile ? '✅' : '❌'}</li>
            <li>Tablet: {isTablet ? '✅' : '❌'}</li>
            <li>Desktop: {isDesktop ? '✅' : '❌'}</li>
            <li>Modo Oscuro: {isDark ? '✅' : '❌'}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
```

## 💡 Mejores Prácticas para Custom Hooks

1. **Nombra con "use" prefix**
```tsx
// ✅ BIEN
function useCounter() { ... }

// ❌ MAL
function counter() { ... }
```

2. **Retorna objetos para claridad**
```tsx
// ✅ BIEN - Nombres claros
return { count, increment, decrement };

// ❌ REGULAR - Array (menos claro)
return [count, increment, decrement];
```

3. **Documenta con JSDoc**
```tsx
/**
 * Hook personalizado para manejar un contador
 * @param initialValue - Valor inicial del contador
 * @param min - Valor mínimo permitido
 * @param max - Valor máximo permitido
 * @returns Objeto con el contador y métodos para manipularlo
 */
export const useCounter = (options: UseCounterOptions) => {
  // ...
};
```

4. **Maneja edge cases**
```tsx
export const useFetch = <T>(url: string) => {
  // ✅ Validar entrada
  if (!url) {
    throw new Error('URL is required');
  }

  // ✅ Manejar errores
  // ✅ Cleanup
  // ...
};
```

---

# 4. useRef - Referencias Persistentes

## 📚 Teoría

`useRef` crea una referencia mutable que persiste durante toda la vida del componente.

**Conceptos Clave:**
- `.current` es mutable (puedes cambiarlo directamente)
- **NO causa re-render** cuando cambia
- Persiste entre renders
- Ideal para valores que no afectan la UI

**Sintaxis:**
```tsx
const ref = useRef(initialValue);
ref.current = newValue; // Cambiar valor
```

### 🎯 Casos de Uso

1. **Acceder a elementos DOM**
2. **Guardar valores que no causan re-render**
3. **Almacenar timers/intervals**
4. **Guardar valor anterior de un estado**
5. **Flag de isMounted**

## 🔍 useRef vs useState

| Característica | useRef | useState |
|---------------|---------|----------|
| Causa re-render | ❌ No | ✅ Sí |
| Mutable | ✅ Sí (.current) | ❌ No (inmutable) |
| Actualización | Inmediata | Asíncrona (batching) |
| Uso | Valores que no afectan UI | Valores que afectan UI |
| Acceso DOM | ✅ Sí | ❌ No |

## 🚀 Ejemplos Prácticos

### Ejemplo 1: Enfoque Automático en Input

```tsx
import { useRef, useEffect } from "react";

export const FocusScreen = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Enfocar el input al montar el componente
    inputRef.current?.focus();
  }, []);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  const handleSelect = () => {
    inputRef.current?.select();
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Enfoque Automático
      </h1>

      <input
        ref={inputRef}
        type="text"
        placeholder="Este input se enfoca automáticamente"
        className="w-full border rounded px-4 py-2 mb-4"
      />

      <div className="space-x-2">
        <button
          onClick={handleFocus}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Enfocar Input
        </button>

        <button
          onClick={handleSelect}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Seleccionar Texto
        </button>
      </div>
    </div>
  );
};
```

### Ejemplo 2: Control de Video

```tsx
import { useRef, useState } from "react";

export const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleSpeedChange = (speed: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Reproductor de Video
      </h1>

      <video
        ref={videoRef}
        className="w-full rounded-lg mb-4"
        src="https://www.w3schools.com/html/mov_bbb.mp4"
      />

      <div className="flex gap-2 mb-4">
        <button
          onClick={togglePlay}
          className="bg-blue-500 text-white px-4 py-2 rounded flex-1"
        >
          {isPlaying ? 'Pausar' : 'Reproducir'}
        </button>

        <button
          onClick={handleRestart}
          className="bg-green-500 text-white px-4 py-2 rounded flex-1"
        >
          Reiniciar
        </button>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => handleSpeedChange(0.5)}
          className="bg-gray-500 text-white px-3 py-2 rounded text-sm flex-1"
        >
          0.5x
        </button>
        <button
          onClick={() => handleSpeedChange(1)}
          className="bg-gray-500 text-white px-3 py-2 rounded text-sm flex-1"
        >
          1x
        </button>
        <button
          onClick={() => handleSpeedChange(1.5)}
          className="bg-gray-500 text-white px-3 py-2 rounded text-sm flex-1"
        >
          1.5x
        </button>
        <button
          onClick={() => handleSpeedChange(2)}
          className="bg-gray-500 text-white px-3 py-2 rounded text-sm flex-1"
        >
          2x
        </button>
      </div>
    </div>
  );
};
```

### Ejemplo 3: Cronómetro con useRef

```tsx
import { useRef, useState } from "react";

export const StopWatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = () => {
    if (isRunning) return;

    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime(prev => prev + 10);
    }, 10);
  };

  const pause = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  };

  const reset = () => {
    pause();
    setTime(0);
  };

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const ms = Math.floor((milliseconds % 1000) / 10);

    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="bg-white rounded-2xl shadow-2xl p-12">
        <h1 className="text-4xl font-bold text-center mb-8">
          Cronómetro
        </h1>

        <div className="text-7xl font-mono font-bold text-center mb-8 text-blue-600">
          {formatTime(time)}
        </div>

        <div className="flex gap-4 justify-center">
          {!isRunning ? (
            <button
              onClick={start}
              className="px-8 py-4 rounded-lg font-semibold bg-green-500 text-white hover:bg-green-600 transition"
            >
              Iniciar
            </button>
          ) : (
            <button
              onClick={pause}
              className="px-8 py-4 rounded-lg font-semibold bg-yellow-500 text-white hover:bg-yellow-600 transition"
            >
              Pausar
            </button>
          )}

          <button
            onClick={reset}
            className="px-8 py-4 rounded-lg font-semibold bg-red-500 text-white hover:bg-red-600 transition"
          >
            Reiniciar
          </button>
        </div>
      </div>
    </div>
  );
};
```

### Ejemplo 4: Guardar Valor Anterior

```tsx
import { useRef, useEffect, useState } from "react";

function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export const PreviousValueExample = () => {
  const [count, setCount] = useState(0);
  const previousCount = usePrevious(count);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">
        Valor Anterior con useRef
      </h1>

      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-6 mb-4">
        <p className="text-4xl font-bold mb-2">
          Actual: {count}
        </p>
        <p className="text-2xl opacity-75">
          Anterior: {previousCount ?? 'N/A'}
        </p>
      </div>

      <div className="space-x-2">
        <button
          onClick={() => setCount(count + 1)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          +1
        </button>
        <button
          onClick={() => setCount(count - 1)}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          -1
        </button>
        <button
          onClick={() => setCount(0)}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
};
```

### Ejemplo 5: Scroll a Elemento

```tsx
import { useRef } from "react";

export const ScrollToElement = () => {
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative">
      {/* Navegación fija */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-10 p-4">
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => scrollToSection(section1Ref)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Sección 1
          </button>
          <button
            onClick={() => scrollToSection(section2Ref)}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Sección 2
          </button>
          <button
            onClick={() => scrollToSection(section3Ref)}
            className="bg-purple-500 text-white px-4 py-2 rounded"
          >
            Sección 3
          </button>
        </div>
      </nav>

      {/* Contenido */}
      <div className="pt-20">
        <div
          ref={section1Ref}
          className="h-screen flex items-center justify-center bg-blue-100"
        >
          <h2 className="text-6xl font-bold text-blue-600">
            Sección 1
          </h2>
        </div>

        <div
          ref={section2Ref}
          className="h-screen flex items-center justify-center bg-green-100"
        >
          <h2 className="text-6xl font-bold text-green-600">
            Sección 2
          </h2>
        </div>

        <div
          ref={section3Ref}
          className="h-screen flex items-center justify-center bg-purple-100"
        >
          <h2 className="text-6xl font-bold text-purple-600">
            Sección 3
          </h2>
        </div>
      </div>
    </div>
  );
};
```

### Ejemplo 6: Click Fuera del Elemento

```tsx
import { useRef, useEffect, useState } from "react";

function useOnClickOutside(
  ref: React.RefObject<HTMLElement>,
  handler: () => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

export const DropdownExample = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <div className="p-8 flex items-center justify-center min-h-screen">
      <div ref={dropdownRef} className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg"
        >
          Abrir Menú {isOpen ? '▲' : '▼'}
        </button>

        {isOpen && (
          <div className="absolute top-full mt-2 w-64 bg-white rounded-lg shadow-xl border p-2">
            <div className="py-2 px-4 hover:bg-gray-100 rounded cursor-pointer">
              Opción 1
            </div>
            <div className="py-2 px-4 hover:bg-gray-100 rounded cursor-pointer">
              Opción 2
            </div>
            <div className="py-2 px-4 hover:bg-gray-100 rounded cursor-pointer">
              Opción 3
            </div>
          </div>
        )}
      </div>

      <p className="absolute bottom-8 text-gray-600 text-center w-full">
        Haz click fuera del menú para cerrarlo
      </p>
    </div>
  );
};
```

## ⚠️ Errores Comunes

### Error 1: Usar useRef para Estado UI
```tsx
// ❌ MAL - useRef para estado que afecta UI
const countRef = useRef(0);
const increment = () => {
  countRef.current += 1; // No causa re-render
};

// ✅ BIEN - useState para estado UI
const [count, setCount] = useState(0);
const increment = () => {
  setCount(prev => prev + 1);
};
```

### Error 2: Leer ref.current Antes de estar Disponible
```tsx
// ❌ MAL - Leer inmediatamente
const MyComponent = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  // ⚠️ inputRef.current es null aquí
  inputRef.current?.focus();
  
  return <input ref={inputRef} />;
};

// ✅ BIEN - Usar en useEffect
const MyComponent = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    // Ahora inputRef.current está disponible
    inputRef.current?.focus();
  }, []);
  
  return <input ref={inputRef} />;
};
```

## 💡 Tips y Mejores Prácticas

1. **useRef para valores que NO afectan UI**
2. **useState para valores que SÍ afectan UI**
3. **Limpia timers/intervals en cleanup**
4. **Usa TypeScript para tipar refs**

```tsx
// ✅ Tipar refs con TypeScript
const inputRef = useRef<HTMLInputElement>(null);
const divRef = useRef<HTMLDivElement>(null);
const intervalRef = useRef<NodeJS.Timeout | null>(null);
```

---

## PARTE 2: HOOKS AVANZADOS

# 5. useReducer - Estado Complejo

## 📚 Teoría

`useReducer` es una alternativa a `useState` para manejar **estado complejo** con múltiples sub-valores o lógica de actualización compleja.

**Conceptos Clave:**
- Similar a Redux (patrón reducer)
- Centraliza la lógica de actualización de estado
- Más predecible y testeable que múltiples `useState`
- Ideal para estados con sub-valores relacionados

**Sintaxis:**
```tsx
const [state, dispatch] = useReducer(reducer, initialState);

// Reducer: función pura que retorna nuevo estado
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ACTION_TYPE':
      return { ...state, /* cambios */ };
    default:
      return state;
  }
}
```

### 🎯 Cuándo Usar useReducer

✅ **SÍ usar cuando:**
- Estado con múltiples sub-valores relacionados
- Lógica de actualización compleja
- Próximo estado depende del anterior
- Muchas actualizaciones de estado relacionadas

❌ **NO usar cuando:**
- Estado simple (string, number, boolean)
- No hay lógica compleja de actualización
- Solo 1-2 valores de estado

## 🔄 Arquitectura de Reducer

```
┌─────────────────────────────────────────┐
│           COMPONENTE                    │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │   dispatch({ type, payload })     │  │
│  └───────────────┬──────────────────┘  │
│                  │                      │
│                  ↓                      │
│  ┌──────────────────────────────────┐  │
│  │         REDUCER                   │  │
│  │  (state, action) => newState     │  │
│  └───────────────┬──────────────────┘  │
│                  │                      │
│                  ↓                      │
│  ┌──────────────────────────────────┐  │
│  │       NUEVO ESTADO               │  │
│  │    (inmutable, nuevo objeto)     │  │
│  └──────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

## 💡 Ejemplo Básico: Contador con useReducer

```tsx
import { useReducer } from "react";

// 1. Definir tipos
type CounterState = {
  count: number;
};

type CounterAction =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET' }
  | { type: 'SET'; payload: number };

// 2. Estado inicial
const initialState: CounterState = {
  count: 0,
};

// 3. Reducer: función pura
function counterReducer(
  state: CounterState,
  action: CounterAction
): CounterState {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    
    case 'DECREMENT':
      return { count: state.count - 1 };
    
    case 'RESET':
      return initialState;
    
    case 'SET':
      return { count: action.payload };
    
    default:
      return state;
  }
}

// 4. Componente
export const CounterWithReducer = () => {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">
        Contador: {state.count}
      </h1>

      <div className="space-x-2">
        <button
          onClick={() => dispatch({ type: 'INCREMENT' })}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          +1
        </button>

        <button
          onClick={() => dispatch({ type: 'DECREMENT' })}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          -1
        </button>

        <button
          onClick={() => dispatch({ type: 'RESET' })}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Reset
        </button>

        <button
          onClick={() => dispatch({ type: 'SET', payload: 100 })}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Set 100
        </button>
      </div>
    </div>
  );
};
```

## 🚀 Ejemplo Completo: TODO App con useReducer

```tsx
// reducer/todoReducer.ts
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export interface TaskState {
  todos: Todo[];
  length: number;
  completed: number;
  pending: number;
}

export type TaskAction =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'DELETE_TODO'; payload: number }
  | { type: 'CLEAR_COMPLETED' };

export const getTasksInitialState = (): TaskState => {
  const stored = localStorage.getItem('todos');
  
  if (stored) {
    try {
      const todos = JSON.parse(stored);
      return {
        todos,
        length: todos.length,
        completed: todos.filter((t: Todo) => t.completed).length,
        pending: todos.filter((t: Todo) => !t.completed).length,
      };
    } catch {
      return { todos: [], length: 0, completed: 0, pending: 0 };
    }
  }
  
  return { todos: [], length: 0, completed: 0, pending: 0 };
};

export const taskReducer = (
  state: TaskState,
  action: TaskAction
): TaskState => {
  let newTodos: Todo[];

  switch (action.type) {
    case 'ADD_TODO':
      newTodos = [
        ...state.todos,
        {
          id: Date.now(),
          text: action.payload,
          completed: false,
        },
      ];
      
      localStorage.setItem('todos', JSON.stringify(newTodos));
      
      return {
        todos: newTodos,
        length: newTodos.length,
        completed: newTodos.filter(t => t.completed).length,
        pending: newTodos.filter(t => !t.completed).length,
      };

    case 'TOGGLE_TODO':
      newTodos = state.todos.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
      
      localStorage.setItem('todos', JSON.stringify(newTodos));
      
      return {
        todos: newTodos,
        length: newTodos.length,
        completed: newTodos.filter(t => t.completed).length,
        pending: newTodos.filter(t => !t.completed).length,
      };

    case 'DELETE_TODO':
      newTodos = state.todos.filter(todo => todo.id !== action.payload);
      
      localStorage.setItem('todos', JSON.stringify(newTodos));
      
      return {
        todos: newTodos,
        length: newTodos.length,
        completed: newTodos.filter(t => t.completed).length,
        pending: newTodos.filter(t => !t.completed).length,
      };

    case 'CLEAR_COMPLETED':
      newTodos = state.todos.filter(todo => !todo.completed);
      
      localStorage.setItem('todos', JSON.stringify(newTodos));
      
      return {
        todos: newTodos,
        length: newTodos.length,
        completed: 0,
        pending: newTodos.length,
      };

    default:
      return state;
  }
};
```

## ⚠️ Errores Comunes

### Error 1: Mutar el Estado
```tsx
// ❌ MAL - Mutación directa
const reducer = (state, action) => {
  state.todos.push(action.payload); // ¡Mutación!
  return state;
};

// ✅ BIEN - Inmutabilidad
const reducer = (state, action) => {
  return {
    ...state,
    todos: [...state.todos, action.payload],
  };
};
```

---

# 6. useMemo - Memoización de Valores

## 📚 Teoría

`useMemo` memoriza el resultado de un cálculo costoso.

```tsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

## 💡 Ejemplo

```tsx
import { useState, useMemo } from "react";

const heavyComputation = (num: number) => {
  console.log('🔴 Cálculo pesado...');
  let result = 0;
  for (let i = 0; i < 1000000000; i++) {
    result += num;
  }
  return result;
};

export const MemoExample = () => {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState(5);

  const expensiveResult = useMemo(() => {
    return heavyComputation(input);
  }, [input]);

  return (
    <div className="p-4">
      <p>Resultado: {expensiveResult}</p>
      <input
        type="number"
        value={input}
        onChange={(e) => setInput(Number(e.target.value))}
      />
      <button onClick={() => setCount(count + 1)}>
        Counter: {count}
      </button>
    </div>
  );
};
```

---

# 7. React.memo y useCallback

## 📚 Teoría

- **React.memo**: Memoriza componentes
- **useCallback**: Memoriza funciones

```tsx
import { useState, useCallback } from "react";
import React from "react";

const ExpensiveComponent = React.memo(({ onClick }: { onClick: () => void }) => {
  console.log('Renderizado');
  return <button onClick={onClick}>Click</button>;
});

export const Parent = () => {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log('Clicked!');
  }, []);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>{count}</button>
      <ExpensiveComponent onClick={handleClick} />
    </div>
  );
};
```

---

# 8. useOptimistic - Actualizaciones Optimistas (React 19)

```tsx
import { useOptimistic, useState, useTransition } from 'react';

export const CommentsApp = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [optimisticComments, addOptimistic] = useOptimistic(
    comments,
    (current, newText: string) => [
      ...current,
      { id: Date.now(), text: newText, optimistic: true },
    ]
  );

  const handleAdd = async (text: string) => {
    addOptimistic(text);
    
    // Petición al servidor
    await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ text }),
    });
    
    setComments([...comments, { id: Date.now(), text }]);
  };

  return (
    <div>
      {optimisticComments.map(c => (
        <div key={c.id}>
          {c.text} {c.optimistic && '(enviando...)'}
        </div>
      ))}
    </div>
  );
};
```

---

# 9. use - Hook Universal (React 19)

```tsx
import { use, Suspense } from "react";

const getUserData = async () => {
  await new Promise((res) => setTimeout(res, 2000));
  return { name: 'Juan', email: 'juan@example.com' };
};

const userPromise = getUserData();

function UserInfo() {
  const user = use(userPromise);
  
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}

export const App = () => (
  <Suspense fallback={<div>Cargando...</div>}>
    <UserInfo />
  </Suspense>
);
```

---

## PARTE 3: REACT ROUTER V6 - DATA APIS

# 10. Introducción y Configuración

```tsx
// router/AppRouter.tsx
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'products', element: <Products /> },
    ],
  },
]);

// main.tsx
import { RouterProvider } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
```

---

# 11. Loaders - Carga de Datos

```tsx
// api/products.ts
export const getProducts = async () => {
  const response = await fetch('https://api.example.com/products');
  return response.json();
};

// router
{
  path: '/products',
  element: <Products />,
  loader: getProducts,
}

// component
import { useLoaderData } from 'react-router-dom';

export const Products = () => {
  const products = useLoaderData();
  return <div>{products.map(p => <div key={p.id}>{p.name}</div>)}</div>;
};
```

---

# 12. Actions - Mutaciones

```tsx
// api/products.ts
export const createProduct = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  
  await fetch('https://api.example.com/products', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  
  return redirect('/products');
};

// router
{
  path: '/products/new',
  element: <ProductForm />,
  action: createProduct,
}

// component
import { Form } from 'react-router-dom';

export const ProductForm = () => (
  <Form method="post">
    <input name="name" required />
    <button type="submit">Crear</button>
  </Form>
);
```

---

# 13. Navigation Hooks

```tsx
import { useNavigate, useNavigation, useParams } from 'react-router-dom';

const Component = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const params = useParams();

  navigate('/products');
  console.log(navigation.state); // 'idle' | 'loading' | 'submitting'
  console.log(params.id);
  
  return <div>Navigation</div>;
};
```

---

# 14. Error Handling

```tsx
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

export const ErrorPage = () => {
  const error = useRouteError();
  
  if (isRouteErrorResponse(error)) {
    return <div>Error {error.status}: {error.statusText}</div>;
  }
  
  return <div>Error desconocido</div>;
};

// En router
{
  path: '/',
  element: <Root />,
  errorElement: <ErrorPage />,
}
```

---

# 15. Layouts y Nested Routes

```tsx
// layouts/RootLayout.tsx
import { Outlet, NavLink } from 'react-router-dom';

export const RootLayout = () => (
  <div>
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/products">Products</NavLink>
    </nav>
    <main>
      <Outlet />
    </main>
  </div>
);
```

---

# 16. Ejemplo Completo CRUD

```tsx
export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'products',
        children: [
          {
            index: true,
            element: <Products />,
            loader: getProducts,
          },
          {
            path: 'new',
            element: <ProductForm />,
            action: createProduct,
          },
          {
            path: ':id',
            element: <ProductDetail />,
            loader: getProduct,
          },
          {
            path: ':id/edit',
            element: <ProductForm />,
            loader: getProduct,
            action: updateProduct,
          },
          {
            path: ':id/delete',
            action: deleteProduct,
          },
        ],
      },
    ],
  },
]);
```

---

## Mejores Prácticas

### React Hooks
1. useState para estado simple, useReducer para complejo
2. useEffect solo para sincronización externa
3. Custom hooks para lógica reutilizable
4. Memoización solo con problemas medibles

### React Router
1. Loaders para cargar datos pre-render
2. Actions para mutaciones con revalidación automática
3. Error boundaries para capturar errores
4. Type safety con TypeScript

---

## Troubleshooting

**"Too many re-renders"**
```tsx
// ❌ Problema
function Component() {
  const [count, setCount] = useState(0);
  setCount(count + 1); // ¡Loop infinito!
}

// ✅ Solución
useEffect(() => {
  setCount(count + 1);
}, []);
```

**"Cannot update component while rendering another"**
```tsx
// ❌ Problema
function Child({ onMount }) {
  onMount(); // ¡Error!
}

// ✅ Solución
useEffect(() => {
  onMount();
}, [onMount]);
```

---

---

## 🔗 Enlaces y Recursos Oficiales

### 📚 Documentación Oficial

#### React
- **[React Documentation](https://react.dev)** - Documentación oficial de React (nueva versión)
- **[React Reference API](https://react.dev/reference/react)** - Referencia completa de APIs
- **[React Hooks API Reference](https://react.dev/reference/react/hooks)** - Todos los hooks documentados
- **[React Learn](https://react.dev/learn)** - Tutorial interactivo oficial

#### React Router
- **[React Router Documentation](https://reactrouter.com)** - Documentación oficial completa
- **[React Router Tutorial](https://reactrouter.com/en/main/start/tutorial)** - Tutorial paso a paso
- **[Data APIs Guide](https://reactrouter.com/en/main/routers/picking-a-router)** - Guía de Data APIs
- **[API Reference](https://reactrouter.com/en/main/route/route)** - Referencia completa de API

#### TypeScript
- **[TypeScript Documentation](https://www.typescriptlang.org/docs/)** - Documentación oficial de TypeScript
- **[React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)** - Cheatsheet para React + TypeScript

### 🛠️ Herramientas y Frameworks

#### Build Tools
- **[Vite](https://vitejs.dev/)** - Build tool rápido y moderno
- **[Next.js](https://nextjs.org/)** - Framework React con SSR
- **[Create React App](https://create-react-app.dev/)** - Herramienta oficial de React

#### UI Components
- **[shadcn/ui](https://ui.shadcn.com/)** - Componentes UI accesibles con Tailwind
- **[Radix UI](https://www.radix-ui.com/)** - Componentes primitivos sin estilos
- **[Headless UI](https://headlessui.com/)** - Componentes UI de Tailwind Labs

#### Styling
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utility-first
- **[Tailwind UI](https://tailwindui.com/)** - Componentes premium de Tailwind
- **[DaisyUI](https://daisyui.com/)** - Componentes para Tailwind CSS

#### State Management
- **[Redux Toolkit](https://redux-toolkit.js.org/)** - State management oficial de Redux
- **[Zustand](https://zustand-demo.pmnd.rs/)** - State management minimalista
- **[Jotai](https://jotai.org/)** - State management atómico
- **[Recoil](https://recoiljs.org/)** - State management de Facebook

#### Data Fetching
- **[TanStack Query (React Query)](https://tanstack.com/query/latest)** - Gestión de estado del servidor
- **[SWR](https://swr.vercel.app/)** - React Hooks para data fetching
- **[RTK Query](https://redux-toolkit.js.org/rtk-query/overview)** - Data fetching con Redux

#### Forms
- **[React Hook Form](https://react-hook-form.com/)** - Formularios performantes con validación
- **[Formik](https://formik.org/)** - Biblioteca popular para formularios
- **[Zod](https://zod.dev/)** - Validación de esquemas TypeScript-first

#### Testing
- **[Vitest](https://vitest.dev/)** - Framework de testing rápido
- **[React Testing Library](https://testing-library.com/react)** - Testing de componentes
- **[Playwright](https://playwright.dev/)** - Testing E2E
- **[Cypress](https://www.cypress.io/)** - Testing E2E moderno

### 🎓 Cursos y Tutoriales

#### En Español
- **[DevTalles - React](https://cursos.devtalles.com/courses/react-cero-experto)** - Curso completo de Fernando Herrera
- **[DevTalles - React Native](https://cursos.devtalles.com/courses/react-native)** - React para móviles
- **[DevTalles - Next.js](https://cursos.devtalles.com/courses/nextjs)** - Framework React avanzado

#### En Inglés
- **[React - The Complete Guide](https://www.udemy.com/course/react-the-complete-guide-incl-redux/)** - Maximilian Schwarzmüller
- **[Epic React](https://epicreact.dev/)** - Kent C. Dodds
- **[React Router Tutorial](https://reactrouter.com/en/main/start/tutorial)** - Tutorial oficial interactivo

### 📺 Canales de YouTube Recomendados

- **[midudev](https://www.youtube.com/@midudev)** - Contenido React en español
- **[Gentleman Programming](https://www.youtube.com/@gentleman-programming)** - Tutoriales React en español
- **[Fernando Herrera](https://www.youtube.com/@Fernando_Herrera)** - Creador de DevTalles
- **[Jack Herrington](https://www.youtube.com/@jherr)** - React avanzado en inglés
- **[Theo - t3.gg](https://www.youtube.com/@t3dotgg)** - Stack moderno de React

### 🎨 Recursos de UI/UX

- **[Dribbble](https://dribbble.com/)** - Inspiración de diseños
- **[Awwwards](https://www.awwwards.com/)** - Mejores diseños web
- **[UI Design Daily](https://www.uidesigndaily.com/)** - Diseños UI gratis diarios
- **[Tailwind Components](https://tailwindcomponents.com/)** - Componentes con Tailwind
- **[Heroicons](https://heroicons.com/)** - Iconos SVG gratuitos
- **[Lucide Icons](https://lucide.dev/)** - Iconos para React

### 💬 Comunidades

#### Discord
- **[Reactiflux](https://www.reactiflux.com/)** - Comunidad oficial de React
- **[DevTalles Discord](https://discord.gg/devtalles)** - Comunidad en español

#### Reddit
- **[r/reactjs](https://www.reddit.com/r/reactjs/)** - Subreddit de React
- **[r/typescript](https://www.reddit.com/r/typescript/)** - Subreddit de TypeScript

#### Otras Comunidades
- **[Stack Overflow - React](https://stackoverflow.com/questions/tagged/reactjs)** - Preguntas y respuestas
- **[Dev.to - React](https://dev.to/t/react)** - Artículos y tutoriales

### 📰 Blogs y Newsletters

- **[React Blog](https://react.dev/blog)** - Blog oficial de React
- **[React Status](https://react.statuscode.com/)** - Newsletter semanal
- **[This Week In React](https://thisweekinreact.com/)** - Newsletter semanal
- **[Kent C. Dodds Blog](https://kentcdodds.com/blog)** - Artículos avanzados
- **[Dan Abramov Blog](https://overreacted.io/)** - Co-creador de Redux

### 🔧 Herramientas de Desarrollo

#### Browser Extensions
- **[React Developer Tools](https://react.dev/learn/react-developer-tools)** - DevTools oficial de React
- **[Redux DevTools](https://github.com/reduxjs/redux-devtools)** - Para debugging de Redux

#### VS Code Extensions
- **ES7+ React/Redux/React-Native snippets** - Snippets para React
- **Prettier** - Formateador de código
- **ESLint** - Linter de JavaScript
- **Tailwind CSS IntelliSense** - Autocompletado para Tailwind
- **Auto Rename Tag** - Renombrar tags HTML/JSX automáticamente

#### Generadores de Código
- **[Code Sandbox](https://codesandbox.io/)** - IDE online para React
- **[StackBlitz](https://stackblitz.com/)** - IDE online con Node.js
- **[React.new](https://react.new/)** - Crear proyecto React instantáneamente

### 📱 React Native (Bonus)

- **[React Native Documentation](https://reactnative.dev/)** - Documentación oficial
- **[Expo](https://expo.dev/)** - Framework y plataforma para React Native
- **[React Navigation](https://reactnavigation.org/)** - Navegación para React Native

### 🚀 Deployment

- **[Vercel](https://vercel.com/)** - Deploy de aplicaciones React/Next.js
- **[Netlify](https://www.netlify.com/)** - Deploy y hosting
- **[Cloudflare Pages](https://pages.cloudflare.com/)** - Deploy gratuito
- **[Railway](https://railway.app/)** - Deploy con backend
- **[Render](https://render.com/)** - Deploy full-stack

---

## 📌 Enlaces Rápidos de Esta Guía

### Navegación Rápida por Secciones

**Hooks Fundamentales:**
- [useState](#1-usestate---gestión-de-estado)
- [useEffect](#2-useeffect---efectos-secundarios)
- [Custom Hooks](#3-custom-hooks---reutilización-de-lógica)
- [useRef](#4-useref---referencias-persistentes)

**Hooks Avanzados:**
- [useReducer](#5-usereducer---estado-complejo)
- [useMemo](#6-usememo---memoización-de-valores)
- [React.memo y useCallback](#7-reactmemo-y-usecallback)
- [useOptimistic](#8-useoptimistic---actualizaciones-optimistas)
- [use (React 19)](#9-use---hook-universal-react-19)

**React Router:**
- [Introducción](#10-introducción-y-configuración)
- [Loaders](#11-loaders---carga-de-datos)
- [Actions](#12-actions---mutaciones)
- [Navigation Hooks](#13-navigation-hooks)
- [Error Handling](#14-error-handling)
- [Layouts](#15-layouts-y-nested-routes)
- [CRUD Completo](#16-ejemplo-completo-crud)

---

## ⭐ Repositorios de Ejemplo

### Ejemplos Oficiales
- **[React Examples](https://github.com/facebook/react/tree/main/fixtures)** - Ejemplos del repo oficial
- **[React Router Examples](https://github.com/remix-run/react-router/tree/dev/examples)** - Ejemplos oficiales de Router

### Proyectos Open Source
- **[Real World App](https://github.com/gothinkster/realworld)** - Implementaciones de una app real
- **[React Best Practices](https://github.com/airbnb/javascript/tree/master/react)** - Guía de Airbnb

---

**¡Guía Completa React Hooks & Router lista para usar! 📚✨**

Esta guía incluye:
- ✅ Teoría clara y concisa
- ✅ Ejemplos prácticos completos
- ✅ Código TypeScript con tipos
- ✅ Estilos con Tailwind CSS
- ✅ Errores comunes y soluciones
- ✅ Tips y mejores prácticas
- ✅ Enlaces a recursos oficiales
- ✅ Herramientas y comunidades

---

**Compilado con ❤️ por Void (Víctor González)**  
**Basado en el curso de Fernando Herrera - DevTalles**  
**Última actualización: Diciembre 2024**
