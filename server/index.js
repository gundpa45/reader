import express from 'express'
import cors from 'cors'
import multer from 'multer'
import { Queue } from 'bullmq';

const queue=new Queue("file-upload-queue")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, `${uniqueSuffix}-${file.originalname}`)
  }
})




const app = express();

const upload = multer({ storage :storage})

app.use(cors())

app.get('/', (req, res) => {
  res.json({ status: "all good sir" })
})

app.post('/upload/pdf', upload.single('pdf'),async (req, res) => {
     await queue.add('file-ready',JSON.stringify({
      filename:req.file.originalname,
      destination: req.file.destination,
      path:req.file.path
      
  }))
  res.json({ message: 'uploaded' })
})

app.listen(8000, () => {
  console.log("server is running on port no 8000")
})
