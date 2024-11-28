import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/profile", { withCredentials: true })
      .then((response) => {
        setProfile(response.data);
        setFormData(response.data);
      })
      .catch((error) => console.error("Error fetching profile:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    axios
      .put("http://localhost:5000/api/profile", formData, { withCredentials: true })
      .then(() => {
        setProfile(formData);
        setIsEditing(false);
        alert("Profile updated successfully!");
      })
      .catch((error) => console.error("Error updating profile:", error));
  };

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handlePhotoUpload = () => {
    const formData = new FormData();
    formData.append("photo", photo);

    axios
      .post("http://localhost:5000/api/upload_photo", formData, { withCredentials: true })
      .then((response) => {
        setProfile({ ...profile, photo: response.data.photo_url });
        alert("Photo uploaded successfully!");
      })
      .catch((error) => console.error("Error uploading photo:", error));
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h1>Profile</h1>
      <div>
        {profile.photo && <img src={`http://localhost:5000${profile.photo}`} alt="Profile" />}
        {isEditing ? (
          <div>
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleInputChange}
            />
            <button onClick={handleSave}>Save</button>
          </div>
        ) : (
          <div>
            <p>Name: {profile.name}</p>
            <p>Email: {profile.email}</p>
            <button onClick={() => setIsEditing(true)}>Edit</button>
          </div>
        )}
      </div>

      {profile.role === "doctor" && (
        <div>
          <h2>Upload Photo</h2>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handlePhotoUpload}>Upload</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
