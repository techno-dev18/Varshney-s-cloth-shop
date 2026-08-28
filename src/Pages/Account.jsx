import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getUserProfile,
  updateUserProfile
} from "../API/userApi";

import "../Styles/Account.css";


const Account = () => {

  const navigate = useNavigate();


  // ===============================
  // USER
  // ===============================

  const [user, setUser] =
    useState(null);


  // ===============================
  // EDIT MODE
  // ===============================

  const [editing, setEditing] =
    useState(false);


  // ===============================
  // FORM
  // ===============================

  const [formData, setFormData] =
    useState({

      name: "",
      phone: "",
      profileImage: "",

      address: {
        houseNo: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
        country: "India"
      }

    });


  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");


  // ===============================
  // LOAD USER
  // ===============================

  useEffect(() => {

    const loadUser = async () => {

      const storedUser =
        localStorage.getItem("user");


      if (!storedUser) {

        navigate("/login");

        return;

      }


      try {

        const localUser =
          JSON.parse(storedUser);


        const response =
          await getUserProfile(
            localUser.id
          );


        if (response.data.success) {

          const userData =
            response.data.user;


          setUser(userData);


          setFormData({

            name:
              userData.name || "",

            phone:
              userData.phone || "",

            profileImage:
              userData.profileImage || "",

            address: {

              houseNo:
                userData.address?.houseNo || "",

              street:
                userData.address?.street || "",

              city:
                userData.address?.city || "",

              state:
                userData.address?.state || "",

              pincode:
                userData.address?.pincode || "",

              country:
                userData.address?.country ||
                "India"

            }

          });

        }

      } catch (error) {

        console.error(
          "Profile Error:",
          error
        );

        setError(
          "Unable to load profile"
        );

      } finally {

        setLoading(false);

      }

    };


    loadUser();

  }, [navigate]);


  // ===============================
  // INPUT CHANGE
  // ===============================

  const handleChange = (e) => {

    const {
      name,
      value
    } = e.target;


    setFormData(prev => ({

      ...prev,

      [name]: value

    }));

  };


  // ===============================
  // ADDRESS CHANGE
  // ===============================

  const handleAddressChange = (e) => {

    const {
      name,
      value
    } = e.target;


    setFormData(prev => ({

      ...prev,

      address: {

        ...prev.address,

        [name]: value

      }

    }));

  };


  // ===============================
  // SAVE PROFILE
  // ===============================

  const handleSave = async (e) => {

    e.preventDefault();


    setSaving(true);

    setError("");


    try {

      const response =
        await updateUserProfile(
          user._id,
          formData
        );


      if (response.data.success) {

        const updatedUser =
          response.data.user;


        // Update React state

        setUser(updatedUser);


        // Update browser storage

        const storedUser =
          JSON.parse(
            localStorage.getItem("user")
          );


        localStorage.setItem(
          "user",

          JSON.stringify({

            ...storedUser,

            ...updatedUser

          })

        );


        setEditing(false);


        alert(
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


  // ===============================
  // LOGOUT
  // ===============================

  const handleLogout = () => {

    localStorage.removeItem("user");

    navigate("/login");

  };


  // ===============================
  // LOADING
  // ===============================

  if (loading) {

    return (
      <div className="accountMessage">

        <h2>
          Loading Account...
        </h2>

      </div>
    );

  }


  if (!user) {

    return (
      <div className="accountMessage">

        <h2>
          Unable to load account
        </h2>

      </div>
    );

  }


  // ===============================
  // ACCOUNT PAGE
  // ===============================

  return (

    <section className="accountPage">

      <div className="accountCard">


        {/* PROFILE */}

        <div className="profileSection">

          {user.profileImage ? (

            <img
              className="profileImage"
              src={user.profileImage}
              alt={user.name}
            />

          ) : (

            <div className="profilePlaceholder">

              {user.name
                ?.charAt(0)
                .toUpperCase()}

            </div>

          )}


          <h1>
            {user.name}
          </h1>

          <p>
            {user.email}
          </p>

        </div>


        {!editing ? (

          /* =========================
             VIEW PROFILE
          ========================= */

          <div className="profileDetails">


            <div className="detailRow">

              <strong>
                Name
              </strong>

              <span>
                {user.name}
              </span>

            </div>


            <div className="detailRow">

              <strong>
                Email
              </strong>

              <span>
                {user.email}
              </span>

            </div>


            <div className="detailRow">

              <strong>
                Phone
              </strong>

              <span>
                {user.phone ||
                  "Not added"}
              </span>

            </div>


            <h3>
              Delivery Address
            </h3>


            <p>

              {user.address?.houseNo}

              {user.address?.street &&
                `, ${user.address.street}`}

              {user.address?.city &&
                `, ${user.address.city}`}

              {user.address?.state &&
                `, ${user.address.state}`}

              {user.address?.pincode &&
                ` - ${user.address.pincode}`}

            </p>


            <button
              className="editButton"
              onClick={() =>
                setEditing(true)
              }
            >
              Edit Profile
            </button>


            <button
              className="logoutButton"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>

        ) : (

          /* =========================
             EDIT PROFILE
          ========================= */

          <form
            className="editProfileForm"
            onSubmit={handleSave}
          >

            <h2>
              Edit Profile
            </h2>


            {error && (

              <p className="accountError">
                {error}
              </p>

            )}


            {/* NAME */}

            <label>
              Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />


            {/* PHONE */}

            <label>
              Phone
            </label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />


            {/* PROFILE IMAGE */}

            <label>
              Profile Image URL
            </label>

            <input
              type="text"
              name="profileImage"
              value={
                formData.profileImage
              }
              onChange={handleChange}
              placeholder="https://..."
            />


            <h3>
              Delivery Address
            </h3>


            {/* HOUSE */}

            <label>
              House / Flat No.
            </label>

            <input
              type="text"
              name="houseNo"
              value={
                formData.address.houseNo
              }
              onChange={
                handleAddressChange
              }
            />


            {/* STREET */}

            <label>
              Street
            </label>

            <input
              type="text"
              name="street"
              value={
                formData.address.street
              }
              onChange={
                handleAddressChange
              }
            />


            {/* CITY */}

            <label>
              City
            </label>

            <input
              type="text"
              name="city"
              value={
                formData.address.city
              }
              onChange={
                handleAddressChange
              }
            />


            {/* STATE */}

            <label>
              State
            </label>

            <input
              type="text"
              name="state"
              value={
                formData.address.state
              }
              onChange={
                handleAddressChange
              }
            />


            {/* PINCODE */}

            <label>
              Pincode
            </label>

            <input
              type="text"
              name="pincode"
              value={
                formData.address.pincode
              }
              onChange={
                handleAddressChange
              }
            />


            {/* COUNTRY */}

            <label>
              Country
            </label>

            <input
              type="text"
              name="country"
              value={
                formData.address.country
              }
              onChange={
                handleAddressChange
              }
            />


            {/* BUTTONS */}

            <div className="formButtons">

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
                  setEditing(false)
                }
              >
                Cancel
              </button>

            </div>

          </form>

        )}

      </div>

    </section>

  );

};


export default Account;