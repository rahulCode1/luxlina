import {  useState } from "react";
import axios from "axios";
import { useLoaderData } from "react-router-dom";

const FileUpload = () => {
  const [selectedFiles, setFile] = useState([]);
  const [previewUrl, setPreviewUrl] = useState([]);

  const pickedHandler = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFile((prevStat) => [...prevStat, ...selectedFiles]);
    const previewUrl = selectedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setPreviewUrl(previewUrl);
  };

  const handleImgSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    selectedFiles.forEach((img) => {
      formData.append("images", img); // ✅ correct key
    });

    const response = await fetch("http://localhost/api/image", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    console.log(data);
  };

  const { data } = useLoaderData();

  const imgs = data?.imgs;

  const deleteImg = async (id) => {
    const response = await fetch(`http://localhost/api/image/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    console.log(data);
  };

 

  return (
    <>
      <form onSubmit={handleImgSubmit}>
        <label className="form-label" htmlFor="images">
          Pick file{" "}
        </label>
        <input
          type="file"
          id="images"
          name="images"
          onChange={pickedHandler}
          multiple
          accept=".jpg,.png,.jpeg"
        />
        <div>
          <hr />
          {previewUrl &&
            previewUrl.map((img, index) => (
              <div>
                <img
                  src={img.preview}
                  className="img-fluid"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                  alt="Product preview"
                />
              
              </div>
            ))}
        </div>
        <button type="submit">Add Img </button>
      </form>
      <hr />
      {imgs &&
        imgs.map((img) => (
          <div>
            {img.images.map((img) => (
              <img
                src={img.url}
                className="img-fluid"
                style={{ width: "300px" }}
                alt="Selected products"
              />
            ))}

            <button onClick={() => deleteImg(img._id)}>Delete </button>
          </div>
        ))}
    </>
  );
};

export default FileUpload;

export const loader = async () => {
  try {
    const response = await axios.get(`http://localhost/api/image`);
    // console.log(response);
    return response;
  } catch (error) {}
};
