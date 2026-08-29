import { lazy, Suspense, useEffect, useState } from "react";

const ThreeScene = lazy(() => import("./ThreeScene"));

const COLORS = {
  black: "#171717",
  white: "#f2f2f2",
  pink: "#e8a4c9",
};

type ColorKey = keyof typeof COLORS;

function App() {
  const [color, setColor] = useState<ColorKey>("black");
  const [autoRotate, setAutoRotate] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const updateMotion = () => {
      setReducedMotion(mediaQuery.matches);
    };

    updateMotion();
    mediaQuery.addEventListener("change", updateMotion);

    return () => {
      mediaQuery.removeEventListener("change", updateMotion);
    };
  }, []);

  return (
    <main className="app">
      <header className="header">
        <div>
          <p className="eyebrow">3D PRODUCT EXPERIENCE</p>
          <h1>Studio Headphones</h1>
        </div>

        <p className="hint">Drag to rotate · Scroll to zoom</p>
      </header>

      <section className="viewer">
        <Suspense fallback={<div className="loading">Loading 3D...</div>}>
          <ThreeScene
            color={COLORS[color]}
            autoRotate={autoRotate}
            reducedMotion={reducedMotion}
          />
        </Suspense>
      </section>

      <section className="controls">
        <div className="control-group">
          <span className="label">Color</span>

          <div className="color-options">
            {(Object.keys(COLORS) as ColorKey[]).map((key) => (
              <button
                key={key}
                className={`color-button ${
                  color === key ? "selected" : ""
                }`}
                style={{ backgroundColor: COLORS[key] }}
                onClick={() => setColor(key)}
                aria-label={`Change color to ${key}`}
              />
            ))}
          </div>
        </div>

        <button
          className="rotate-button"
          onClick={() => setAutoRotate((value) => !value)}
        >
          {autoRotate ? "Pause rotation" : "Auto rotate"}
        </button>
      </section>

      {reducedMotion && (
        <p className="motion-note">
          Reduced motion is enabled, so automatic rotation is disabled.
        </p>
      )}
    </main>
  );
}

export default App;