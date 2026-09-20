"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useLanguage } from "@/context/language-context";
import { Play, RotateCw, Trophy, Terminal, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";

type Position = { x: number; y: number };
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

const GRID_SIZE = 20;
const INITIAL_SPEED = 120;

const BUG_LABELS = [
  "404",
  "NaN",
  "NullPointer",
  "SyntaxError",
  "CORS",
  "MemoryLeak",
  "TypeError",
];

export default function RetroSnakeGame() {
  const { language } = useLanguage();
  const [snake, setSnake] = useState<Position[]>([
    { x: 10, y: 10 },
    { x: 10, y: 11 },
    { x: 10, y: 12 },
  ]);
  const [food, setFood] = useState<Position>({ x: 5, y: 5 });
  const [foodLabel, setFoodLabel] = useState<string>("404");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("oktavian_snake_highscore");
      return saved ? parseInt(saved, 10) : 0;
    }
    return 0;
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const directionRef = useRef<Direction>("UP");

  const spawnFood = useCallback((currentSnake: Position[]) => {
    let newFood: Position;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      const onSnake = currentSnake.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y
      );
      if (!onSnake) break;
    }
    const label = BUG_LABELS[Math.floor(Math.random() * BUG_LABELS.length)];
    setFood(newFood);
    setFoodLabel(label);
  }, []);

  const resetGame = () => {
    const initialSnake: Position[] = [
      { x: 10, y: 10 },
      { x: 10, y: 11 },
      { x: 10, y: 12 },
    ];
    setSnake(initialSnake);
    directionRef.current = "UP";
    setScore(0);
    setGameOver(false);
    spawnFood(initialSnake);
    setIsPlaying(true);
  };

  const handleGameOver = useCallback(() => {
    setIsPlaying(false);
    setGameOver(true);
    if (score > highScore) {
      setHighScore(score);
      if (typeof window !== "undefined") {
        localStorage.setItem("oktavian_snake_highscore", score.toString());
      }
    }
  }, [score, highScore]);

  // Keyboard navigation listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying) return;

      const current = directionRef.current;
      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          if (current !== "DOWN") {
            directionRef.current = "UP";
            e.preventDefault();
          }
          break;
        case "ArrowDown":
        case "s":
        case "S":
          if (current !== "UP") {
            directionRef.current = "DOWN";
            e.preventDefault();
          }
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          if (current !== "RIGHT") {
            directionRef.current = "LEFT";
            e.preventDefault();
          }
          break;
        case "ArrowRight":
        case "d":
        case "D":
          if (current !== "LEFT") {
            directionRef.current = "RIGHT";
            e.preventDefault();
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown, { passive: false });
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying]);

  // Game loop tick
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setSnake((prevSnake) => {
        const head = { ...prevSnake[0] };
        const curDir = directionRef.current;

        if (curDir === "UP") head.y -= 1;
        if (curDir === "DOWN") head.y += 1;
        if (curDir === "LEFT") head.x -= 1;
        if (curDir === "RIGHT") head.x += 1;

        // Collision with walls
        if (
          head.x < 0 ||
          head.x >= GRID_SIZE ||
          head.y < 0 ||
          head.y >= GRID_SIZE
        ) {
          handleGameOver();
          return prevSnake;
        }

        // Collision with self
        const hitSelf = prevSnake.some(
          (seg) => seg.x === head.x && seg.y === head.y
        );
        if (hitSelf) {
          handleGameOver();
          return prevSnake;
        }

        const newSnake = [head, ...prevSnake];

        // Check if food eaten
        if (head.x === food.x && head.y === food.y) {
          setScore((s) => s + 10);
          spawnFood(newSnake);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, INITIAL_SPEED);

    return () => clearInterval(interval);
  }, [isPlaying, food, spawnFood, handleGameOver]);

  const changeDirection = (newDir: Direction) => {
    if (!isPlaying) return;
    const current = directionRef.current;
    if (newDir === "UP" && current !== "DOWN") {
      directionRef.current = "UP";
    }
    if (newDir === "DOWN" && current !== "UP") {
      directionRef.current = "DOWN";
    }
    if (newDir === "LEFT" && current !== "RIGHT") {
      directionRef.current = "LEFT";
    }
    if (newDir === "RIGHT" && current !== "LEFT") {
      directionRef.current = "RIGHT";
    }
  };

  return (
    <section
      id="playground"
      className="py-20 md:py-28 border-b border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#090d16] transition-colors"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Sandeep-style Section Header Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-4 font-mono text-xs text-slate-400">
            <span className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">06</span>
            <span className="h-4 w-px bg-slate-300 dark:bg-slate-700" />
            <span className="uppercase tracking-[0.25em] text-slate-900 dark:text-white font-semibold">
              {language === "id" ? "Mini Playground" : "Interactive Playground"}
            </span>
          </div>
          <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
            {language === "id" ? "Rehat Sejenak" : "Take A Break"}
          </span>
        </div>

        {/* Massive Editorial Headline */}
        <div className="max-w-3xl space-y-3">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.12]">
            {language === "id"
              ? "Retro Terminal Snake: Tangkap bug & pertahankan clean code."
              : "Retro Terminal Snake: Hunt down bugs & compile clean code."}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-normal">
            {language === "id"
              ? "Gunakan tombol panah keyboard atau kontrol sentuh virtual di layar untuk menavigasi snake."
              : "Use keyboard arrow keys / WASD or the virtual touch D-pad below to steer the terminal snake."}
          </p>
        </div>

        {/* Game Window Enclosure */}
        <div className="max-w-xl mx-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-950 text-white shadow-2xl overflow-hidden font-mono">
          {/* Terminal Title Bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/90 text-xs">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-slate-300 font-bold">bug_eater_v2026.exe</span>
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <span className="text-slate-400">
                SCORE: <strong className="text-white">{score}</strong>
              </span>
              <span className="text-amber-400 flex items-center gap-1">
                <Trophy className="w-3 h-3" />
                <span>{highScore}</span>
              </span>
            </div>
          </div>

          {/* 20x20 Grid Display */}
          <div className="relative p-2 sm:p-4 bg-black flex items-center justify-center">
            <div
              className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] bg-slate-950 border border-slate-800 rounded-lg overflow-hidden"
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
              }}
            >
              {/* Subtle Grid Lines Overlay */}
              <div className="absolute inset-0 grid grid-cols-20 grid-rows-20 pointer-events-none opacity-10">
                {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => (
                  <div key={i} className="border-[0.5px] border-slate-700" />
                ))}
              </div>

              {/* Snake Rendering */}
              {snake.map((segment, idx) => (
                <div
                  key={`seg-${idx}`}
                  style={{
                    gridColumnStart: segment.x + 1,
                    gridRowStart: segment.y + 1,
                  }}
                  className={`rounded-[2px] transition-all ${
                    idx === 0
                      ? "bg-emerald-400 shadow-[0_0_8px_#34d399]"
                      : "bg-emerald-600/80"
                  }`}
                />
              ))}

              {/* Bug Food Rendering */}
              <div
                style={{
                  gridColumnStart: food.x + 1,
                  gridRowStart: food.y + 1,
                }}
                className="relative flex items-center justify-center rounded-[2px] bg-rose-500 animate-pulse shadow-[0_0_10px_#f43f5e]"
                title={foodLabel}
              >
                <span className="text-[7px] sm:text-[8px] font-bold text-white tracking-tighter">
                  !
                </span>
              </div>

              {/* Overlay: Not Started or Game Over */}
              {(!isPlaying || gameOver) && (
                <div className="absolute inset-0 bg-black/85 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center space-y-4 z-20 animate-in fade-in duration-200">
                  {gameOver ? (
                    <div className="space-y-1">
                      <p className="text-rose-500 font-bold text-sm tracking-widest uppercase">
                        {language === "id" ? "FATAL ERROR: COLLISION DETECTED" : "FATAL ERROR: COLLISION DETECTED"}
                      </p>
                      <p className="text-xs text-slate-300">
                        {language === "id" ? `Skor Akhir: ${score}` : `Final Score: ${score}`}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <p className="text-emerald-400 font-bold text-sm tracking-widest uppercase">
                        {language === "id" ? "CLI SNAKE READY" : "CLI SNAKE READY"}
                      </p>
                      <p className="text-xs text-slate-400">
                        {language === "id"
                          ? "Tekan tombol Mulai untuk bermain"
                          : "Press Start to begin terminal session"}
                      </p>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={resetGame}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs tracking-wider uppercase transition-colors shadow-md"
                  >
                    {gameOver ? (
                      <>
                        <RotateCw className="w-3.5 h-3.5" />
                        <span>{language === "id" ? "Main Lagi" : "Try Again"}</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>{language === "id" ? "Mulai Game" : "Start Game"}</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Virtual Touch D-Pad for Mobile Users */}
          <div className="p-4 bg-slate-900 border-t border-slate-800 flex flex-col items-center gap-2">
            <div className="text-[10px] text-slate-500 tracking-wider uppercase font-mono mb-1">
              Virtual Touch D-Pad
            </div>

            <button
              type="button"
              onClick={() => changeDirection("UP")}
              className="p-3 rounded-lg bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-slate-200 transition-colors focus:outline-none"
              aria-label="Up"
            >
              <ArrowUp className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => changeDirection("LEFT")}
                className="p-3 rounded-lg bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-slate-200 transition-colors focus:outline-none"
                aria-label="Left"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => changeDirection("DOWN")}
                className="p-3 rounded-lg bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-slate-200 transition-colors focus:outline-none"
                aria-label="Down"
              >
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => changeDirection("RIGHT")}
                className="p-3 rounded-lg bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-slate-200 transition-colors focus:outline-none"
                aria-label="Right"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
