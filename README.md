# De-augmenting Visually-Augmented Reality

This repository explored different methods of creating "Magic Windows/Volumes" in Augmented Reality. These windows allow users to hide 3D objects using stencil buffers and custom shaders.

## Quick Start

To run the project locally, ensure you have [Node.js](https://nodejs.org/) installed, then execute:

```
npm run dev
```

## Interaction Guide

### General Object Interaction

- **Create Objects:** Double-pinch quickly with **left hand** to spawn a random 3D primitive at hand's position.

- **Move Objects:** Pinch with **right hand** to grab and move objects.

- **Delete Objects:** While holding an object with **right hand**, double-pinch quickly with **left hand** to delete it.

### Window/Volume Interaction

- **Creation**: Different methods are used depending on the file (detailed below).

- **Movement**: Use **right hand** to pinch and grab the window or 3D volume to move it within the scene.

## Experiment Files

### 1. `window.html`

**Concept:** A 2D rectangular plane acting as a fixed-size portal.

- **Feature:** Anything positioned behind this window becomes invisible.

- **Trigger:** Pinch **both hands simultaneously for 3 seconds** to create or delete the window.

### 2. `fixedcube.html`

**Concept:** A 3D bounding box (`a-box`) volume occlusion.

- **Feature:** Implements a custom shader where the interior of the box occludes objects. It uses a **dynamic silhouette** algorithm (calculating face normals of adjacent planes) to render edges only when they form the object's outline.

- **Known Issue:** Small visual artifacts (bugs) may appear at the corners. The silhouette logic is optimized for boxes and may not apply to complex geometries.

- **Trigger:** Pinch **both hands simultaneously for 3 seconds** to generate the cube.

### 3. `3dConeAndCube.html`

**Concept:** Geometry-based Stencil Buffer occlusion using Cones and Cubes.

- **Feature:** Uses the Stencil Buffer to mask everything along the ray from the camera through the 3D shape. This method is highly compatible with any 3D geometry but is currently limited to A-Frame primitives with pre-defined sizes.

- **Trigger:** 
  
  * **Left Hand:** Pinch for 3 seconds to generate a **Cone**.
  - **Right Hand:** Pinch for 3 seconds to generate a **Cube**.
  
  - *Both can be moved independently.*

### 4. `DrawAny.html`

**Concept:** Custom-drawn 2D polygon masks.

- **Feature:** Allows the user to draw a free-form shape in the air which then acts as a 2D stencil window. It records the hand trajectory and connects the points using `THREE.Shape`.

- **Trigger:** 1. Hold **Left Pinch for 3 seconds** to enter "Drawing Mode."
  
  2. Pinch and move **Right Hand** to draw the desired shape.
  3. Release the pinch to generate the magic window and return to standard interaction mode.
