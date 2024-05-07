import React, { useContext, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Authcontext from "../context/Authcontext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const TwoFSetup = () => {
  const { user } = useContext(Authcontext);
  const [qr, setQr] = useState("");
  const navigate = useNavigate();
  const handleSetup = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/user/setup-2fa",
        {
          username: user.username,
        }
      );
      if (data?.success) {
        setQr(data?.qrcode);
        document.getElementById("my_modal_3").showModal();
        // navigate("/verify")
      }
    } catch (error) {
      toast(error.response.data.message, { type: "error" });
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <ToastContainer />
      <div className="w-[500px] flex flex-col gap-5">
        <h1 className="text-5xl font-extrabold text-white text-center">
          Enable Two-Factor Authentication
        </h1>
        <button className="btn btn-active btn-primary" onClick={handleSetup}>
          Enable
        </button>
      </div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => navigate("/verify")}
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">
            Scan the QR Code using your authenticator app
          </h3>
          <div className="flex justify-center mt-10">
            <img src={qr} alt="qr code" />
          </div>
        </div>
      </dialog>
    </div>
  );
};
