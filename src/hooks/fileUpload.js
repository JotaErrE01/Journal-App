
export const fileUpload = async ( file ) => {

    const cloudUrl = 'https://api.cloudinary.com/v1_1/dennzi6el/upload';

    const formData = new FormData();
    formData.append('upload_preset', 'React-Journal');
    formData.append('file', file);


    try {
        
        const response = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        } );
    
        if(response.ok){
            const cloudResp = await response.json();
            return cloudResp.secure_url   
        }else{
            return null;
        }

    } catch (error) {
        console.log(error);
    }

}