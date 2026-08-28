import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUserPassword } from "../API/userApi";
import "../Styles/Account.css";

const Account = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [passwordLoading, setPasswordLoading] =
    useState(false);

  const [passwordMessage, setPasswordMessage] =
    useState("");

  const [passwordError, setPasswordError] =
    useState("");


  // ===============================
  // LOAD USER
  // ===============================

  useEffect(() => {

    const storedUser =
      localStorage.getItem("user");

    if (!storedUser) {
      navigate("/login");
      return;
    }

    setUser(
      JSON.parse(storedUser)
    );

  }, [navigate]);


  // ===============================
  // LOGOUT
  // ===============================

  const handleLogout = () => {

    localStorage.removeItem("user");

    navigate("/login");

  };


  // ===============================
  // CHANGE PASSWORD
  // ===============================

  const handleChangePassword = async (e) => {

    e.preventDefault();

    setPasswordMessage("");
    setPasswordError("");


    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {

      setPasswordError(
        "Please fill all password fields"
      );

      return;
    }


    if (newPassword.length < 6) {

      setPasswordError(
        "New password must be at least 6 characters"
      );

      return;
    }


    if (newPassword !== confirmPassword) {

      setPasswordError(
        "New passwords do not match"
      );

      return;
    }


    try {

      setPasswordLoading(true);


      const response =
        await updateUserPassword(
          user.id,
          {
            currentPassword,
            newPassword
          }
        );


      if (response.data.success) {

        setPasswordMessage(
          "Password changed successfully"
        );

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");

      }

    } catch (error) {

      console.error(
        "Change Password Error:",
        error
      );

      setPasswordError(
        error.response?.data?.message ||
        "Failed to change password"
      );

    } finally {

      setPasswordLoading(false);

    }

  };


  if (!user) {

    return (
      <h2>
        Loading...
      </h2>
    );

  }


  return (

    <section className="accountPage">

      {/* =========================
          PROFILE
      ========================= */}

      <div className="accountCard">

        <h1>
          My Account
        </h1>

        <h2>
          Welcome, {user.name}
        </h2>

        <p>
          Email: {user.email}
        </p>


        <div className="accountActions">

          <button
            onClick={() =>
              navigate("/edit-profile")
            }
          >
            Edit Profile
          </button>


          <button
            onClick={() =>
              navigate("/basket")
            }
          >
            My Basket
          </button>

        </div>

      </div>


      {/* =========================
          CHANGE PASSWORD
      ========================= */}

      <div className="passwordCard">

        <h2>
          Change Password
        </h2>

        <form
          onSubmit={
            handleChangePassword
          }
        >

          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) =>
              setCurrentPassword(
                e.target.value
              )
            }
          />


          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(
                e.target.value
              )
            }
          />


          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
          />


          {passwordError && (

            <p className="passwordError">
              {passwordError}
            </p>

          )}


          {passwordMessage && (

            <p className="passwordSuccess">
              {passwordMessage}
            </p>

          )}


          <button
            type="submit"
            disabled={passwordLoading}
          >

            {passwordLoading
              ? "Changing..."
              : "Change Password"}

          </button>

        </form>

      </div>


      {/* =========================
          LOGOUT
      ========================= */}

      <button
        className="logoutButton"
        onClick={handleLogout}
      >
        Logout
      </button>

    </section>

  );

};

export default Account;