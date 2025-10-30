import React from 'react'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div>
      <div className="h-screen pt-8 flex justify-between flex-col w-full bg-[url(https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/c5310f182519763.652f3606b64b0.jpg)] bg-bottom bg-cover">
        <img
          className="w-16 ml-8"
          src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg"
          alt=""
        />
        <div className="bg-white pb-7 py-5 px-10">
          <h2 className="text-3xl font-bold">Get Started with Uber</h2>
          <Link to="/login" className="flex items-center justify-center w-full bg-black text-white py-3 rouded mt-5">
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home