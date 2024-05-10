import {Template}from "../models/Template.js";

export const getAllDocuments = async (request, response) => {
   
    try {
    const documents = await Template.find({});
    response.status(200).json(documents);
}
catch(error){
    response.status(500).json({message: error.message})
}

}

//
export const getDocById = async  (request,response)=>{
    try {
        const document = await Template.findById(request.params.id);    
        
        if(!document){
            return response.status(404).json({message: "Document not found"});
        }
        response.status(200).json(document);    
    } 
    catch (error) {
        response.status(500).json({message: error.message})
    }

}

//

export const deleteDocument = async (request, response) => {
    try {
        const document = await Template.findByIdAndDelete(request.params.id);
        if(!document){
            return response.status(404).json({message: "document not found"});
        }
        response.status(200).json({message: "document deleted"});
    
    } catch (error) {
        response.status(500).json({message: error.message})
    }
}

//

export const createDocument = async(request,response)=>{
     
    try {
        const document = await Template.create(request.body)
        console.log(document)
        response.status(201).json(document); 
    } catch (error) {

        response.status(500).json({message: error.message})
    }
} 

//UPDATE

export  const updateDocument = async (request,response)=> {
    try {
        await Template.findOneAndUpdate({ _id: request.params.id },request.body)
             response.status(200).json({
            message:"Document was updated"
        });
    
       
    } catch (error) {
        response.status(500).json({message: error.message})
    }
}