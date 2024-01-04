import React, { useState } from "react";
import avatar from "../../assest/user.png";
import axiosInstance from "../../request/AxiosInstance";

// ownerName: Joi.string().required(),
// location: Joi.string().required(),
// image: Joi.string().required(),
// type: Joi.string().required(),
// propertyStatus: Joi.string().required(),
// price: Joi.number().required(),
// description: Joi.string().required(),
// ownerId: Joi.string(),
interface FORM {
  ownerName: string;
  type: string;
  location: string;
  description: string;
  price: number;
  image: string;
}
const CreateProperty = () => {
  const [image, setImage] = useState("");
  const [form, setForm] = useState({} as FORM);
  const [imageError, setImageError] = useState("");
  const fileUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    console.log(file, formData);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data", // Set the content type for the image
      },
    };
    const images = {
      image: file,
    };

    try {
      const res = await axiosInstance.post("/Property/image", images, config);
      setImage(res.data.imageUrl);
      setForm((prev) => ({ ...prev, image: res.data.imageUrl }));
    } catch (error) {
      if (error.response.status === 500) {
        setImageError("Something went wrong");
      } else {
        setImageError(error.response.data.error);
      }
    }
  };
  const handleChange = (target: HTMLInputElement) => {
    const { name, value } = target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = () => {
    console.log("form");
  };

  return (
    <div className="container mt-0">
      <div className="d-flex justify-content-center align-items-center flex-column mt-2">
        <div className="column">
          <img
            src={image === "" ? avatar : image}
            alt="avatar"
            sizes="20"
            style={{ width: "250px", height: "200px", alignSelf: "center" }}
          />
        </div>
        <div className="column align-self-center">
          <input
            type="file"
            placeholder="upload image"
            onChange={(e) => fileUpload(e)}
          />
          {imageError && (
            <p className="text-danger text-center">{imageError}</p>
          )}
        </div>
        <div className="form-container">
          <form className="form">
            <div className="Auth-form-content">
              <div className="form-group mt-3">
                <label>Owner Name</label>

                <input
                  type="text"
                  className="form-control mt-1"
                  name="ownerName"
                  value={form.ownerName}
                  onChange={(e) => handleChange(e.target)}
                />
              </div>
              <div className="form-group mt-3">
                <label>Location</label>

                <input
                  type="text"
                  className="form-control mt-1"
                  name="location"
                  value={form.location}
                  onChange={(e) => handleChange(e.target)}
                />
              </div>
              <div className="form-group mt-3">
                <label>Description</label>

                <input
                  type="text"
                  name="description"
                  className="form-control mt-1"
                  value={form.description}
                  onChange={(e) => handleChange(e.target)}
                />
              </div>
              <div className="form-group mt-3">
                <label>price</label>

                <input
                  type="number"
                  name="price"
                  className="form-control mt-1"
                   value={form.ownerName}
                  onChange={(e) => handleChange(e.target)}
                />
              </div>
              <div className="form-group mt-3">
                <label>Type</label>

                <input
                  type="text"
                  name="type"
                  className="form-control mt-1"
                  onChange={(e) => handleChange(e.target)}
                />
              </div>
            </div>
            <button onClick={handleSubmit} className="btn btn-info mt-3">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProperty;
