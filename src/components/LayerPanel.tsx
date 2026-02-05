import { earthLayers, type EarthLayer } from "../data/layers";

interface LayerPanelProps {
  selectedLayer: string | null;
  onSelectLayer: (id: string | null) => void;
}

function LayerButton({
  layer,
  isSelected,
  onClick,
}: {
  layer: EarthLayer;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-3 group ${
        isSelected
          ? "bg-white/20 backdrop-blur-sm shadow-lg scale-[1.02] border border-white/30"
          : "hover:bg-white/10 border border-transparent"
      }`}
    >
      <span className="text-xl flex-shrink-0">{layer.icon}</span>
      <div className="min-w-0">
        <div
          className={`font-semibold text-sm transition-colors ${
            isSelected ? "text-white" : "text-white/80 group-hover:text-white"
          }`}
        >
          {layer.name}
        </div>
        <div className="text-[11px] text-white/50">{layer.depth}</div>
      </div>
      <div
        className="ml-auto w-3 h-3 rounded-full flex-shrink-0 border border-white/30"
        style={{ backgroundColor: layer.colorHex }}
      />
    </button>
  );
}

export function LayerPanel({ selectedLayer, onSelectLayer }: LayerPanelProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {earthLayers.map((layer) => (
        <LayerButton
          key={layer.id}
          layer={layer}
          isSelected={selectedLayer === layer.id}
          onClick={() =>
            onSelectLayer(selectedLayer === layer.id ? null : layer.id)
          }
        />
      ))}
    </div>
  );
}
