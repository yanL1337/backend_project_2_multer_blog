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

export const getSingleBlog = (id) => {
  return fs
    .readFile("./" + DB + "/" + id, { encoding: "utf-8" })
    .then((data) => JSON.parse(data));
};

export const delImg = (blogID) => {
  fs.readFile("./" + DB + "/" + blogID, { encoding: "utf-8" })
    .then((blog) => JSON.parse(blog))
    .then((blogObj) => {
      const id = blogObj.imglink.split("/");
      fs.rm("./" + FILE_STORAGE + "/" + id[id.length - 1]);
    });
};

export const delBlog = (blogID) => {
  fs.rm("./" + DB + "/" + blogID).then(() => delImg(blogID));
};

// bool brauch ichvllt nciht
export const changeBlog = (blog) => {
  return getSingleBlog(blog.id).then((oldBlog) => {
    fs.writeFile(
      "./" + DB + "/" + blog.id,
      JSON.stringify({ ...oldBlog, ...blog })
    ).catch((err) => err);
  });

  // return fs
  //   .readFile("./" + DB + "/" + blog?.id)
  //   .then((data) => JSON.parse(data))
  //   .then((oldBlog) => {
  //     console.log(blog.id);
  //     fs.writeFile(
  //       "./" + DB + "/" + blog.id,
  //       JSON.stringify({ ...oldBlog, ...blog })
  //     );
  //   })
  //   .catch((err) => console.log(err));
};
