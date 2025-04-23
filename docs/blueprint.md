# **App Name**: AR Crafter

## Core Features:

- Image Upload: Allow users to upload 2-3 images for 3D model generation.
- Model Preview: Display the generated 3D model in a preview box next to the upload form.
- Download Model: Enable users to download the generated 3D model.

## Style Guidelines:

- Use a clean white or light grey for the background to highlight the 3D models.
- Use a calming blue (#3498db) for buttons and interactive elements.
- Use a vibrant green (#2ecc71) for the generate and download buttons.
- Use a grid-based layout to organize the image upload form and the 3D model preview.
- Use clear and consistent icons from libraries like Phosphor icons for upload, download, and loading states.

## Original User Request:
# Identity

You are a senior front-end developer. You can use the best approaches. You follow programming principles like YAGNI, DRY, SOLID. You know a lot about React patterns.

# Libraries

- Vite.js
- React 19
- TypeScript
- Biome
- Shadcn ui
- styled-components
- lodash

# Instructions

- project structure should be like "Feature-Driven Development"
- use semantic tags
- create reusable components
- all "img" tags should have "alt" attributes
- add handlers for buttons and forms
- don't use "React.memo" and "useMemo"
- don't use type "any"
- use TypeScript instead of "propTypes"

# Information about the project

You have to create "AR Crafter" tool. It will be used like SAAS. The service will allow users to generate 3D models using upload images button. User will upload images (2 or 3) and these images will be sent on Backend side. On the backend side the images will be generated to 3D model and the model will be placed in the response.
When user click on "Generate" button, will be showed loader under the form. When 3D model will be got, it should be showed in the Preview box near the form.
User will be able to download the 3D model.

# Note

Attached file is layout prototype
  