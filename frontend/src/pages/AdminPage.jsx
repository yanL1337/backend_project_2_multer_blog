import BlogList from "../components/BlogList";

const AdminPage = ({ setRefresh, blogs }) => {
  function senden(event) {
    event.preventDefault();
    const form = new FormData(event.target);

    fetch("http://localhost:1337/admin/addBlog", {
      method: "POST",
      body: form,
    }).then((response) => {
      if (response.ok) {
        setRefresh((prev) => !prev);
        event.target.reset();
      }
    });
  }

  return (
    <>
      <form
        className="flex flex-col align-middle justify-center"
        onSubmit={senden}
      >
        <div>
          <label htmlFor="titel">Titel</label>
          <input type="text" id="titel" name="titel" />
        </div>
        <div>
          <label htmlFor="titel2">Titel 2 </label>
          <input type="text" id="titel2" name="titel2" />
        </div>

        <div>
          <label htmlFor="text">Titel 2 </label>
          <textarea type="text" id="text" name="text" />
        </div>

        <div>
          <label htmlFor="imglink">Blog Pic</label>
          <input type="file" name="imglink" id="imglink" />
        </div>
        <div></div>
        <input
          className="border w-fit bg-black text-white"
          type="submit"
          value="Absenden"
        />
      </form>
      <BlogList blogs={blogs} />
    </>
  );
};

export default AdminPage;
