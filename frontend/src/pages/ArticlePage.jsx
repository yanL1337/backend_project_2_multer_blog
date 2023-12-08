import { useParams } from "react-router-dom";

const ArticlePage = ({ blogs }) => {
  const id = useParams();

  const blog = blogs.filter((elt) => elt.id === id.id)[0];

  return (
    <>
      <img className="w-full" src={blog?.imglink} alt="" />

      <h1 className="text-8xl text-center bg-slate-500 text-white">
        {blog?.titel}
      </h1>
      <p className="text-5xl">{blog?.text}</p>
    </>
  );
};

export default ArticlePage;
