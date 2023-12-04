import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs/promises";
import { fileTypeFromBuffer } from "file-type";
import { getAllBlogs, createBlog, setup } from "./utils/storageHandler.js";
import { v4 } from "uuid";

const server = express();
const PORT = 1337;
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
      blog.imglink = data;
      createBlog(blog);
      res.end();
    })
    .catch((err) => res.status(500).end(err));
});

server.delete("/", (req, res) => {
  const todo = req.body;
  deleteTodo(todo.id);
  res.end();
});

server.put("/", (req, res) => {
  const todo = req.body;
  changeStatus(todo.id);

  res.end();
});

server.listen(PORT, () => console.log(`Sprintet mit ${PORT}km/h`));
