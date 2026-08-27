import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const PLACES = [
  {
    id: "belohorizonte",
    name: "Belo Horizonte",
    state: "Minas Gerais, BR",
    emoji: "🏠",
    coords: [-19.9167, -43.9345] as [number, number],
    description: "Cidade onde sempre morei com minha família. Onde nasci, cresci e espero viver por mais muitos anos.",
    photo: "/belohorizonte.jpg",
    color: "#16a34a",
  },
  {
    id: "resendecosta",
    name: "Resende Costa",
    state: "Minas Gerais, BR",
    emoji: "🏘️",
    coords: [-20.9197, -44.2406] as [number, number],
    description: "Cidade da família do meu pai, onde no passado costumava passar férias com meus primos, vivendo uma vida de interior.",
    photo: "/resendecosta.jpg",
    color: "#b45309",
  },
  {
    id: "capitolio",
    name: "Capitólio",
    state: "Minas Gerais, BR",
    emoji: "🏔️",
    coords: [-20.6122, -46.0442] as [number, number],
    description: "Cidade onde já frequentei algumas vezes, no passado com minha família e mais recentemente com minha atual empresa, a ForceOne. Sempre me deslumbro com as paisagens.",
    photo: "/capitolio.jpg",
    color: "#c2410c",
  },
  {
    id: "buzios",
    name: "Búzios",
    state: "Rio de Janeiro, BR",
    emoji: "🌊",
    coords: [-22.7469, -41.8819] as [number, number],
    description: "Meu destino favorito para praia, principalmente no reveillon. Foi lá que passei os dois ultimos com meus amigos.",
    photo: "/buzios.jpg",
    color: "#0369a1",
  },
  {
    id: "cabofrio",
    name: "Cabo Frio",
    state: "Rio de Janeiro, BR",
    emoji: "🏖️",
    coords: [-22.8794, -42.0189] as [number, number],
    description: "Praia favorita dos meus pais, onde geralmente vamos para nossas viagens em familia.",
    photo: "/cabofrio.jpg",
    color: "#0284c7",
  },
  {
    id: "salvador",
    name: "Salvador",
    state: "Bahia, BR",
    emoji: "🎭",
    coords: [-12.9714, -38.5014] as [number, number],
    description: "Fui a trabalho com a minha antiga empresa, onde atuei na parte de infraestrutura para a aplicação da prova da Sociedade Brasileira de Nefrologia. Durante a operação, fui responsável por preparar e validar o ambiente tecnológico do local, garantindo o pleno funcionamento das máquinas utilizadas pelos candidatos. Realizei também a configuração e a organização da rede local, assegurando conectividade estável e adequada para a execução da prova, além de acompanhar e prestar suporte técnico durante toda a aplicação para prevenir e resolver eventuais incidentes.\n\nAproveitei a oportunidade para conhecer melhor a cidade e experimentar a famosa gastronomia baiana, tornando a viagem uma experiência enriquecedora tanto profissionalmente quanto culturalmente.",
    photo: "/salvador.jpg",
    color: "#7c3aed",
  },
  {
    id: "orlando",
    name: "Orlando",
    state: "Florida, EUA",
    emoji: "🎡",
    coords: [28.5383, -81.3792] as [number, number],
    description: "Uma viagem fantastica que fiz com minhas irmãs e meus tios e primos. Os parques são realmente mágicos e espero voltar um dia com os meus filhos para que eles possam viver a mesma experiência.",
    photo: "/orlando.jpg",
    color: "#dc2626",
  },
];

export default function MapsApp() {
  const mapRef      = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const [selected, setSelected] = useState<typeof PLACES[0] | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, {
      center: [-18, -48],
      zoom: 4,
      zoomControl: false,
      attributionControl: false,
    });

    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}", {
      maxZoom: 16,
    }).addTo(map);
    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}", {
      maxZoom: 16,
    }).addTo(map);

    L.control.zoom({ position: "bottomright" }).addTo(map);

    setTimeout(() => map.invalidateSize(), 50);
    setTimeout(() => map.invalidateSize(), 300);
    setTimeout(() => map.invalidateSize(), 800);

    const ro = new ResizeObserver(() => map.invalidateSize());
    if (mapRef.current) ro.observe(mapRef.current);

    PLACES.forEach((place) => {
      const icon = L.divIcon({
        className: "",
        html: `
          <div style="
            width: 26px; height: 26px;
            background: ${place.color};
            border: 2px solid rgba(255,255,255,0.85);
            border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            box-shadow: 0 2px 8px rgba(0,0,0,0.5);
            cursor: pointer;
            transition: transform 0.15s ease;
          ">
            <span style="font-size: 12px; line-height: 1;">${place.emoji}</span>
          </div>
        `,
        iconSize: [26, 26],
        iconAnchor: [13, 13],
      });

      const marker = L.marker(place.coords, { icon }).addTo(map);
      marker.on("click", () => setSelected(place));
      marker.on("mouseover", () => {
        (marker.getElement()?.querySelector("div") as HTMLElement | null)?.style.setProperty("transform", "scale(1.15)");
      });
      marker.on("mouseout", () => {
        (marker.getElement()?.querySelector("div") as HTMLElement | null)?.style.setProperty("transform", "scale(1)");
      });
    });

    mapInstance.current = map;

    return () => {
      ro.disconnect();
      map.remove();
      mapInstance.current = null;
    };
  }, []);

  const flyTo = (place: typeof PLACES[0]) => {
    setSelected(place);
    mapInstance.current?.flyTo(place.coords, 10, { duration: 1.5 });
  };

  return (
    <div className="flex w-full h-full overflow-hidden" style={{ background: "#0f1117", fontFamily: "system-ui, -apple-system, sans-serif" }}>

      {/* Sidebar */}
      <div
        className="flex flex-col overflow-hidden flex-shrink-0"
        style={{ width: "260px", background: "#13151a", borderRight: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="px-5 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "#4a5568" }}>My Travels</p>
          <p className="text-lg font-semibold" style={{ color: "#e2e8f0" }}>Places I've been</p>
        </div>

        <div className="flex-1 overflow-y-auto">
          {PLACES.map((place) => {
            const isActive = selected?.id === place.id;
            return (
              <button
                key={place.id}
                onClick={() => flyTo(place)}
                className="w-full text-left px-5 py-3 flex items-center gap-3 transition-all"
                style={{
                  background: isActive ? "rgba(255,255,255,0.06)" : "transparent",
                  borderLeft: isActive ? `3px solid ${place.color}` : "3px solid transparent",
                }}
              >
                <span style={{
                  width: "32px", height: "32px", borderRadius: "50%",
                  background: `${place.color}22`, border: `1px solid ${place.color}44`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "16px", flexShrink: 0,
                }}>
                  {place.emoji}
                </span>
                <div>
                  <p className="text-sm font-medium" style={{ color: isActive ? "#e2e8f0" : "#9ca3af" }}>{place.name}</p>
                  <p className="text-xs" style={{ color: "#4a5568" }}>{place.state}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="px-5 py-3 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <p className="text-xs" style={{ color: "#4a5568" }}>
            {PLACES.length} lugares visitados
          </p>
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
      </div>

      {/* Info panel */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key={selected.id}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 340, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
            className="flex-shrink-0 overflow-hidden"
            style={{ background: "#13151a", borderLeft: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div style={{ width: 340, height: "100%", overflowY: "auto" }}>
              {/* Photo area */}
              <div
                className="w-full flex items-center justify-center relative"
                style={{
                  height: "220px",
                  background: `linear-gradient(135deg, ${selected.color}33, ${selected.color}11)`,
                  borderBottom: `1px solid ${selected.color}33`,
                }}
              >
                <button
                  onClick={() => setSelected(null)}
                  className="text-xs px-2 py-1 rounded absolute top-3 right-3"
                  style={{ color: "#e2e8f0", background: "rgba(0,0,0,0.4)", zIndex: 1 }}
                >
                  ✕
                </button>
                {selected.photo ? (
                  <img
                    src={selected.photo}
                    alt={selected.name}
                    style={{ width: "100%", height: "100%", display: "block", objectFit: "cover" }}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                      (e.currentTarget.nextElementSibling as HTMLElement).style.display = "flex";
                    }}
                  />
                ) : null}
                <div style={{ display: selected.photo ? "none" : "flex", flexDirection: "column", alignItems: "center", gap: "8px", padding: "32px" }}>
                  <span style={{ fontSize: "40px" }}>{selected.emoji}</span>
                  <p className="text-sm" style={{ color: "#4a5568" }}>Foto em breve</p>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <p className="text-xl font-semibold" style={{ color: "#e2e8f0" }}>{selected.name}</p>
                <p className="text-sm mb-4" style={{ color: selected.color }}>{selected.state}</p>
                <p className="text-sm leading-relaxed" style={{ color: "#9ca3af" }}>
                  {selected.description.split("\n\n").map((para, i, arr) => (
                    <span key={i}>{para}{i < arr.length - 1 && <><br/><br/></>}</span>
                  ))}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}