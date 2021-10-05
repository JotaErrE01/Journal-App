import cloudinary from 'cloudinary';
import { fileUpload } from "../../hooks/fileUpload";


cloudinary.config({ 
    cloud_name: 'dennzi6el', 
    api_key: '665444685714874', 
    api_secret: 'a6iZjQDSZ7OGuoSV2pC-9wK9QLE',
    secure: true
});


describe('Pruebas en fileUpload.js', () => {

    test('Debe de cargar un archivo y retornar el url', async () => {
        
        const response = await fetch('https://cdn.pixabay.com/photo/2021/09/15/12/52/animal-6626792__340.jpg');
        
        const blob = await response.blob();

        const file = new File([ blob ], 'foto.png');

        const url = await fileUpload( file );

        expect( typeof url ).toBe( 'string' );

        // Borrar imagen por id en cloudinary
        const segments = url.split('/');

        const imageId = segments[ segments.length -1 ].replace('.jpg', '');

        await cloudinary.v2.api.delete_resources(imageId);

    })

    test('Debe de retornar un errror', async () => {
        
        const file = new File([ ], 'foto.png');

        const url = await fileUpload( file );

        expect( url ).toBe( null );

    })
    
})
