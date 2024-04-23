

export const getAllDocuments = async (request, response) => {
   
    try {
    const documents = await Modelo.find({});
    response.status(200).json(documents);
}
catch(error){
    response.status(500).json({message: error.message})
}

}

//
export const getDocById = async  (request,response)=>{
    try {
        const document = await Modelo.findById(request.params.id);    
        
        if(!document){
            return response.status(404).json({message: "Poster not found"});
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
        const document = await Modelo.findByIdAndDelete(request.params.id);
        if(!document){
            return response.status(404).json({message: "document not found"});
        }
        response.status(200).json({message: "document se eliminó correctamente"});
    
    } catch (error) {
        response.status(500).json({message: error.message})
    }
}

//

export const createDocument = async(request,response)=>{
     
    try {
        const document = await Modelo.create(request.body)
        response.status(201).json(document); 
    } catch (error) {

        response.status(500).json({message: error.message})
    }
} 

//UPDATE

export  const updateDocument = async (request,response)=> {
    try {
        await Modelo.findOneAndUpdate({ _id: request.params.id },request.body)
             response.status(200).json({
            message:"Se actualizó el  documento correctamente"
        });
    
       
    } catch (error) {
        response.status(500).json({message: error.message})
    }
}