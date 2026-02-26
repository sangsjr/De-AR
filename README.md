# De-augmenting Visually-Augmented Reality

This repository explored different methods of creating "Magic Windows/Volumes" in Augmented Reality. These windows allow users to hide 3D objects using stencil buffers and custom shaders.

## Quick Start

To run the project locally, ensure you have [Node.js](https://nodejs.org/) installed, then execute:

1. Ensure your computer/laptop and Meta Quest are connected to the **same Wi-Fi network**.
2. Open your terminal, navigate to the project directory, and run the development server:

```
npm run dev
```

3. You will see an output similar to this in your terminal:

```
➜ Local: https://localhost:5173/
➜ Network: https://<YOUR_LOCAL_IP>:5173/
```

4. Open the **Browser** inside your Quest and navigate to the `Network` URL provided in your terminal (e.g., `https://192.168.1.100:5173/`).

5. Since this is a local development server, you will likely see a security warning. Click **Advanced** and then select **Proceed to...** (or Continue) to load the page.

6. Once the page loads, click the **AR** button in the bottom right corner to enter the system.

## Interaction Guide

### General Object Interaction

- **Create Objects:** Double-pinch quickly with **left hand** to spawn a random 3D primitive at hand's position.

- **Move Objects:** Pinch with **right hand** to grab and move objects.

- **Delete Objects:** While holding an object with **right hand**, double-pinch quickly with **left hand** to delete it.

## Magic Window Modules

Use the **Floating AR Menu** to switch between the following three modes. Each mode features unique window creation logic while maintaining the general interactions above.

### 1. 2D Window Plane

- **Creation**: Pinch **both hands simultaneously for 2 seconds**. 

### 2. 3D Primitives

- **Creation**:
  
  - **Left Hand Pinch (2s)**: Generates a 3D **Cone** mask.
  
  - **Right Hand Pinch (2s)**: Generates a 3D **Box** mask.

### 3. Draw Any Polygon

- **Creation**:
  
  1. Hold **Left Hand Pinch for 2 seconds** to enable "Drawing Mode".
  
  2. Pinch and move your **Right Hand** to trace a path in the air (a blue line will follow your hand).
  
  3. Release the Right Hand to close the loop and generate a custom polygonal mask.

### 4. Smart Draw

- **Creation & Auto-Detection**:
  
  1. Hold **Left Hand Pinch for 2 seconds** to enable "Smart Draw Mode".
  2. Pinch and move your **Right Hand** to trace a rough shape in the air.
  3. Release the Right Hand to finish. The system will mathematically analyze your sketch and instantly snap it into a perfect 2D **Circle, Rectangle, or Triangle** (complex or unrecognized shapes will remain as custom polygons).

- **Spatial Morphing (2D to 3D)**:
  
  - Grab any recognized 2D shape and push it away from you.
  - Once the shape is moved **50 cm away** from the camera's original position, the 2D plane will magically inflate into a 1:1 3D volumetric mask (**Circle $\rightarrow$ Sphere, Rectangle $\rightarrow$ Box, Triangle $\rightarrow$ Cone**).
