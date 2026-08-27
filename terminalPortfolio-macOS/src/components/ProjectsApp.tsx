import { useState } from "react";
import { Github, ExternalLink } from "lucide-react";

type Lang = "en" | "pt";

interface Project {
  id: string;
  name: string;
  emoji: string;
  color: string;
  status: { en: string; pt: string };
  tagline: { en: string; pt: string };
  description: { en: string; pt: string };
  stack: string[];
  highlights: { en: string; pt: string }[];
  repoUrl: string;
}

const PROJECTS: Project[] = [
  {
    id: "carteira-investimentos",
    name: "Carteira Financeira",
    emoji: "💹",
    color: "#22c55e",
    status: { en: "Personal Project", pt: "Projeto Pessoal" },
    tagline: {
      en: "Local investment portfolio manager with live B3 / NYSE quotes and a modern dark dashboard.",
      pt: "Gerenciador local de carteira de investimentos com cotações em tempo real da B3/NYSE e dashboard dark moderno.",
    },
    description: {
      en: "Built to have a clear, centralized view of my investments without depending on third-party apps or exposing financial data to external clouds. A local Python + Flask server keeps everything in a SQLite database, with quotes refreshed automatically from Yahoo Finance every 15 minutes.",
      pt: "Nasceu da necessidade de ter uma visão clara e centralizada da carteira de investimentos, sem depender de aplicativos de terceiros ou expor dados financeiros em nuvens externas. Um servidor Python + Flask local mantém tudo em um banco SQLite, com cotações atualizadas automaticamente via Yahoo Finance a cada 15 minutos.",
    },
    stack: ["Python", "Flask", "SQLite", "yfinance", "Chart.js", "HTML/CSS/JS"],
    highlights: [
      { en: "Portfolio overview with total equity, capital gain and allocation charts", pt: "Resumo com patrimônio total, ganho de capital e gráficos de distribuição" },
      { en: "Automatic B3 and NYSE/NASDAQ quotes every 15 minutes via yfinance", pt: "Cotações automáticas da B3 e NYSE/NASDAQ a cada 15 minutos via yfinance" },
      { en: "Supports Stocks, FIIs, US Stocks, REITs and detailed Fixed Income", pt: "Suporte a Ações, FIIs, Stocks, REITs e Renda Fixa detalhada" },
      { en: "Dividend and contribution history with monthly goals and charts", pt: "Histórico de proventos e aportes com metas e gráficos mensais" },
      { en: "Privacy mode to blur all values, plus light/dark theme", pt: "Modo sigilo para ocultar valores, além de tema claro/escuro" },
      { en: "Full backup and restore via JSON", pt: "Backup e restauração completos via JSON" },
    ],
    repoUrl: "https://github.com/CaioSResende/CarteiraInvestimentos",
  },
];

export default function ProjectsApp() {
  const [lang, setLang]         = useState<Lang>("en");
  const [selectedId, setSelectedId] = useState(PROJECTS[0].id);
  const t = (en: string, pt: string) => (lang === "en" ? en : pt);
  const selected = PROJECTS.find((p) => p.id === selectedId)!;

  return (
    <div className="flex w-full h-full overflow-hidden" style={{ background: "#0f1117", fontFamily: "system-ui, -apple-system, sans-serif" }}>

      {/* Sidebar */}
      <div
        className="flex flex-col overflow-hidden flex-shrink-0"
        style={{ width: "240px", background: "#13151a", borderRight: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <div>
            <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "#4a5568" }}>{t("Portfolio", "Portfólio")}</p>
            <p className="text-lg font-semibold" style={{ color: "#e2e8f0" }}>{t("Projects", "Projetos")}</p>
          </div>
          <button
            onClick={() => setLang((l) => (l === "en" ? "pt" : "en"))}
            className="text-xs px-2 py-1 rounded hover:bg-white/10 transition-colors flex-shrink-0"
            style={{ color: "#9ca3af" }}
          >
            {lang === "en" ? "🇺🇸 EN" : "🇧🇷 PT"}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "thin", scrollbarColor: "#2d3748 transparent" }}>
          {PROJECTS.map((project) => {
            const isActive = selected.id === project.id;
            return (
              <button
                key={project.id}
                onClick={() => setSelectedId(project.id)}
                className="w-full text-left px-5 py-3 flex items-center gap-3 transition-all"
                style={{
                  background: isActive ? "rgba(255,255,255,0.06)" : "transparent",
                  borderLeft: isActive ? `3px solid ${project.color}` : "3px solid transparent",
                }}
              >
                <span style={{
                  width: "32px", height: "32px", borderRadius: "50%",
                  background: `${project.color}22`, border: `1px solid ${project.color}44`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "16px", flexShrink: 0,
                }}>
                  {project.emoji}
                </span>
                <div>
                  <p className="text-sm font-medium" style={{ color: isActive ? "#e2e8f0" : "#9ca3af" }}>{project.name}</p>
                  <p className="text-xs" style={{ color: "#4a5568" }}>{t(project.status.en, project.status.pt)}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="px-5 py-3 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <p className="text-xs" style={{ color: "#4a5568" }}>
            {PROJECTS.length} {t("project", "projeto")}{PROJECTS.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Detail */}
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "thin", scrollbarColor: "#2d3748 transparent" }}>
        <div
          className="px-8 py-8"
          style={{ background: `linear-gradient(135deg, ${selected.color}22, transparent 60%)`, borderBottom: `1px solid ${selected.color}33` }}
        >
          <div className="flex items-center gap-4 mb-4">
            <span style={{
              width: "56px", height: "56px", borderRadius: "16px",
              background: `${selected.color}22`, border: `1px solid ${selected.color}44`,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", flexShrink: 0,
            }}>
              {selected.emoji}
            </span>
            <div>
              <p className="text-2xl font-semibold" style={{ color: "#e2e8f0" }}>{selected.name}</p>
              <p className="text-sm" style={{ color: selected.color }}>{t(selected.status.en, selected.status.pt)}</p>
            </div>
          </div>

          <p className="text-sm leading-relaxed max-w-2xl" style={{ color: "#9ca3af" }}>
            {t(selected.tagline.en, selected.tagline.pt)}
          </p>

          <div className="flex gap-2 mt-5">
            <a
              href={selected.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-opacity hover:opacity-90"
              style={{ background: selected.color, color: "#0f1117" }}
            >
              <Github size={16} />
              {t("View on GitHub", "Ver no GitHub")}
              <ExternalLink size={13} />
            </a>
          </div>
        </div>

        <div className="px-8 py-6 max-w-2xl">
          <p className="text-sm leading-relaxed mb-6" style={{ color: "#9ca3af" }}>
            {t(selected.description.en, selected.description.pt)}
          </p>

          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#4a5568" }}>{t("Tech Stack", "Tecnologias")}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {selected.stack.map((tech) => (
              <span
                key={tech}
                className="text-xs px-3 py-1 rounded-full"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#e2e8f0" }}
              >
                {tech}
              </span>
            ))}
          </div>

          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#4a5568" }}>{t("Highlights", "Destaques")}</p>
          <ul className="space-y-2">
            {selected.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-sm leading-relaxed" style={{ color: "#9ca3af" }}>
                <span style={{ color: selected.color }} className="mt-0.5">●</span>
                <span>{t(h.en, h.pt)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
