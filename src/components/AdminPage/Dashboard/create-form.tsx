import { saveData } from "@/lib/actions";

const CreateForm = () => {
  return (
    <div>
      <form action={saveData}>
        {/* Category */}
        <div className="mb-5">
          <label htmlFor="category">Category</label>
          <select name="category" id="category">
            <option value="">DISKOMINFO_BONE_BOLANGO</option>
            <option value="">SEJARAH_DISKOMINFO_BONE_BOLANGO</option>
            <option value="">JAJARAN_DISKOMINFO_BONE_BOLANGO</option>
          </select>
        </div>
        {/* Title */}
        <div className="mb-5">
          <label htmlFor="name">Title</label>
          <input
            type="text"
            placeholder="Masukan Nama"
            name="title"
            id="title"
            className="mb-5 block w-full appearance-none rounded border border-blue-gray-300 bg-white px-4 py-3 pr-8 leading-tight text-blue-gray-700 transition-all focus:border-gray-500 focus:bg-white focus:outline-none"
          />
        </div>
        {/* Desc */}
        <div className="mb-5">
          <label htmlFor="name">Title</label>
          <input
            type="text"
            placeholder="Masukan deskripsi"
            name="desc"
            id="desc"
            className="mb-5 block w-full appearance-none rounded border border-blue-gray-300 bg-white px-4 py-3 pr-8 leading-tight text-blue-gray-700 transition-all focus:border-gray-500 focus:bg-white focus:outline-none"
          />
        </div>
        <button type="submit" className="bg-blue-800 text-white">
          Save
        </button>
      </form>
    </div>
  );
};

export default CreateForm;
