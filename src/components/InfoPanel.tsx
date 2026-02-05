import { earthLayers } from "../data/layers";

interface InfoPanelProps {
  selectedLayer: string | null;
  onClose: () => void;
}

export function InfoPanel({ selectedLayer, onClose }: InfoPanelProps) {
  const layer = earthLayers.find((l) => l.id === selectedLayer);

  if (!layer) return null;

  return (
    <div className="animate-fadeIn">
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden shadow-2xl">
        {/* Header */}
        <div
          className="p-5 relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${layer.colorHex}33, ${layer.colorHex}11)`,
          }}
        >
          <div className="absolute top-0 right-0 text-[80px] opacity-10 -mr-2 -mt-2">
            {layer.icon}
          </div>
          <div className="flex items-start justify-between relative z-10">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-3xl">{layer.icon}</span>
                <div>
                  <h2 className="text-xl font-bold text-white">{layer.name}</h2>
                  <p className="text-white/50 text-xs italic">{layer.nameEn}</p>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors bg-white/10 rounded-full w-8 h-8 flex items-center justify-center hover:bg-white/20"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
          {/* Description */}
          <p className="text-white/80 text-sm leading-relaxed">
            {layer.description}
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-2">
            <StatCard label="Profundidad" value={layer.depth} icon="📏" />
            <StatCard label="Espesor" value={layer.thickness} icon="📐" />
            <StatCard label="Temperatura" value={layer.temperature} icon="🌡️" />
            <StatCard label="Estado" value={layer.state} icon="🔬" />
            <StatCard label="Densidad" value={layer.density} icon="⚖️" />
          </div>

          {/* Composition */}
          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm">🧪</span>
              <h3 className="text-white/90 font-semibold text-sm">
                Composición
              </h3>
            </div>
            <p className="text-white/70 text-xs leading-relaxed">
              {layer.composition}
            </p>
          </div>

          {/* Fun Facts */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm">💡</span>
              <h3 className="text-white/90 font-semibold text-sm">
                Datos Interesantes
              </h3>
            </div>
            <div className="space-y-2">
              {layer.facts.map((fact, index) => (
                <div
                  key={index}
                  className="flex gap-2 bg-white/5 rounded-lg p-2.5 border border-white/5 hover:border-white/15 transition-colors"
                >
                  <span className="text-yellow-400 text-xs mt-0.5 flex-shrink-0">
                    ★
                  </span>
                  <p className="text-white/70 text-xs leading-relaxed">
                    {fact}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="bg-white/5 rounded-lg p-2.5 border border-white/10 hover:bg-white/10 transition-colors">
      <div className="flex items-center gap-1.5 mb-1">
        <span className="text-xs">{icon}</span>
        <span className="text-white/50 text-[10px] uppercase tracking-wider font-medium">
          {label}
        </span>
      </div>
      <p className="text-white/90 text-xs font-medium">{value}</p>
    </div>
  );
}
