import axios from "axios";

export const URL = 'http://localhost:3000/api/document';

export const addLink = async (templateId, newLink) => {
    try {
        if (!newLink.src) {
            throw new Error('El campo "src" es requerido');
        }
        const response = await axios.post(`${URL}/${templateId}/link`, { link: newLink });
        return response.data;
    } catch (error) {
        console.error('Error creating link', error);
        console.error('Response data:', error.response ? error.response.data : 'No response data');
        throw error;
    }
};


export const updateLink = async (templateId, linkId, updatedLink) => {
    try {
        const response = await axios.put(`${URL}/${templateId}/link/${linkId}`, { link: updatedLink });
        alert("Link actualizado exitosamente");
        return response.data;
    } catch (error) {
        console.error('Error updating link', error.message);
        throw error;
    }
};

export const deleteLink = async (templateId, linkId) => {
    try {
        const response = await axios.delete(`${URL}/${templateId}/link/${linkId}`);
        alert('Link eliminado correctamente');
        return response.data;
    } catch (error) {
        console.error('Error deleting link', error.message);
        throw error;
    }
};
