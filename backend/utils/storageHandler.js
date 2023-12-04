import fs from "fs/promises";
import fsystem from "fs";
import { v4 } from "uuid";
const DB = "storage";
const FILE_STORAGE = "uploads";

export function setup() {
  fs.access("./" + DB + "/")
    .then(() => console.log("Der Storage Ordner ist schon vorhanden"))
    .catch(() => {
      fs.mkdir("./" + DB);
    });

  fs.access("./" + FILE_STORAGE + "/")
    .then(() => console.log("Der Upload Ordner ist schon vorhanden"))
    .catch(() => {
      fs.mkdir("./" + FILE_STORAGE);
    });
}

export const createBlog = (blog) => {
  blog.id = v4();
  fs.writeFile("./" + DB + "/" + blog.id, JSON.stringify(blog));
};

export const getAllBlogs = () => {
  return fs.readdir("./" + DB).then((files) => {
    const arr = [];
    for (const file of files) {
      arr.push(JSON.parse(fsystem.readFileSync("./" + DB + "/" + file)));
    }
    return arr;
  });
};
