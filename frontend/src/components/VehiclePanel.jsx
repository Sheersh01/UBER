import React from 'react'

const VehiclePanel = ({ setVehiclePanel,setConfirmRidePanel }) => {
  return (
    <div>
      <h5 className="my-2">
        <i
          onClick={() => setVehiclePanel(false)}
          className="absolute top-1 ri-arrow-down-s-line"
        ></i>
      </h5>
      <h1 className="font-semibold text-2xl mb-4">Choose a vehicle</h1>
      <div
      onClick={() => { setConfirmRidePanel(true); setVehiclePanel(false); }}
      className=" mb-2 w-full border-black border-2 px-2 py-2 rounded-xl flex items-center justify-between">
        <img
          className="h-10"
          src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yYzdmYTE5NC1jOTU0LTQ5YjItOWM2ZC1hM2I4NjAxMzcwZjUucG5n"
          alt=""
        />
        <div className="w-1/2">
          <h4 className="font-medium text-base">
            Moto
            <span>
              <i className="ri-user-3-fill"></i>1
            </span>
          </h4>
          <h5 className="font-medium text-sm">2 mins away</h5>
          <p className="font-normal text-xs">Affordable, compact rides</p>
        </div>
        <h2 className="text-xl font-semibold">$65.5</h2>
      </div>
      <div
      onClick={() => { setConfirmRidePanel(true); setVehiclePanel(false); }}
      className=" mb-2 w-full border-black border-2 px-2 py-2 rounded-xl flex items-center justify-between">
        <img
          className="h-10"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwz1lf3_vvNTLV1RwM8qDeVoLnPe_jPUkf-g&s"
          alt=""
        />
        <div className="w-1/2">
          <h4 className="font-medium text-base">
            UberGo
            <span>
              <i className="ri-user-3-fill"></i>4
            </span>
          </h4>
          <h5 className="font-medium text-sm">2 mins away</h5>
          <p className="font-normal text-xs">Affordable, compact rides</p>
        </div>
        <h2 className="text-xl font-semibold">$193.5</h2>
      </div>
      <div
      onClick={() => { setConfirmRidePanel(true); setVehiclePanel(false); }}
      className=" mb-2 w-full border-black border-2 px-2 py-2 rounded-xl flex items-center justify-between">
        <img
          className="h-10"
          src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8xZGRiOGM1Ni0wMjA0LTRjZTQtODFjZS01NmExMWEwN2ZlOTgucG5n"
          alt=""
        />
        <div className="w-1/2">
          <h4 className="font-medium text-base">
            Uber Auto
            <span>
              <i className="ri-user-3-fill"></i>3
            </span>
          </h4>
          <h5 className="font-medium text-sm">3 mins away</h5>
          <p className="font-normal text-xs">Affordable, compact rides</p>
        </div>
        <h2 className="text-xl font-semibold">$120.5</h2>
      </div>
    </div>
  );
};

export default VehiclePanel