import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile, updateUserProfile } from "../API/userApi";
import "../Styles/EditProfile.css";

const EditProfile = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [address, setAddress] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");


  useEffect(() => {

    const storedUser =
      localStorage.getItem("user");

    if (!storedUser) {
      navigate("/login");
      return;
    }

    const loggedUser =
      JSON.parse(storedUser);

    setUser(loggedUser);

    const loadProfile = async () => {

      try {

        const response =
          await getUserProfile(loggedUser.id);

        const data = response.data.user;

        setName(data.name || "");
        setPhone(data.phone || "");
        setProfileImage(data.profileImage || "");
        setAddress(data.address || "");

      } catch (error) {

        console.error(
          "Profile loading error:",
          error
        );

        setError(
          "Failed to load profile"
        );

      } finally {

        setLoading(false);

      }

    };

    loadProfile();

  }, [navigate]);


  const handleSubmit = async (e) => {

    e.preventDefault();

    setMessage("");
    setError("");

    try {

      setSaving(true);

      const response =
        await updateUserProfile(
          user.id,
          {
            name,
            phone,
            profileImage,
            address
          }
        );

      if (response.data.success) {

        const updatedUser =
          response.data.user;

        localStorage.setItem(
          "user",
          JSON.stringify(updatedUser)
        );

        setUser(updatedUser);

        setMessage(
          "Profile updated successfully"
        );

      }

    } catch (error) {

      console.error(
        "Update Profile Error:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Failed to update profile"
      );

    } finally {

      setSaving(false);

    }

  };


  if (loading) {
    return (
      <div className="editProfilePage">
        <h2>Loading Profile...</h2>
      </div>
    );
  }


  return (

    <section className="editProfilePage">

      <div className="editProfileCard">

        <h1>Edit Profile</h1>

        <p>
          Update your Varshney's Cloth Shop
          account details.
        </p>


        <form onSubmit={handleSubmit}>

          <label>
            Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="Enter your name"
          />


          <label>
            Email
          </label>

          <input
            type="email"
            value={user?.email || ""}
            disabled
          />


          <label>
            Phone
          </label>

          <input
            type="text"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            placeholder="Enter phone number"
          />


          <label>
            Profile Image URL
          </label>

          <input
            type="text"
            value={profileImage}
            onChange={(e) =>
              setProfileImage(e.target.value)
            }
            placeholder="Enter image URL"
          />


          <label>
            Address
          </label>

          <textarea
            value={address}
            onChange={(e) =>
              setAddress(e.target.value)
            }
            placeholder="Enter your address"
          />


          {error && (
            <p className="editError">
              {error}
            </p>
          )}


          {message && (
            <p className="editSuccess">
              {message}
            </p>
          )}


          <div className="editProfileActions">

            <button
              type="submit"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : "Save Changes"}
            </button>


            <button
              type="button"
              onClick={() =>
                navigate("/account")
              }
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </section>

  );
};

export default EditProfile;