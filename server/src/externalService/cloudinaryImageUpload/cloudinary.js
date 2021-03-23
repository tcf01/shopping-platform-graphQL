var cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'sample',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = {
    cloudinaryInstance: cloudinary
}
