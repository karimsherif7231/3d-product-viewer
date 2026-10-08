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
  const [showScene, setShowScene] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

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

      <section
        className="viewer"
        aria-label="Interactive 3D product viewer"
      >
        {showScene ? (
          <Suspense
            fallback={
              <div className="loading" role="status" aria-live="polite">
                Loading 3D...
              </div>
            }
          >
            <ThreeScene
              color={COLORS[color]}
              autoRotate={autoRotate}
              reducedMotion={reducedMotion}
            />
          </Suspense>
        ) : (
          <div className="viewer-placeholder">
            <p className="loading" role="status">
              Interactive 3D viewer
            </p>

            <button
              type="button"
              className="load-viewer-button"
              onClick={() => setShowScene(true)}
            >
              Load 3D viewer
            </button>
          </div>
        )}
      </section>

      <section
        className="controls"
        aria-label="Product controls"
      >
        <div className="control-group">
          <span className="label">Color</span>

          <div className="color-options">
            {(Object.keys(COLORS) as ColorKey[]).map((key) => (
              <button
                key={key}
                type="button"
                className={`color-button ${
                  color === key ? "selected" : ""
                }`}
                style={{ backgroundColor: COLORS[key] }}
                onClick={() => setColor(key)}
                aria-label={`Change color to ${key}`}
                aria-pressed={color === key}
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          className="rotate-button"
          onClick={() => setAutoRotate((value) => !value)}
          aria-pressed={autoRotate}
        >
          {autoRotate ? "Pause rotation" : "Auto rotate"}
        </button>
      </section>

      {reducedMotion && (
        <p className="motion-note" role="status">
          Reduced motion is enabled, so automatic rotation is disabled.
        </p>
      )}
    </main>
  );
}

export default App;
