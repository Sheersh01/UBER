import React from 'react'

const LocationSearchPanel = ({ setPanel, setVehiclePanel }) => {
    const locations = [
        "50- A , Kumanchal Nagar, Lucknow",
        "50- A , Kumanchal Nagar, Lucknow",
        "50- A , Kumanchal Nagar, Lucknow",
        "50- A , Kumanchal Nagar, Lucknow"
    ];
  return (
      <div className="px-6">
          
         { locations.map((location, index) => 
             <div
                 onClick={() => { setVehiclePanel(true); setPanel(false); }}
                 key={index} className="flex gap-4 items-center justify-start my-2">
        <h2 className="bg-[#eee] h-10 flex items-center justify-center w-10 rounded-full">
          <i className="ri-map-pin-fill"></i>
        </h2>
        <h4 className="font-normal text-sm">
          {location}
            </h4>
      </div>

          )}
    </div>
  );
}

export default LocationSearchPanel