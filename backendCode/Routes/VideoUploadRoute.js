import express from 'express';
const router = express.Router();
import multer from 'multer'

const videoStorage= multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, "public/videos");
    },
    filename:(req, file, cb)=>{
        cb(null, req.body.name);
    },
});
const upload=multer({storage:videoStorage, 
limits:{
    fileSize:10000000 // 10 MB
},
fileFilter(req, file, cb){
    // upload only mp4 and mkv format
    if( !req.body.name.match(/\.(mp4|MPEG|mkv)$/)){
        return cb(new Error('please upload a video'))
    }
    cb(undefined, true)
}
});

router.post('/', upload.single("file", (req, res)=>{
    try {
        return res.status(200).json("File uploaded successfuly!");
    } catch (error) {
        console.log(error);
    }
}))

export default router;