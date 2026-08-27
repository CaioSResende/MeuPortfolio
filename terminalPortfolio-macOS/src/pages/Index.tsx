import { useState, useCallback, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import MenuBar from "@/components/MenuBar";
import Dock, { apps } from "@/components/Dock";
import AppWindow from "@/components/AppWindow";
import { BASE_WIDTH, BASE_HEIGHT, getUIScale } from "@/lib/uiScale";

interface OpenApp {
  id: string;
  zIndex: number;
  cascadeIndex: number;
}

const Index = () => {
  const [openApps, setOpenApps]   = useState<OpenApp[]>([]);
  const [topZ, setTopZ]           = useState(10);
  const [cascadeCount, setCascadeCount] = useState(0);
  const [maximizedApp, setMaximizedApp] = useState<string | null>(null);
  const [scale, setScale]         = useState(() => getUIScale());

  useEffect(() => {
    const onResize = () => setScale(getUIScale());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleAppClick = useCallback(
    (id: string) => {
      setOpenApps((prev) => {
        const existing = prev.find((a) => a.id === id);
        if (existing) {
          return prev.filter((a) => a.id !== id);
        }
        const newZ = topZ + 1;
        setTopZ(newZ);
        const newCascadeIndex = cascadeCount;
        setCascadeCount(newCascadeIndex + 1);
        return [...prev, { id, zIndex: newZ, cascadeIndex: newCascadeIndex }];
      });
    },
    [topZ, cascadeCount]
  );

  const handleFocus = useCallback(
    (id: string) => {
      const newZ = topZ + 1;
      setTopZ(newZ);
      setOpenApps((prev) =>
        prev.map((a) => (a.id === id ? { ...a, zIndex: newZ } : a))
      );
    },
    [topZ]
  );

  const handleClose = useCallback((id: string) => {
    setOpenApps((prev) => prev.filter((a) => a.id !== id));
    setMaximizedApp((prev) => (prev === id ? null : prev));
  }, []);

  return (
    <div className="w-screen h-screen mac-desktop-bg overflow-hidden relative flex items-start justify-center">
      <MenuBar scale={scale} />

      <div
        style={{
          width: BASE_WIDTH,
          height: BASE_HEIGHT,
          flexShrink: 0,
          position: "relative",
          transform: `scale(${scale})`,
          transformOrigin: "top center",
        }}
      >
        <AnimatePresence>
          {openApps.map((openApp) => {
            const appInfo = apps.find((a) => a.id === openApp.id);
            if (!appInfo) return null;
            return (
              <AppWindow
                key={openApp.id}
                app={appInfo}
                zIndex={openApp.zIndex}
                cascadeIndex={openApp.cascadeIndex}
                onClose={() => handleClose(openApp.id)}
                onFocus={() => handleFocus(openApp.id)}
                onOpenApp={handleAppClick}
                onMaximizeChange={(isMax) => setMaximizedApp(isMax ? openApp.id : null)}
              />
            );
          })}
        </AnimatePresence>

        {!maximizedApp && (
          <Dock
            activeApps={openApps.map((a) => a.id)}
            onAppClick={handleAppClick}
          />
        )}
      </div>
    </div>
  );
};

export default Index;