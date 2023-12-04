import BlogList from "../components/BlogList";

const HomePage = ({ blogs }) => {
  return (
    <>
      <div className="bg-orange-700 h-20 text-center mb-40">
        <p className=" text-white text-6xl">Blog Artikel</p>
      </div>

      <BlogList blogs={blogs} />
    </>
  );
};

export default HomePage;
