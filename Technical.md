# Technical Documentation

This project implements a "De-augmenting" effect in AR by using **WebGL Stencil Buffers** and **Custom Shaders** within the A-Frame (Three.js) framework. It allows virtual objects to be selectively hidden through spatial "windows."

## 1. The Core Readering Concept: Stencil Masking

The "Magic Window" effect is achieved through **Stencil Buffer Manipulation**. The stencil buffer is an extra data layer (per pixel) that acts as a mask between the 3D geometry and the screen.

### The Stencil Logic Flow:

1. **The Mask:** When a Magic Window is activated, it renders an invisible geometry. It tells the GPU: *"Wherever I exist on the screen, write a value of `1` into the Stencil Buffer, but do not draw any color."* 

2. **The Target Objects (The "Hidden"):** Objects like the red box and green sphere check the Stencil Buffer before drawing each pixel.

3. **The Comparison:** If an object pixel finds a `1` in the Stencil Buffer (meaning it is "inside" a window), the `stencilFunc` set to `NotEqual` tells the GPU to discard that pixel, making the object appear invisible through the window.

---

## 2. Component Breakdown

### `apply-magic-shader` (The Target)

This component is attached to objects that should be hideable.

- **Dynamic Logic:** It monitors `activeMasksCount`. If no windows exist, it renders normally (`AlwaysStencilFunc`).

- **Occlusion:** Once a window is spawned, it switches to `NotEqualStencilFunc`, rendering only where the stencil value is **not** `1`.

### `getMagicMaterials` (The Magic Window)

This function returns two specific materials for every window:

1. **Mask Material:** Uses `colorWrite: false` and `depthWrite: false`. It is invisible to the eye but "carves" the stencil buffer using `ReplaceStencilOp`.

2. **Outline Material (The Blue Border):** Uses a **Vertex Shader**. It takes the original geometry and pushes the vertices outward along their normals (`pos = position + normal * thickness`). This creates the blue frame without overlapping the "hole" created by the mask.

---

## 3. The Two-Stage Object Lifecycle

To improve user experience, windows undergo a transition from a physical preview to a functional mask.

### Stage 1: The Wireframe Preview (`PREVIEW_DURATION`)

When a user completes a long-pinch (2s), the code first spawns a `LineSegments` version of the geometry using `EdgesGeometry`.

- **Purpose:** Provides immediate visual feedback so the user knows exactly what is the window and where the window is placed before it starts hiding objects.

- **Visuals:** A simple blue frame with no masking logic.

### Stage 2: The Mask Conversion

After 1 second, the `setTimeout` function triggers the transformation:

- The wireframe is removed.

- The `maskMat` (the invisible cutter) and the `outlineMat` (the thick blue border) are applied.

- The global `activeMasksCount` is incremented, signaling all hideable objects to start reacting to the stencil buffer.

---

## 4. Mode-Specific Implementation

| **Module**    | **Geometry Logic** | **Spatial Logic**                                                                                                                                                |
| ------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **2D Window** | `PlaneGeometry`    | Uses `object3D.lookAt(camera)` on spawn to ensure the window faces the user.                                                                                     |
| **3D Shapes** | `Cone` / `Box`     | Creates a 3D volume of invisibility. Objects inside the volume disappear from all angles.                                                                        |
| **Draw Any**  | `ShapeGeometry`    | Collects a series of 3D points from hand tracking, projects them onto a 2D plane based on the camera orientation, and generates a custom mesh via `THREE.Shape`. |

---

## 5. Global Configuration

The code is designed for easy "hand-feel" tuning via constants:

- `LONG_PINCH_DURATION`: Adjusts the duration for long pinch.

- `PREVIEW_DURATION`: Adjusts the transition speed from "Physical" to "Magic".

- `COLOR_DEFAULT_ZONE`: Standardizes the visual identity of the AR interface.


