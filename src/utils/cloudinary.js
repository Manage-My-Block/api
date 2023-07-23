const dotenv = require('dotenv')
dotenv.config()

const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: 'dnd7nhycm',
    api_key: '922712135974564',
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
})

// imageData is the base64 encoded string of the image (encoding happens on client)
const uploadImage = async (imageData) => {
    let savedImage
    try {
        savedImage = await cloudinary.uploader.upload(imageData, {
            folder: 'StrataSphere',
        })
        console.log('Image uploaded')
    } catch (err) {
        console.log(`Error uploading image: ${err}`)
    }
	console.log('publicId' , savedImage.public_id)
    return savedImage
}

const deleteImage = async (imageUrl) => {

	// Extract id from url
	const imageId = imageUrl.split('/').at(-1).split('.')[0]
	
	try {
		await cloudinary.uploader.destroy(`StrataSphere/${imageId}`, { invalidate: true });
		console.log('Image deleted')
	} catch (err) {
		console.log(`Error deleting image: ${err}`)
	}
}

module.exports = {
    cloudinary,
    uploadImage,
    deleteImage,
}
