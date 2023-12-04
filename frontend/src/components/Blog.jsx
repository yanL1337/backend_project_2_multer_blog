import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  return (
    <Link className="border-2" to={"/article/" + blog.id}>
      <h1 className="text-5xl">{blog.titel}</h1>
      <img
        className="h-40"
        src={"http://localhost:1337/" + blog.imglink}
        alt=""
      />
      <p className="text-2xl">{blog.titel2}</p>
    </Link>
  );
};

export default Blog;
