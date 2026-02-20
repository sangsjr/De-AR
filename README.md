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

## Magic Window Modules

Use the **Floating AR Menu** to switch between the following three modes. Each mode features unique window creation logic while maintaining the general interactions above.

### 1. 2D Window Plane

- **Creation**: Pinch **both hands simultaneously for 3 seconds**. 

### 2. 3D Primitives

- **Creation**:
  
  - **Left Hand Pinch (3s)**: Generates a 3D **Cone** mask.
  
  - **Right Hand Pinch (3s)**: Generates a 3D **Box** mask.

### 3. Draw Any Polygon

- **Creation**:
  
  1. Hold **Left Hand Pinch for 3 seconds** to enable "Drawing Mode".
  
  2. Pinch and move your **Right Hand** to trace a path in the air (a blue line will follow your hand).
  
  3. Release the Right Hand to close the loop and generate a custom polygonal mask.
