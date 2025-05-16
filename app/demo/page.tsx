"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import NonogramBoard from "@/components/nonogram/nonogram-board";
import { getNonogramLevels } from "@/lib/nonogram";
import { getLevels as getRobotLevels } from "@/lib/robot-programmer";
import GameBoard from "@/components/robot-programmer/game-board";
import InstructionPanel from "@/components/robot-programmer/instruction-panel";
import CommandZone from "@/components/robot-programmer/command-zone";
import RobotSVG from "@/components/robot-programmer/robot-svg";
import confetti from "canvas-confetti"
import { motion, AnimatePresence } from "framer-motion"
import { DownloadIcon } from "@radix-ui/react-icons"
import PatternRecognition from "@/components/misiones/nivel1/pattern-recognition"
import { Dialog } from "@/components/ui/dialog";

function NonogramaDemo({ onComplete }: { onComplete?: () => void }) {
  // Usar el primer nivel fácil
  const level = getNonogramLevels()[0];
  const [board, setBoard] = useState(
    Array(level.solution.length)
      .fill(0)
      .map(() => Array(level.solution[0].length).fill(0))
  );
  const [errors, setErrors] = useState<{ row: number; col: number }[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);
  // Estado para mostrar la animación de imagen completada
  const [showImageReveal, setShowImageReveal] = useState(false);
  // Modo de entrada: "fill" (rellenar) o "x" (marcar X)
  const [inputMode, setInputMode] = useState<'fill' | 'x'>('fill');

  // Detectar si es móvil (simple, usando window.innerWidth)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  function isBoardSolved(board: number[][], solution: number[][]) {
    // Devuelve true si todas las casillas que deben estar rellenas (1) en la solución están rellenas en el board,
    // y no hay ninguna casilla rellena (1) en el board donde la solución no lo indica.
    for (let i = 0; i < solution.length; i++) {
      for (let j = 0; j < solution[0].length; j++) {
        if (solution[i][j] === 1 && board[i][j] !== 1) return false;
        if (solution[i][j] === 0 && board[i][j] === 1) return false;
      }
    }
    return true;
  }

  function handleCellClick(row: number, col: number, rightClick = false) {
    if (isComplete) return;
    const newBoard = board.map((r) => [...r]);
    // Unificación de lógica: inputMode en móvil, clic izquierdo/derecho en desktop
    if (isMobile) {
      // En móvil, usar inputMode
      if (inputMode === 'x') {
        newBoard[row][col] = newBoard[row][col] === 2 ? 0 : 2;
      } else {
        newBoard[row][col] = newBoard[row][col] === 1 ? 0 : 1;
      }
    } else {
      // En desktop, clic derecho marca X, clic izquierdo rellena
      if (rightClick) {
        newBoard[row][col] = newBoard[row][col] === 2 ? 0 : 2;
      } else {
        newBoard[row][col] = newBoard[row][col] === 1 ? 0 : 1;
      }
    }
    setBoard(newBoard);
    if (isBoardSolved(newBoard, level.solution)) {
      setIsComplete(true);
      setTimeout(() => setShowImageReveal(true), 500);
      if (onComplete) onComplete();
    }
  }

  if (showTutorial) {
    return (
      <div className="flex flex-col items-center gap-4 w-full max-w-xs mx-auto bg-gradient-to-br from-blue-900/80 via-blue-800/80 to-purple-900/80 border-2 border-blue-400/40 shadow-xl rounded-2xl p-6 mb-4 animate-fade-in">
        <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 animate-gradient-x mb-2 text-center drop-shadow-lg">¿Cómo resolver un nonograma?</div>
      <ul className="list-disc list-inside text-base text-blue-100/90 space-y-2 text-left w-full pl-2">
        <li><span className="font-bold text-yellow-300">Observa</span> las pistas a la izquierda (filas) y arriba (columnas).</li>
        <li><span className="font-bold text-pink-300">Cada número</span> indica una secuencia de casillas rellenas.</li>
        <li><span className="font-bold text-green-300">Toca una casilla</span> para marcarla como rellena.</li>
        <li><span className="font-bold text-purple-300">Mantén presionado</span> para marcarla como vacía (o usa el botón de modo en celular).</li>
        <li><span className="font-bold text-blue-200">Completa el patrón</span> correctamente para ganar.</li>
      </ul>
        <button
          className="mt-4 px-6 py-2 rounded-lg bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 text-white font-bold shadow-lg hover:scale-105 transition-transform text-lg"
          onClick={() => setShowTutorial(false)}
        >
          ¡Entendido! Empezar
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full mx-auto bg-gradient-to-br from-blue-900/80 via-blue-800/80 to-purple-900/80 border-2 border-yellow-400/30 shadow-xl rounded-2xl p-6 animate-fade-in relative">
      <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 animate-gradient-x mb-2 text-center drop-shadow-lg">Resuelve este mini nonograma</div>
      {/* Selector de modo de entrada */}
      {isMobile && (
        <div className="flex gap-2 mb-2">
          <button
            className={`px-3 py-1 rounded-lg font-bold text-lg border-2 transition-all ${inputMode === 'fill' ? 'bg-purple-600 text-white border-purple-400' : 'bg-[#232946] text-purple-200 border-gray-600'}`}
            onClick={() => setInputMode('fill')}
          >
            Cuadrado
          </button>
          <button
            className={`px-3 py-1 rounded-lg font-bold text-lg border-2 transition-all ${inputMode === 'x' ? 'bg-yellow-400 text-yellow-900 border-yellow-300' : 'bg-[#232946] text-yellow-400 border-gray-600'}`}
            onClick={() => setInputMode('x')}
          >
            X
          </button>
        </div>
      )}
      {/* Contenedor centrado para el tablero */}
      <div className="w-full flex justify-center items-center">
        <div className="w-full max-w-sm aspect-square flex justify-center items-center mx-auto">
          <NonogramBoard
            board={board}
            rowClues={level.rowClues}
            colClues={level.colClues}
            onCellClick={handleCellClick}
            errors={errors}
            showHint={false}
            solution={level.solution}
            isPreview={false}
          />
        </div>
      </div>
      {isComplete && !showImageReveal && (
        <div className="text-green-400 font-bold mt-4 text-lg animate-bounce">¡Correcto! 🎉</div>
      )}
      {/* Imagen revelada con animación */}
      {showImageReveal && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 rounded-2xl animate-fade-in z-20">
          <div className="mb-4 text-2xl font-bold text-white animate-bounce">¡Descubriste la imagen!</div>
          <div className="w-full max-w-[128px] aspect-square mx-auto mb-2 flex items-center justify-center scale-0 animate-reveal-image">
            <NonogramBoard
              board={level.solution}
              rowClues={[]}
              colClues={[]}
              onCellClick={() => {}}
              errors={[]}
              showHint={false}
              solution={level.solution}
              isPreview={true}
            />
          </div>
          <div className="text-pink-300 font-bold text-lg">¡Es un corazón!</div>
        </div>
      )}
      <style jsx global>{`
        @keyframes reveal-image {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-reveal-image {
          animation: reveal-image 1s cubic-bezier(.68,-0.55,.27,1.55);
        }
      `}</style>
    </div>
  );
}

function RobotDemo({ onComplete }: { onComplete?: () => void }) {
  // Usar el primer nivel fácil
  const level = getRobotLevels()[0];
  const [commands, setCommands] = useState<string[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [robotPosition, setRobotPosition] = useState({ ...level.startPosition });
  const [litCells, setLitCells] = useState<{ x: number; y: number }[]>([]);

  // Permitir arrastrar y soltar comandos igual que en el minijuego
  useEffect(() => {
    const handler = (e: any) => {
      if (e.detail && !isComplete && !isExecuting) setCommands((prev) => [...prev, e.detail]);
    };
    window.addEventListener("add-command", handler);
    return () => window.removeEventListener("add-command", handler);
  }, [isComplete, isExecuting]);

  useEffect(() => {
    if (isComplete) {
      if (isSuccess) {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.7 } })
      } else {
        if (window.navigator.vibrate) window.navigator.vibrate(300)
      }
    }
  }, [isComplete, isSuccess])

  function addCommand(cmd: string) {
    if (isComplete || isExecuting) return;
    setCommands((prev) => [...prev, cmd]);
  }
  function removeCommand(idx: number) {
    if (isComplete || isExecuting) return;
    setCommands((prev) => prev.filter((_, i) => i !== idx));
  }
  async function executeCommands() {
    if (isExecuting || isComplete) return;
    setIsExecuting(true);
    let currentPosition = { ...level.startPosition };
    let currentLitCells: { x: number; y: number }[] = [];
    for (let i = 0; i < commands.length; i++) {
      const cmd = commands[i];
      // Simular ejecución (solo soporta forward, turnRight, turnLeft, light)
      switch (cmd) {
        case "forward": {
          const directionVectors = [
            { x: 0, y: -1 },
            { x: 1, y: 0 },
            { x: 0, y: 1 },
            { x: -1, y: 0 },
          ];
          const vector = directionVectors[currentPosition.direction];
          const newX = currentPosition.x + vector.x;
          const newY = currentPosition.y + vector.y;
          if (
            newX >= 0 &&
            newX < level.board[0].length &&
            newY >= 0 &&
            newY < level.board.length &&
            level.board[newY][newX] !== 1
          ) {
            currentPosition = { ...currentPosition, x: newX, y: newY };
          }
          break;
        }
        case "turnRight":
          currentPosition = { ...currentPosition, direction: (currentPosition.direction + 1) % 4 };
          break;
        case "turnLeft":
          currentPosition = { ...currentPosition, direction: (currentPosition.direction + 3) % 4 };
          break;
        case "light": {
          const alreadyLit = currentLitCells.some(
            (cell) => cell.x === currentPosition.x && cell.y === currentPosition.y
          );
          if (!alreadyLit) {
            currentLitCells = [...currentLitCells, { x: currentPosition.x, y: currentPosition.y }];
          }
          break;
        }
      }
      setRobotPosition({ ...currentPosition });
      setLitCells([...currentLitCells]);
      await new Promise((res) => setTimeout(res, 400));
    }
    // Validar solución
    const allLit = level.targetCells.every((cell) =>
      currentLitCells.some((c) => c.x === cell.x && c.y === cell.y)
    );
    setIsSuccess(allLit);
    setIsComplete(true);
    setIsExecuting(false);
    if (allLit && onComplete) onComplete();
  }
  function reset() {
    setCommands([]);
    setIsExecuting(false);
    setIsComplete(false);
    setIsSuccess(false);
    setRobotPosition({ ...level.startPosition });
    setLitCells([]);
  }

  // Layout responsivo: tres columnas en desktop, vertical en móvil
  return (
    <div className="w-full flex flex-col items-center">
      {/* SOLO el contenedor de las tres columnas, sin ningún otro fondo ni padding externo */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-center gap-4 md:gap-6 bg-gradient-to-br from-blue-900/80 via-blue-800/80 to-purple-900/80 border-2 border-yellow-400/30 shadow-xl rounded-2xl p-4 md:p-6 animate-fade-in">
        {/* Comandos disponibles a la izquierda */}
        <div className="w-full md:w-[170px] flex-shrink-0 flex flex-col items-center md:items-start">
          <InstructionPanel
            onAddCommand={addCommand}
            availableCommands={level.availableCommands}
            disabled={isComplete || isExecuting}
          />
        </div>
        {/* Tablero en el centro */}
        <div className="w-full md:w-[340px] flex-shrink-0 flex flex-col items-center">
          <div className="font-semibold mb-2 text-center">Programa el robot para llegar a la meta</div>
          <div className="w-full max-w-xs relative mx-auto">
            <GameBoard
              board={level.board}
              robotPosition={robotPosition}
              targetCells={level.targetCells}
              litCells={litCells}
              robot3D={false}
              compact={true}
            />
            {/* Robot SVG sobre el tablero */}
            <div
              className="absolute z-10 pointer-events-none"
              style={{
                left: `calc((100% / ${level.board[0].length}) * ${robotPosition.x})`,
                top: `calc((100% / ${level.board.length}) * ${robotPosition.y})`,
                width: `calc(100% / ${level.board[0].length})`,
                height: `calc(100% / ${level.board.length})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "left 0.4s cubic-bezier(.4,2,.6,1), top 0.4s cubic-bezier(.4,2,.6,1)"
              }}
            >
              <div style={{ filter: 'drop-shadow(0 8px 24px #818cf8cc) drop-shadow(0 0px 8px #38d9a9cc)' }}>
                <RobotSVG direction={robotPosition.direction} size={56} mood={isComplete ? (isSuccess ? "happy" : "sad") : "neutral"} animate={!isComplete} />
              </div>
            </div>
          </div>
        </div>
        {/* Secuencia de órdenes a la derecha */}
        <div className="w-full md:w-[220px] flex-shrink-0 flex flex-col items-center md:items-start md:justify-start md:max-h-[340px] md:overflow-y-auto">
          <div className="w-full">
            <CommandZone
              commands={commands}
              onRemoveCommand={removeCommand}
              isExecuting={isExecuting}
              currentStep={-1}
              vertical={true}
            />
          </div>
          <div className="flex gap-2 mt-2 w-full justify-center md:justify-start">
            <Button onClick={executeCommands} disabled={isExecuting || isComplete || commands.length === 0}>
              Ejecutar
            </Button>
            <Button onClick={reset} disabled={isExecuting}>
              Reiniciar
            </Button>
          </div>
          <AnimatePresence>
            {isComplete && (
              <motion.div
                key="feedback"
                initial={isSuccess ? { scale: 0.7, opacity: 0 } : { x: -10, opacity: 0 }}
                animate={isSuccess ? { scale: [1.1, 1], opacity: 1, boxShadow: "0 0 32px #facc15,0 0 64px #818cf8" } : { x: [0, -8, 8, -8, 8, 0], opacity: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.7 }}
                className={isSuccess ? "text-green-400 font-extrabold mt-2 text-lg px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-400/20 via-pink-400/10 to-purple-400/20 shadow-lg animate-glow" : "text-red-400 font-extrabold mt-2 text-lg px-4 py-2 rounded-xl bg-gradient-to-r from-red-400/20 via-pink-400/10 to-purple-400/20 shadow-lg animate-shake"}
              >
                {isSuccess ? "¡Correcto! 🎉" : "Intenta otra secuencia"}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <style jsx global>{`
        @media (max-width: 768px) {
          .sticky.bottom-0 { position: sticky !important; bottom: 0 !important; }
        }
      `}</style>
    </div>
  )
}

// Componente de Pensamiento Algorítmico (ordenar pasos)
function AlgorithmicThinkingDemo({
  steps,
  title = "Ordena los pasos correctamente",
  onSuccess,
  cardClassName = "",
  textClassName = "",
  successClassName = ""
}: {
  steps: React.ReactNode[];
  title?: string;
  onSuccess?: () => void;
  cardClassName?: string;
  textClassName?: string;
  successClassName?: string;
}) {
  const [order, setOrder] = useState(() =>
    shuffleArray(steps.map((step, i) => ({ step, idx: i })))
  );
  const [completed, setCompleted] = useState(false);
  const [pop, setPop] = useState(false);

  function shuffleArray<T>(arr: T[]): T[] {
    return arr
      .map((a) => [Math.random(), a] as const)
      .sort((a, b) => a[0] - b[0])
      .map(([, a]) => a);
  }

  function handleDragStart(e: React.DragEvent, idx: number) {
    e.dataTransfer.setData("text/plain", idx.toString());
  }
  function handleDrop(e: React.DragEvent, idx: number) {
    const fromIdx = Number(e.dataTransfer.getData("text/plain"));
    if (fromIdx === idx) return;
    const newOrder = [...order];
    const [moved] = newOrder.splice(fromIdx, 1);
    newOrder.splice(idx, 0, moved);
    setOrder(newOrder);
  }
  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }
  function checkOrder() {
    const isCorrect = order.every((item, i) => item.idx === i);
    setCompleted(isCorrect);
    if (isCorrect && onSuccess) {
      setPop(true);
      onSuccess();
      setTimeout(() => setPop(false), 800);
    }
  }

  return (
    <div className="w-full max-w-xs mx-auto flex flex-col items-center gap-4">
      <div className="font-semibold text-center mb-2 text-yellow-400 text-lg drop-shadow-lg">{title}</div>
      <ul className="w-full flex flex-col gap-3">
        {order.map((item, i) => (
          <li
            key={i}
            className={`p-3 rounded-xl border-2 flex items-center gap-3 bg-white/90 shadow-lg cursor-move select-none transition-all duration-200 ${cardClassName} ${completed ? "border-green-400" : "border-yellow-300 hover:scale-105"} ${pop && completed ? "animate-pop" : ""}`}
            draggable={!completed}
            onDragStart={(e) => handleDragStart(e, i)}
            onDrop={(e) => handleDrop(e, i)}
            onDragOver={handleDragOver}
            style={{ minHeight: 64 }}
          >
            <span className="font-bold text-yellow-400 text-xl drop-shadow">{i + 1}.</span>
            <span className={textClassName + " flex-1"}>{item.step}</span>
          </li>
        ))}
      </ul>
      <Button onClick={checkOrder} disabled={completed} className="mt-2 bg-yellow-400 text-yellow-900 font-bold hover:bg-yellow-300 transition-all shadow">
        Comprobar
      </Button>
      {completed && (
        <div className={successClassName || "text-green-600 font-bold animate-pop mt-2"}>¡Correcto! 🥪🎉</div>
      )}
      <style jsx global>{`
        @keyframes pop {
          0% { transform: scale(1); }
          40% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
        .animate-pop {
          animation: pop 0.6s cubic-bezier(.68,-0.55,.27,1.55);
        }
      `}</style>
    </div>
  );
}

function SandwichDemo({ onComplete }: { onComplete?: () => void }) {
  // Pasos correctos (con uno opcional)
  const pasosCorrectos = [
    { texto: "Colocar una rebanada de pan en el plato 🥖", clave: "pan1" },
    { texto: "Agregar jamón y queso sobre el pan 🧀🍖", clave: "jamonQueso" },
    { texto: "Agregar lechuga (opcional) 🥬", clave: "lechuga" }, // opcional
    { texto: "Cubrir con otra rebanada de pan 🥪", clave: "pan2" },
    { texto: "Cortar el sándwich por la mitad (opcional) 🔪", clave: "cortar" },
    { texto: "¡Listo para comer! 😋", clave: "listo" },
  ];
  // Pasos distractores
  const distractores = [
    { texto: "Pelar una naranja 🍊", clave: "naranja" },
    { texto: "Servir sopa en un plato 🍲", clave: "sopa" },
    { texto: "Poner mantequilla en la sartén 🧈", clave: "mantequilla" },
  ];
  // Mezclar pasos correctos (con o sin lechuga) y distractores
  function getPasosParaMostrar() {
    // Elegir si el paso opcional (lechuga) se incluye o no en la respuesta correcta
    const incluirLechuga = Math.random() < 0.5;
    // Pasos correctos base
    const base = [pasosCorrectos[0], pasosCorrectos[1]];
    const opcional = incluirLechuga ? [pasosCorrectos[2]] : [];
    const resto = [pasosCorrectos[3], pasosCorrectos[4], pasosCorrectos[5]];
    // Mezclar distractores
    const todos = [...base, ...opcional, ...resto, ...distractores];
    // Aleatorizar
    return todos
      .map((a) => [Math.random(), a] as const)
      .sort((a, b) => a[0] - b[0])
      .map(([, a]) => a);
  }

  // Estado
  const [pasos, setPasos] = useState(getPasosParaMostrar());
  const [orden, setOrden] = useState(pasos.map((p, i) => i));
  const [feedback, setFeedback] = useState<string | null>(null);
  const [completado, setCompletado] = useState(false);

  // Drag & drop helpers
  function handleDragStart(e: React.DragEvent, idx: number) {
    e.dataTransfer.setData("text/plain", idx.toString());
  }
  function handleDrop(e: React.DragEvent, idx: number) {
    const fromIdx = Number(e.dataTransfer.getData("text/plain"));
    if (fromIdx === idx) return;
    const newOrden = [...orden];
    const [moved] = newOrden.splice(fromIdx, 1);
    newOrden.splice(idx, 0, moved);
    setOrden(newOrden);
  }
  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  // Validar orden (aceptar con o sin lechuga)
  function esOrdenCorrecto() {
    // Extraer claves en el orden actual, ignorando distractores
    const claves = orden.map((i) => pasos[i].clave).filter((k) => !["naranja","sopa","mantequilla"].includes(k));
    // Dos órdenes válidos: con o sin lechuga
    const ordenBase = ["pan1","jamonQueso","pan2","cortar","listo"];
    const ordenConLechuga = ["pan1","jamonQueso","lechuga","pan2","cortar","listo"];
    return (
      JSON.stringify(claves) === JSON.stringify(ordenBase) ||
      JSON.stringify(claves) === JSON.stringify(ordenConLechuga)
    );
  }

  function comprobar() {
    if (esOrdenCorrecto()) {
      setFeedback("¡Correcto! 🥪🎉");
      setCompletado(true);
      if (onComplete) onComplete();
    } else {
      setFeedback("Revisa el orden o quita pasos que no van 🍞❌");
    }
  }

  function reintentar() {
    const nuevosPasos = getPasosParaMostrar();
    setPasos(nuevosPasos);
    setOrden(nuevosPasos.map((_, i) => i));
    setFeedback(null);
    setCompletado(false);
  }

  return (
    <div className="w-full max-w-xs mx-auto flex flex-col items-center gap-4">
      <div className="font-semibold text-center mb-2 text-yellow-400 text-lg drop-shadow-lg">¿Cómo se arma un sándwich? Ordena los pasos.</div>
      <ul className="w-full flex flex-col gap-3">
        {orden.map((i, idx) => (
          <li
            key={idx}
            className={`p-3 rounded-xl border-2 flex items-center gap-3 bg-white/90 shadow-lg cursor-move select-none transition-all duration-200 ${completado ? "border-green-400" : "border-yellow-300 hover:scale-105"}`}
            draggable={!completado}
            onDragStart={(e) => handleDragStart(e, idx)}
            onDrop={(e) => handleDrop(e, idx)}
            onDragOver={handleDragOver}
            style={{ minHeight: 64 }}
          >
            <span className="text-2xl">{pasos[i].texto.match(/([\u{1F300}-\u{1FAFF}])/u)?.[0] || "🥪"}</span>
            <span className="text-gray-800 font-semibold text-base md:text-lg flex-1">{pasos[i].texto}</span>
          </li>
        ))}
      </ul>
      <Button onClick={comprobar} disabled={completado} className="mt-2 bg-yellow-400 text-yellow-900 font-bold hover:bg-yellow-300 transition-all shadow">
        Comprobar
      </Button>
      {feedback && (
        <div className={completado ? "text-green-600 font-bold animate-pop mt-2" : "text-red-500 font-bold animate-pop mt-2"}>{feedback}</div>
      )}
      {completado ? (
        <Button onClick={reintentar} className="mt-2 bg-pink-400 text-white font-bold hover:bg-pink-300 transition-all shadow">Jugar de nuevo</Button>
      ) : null}
    </div>
  );
}

// Componente de insignia descargable
function BadgeSection({ progress }: { progress: { nonograma: boolean, patron: boolean, robot: boolean, sandwich: boolean } }) {
  const badgePng = "/insignia-COGIT.png";
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = badgePng;
    link.download = 'insignia-demo-cogit.png';
    link.click();
  };
  const allComplete = progress.nonograma && progress.patron && progress.robot && progress.sandwich;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="mb-2">
        <div className="font-bold text-lg mb-1 text-yellow-400">Tu progreso en la demo:</div>
        <ul className="flex flex-col gap-1 text-base">
          <li className={progress.nonograma ? "text-green-400" : "text-gray-400"}>{progress.nonograma ? "✔️" : "⬜"} Nonograma</li>
          <li className={progress.patron ? "text-green-400" : "text-gray-400"}>{progress.patron ? "✔️" : "⬜"} Reconoce el Patrón</li>
          <li className={progress.robot ? "text-green-400" : "text-gray-400"}>{progress.robot ? "✔️" : "⬜"} Robot Programmer</li>
          <li className={progress.sandwich ? "text-green-400" : "text-gray-400"}>{progress.sandwich ? "✔️" : "⬜"} Sándwich</li>
        </ul>
      </div>
      <div className="relative flex items-center justify-center animate-pop-in" style={{ opacity: allComplete ? 1 : 0.4, filter: allComplete ? "none" : "grayscale(1)" }}>
        {/* Imagen PNG de la insignia, tamaño natural, máximo 100% del ancho */}
        <img src={badgePng} alt="Insignia COGIT" style={{ maxWidth: '100%', height: 'auto', display: 'block' }} />
        {/* Bloqueo visual si no está completa */}
        {!allComplete && <div className="absolute inset-0 flex items-center justify-center z-10"><span className="text-4xl text-yellow-500 bg-white/80 rounded-lg px-3 py-1">🔒</span></div>}
      </div>
      <div className="font-semibold text-lg text-yellow-700">¡Insignia de Participación!</div>
      {allComplete ? (
        <>
          <div className="text-center text-base text-pink-500 font-bold">¡Eres un Explorador COGIT! Has completado todos los retos 🎉</div>
          <div className="text-center text-sm text-blue-400">Descarga tu insignia.</div>
          <Button onClick={handleDownload} className="gap-2">
            <DownloadIcon /> Descargar insignia
          </Button>
        </>
      ) : (
        <div className="text-center text-base text-gray-400 font-bold">Completa todos los minijuegos para desbloquear tu insignia.</div>
      )}
      <style jsx global>{`
        @keyframes pop-in {
          0% { transform: scale(0.7); opacity: 0; }
          60% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pop-in {
          animation: pop-in 0.9s cubic-bezier(.68,-0.55,.27,1.55) 1;
        }
      `}</style>
    </div>
  );
}

const steps = [
  {
    title: "¡Bienvenido!",
    content: (
      <div className="relative w-full flex flex-col items-center justify-center min-h-[420px] py-10 px-4 sm:px-8 bg-gradient-to-br from-blue-950/80 via-purple-900/80 to-blue-900/80 rounded-xl shadow-xl overflow-hidden">
        {/* Fondo decorativo */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-400/20 rounded-full blur-2xl animate-pulse" />
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-yellow-400/20 rounded-full blur-2xl animate-pulse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl" />
        </div>
        {/* Logo */}
        <img src="/placeholder-logo.svg" alt="COGIT Logo" className="w-20 h-20 mb-4 z-10 drop-shadow-lg" />
        <div className="space-y-4 text-center z-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-yellow-400 drop-shadow mb-2">¡Bienvenido a la demo interactiva de COGIT!</h1>
          <p className="text-base sm:text-lg text-white/90">COGIT es una plataforma educativa diseñada para que niños, niñas y jóvenes desarrollen <span className="font-bold text-pink-300">pensamiento computacional</span> y habilidades digitales de manera divertida y accesible.</p>
          <p className="text-base sm:text-lg text-white/80">A través de minijuegos y retos interactivos, aprenderás a <span className="font-bold text-green-300">resolver problemas</span>, <span className="font-bold text-blue-300">pensar lógicamente</span> y <span className="font-bold text-purple-300">crear soluciones paso a paso</span>, ¡como lo hacen los programadores!</p>
          <p className="text-base sm:text-lg text-white/70">Esta demo te permitirá explorar algunos de nuestros juegos sin necesidad de registrarte. ¡Descubre cómo el juego puede ayudarte a aprender y potenciar tu creatividad!</p>
        </div>
        {/* Separación visual */}
        <div className="h-6 sm:h-8" />
        {/* Botón destacado */}
        <div className="flex justify-center w-full z-10">
          <button
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 text-white font-bold shadow-lg hover:scale-105 transition-transform text-lg sm:text-xl border-2 border-yellow-300/60 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            onClick={() => {
              // Avanzar al siguiente paso (simulado, el botón real se renderiza en el flujo principal)
              const nextBtn = document.querySelector('button:contains("Siguiente")');
              if (nextBtn) (nextBtn as HTMLButtonElement).click();
            }}
          >
            ¡Comenzar!
          </button>
        </div>
      </div>
    ),
  },
  {
    title: "Nonograma Demo",
    content: ({ onComplete }: { onComplete: () => void }) => (
      <div className="flex flex-col items-center w-full">
        <NonogramaDemo onComplete={onComplete} />
      </div>
    ),
  },
  {
    title: "Reconoce el Patrón",
    content: ({ onComplete }: { onComplete?: () => void }) => (
      <div className="w-full flex flex-col items-center justify-center overflow-visible">
        <PatternRecognition onComplete={onComplete || (() => {})} />
      </div>
    ),
  },
  {
    title: "Robot Programmer Demo",
    content: <RobotDemo />,
  },
  {
    title: "Arma el Sándwich",
    content: <SandwichDemo />,
  },
  {
    title: "¡Gracias!",
    // Quitar botón de registro
    content: (progressArg: { progress: { nonograma: boolean, patron: boolean, robot: boolean, sandwich: boolean } }) => (
      <div className="space-y-6 text-center flex flex-col items-center">
        <h2 className="text-xl font-bold">¡Gracias por probar la demo!</h2>
        <p>Esto es solo una muestra. Recuerda que puedes seguir explorando y aprendiendo.</p>
        <BadgeSection progress={progressArg.progress} />
      </div>
    ),
  },
];

export default function DemoTourPage() {
  // Modo desarrollador para pruebas: fuerza la insignia desbloqueada
  const DEV_MODE = false; // Poner en false para comportamiento normal

  const [step, setStep] = useState(0);
  const isFirst = step === 0;
  const isLast = step === steps.length - 1;

  // Progreso de minijuegos
  const [progress, setProgress] = useState({
    nonograma: false,
    patron: false,
    robot: false,
    sandwich: false,
  });

  // Si está en modo dev, forzar progreso completo
  const progressForView = DEV_MODE
    ? { nonograma: true, patron: true, robot: true, sandwich: true }
    : progress;

  // Detectar si el paso actual es el de Robot Programmer
  const isRobotProgrammerStep = steps[step].title === "Robot Programmer Demo";

  // Handlers para marcar minijuegos como completos
  function handleComplete(key: keyof typeof progress) {
    setProgress((prev) => ({ ...prev, [key]: true }));
  }

  // Avance automático al siguiente paso cuando se completa un minijuego
  useEffect(() => {
    // Mapeo de paso a clave de progreso (null para pasos sin minijuego)
    const stepToKey: (keyof typeof progress | null)[] = [
      null, // Bienvenida
      "nonograma",
      "patron",
      "robot",
      "sandwich",
    ];
    // Si el paso actual es un minijuego y se completó, avanzar tras un delay
    if (step > 0 && step < 5) {
      const key = stepToKey[step];
      if (key && progress[key]) {
        // Solo avanzar si no es el último paso
        if (step < steps.length - 1) {
          const timeout = setTimeout(() => setStep((s) => (s < steps.length - 1 ? s + 1 : s)), 1200);
          return () => clearTimeout(timeout);
        } else if (step === steps.length - 1) {
          setShowCongrats(true);
        }
      }
    }
  }, [progress, step]);

  const [showCongrats, setShowCongrats] = useState(false);

  // Responsive y barra de progreso
  // Determinar si mostrar los botones de navegación
  const showNavButtons = step === 0 || step === steps.length - 1;

  // Mapeo explícito de índice de paso a clave de progreso
  const progressKeys = ["nonograma", "patron", "robot", "sandwich"];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a1d23] text-white px-2">
      {/* PopUp de felicitación al finalizar */}
      <Dialog open={showCongrats} onOpenChange={setShowCongrats}>
        <div className={showCongrats ? "fixed inset-0 flex items-center justify-center z-50 bg-black/60" : "hidden"}>
          <div className="bg-[#181c24] rounded-2xl shadow-2xl p-8 max-w-md w-full flex flex-col items-center animate-pop-in border-2 border-yellow-400/40">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">¡Felicidades!</h2>
            <p className="text-lg text-white mb-4">Has completado la demo y diste un paso importante en el desarrollo de tu <span className="text-pink-400 font-bold">pensamiento computacional</span>.</p>
            <p className="text-base text-blue-200 mb-4">Ser consciente de tus habilidades es el primer paso para potenciarlas. ¡Sigue explorando, resolviendo retos y creando soluciones! El futuro digital está en tus manos 🚀</p>
            <Button onClick={() => setShowCongrats(false)} className="bg-yellow-400 text-yellow-900 font-bold mt-2">Cerrar</Button>
          </div>
        </div>
      </Dialog>
      {isRobotProgrammerStep ? (
        <div className="w-full flex flex-col items-center">
          {/* Barra de progreso y título igual que siempre */}
          <div className="w-full max-w-md sm:max-w-xl flex flex-col items-center relative mb-4">
            <div className="w-full flex items-center justify-center mb-4">
              <div className="flex gap-1 w-full max-w-xs">
                {steps.map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 h-2 rounded-full transition-all duration-300 ${i <= step ? "bg-yellow-400" : "bg-gray-200"}`}
                  />
                ))}
              </div>
            </div>
            <h2 className="mb-2 text-lg font-semibold text-center w-full">{steps[step].title}</h2>
          </div>
          {/* El minijuego ocupa el ancho necesario, sin card oscuro */}
          <div className="mb-6 w-full flex flex-col items-center justify-center min-h-[120px]">
            {typeof steps[step].content === "function"
              ? steps[step].content({
                  onComplete: () => {
                    const key = progressKeys[step - 1];
                    if (key) setProgress((prev) => ({ ...prev, [key]: true }));
                  },
                  progress: progressForView
                })
              : steps[step].content}
          </div>
          {/* Mostrar botones de navegación en todos los pasos */}
          <div className="flex gap-2 w-full max-w-md sm:max-w-xl justify-center mt-2">
            <Button onClick={() => setStep(step - 1)} disabled={isFirst}>Anterior</Button>
            <Button onClick={() => {
              if (isLast) setShowCongrats(true);
              else setStep(step + 1);
            }} disabled={isLast && showCongrats}>{isLast ? "Finalizar" : "Siguiente"}</Button>
          </div>
        </div>
      ) : step === 2 ? (
        // Paso especial: Reconoce el Patrón sin card restrictivo
        <div className="w-full flex flex-col items-center justify-center">
          <div className="w-full flex flex-col items-center justify-center overflow-visible">
            {typeof steps[step].content === "function"
              ? steps[step].content({
                  onComplete: () => {
                    const key = progressKeys[step - 1];
                    if (key) setProgress((prev) => ({ ...prev, [key]: true }));
                  },
                  progress: progressForView
                })
              : steps[step].content}
          </div>
          {/* Mostrar botones de navegación en todos los pasos */}
          <div className="flex gap-2 w-full max-w-md sm:max-w-xl justify-center mt-2">
            <Button onClick={() => setStep(step - 1)} disabled={isFirst}>Anterior</Button>
            <Button onClick={() => {
              if (isLast) setShowCongrats(true);
              else setStep(step + 1);
            }} disabled={isLast && showCongrats}>{isLast ? "Finalizar" : "Siguiente"}</Button>
          </div>
        </div>
      ) : (
        // Para los demás pasos, sigue usando el card oscuro
        <div className="w-full max-w-md sm:max-w-xl bg-[#1e2330] rounded-xl shadow-lg p-4 sm:p-8 flex flex-col items-center relative">
          {/* Barra de progreso */}
          <div className="w-full flex items-center justify-center mb-4">
            <div className="flex gap-1 w-full max-w-xs">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-2 rounded-full transition-all duration-300 ${i <= step ? "bg-yellow-400" : "bg-gray-200"}`}
                />
              ))}
            </div>
          </div>
          <h2 className="mb-2 text-lg font-semibold text-center w-full">{steps[step].title}</h2>
          <div className="mb-6 w-full flex flex-col items-center justify-center min-h-[120px]">
            {typeof steps[step].content === "function"
              ? steps[step].content({
                  onComplete: () => {
                    const key = progressKeys[step - 1];
                    if (key) setProgress((prev) => ({ ...prev, [key]: true }));
                  },
                  progress: progressForView
                })
              : steps[step].content}
          </div>
          {/* Mostrar botones de navegación en todos los pasos */}
          <div className="flex gap-2 w-full justify-center mt-2">
            <Button onClick={() => setStep(step - 1)} disabled={isFirst}>Anterior</Button>
            <Button onClick={() => {
              if (isLast) setShowCongrats(true);
              else setStep(step + 1);
            }} disabled={isLast && showCongrats}>{isLast ? "Finalizar" : "Siguiente"}</Button>
          </div>
        </div>
      )}
    </div>
  );
}
