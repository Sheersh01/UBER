import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";

const Home = () => {
  const submitHandler = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };
  const [pickUp, setPickUp] = useState("");
  const [destination, setDestination] = useState("");
  const [panel, setPanel] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const panelRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRideRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  useGSAP(() => {
    if (panel) {
      gsap.to(panelRef.current, {
        height: "70%",
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [panel]);



  useGSAP(() => {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
       transform: "translateY(0%)",
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(100%)",
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [vehiclePanel]);


  
  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRideRef.current, {
        transform: "translateY(0%)",
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(confirmRideRef.current, {
        transform: "translateY(100%)",
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [confirmRidePanel]);

  

  
  useGSAP(() => {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(0%)",
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(100%)",
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [vehicleFound]);



  useGSAP(() => {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(0%)",
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(100%)",
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [waitingForDriver]);


  return (
    <div>
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg"
        alt=""
      />
      <div className="h-screen w-screen">
        <img
          className="h-full w-full object-fit object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/1*HNGTmelmEbNdW_bHjGJs3A.jpeg"
          alt=""
        />
      </div>
      <div className="h-screen absolute bottom-0 w-full flex flex-col justify-end overflow-hidden">
        <div className="h-[30%] bg-white relative p-5">
          {panel && (
            <i
              onClick={() => setPanel(false)}
              className="absolute top-1 ri-arrow-down-s-line"
            ></i>
          )}
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form onSubmit={(e) => submitHandler(e)}>
            <div className="line absolute h-16 w-1 bg-black top-[50%] left-[10%]"></div>
            <input
              className="bg-[#eeeeee] px-12 py-2 text-base rounded-lg w-full mt-5"
              type="text"
              placeholder="Add a pick-up location"
              value={pickUp}
              onChange={(e) => setPickUp(e.target.value)}
              onClick={() => setPanel(true)}
            />
            <input
              className="bg-[#eeeeee] px-12 py-2 text-base rounded-lg w-full mt-5"
              type="text"
              placeholder="Enter your destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              onClick={() => setPanel(true)}
            />
          </form>
        </div>
        <div ref={panelRef} className="h-0 bg-white">
          <LocationSearchPanel
            setPanel={setPanel}
            setVehiclePanel={setVehiclePanel}
          />
        </div>
      </div>
      <div
        ref={vehiclePanelRef}
        className="fixed translate-y-full z-10 w-full bottom-0 bg-white p-5"
      >
        <VehiclePanel
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel}
        />
      </div>

      <div
        ref={confirmRideRef}
        className="fixed translate-y-full z-10 w-full bottom-0 bg-white p-5"
      >
        <ConfirmRide
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
        />
      </div>

      <div
        ref={vehicleFoundRef}
        className="fixed translate-y-full z-10 w-full bottom-0 bg-white p-5"
      >
        <LookingForDriver setVehicleFound={setVehicleFound} />
      </div>

      <div
        ref={waitingForDriverRef}
        className="fixed translate-y-full z-10 w-full bottom-0 bg-white p-5"
      >
        <WaitingForDriver setWaitingForDriver={setWaitingForDriver} />
      </div>
    </div>
  );
};

export default Home;
