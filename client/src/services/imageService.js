import axios from "axios";

export const URL = 'http://localhost:3000/api/document';

export const addImage = async (templateId, newImage) => {
  try {
    const response = await axios.post(`${URL}/document/${templateId}/chapter/${newImage.chapterId}/section/${newImage.sectionId}/image`, newImage);
    alert("Imagen añadida exitosamente");
    return response;
  } catch (error) {
     console.error('Error creating image', error.message);
     throw error;
  }
};

export const updateImage = async (templateId, imageId, updatedImage) => {
  try {
    const response = await axios.put(`${URL}/document/${templateId}/image/${imageId}`, { image: updatedImage });
    alert("Imagen actualizada exitosamente");
    return response;
  } catch (error) {
    console.error('Error updating image', error.message);
    throw error;
  }
};

export const deleteImage = async (templateId, imageId) => {
  try {
    const response = await axios.delete(`${URL}/document/${templateId}/image/${imageId}`);
    alert('Imagen eliminada correctamente');
    return response;
  } catch (error) {
    console.error('Error deleting image', error.message);
    throw error;
  }
};
