import React from 'react';

const Card = ({ data }) => {
  return (
    <main className="  grid   md:grid-cols-4 w-full gap-x-4  gap-y-8 m-4">
      {data.map((item, index) => (
        <div key={index} className=" w-72 h-64  bg-white  text-black ">
          <div className=" p-6  flex flex-col gap-y-4">
            <div>
              <div>
                <h2 className="text-3xl font-thin ">{item.batch}</h2>
                <p> by {item.university}</p>
              </div>
            </div>
            <div>
              <div className="flex justify-between  items-center">
                <p>Students </p>

                <p>{item.students} </p>
              </div>
              <div className="flex justify-between items-center">
                <p>Graders</p>
                <p>{item.graders} </p>
              </div>
              <div className="flex justify-between items-center">
                <p>Others</p>
                <p>{item.others} </p>
              </div>
            </div>

            <button className="w-20 hover:bg-blue hover:text-white mx-auto my-4 text-blue py-1 bg-white  border border-blue rounded-3xl">
              Open
            </button>
          </div>
        </div>
      ))}
    </main>
  );
};

export default Card;
