
const imageFilter = (req,file,cb)=>{
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif|JPEG|JPG|PNG|GIF)$/)){
        req.fileValidationError='Only image files are allowed !';
        return cb(new Error('Only image files are allowed !'),false);
    }
    cb(null,true)

};
exports.imageFilter = imageFilter;