import Blog from "./Blog";
const BlogList = ({ blogs }) => {
  return (
    <div className="grid grid-cols-3 gap-5">
      {blogs.map((blog, index) => {
        return <Blog blog={blog} key={index} />;
      })}
    </div>
  );
};

export default BlogList;
