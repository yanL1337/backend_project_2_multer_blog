import express from "express";
import cors from "cors";
import multer from "multer";
import "dotenv/config.js";
import fs from "fs/promises";
import { fileTypeFromBuffer } from "file-type";
import {
  getAllBlogs,
  createBlog,
  setup,
  getSingleBlog,
  changeBlog,
  delImg,
  delBlog,
} from "./utils/storageHandler.js";
import { v4 } from "uuid";

const server = express();
const PORT = process.env.PORT;
const URL = process.env.URL;
const storage = multer.memoryStorage();
const DIR = "./uploads/";
const upload = multer({ storage });
setup();
server.use(cors());
server.use(express.json());
server.use("/uploads", express.static("uploads"));

server.get("/blogs", (req, res) => {
  getAllBlogs()
    .then((data) => res.json(data))
    .catch(() => res.status(500).end());
});

server.post("/admin/addBlog", upload.single("imglink"), (req, res) => {
  const blog = req.body;
  console.log("Datei: ", req.file);
  fileTypeFromBuffer(req.file.buffer)
    .then((data) => {
      const path = DIR + v4() + "." + data.ext;
      fs.writeFile(path, req.file.buffer);
      return path;
    })
    .then((data) => {
      blog.imglink = `http://localhost:${PORT}/` + data;
      createBlog(blog);
      res.end();
    })
    .catch((err) => res.status(500).end(err));
});

server.delete("/admin/addBlog", upload.none(), (req, res) => {
  const blog = req.body;
  console.log(req.body);
  delBlog(blog.id);
  res.end();
});

server.get("/single", (req, res) => {
  getSingleBlog(req.body.id).then((data) => res.json(data).end());
});

server.put("/admin/addBlog", upload.single("imglink"), (req, res) => {
  const blog = req.body;
  req.file
    ? fileTypeFromBuffer(req.file.buffer)
        .then((data) => {
          const path = DIR + v4() + "." + data.ext;
          fs.writeFile(path, req.file.buffer);
          return path;
        })
        .then((data) => {
          blog.imglink = `http://localhost:${PORT}/` + data;
          changeBlog(blog);
          delImg(blog.id);
        })
        .catch((err) => res.status(500).end(err))
    : changeBlog(blog);
  res.end();
});

server.listen(PORT, () => console.log(`Sprintet mit ${PORT}km/h`));
