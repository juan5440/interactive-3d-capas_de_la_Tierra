import { useState, Suspense } from "react";
import { EarthScene } from "./components/EarthScene";
import { LayerPanel } from "./components/LayerPanel";
import { InfoPanel } from "./components/InfoPanel";
import { earthLayers } from "./data/layers";

function LoadingScreen() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-400/30 border-t-blue-400 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-white/70 text-sm">Cargando modelo 3D...</p>
      </div>
    </div>
  );
}

export function App() {
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);
  const [cutaway, setCutaway] = useState(true);
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeTab, setActiveTab] = useState<"layers" | "quiz">("layers");
  const [quizState, setQuizState] = useState({
    current: 0,
    score: 0,
    answered: false,
    selectedAnswer: -1,
    finished: false,
  });

  const selectedLayerData = earthLayers.find((l) => l.id === selectedLayer);

  const quizQuestions = [
    {
      question: "¿Cuál es la capa más caliente de la Tierra?",
      options: ["Manto Superior", "Núcleo Interno", "Corteza", "Núcleo Externo"],
      correct: 1,
      explanation: "El núcleo interno alcanza temperaturas de 5,000°C a 7,000°C, comparables a la superficie del Sol.",
    },
    {
      question: "¿Qué capa genera el campo magnético de la Tierra?",
      options: ["Manto Inferior", "Corteza", "Núcleo Externo", "Manto Superior"],
      correct: 2,
      explanation: "Las corrientes de hierro líquido en el núcleo externo generan el campo magnético mediante el efecto dinamo.",
    },
    {
      question: "¿En qué estado se encuentra el núcleo externo?",
      options: ["Sólido", "Gaseoso", "Plasma", "Líquido"],
      correct: 3,
      explanation: "El núcleo externo está compuesto de hierro y níquel en estado líquido.",
    },
    {
      question: "¿Quién descubrió el núcleo interno de la Tierra?",
      options: ["Albert Einstein", "Inge Lehmann", "Alfred Wegener", "Isaac Newton"],
      correct: 1,
      explanation: "La sismóloga danesa Inge Lehmann descubrió el núcleo interno en 1936 mediante el análisis de ondas sísmicas.",
    },
    {
      question: "¿Cuál es el gas más abundante en la atmósfera terrestre?",
      options: ["Oxígeno", "Dióxido de carbono", "Nitrógeno", "Argón"],
      correct: 2,
      explanation: "El nitrógeno compone el 78% de la atmósfera terrestre, seguido del oxígeno con un 21%.",
    },
    {
      question: "¿Qué tipo de roca compone principalmente la corteza oceánica?",
      options: ["Granito", "Caliza", "Basalto", "Mármol"],
      correct: 2,
      explanation: "La corteza oceánica está compuesta principalmente de basalto, rica en silicio y magnesio.",
    },
    {
      question: "¿Cuál es la capa más voluminosa de la Tierra?",
      options: ["Corteza", "Manto Superior", "Manto Inferior", "Núcleo Externo"],
      correct: 2,
      explanation: "El manto inferior representa el 56% del volumen total de la Tierra, con un espesor de ~2,230 km.",
    },
    {
      question: "¿Cuál es el tamaño aproximado del núcleo interno?",
      options: ["Como Marte", "Como la Luna", "Como el Sol", "Como Júpiter"],
      correct: 1,
      explanation: "El núcleo interno tiene aproximadamente el tamaño de la Luna, con un radio de 1,221 km.",
    },
  ];

  const handleQuizAnswer = (answerIndex: number) => {
    if (quizState.answered) return;
    const isCorrect = answerIndex === quizQuestions[quizState.current].correct;
    setQuizState((prev) => ({
      ...prev,
      answered: true,
      selectedAnswer: answerIndex,
      score: isCorrect ? prev.score + 1 : prev.score,
    }));
  };

  const handleNextQuestion = () => {
    if (quizState.current < quizQuestions.length - 1) {
      setQuizState((prev) => ({
        ...prev,
        current: prev.current + 1,
        answered: false,
        selectedAnswer: -1,
      }));
    } else {
      setQuizState((prev) => ({ ...prev, finished: true }));
    }
  };

  const resetQuiz = () => {
    setQuizState({
      current: 0,
      score: 0,
      answered: false,
      selectedAnswer: -1,
      finished: false,
    });
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-indigo-950 overflow-hidden relative">
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Suspense fallback={<LoadingScreen />}>
          <EarthScene
            selectedLayer={selectedLayer}
            onSelectLayer={setSelectedLayer}
            cutaway={cutaway}
          />
        </Suspense>
      </div>

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-20 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl px-4 py-2.5 border border-white/15 shadow-xl">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">🌍</span>
                <div>
                  <h1 className="text-white font-bold text-sm tracking-wide">
                    Estructura de la Tierra
                  </h1>
                  <p className="text-white/40 text-[10px]">
                    Sistema Educativo 3D Interactivo
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Cutaway Toggle */}
            <button
              onClick={() => setCutaway(!cutaway)}
              className={`backdrop-blur-xl rounded-xl px-3 py-2 border shadow-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                cutaway
                  ? "bg-blue-500/20 border-blue-400/30 text-blue-300"
                  : "bg-white/10 border-white/15 text-white/70 hover:text-white"
              }`}
            >
              <span>{cutaway ? "🔍" : "🌐"}</span>
              <span className="hidden sm:inline">{cutaway ? "Vista Corte" : "Vista Completa"}</span>
            </button>

            {/* Toggle Sidebar */}
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="bg-white/10 backdrop-blur-xl rounded-xl px-3 py-2 border border-white/15 shadow-lg text-white/70 hover:text-white text-xs font-medium transition-all flex items-center gap-1.5"
            >
              <span>{showSidebar ? "◀" : "▶"}</span>
              <span className="hidden sm:inline">Panel</span>
            </button>
          </div>
        </div>
      </div>

      {/* Selected Layer Indicator (when no sidebar) */}
      {selectedLayerData && !showSidebar && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl px-5 py-3 border border-white/20 shadow-xl flex items-center gap-3">
            <span className="text-2xl">{selectedLayerData.icon}</span>
            <div>
              <h3 className="text-white font-bold text-sm">
                {selectedLayerData.name}
              </h3>
              <p className="text-white/50 text-xs">{selectedLayerData.depth}</p>
            </div>
            <button
              onClick={() => {
                setShowSidebar(true);
              }}
              className="ml-3 bg-white/15 hover:bg-white/25 text-white text-xs px-3 py-1.5 rounded-lg transition-colors"
            >
              Ver más
            </button>
          </div>
        </div>
      )}

      {/* Sidebar */}
      {showSidebar && (
        <div className="absolute top-16 right-3 bottom-3 z-20 w-[340px] flex flex-col gap-3 animate-slideIn">
          {/* Tab Switcher */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/15 p-1 flex gap-1 shadow-xl">
            <button
              onClick={() => setActiveTab("layers")}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "layers"
                  ? "bg-white/20 text-white shadow-md"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              🌍 Capas
            </button>
            <button
              onClick={() => setActiveTab("quiz")}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "quiz"
                  ? "bg-white/20 text-white shadow-md"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              🧠 Quiz
            </button>
          </div>

          {activeTab === "layers" && (
            <>
              {/* Layer List */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/15 p-3 shadow-xl overflow-y-auto custom-scrollbar">
                <LayerPanel
                  selectedLayer={selectedLayer}
                  onSelectLayer={setSelectedLayer}
                />
              </div>

              {/* Info Panel */}
              {selectedLayer && (
                <div className="flex-1 overflow-hidden">
                  <InfoPanel
                    selectedLayer={selectedLayer}
                    onClose={() => setSelectedLayer(null)}
                  />
                </div>
              )}

              {/* Help text when no layer selected */}
              {!selectedLayer && (
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-5 text-center">
                  <p className="text-white/40 text-sm mb-2">
                    👆 Selecciona una capa para ver su información detallada
                  </p>
                  <p className="text-white/25 text-xs">
                    También puedes hacer clic en las capas del modelo 3D
                  </p>
                </div>
              )}
            </>
          )}

          {activeTab === "quiz" && (
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/15 p-5 shadow-xl flex-1 overflow-y-auto custom-scrollbar">
              {!quizState.finished ? (
                <div>
                  {/* Progress */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white/50 text-xs">
                      Pregunta {quizState.current + 1} de {quizQuestions.length}
                    </span>
                    <span className="text-yellow-400 text-xs font-semibold">
                      ⭐ {quizState.score} puntos
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5 mb-5">
                    <div
                      className="bg-blue-400 h-1.5 rounded-full transition-all duration-500"
                      style={{
                        width: `${
                          ((quizState.current + 1) / quizQuestions.length) * 100
                        }%`,
                      }}
                    />
                  </div>

                  {/* Question */}
                  <h3 className="text-white font-bold text-base mb-4 leading-relaxed">
                    {quizQuestions[quizState.current].question}
                  </h3>

                  {/* Options */}
                  <div className="space-y-2 mb-4">
                    {quizQuestions[quizState.current].options.map(
                      (option, index) => {
                        const isCorrect =
                          index === quizQuestions[quizState.current].correct;
                        const isSelected = quizState.selectedAnswer === index;
                        let btnClass =
                          "w-full text-left px-4 py-3 rounded-xl text-sm transition-all border ";

                        if (quizState.answered) {
                          if (isCorrect) {
                            btnClass +=
                              "bg-green-500/20 border-green-400/40 text-green-300";
                          } else if (isSelected) {
                            btnClass +=
                              "bg-red-500/20 border-red-400/40 text-red-300";
                          } else {
                            btnClass +=
                              "bg-white/5 border-white/10 text-white/30";
                          }
                        } else {
                          btnClass +=
                            "bg-white/5 border-white/10 text-white/80 hover:bg-white/15 hover:border-white/25 cursor-pointer";
                        }

                        return (
                          <button
                            key={index}
                            onClick={() => handleQuizAnswer(index)}
                            className={btnClass}
                            disabled={quizState.answered}
                          >
                            <span className="font-medium mr-2 opacity-50">
                              {String.fromCharCode(65 + index)}.
                            </span>
                            {option}
                            {quizState.answered && isCorrect && (
                              <span className="ml-2">✓</span>
                            )}
                            {quizState.answered && isSelected && !isCorrect && (
                              <span className="ml-2">✗</span>
                            )}
                          </button>
                        );
                      }
                    )}
                  </div>

                  {/* Explanation */}
                  {quizState.answered && (
                    <div className="mb-4 animate-fadeIn">
                      <div className="bg-blue-500/10 border border-blue-400/20 rounded-xl p-3">
                        <p className="text-blue-300/80 text-xs leading-relaxed">
                          💡 {quizQuestions[quizState.current].explanation}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Next Button */}
                  {quizState.answered && (
                    <button
                      onClick={handleNextQuestion}
                      className="w-full bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 text-blue-300 py-2.5 rounded-xl text-sm font-semibold transition-all"
                    >
                      {quizState.current < quizQuestions.length - 1
                        ? "Siguiente Pregunta →"
                        : "Ver Resultados 🎉"}
                    </button>
                  )}
                </div>
              ) : (
                /* Results */
                <div className="text-center py-6 animate-fadeIn">
                  <div className="text-6xl mb-4">
                    {quizState.score >= quizQuestions.length * 0.8
                      ? "🏆"
                      : quizState.score >= quizQuestions.length * 0.5
                      ? "🌟"
                      : "📚"}
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">
                    ¡Quiz Completado!
                  </h3>
                  <p className="text-white/60 text-sm mb-4">
                    Obtuviste{" "}
                    <span className="text-yellow-400 font-bold">
                      {quizState.score}
                    </span>{" "}
                    de{" "}
                    <span className="text-white font-bold">
                      {quizQuestions.length}
                    </span>{" "}
                    puntos
                  </p>
                  <div className="bg-white/5 rounded-xl p-4 mb-5">
                    <div className="text-4xl font-bold text-white mb-1">
                      {Math.round(
                        (quizState.score / quizQuestions.length) * 100
                      )}
                      %
                    </div>
                    <p className="text-white/40 text-xs">
                      {quizState.score >= quizQuestions.length * 0.8
                        ? "¡Excelente! Eres un experto en geología 🌍"
                        : quizState.score >= quizQuestions.length * 0.5
                        ? "¡Bien hecho! Sigue aprendiendo 📖"
                        : "¡No te rindas! Revisa las capas y vuelve a intentar 💪"}
                    </p>
                  </div>
                  <button
                    onClick={resetQuiz}
                    className="w-full bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 text-blue-300 py-2.5 rounded-xl text-sm font-semibold transition-all"
                  >
                    🔄 Intentar de Nuevo
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Controls Help */}
      <div className="absolute bottom-3 left-3 z-20">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/10 flex items-center gap-3 text-white/30 text-[10px]">
          <span>🖱️ Rotar</span>
          <span>•</span>
          <span>🔄 Scroll: Zoom</span>
          <span>•</span>
          <span>👆 Clic: Seleccionar</span>
        </div>
      </div>
    </div>
  );
}
