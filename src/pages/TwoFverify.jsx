import axios from "axios";
import React, { useContext, useState } from "react";
import OTPInput from "react-otp-input";
import "react-toastify/dist/ReactToastify.css";
import Authcontext from "../context/Authcontext";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const TwoFverify = () => {
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const { user } = useContext(Authcontext);

  const navigate = useNavigate();

  const handleVerify = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/user/verify-2fa",
        {
          username: user.username,
          token: otp,
        }
      );
      if (data?.success) {
        setIsVerified(true);
        toast(data?.message, { type: success });
      }
    } catch (error) {
      console.log(error)
      toast(error.response.data.message, { type: "error" });
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
    <ToastContainer/>
      {!isVerified ? (
        <div className="w-[500px] flex flex-col gap-5 justify-center items-center">
          <label className="text-5xl text-white font-bold">
            Enter Security Code
          </label>
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
            placeholder="Enter Security Code"
            inputStyle={{
              height: "50px",
              width: "50px",
              fontSize: "larger",
              color: "white",
              borderRadius: "8px",
            }}
          />
          <button className="btn btn-active btn-primary uppercase w-[70%]" onClick={handleVerify}>
            Verify Code
          </button>
          <button className="btn btn-active btn-warning uppercase w-[70%]" onClick={()=>{setOtp("")}}>
            cancel
          </button>
        </div>
      ) : (
        <div>
          <button className="btn btn-active btn-primary uppercase" onClick={()=>navigate("/home")}>
            go to home
          </button>
        </div>
      )}
    </div>
  );
};
