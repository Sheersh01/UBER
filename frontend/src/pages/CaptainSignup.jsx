import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import { useContext } from "react";
import axios from 'axios'

const CaptainSignup = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [captainData, setcaptainData] = useState({});
const navigate = useNavigate()
  const { captain, setCaptain } = useContext(CaptainDataContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
    };

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)
    if (response.status === 201) {
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }

    setfirstName("");
    setlastName("");
    setemail("");
    setpassword("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleCapacity("");
    setVehicleType("");
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between ">
      <div>
        <img
          className="w-16 mb-10"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSVCO4w_adxK32rCXFeKq3_NbLcR9b_js14w&s"
          alt=""
        />
        <form onSubmit={(e) => onSubmitHandler(e)} action="">
          <h3 className="text-xl mb-2">Whats's your name</h3>
          <div className="flex gap-4 ">
            <input
              onChange={(e) => setfirstName(e.target.value)}
              required
              className="bg-[#eeeeee] mb-2 rounded px-4 py-2 border-none w-1/2 text-lg placeholder:text-base"
              type="text"
              placeholder="Firstname"
              value={firstName}
            />
            <input
              onChange={(e) => setlastName(e.target.value)}
              required
              className="bg-[#eeeeee] mb-2 rounded px-4 py-2 border-none w-1/2 text-lg placeholder:text-base"
              type="text"
              placeholder="Lastname"
              value={lastName}
            />
          </div>

          <h3 className="text-xl mb-2">Whats's your email</h3>
          <input
            onChange={(e) => setemail(e.target.value)}
            required
            className="bg-[#eeeeee] mb-2 rounded px-4 py-2 border-none w-full text-lg placeholder:text-base"
            type="email"
            placeholder="example@gmail.com"
            value={email}
          />

          <h3 className="text-xl mb-2">Enter password</h3>
          <input
            onChange={(e) => setpassword(e.target.value)}
            required
            className="bg-[#eeeeee] mb-2 rounded px-4 py-2 border-none w-full text-lg placeholder:text-base"
            type="password"
            placeholder="password"
            value={password}
          />

          <h3 className="text-xl mb-2">Vehicle Information</h3>
          <div className="flex gap-4 mb-2">
            <input
              onChange={(e) => setVehicleColor(e.target.value)}
              required
              className="bg-[#eeeeee] rounded px-4 py-2 border-none w-1/2 text-lg placeholder:text-base"
              type="text"
              placeholder="Vehicle Color"
              value={vehicleColor}
            />
            <input
              onChange={(e) => setVehiclePlate(e.target.value)}
              required
              className="bg-[#eeeeee] rounded px-4 py-2 border-none w-1/2 text-lg placeholder:text-base"
              type="text"
              placeholder="Vehicle Plate"
              value={vehiclePlate}
            />
          </div>

          <div className="flex gap-4 mb-7">
            <input
              onChange={(e) => setVehicleCapacity(e.target.value)}
              required
              className="bg-[#eeeeee] rounded px-4 py-2 border-none w-1/2 text-lg placeholder:text-base"
              type="number"
              placeholder="Vehicle Capacity"
              value={vehicleCapacity}
              min="1"
            />
            <select
              onChange={(e) => setVehicleType(e.target.value)}
              required
              className="bg-[#eeeeee] rounded px-4 py-2 border-none w-1/2 text-lg placeholder:text-base"
              value={vehicleType}
            >
              <option value="" disabled>
                Select Vehicle Type
              </option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
          </div>

          <button className="bg-[#111] text-white font-medium mb-1 rounded px-4 py-2 border-none w-full text-lg placeholder:text-base">
            Create Captain Account
          </button>
        </form>
        <p className="">
          Already have a account ?
          <Link to="/login" className="text-blue-600">
            {" "}
            Login here
          </Link>
        </p>
      </div>
      <div>
        <p className="text-[10px] leading-tight">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Policy </span>
          and <span className="underline">Terms of Service</span> apply.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
