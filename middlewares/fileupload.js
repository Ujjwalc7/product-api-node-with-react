const multer= require('multer');

const storage= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads')
    },
    filename:(req,file,cb)=>{
        const filename = file.originalname.split(" ").join("");
        const uniqueSuffix=Date.now()+'-'+Math.round(Math.random()*1e9);
        const fileExtention= filename.split('.').pop();
        cb(null,filename.split('.')[0]+'-'+uniqueSuffix+'.'+fileExtention);
    }
})
const fileFilter=(req,file,cb)=>{
    console.log(file.mimetype);
    const allowedFiletypes=/jpeg|jpg|png/;
    const extname=allowedFiletypes.test(file.originalname.toLowerCase());
    const mimetype=allowedFiletypes.test(file.mimetype);
    console.log(extname, mimetype);
    if(extname && mimetype){
        cb(null,true);
    }else{
        cb("Error Only JPEG/JPG/PNG files allowed", false);
    }
}

const upload= multer({
    storage:storage,
    limits:{
        fileSize:1024*1024*5//5 MB
    },
    fileFilter:fileFilter
})

module.exports=upload;