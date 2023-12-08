import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Blog = ({ blog, setRefresh }) => {
  const [edit, setEdit] = useState(false);

  const titleRef = useRef();
  const imgRef = useRef();
  const titel2Ref = useRef();

  //console.log(imgRef.current?.src);
  //admin/addBlog  PUT  formData

  const fetcher = (route, method, body) => {
    fetch(import.meta.env.VITE_BACKENDURL + "/" + route, {
      method: method,
      body: body,
      headers: {
        "conten-type": "application/json",
      },
    })
      .then((res) =>
        res.ok ? setRefresh((prev) => !prev) & setEdit((prev) => !prev) : null
      )
      .catch((err) => console.log(err));
  };

  const senden = (event) => {
    event.preventDefault();

    const formDaten = new FormData(event.target);
    fetch(imgRef.current.files[0])
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "test.png", {
          type: "image/*",
        });
        if (file) formDaten.append("imglink", file);
      });

    formDaten.append("id", blog?.id);
    formDaten.append("titel", titleRef.current?.innerText);
    //formDaten.append("imglink", f); //imgRef.current?.src
    formDaten.append("titel2", titel2Ref.current?.innerText);

    fetcher("admin/addBlog", "PUT", formDaten);
  };
  return (
    <form onSubmit={senden}>
      <div className="border-2">
        <h1 ref={titleRef} contentEditable={edit} className="text-5xl">
          {blog.titel}
        </h1>
        {edit ? (
          <input ref={imgRef} type="file" name="imglink" id="imglink" />
        ) : (
          <img ref={imgRef} className="h-40" src={blog.imglink} alt="" />
        )}
        <p ref={titel2Ref} contentEditable={edit} className="text-2xl">
          {blog.titel2}
        </p>
        <Link to={"/article/" + blog.id}>Read more</Link>
      </div>

      {edit ? (
        <div className="bg-black text-white grid grid-cols-3">
          <input value="Speichern" type="submit" />
          <input
            onClick={() => fetcher("admin/addBlog", "DELETE", blog)}
            type="button"
            value="Löschen"
          />
          <input
            value="Abbruch"
            type="button"
            onClick={() => setEdit((prev) => !prev)}
          />
        </div>
      ) : (
        <input
          value="Edit"
          type="button"
          onClick={() => setEdit((prev) => !prev)}
        />
      )}
    </form>
  );
};

export default Blog;
