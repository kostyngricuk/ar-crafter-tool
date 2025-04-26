
/**
 * Represents a 3D model.
 */
export interface Model {
  /**
   * The URL of the 3D model.
   */
  modelUrl: string;
}

/**
 * Asynchronously generates a 3D model from a list of image URLs.
 *
 * @param imageFiles The list of image files to be used for generating the model.
 * @returns A promise that resolves to a Model object containing the URL of the generated 3D model.
 */
export async function generateModel(imageFiles: File[]): Promise<Model> {
  const formData = new FormData();
  for (const file of imageFiles) {
    formData.append("images", file);
  }

  const response = await fetch("http://localhost:3000/model/generate", {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Failed to generate model");
  }
  
  const arrayBuffer = await response.arrayBuffer();
  const blob = new Blob([arrayBuffer]);
  const modelUrl = URL.createObjectURL(blob);

  return {
    modelUrl,
  };
}
