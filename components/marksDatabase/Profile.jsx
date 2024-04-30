import React from 'react';

const Profile = () => {
  return (
    <main className="m-2 flex justify-between w-5/6 bg-white drop-shadow-md p-6">
      <div>
        <name className="flex">
          Name of the Student : <p>Joe Biden</p>
        </name>
        <student_id className="flex">
          Student Id :<p>22bcs10035</p>
        </student_id>
        <wallet_id className="flex">
          wallet Id : <p> 1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2</p>
        </wallet_id>
        <course className="flex">
          Course : <p> B.Tech</p>
        </course>
      </div>
    </main>
  );
};

export default Profile;
