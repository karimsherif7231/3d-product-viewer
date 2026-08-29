# 3D Product Viewer

An interactive 3D headphone experience built with React, TypeScript, React Three Fiber, and Three.js.

## What I Built

A lightweight 3D product viewer that allows users to:

* Rotate the headphones with mouse or touch.
* Zoom in and out.
* Change the headphone material color.
* Enable or pause automatic rotation.
* Use the experience responsively on mobile devices.

The 3D scene is loaded from a lightweight GLB model and includes basic lighting and environment setup.

## Performance

The 3D scene is lazy-loaded using code splitting so the main application bundle stays small.

Production build results:

* Main JavaScript bundle: ~194 KB
* 3D scene chunk: ~1.03 MB
* 3D scene chunk gzip: ~281 KB
* GLB model: ~38 KB

The 3D canvas uses a limited device pixel ratio and the model is intentionally lightweight to keep the experience suitable for mobile devices.

I also checked the experience through the FE-10 performance lens, focusing on initial load size, 3D asset size, and responsiveness during interaction.

## What I'd Add With More Time

With more time, I would improve the model quality and add more detailed product customization options while keeping the experience within a reasonable mobile performance budget.
