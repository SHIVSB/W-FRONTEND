import axios from "axios";
import { useRef } from "react";

export default function ImageUploader() {
  const fileSelect = useRef(null);
  const formData = new FormData();

  async function handleImageUpload() {
    if (fileSelect) {
      fileSelect.current.click();
    }
  }

  function handleFiles(files) {
    for (let i = 0; i < files.length; i++) {
      console.log(files[i]);
      axios.defaults.headers = {
        authorization: localStorage.getItem("token"),
      };
      formData.append("image", files[i]);
    }
  }

  return (
    <div
      className="mx-auto mt-16 bg-gray-200 border-4 border-dashed border-gray-400 rounded-lg"
      style={{ height: 400, width: 600 }}
    >
      <div className="flex justify-center items-center h-full">
        <div className="text-gray-700 text-center">
          <button
            className="bg-blue-600 hover:bg-blue-800 text-white font-bold px-4 py-2 rounded block m-auto"
            onClick={handleImageUpload}
            type="button"
          >
            Browse
          </button>
        </div>

        <input
          ref={fileSelect}
          type="file"
          accept="image/*"
          style={{ display: "block" }}
          onChange={(e) => handleFiles(e.target.files)}
        />

        <button
          className="py-2 px-1 bg-green-600 rounded-md"
          onClick={async () => {
            await axios
              .post("http://localhost:4000/api/v1/profilephotoupload", formData)
              .then(function (response) {
                if (response) {
                  window.location.href = "/maincontent";
                }
              })
              .catch(function (error) {
                console.log(error);
                window.location.href = "/maincontent";
              });
          }}
        >
          Upload Image
        </button>
      </div>
    </div>
  );
}
