import Blog from "./Blog";
const BlogList = ({ blogs, setRefresh }) => {
  return (
    <div className="grid grid-cols-3 gap-5">
      {blogs.map((blog, index) => {
        return <Blog setRefresh={setRefresh} blog={blog} key={index} />;
      })}
    </div>
  );
};

export default BlogList;
