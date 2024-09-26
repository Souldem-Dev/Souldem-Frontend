'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Ensure axios is imported
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'next/navigation';

const Page = () => {
  const [subjectCode, setSubjectCode] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [semNo, setSemNo] = useState('');
  const [intMarks, setIntMarks] = useState(0);
  const [intPassMarks, setIntPassMarks] = useState(0);
  const [extMarks, setExtMarks] = useState(0);
  const [extPassMarks, setExtPassMarks] = useState(0);
  const [totalMarks, setTotalMarks] = useState(0);
  const [totalPassMarks, setTotalPassMarks] = useState(0);

  const params = useParams();

  // Recalculate total marks and total pass marks when any input changes
  useEffect(() => {
    const calculatedTotalMarks = parseInt(intMarks) + parseInt(extMarks);
    const calculatedTotalPassMarks =
      parseInt(intPassMarks) + parseInt(extPassMarks);

    setTotalMarks(calculatedTotalMarks || 0);
    setTotalPassMarks(calculatedTotalPassMarks || 0);
  }, [intMarks, extMarks, intPassMarks, extPassMarks]);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}subMap/createSubjectMap`,
        {
          subjectName,
          subjectCode,
          semNo,
          intMarks,
          extMarks,
          intPassMarks,
          extPassMarks,
          totalMarks,
          governAdd: params.govAdd, // If govAdd is passed from props
          email: 'jayanth.sms.in@gmail.com', // If email is passed from props
        }
      );

      console.log(response);

      if (response.status === 200) {
        toast.success('Subject mapping created successfully!');
      } else {
        toast.error('Failed to create subject mapping');
      }
    } catch (error) {
      toast.error('An error occurred while creating subject mapping');
    }
  };

  return (
    <main className="m-12 md:m-auto lg:w-5/12">
      <div className="flex flex-col md:flex-row m-auto justify-center">
        <div className="border-2xl">
          <div className="md:p-4 flex flex-col m-2 md:m-12 gap-y-4">
            <div className="flex flex-col gap-y-4">
              <label className="text-para font-bold w-1/2">Subject Name:</label>
              <input
                type="text"
                placeholder="Enter Subject Name"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                className="w-full h-12 text-para border focus:ring-0 focus:outline-none bg-white rounded-xl px-2"
              />
            </div>

            <div className="flex flex-col gap-y-4">
              <label className="text-para font-bold w-1/2">Subject Code:</label>
              <input
                type="text"
                placeholder="Enter Subject Code"
                value={subjectCode}
                onChange={(e) => setSubjectCode(e.target.value)}
                className="w-full h-12 text-para border focus:ring-0 focus:outline-none bg-white rounded-xl px-2"
              />
            </div>

            <div className="flex flex-col gap-y-4">
              <label className="text-para font-bold w-1/2">
                Semester Number:
              </label>
              <input
                type="text"
                placeholder="Enter Semester Number"
                value={semNo}
                onChange={(e) => setSemNo(e.target.value)}
                className="w-full h-12 text-para border focus:ring-0 focus:outline-none bg-white rounded-xl px-2"
              />
            </div>

            <div className="flex flex-row gap-4 items-center justify-center">
              <div>
                <label className="text-para font-bold w-1/2">
                  Internal Marks
                </label>
                <div className="flex items-center justify-center border rounded-lg focus:ring-0 focus:outline-none">
                  <input
                    type="text"
                    placeholder="Enter Pass Marks"
                    value={intPassMarks}
                    onChange={(e) =>
                      setIntPassMarks(parseInt(e.target.value) || 0)
                    }
                    className="w-2/3 h-12 text-para focus:ring-0 focus:outline-none bg-white rounded-l-lg px-2"
                  />
                  <input
                    type="text"
                    placeholder="25"
                    value={intMarks}
                    onChange={(e) => setIntMarks(parseInt(e.target.value) || 0)}
                    className="bg-blue w-1/3 h-12 m-auto flex items-center justify-center rounded-r-lg"
                  />
                </div>
              </div>
              <div>
                <label className="text-para font-bold w-1/2">
                  External Marks:
                </label>
                <div className="flex items-center border rounded-lg focus:ring-0 focus:outline-none">
                  <input
                    type="text"
                    placeholder="Enter Pass Marks"
                    value={extPassMarks}
                    onChange={(e) =>
                      setExtPassMarks(parseInt(e.target.value) || 0)
                    }
                    className="w-2/3 h-12 text-para focus:ring-0 focus:outline-none bg-white rounded-l-lg px-2"
                  />
                  <input
                    type="text"
                    placeholder="75"
                    value={extMarks}
                    onChange={(e) => setExtMarks(parseInt(e.target.value) || 0)}
                    className="bg-blue w-1/3 h-12 mx-auto p-auto rounded-r-lg"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-para font-bold w-1/2">Total Marks:</label>
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Total Pass Marks"
                  value={totalPassMarks}
                  readOnly
                  className="w-2/3 h-12 text-para border focus:ring-0 focus:outline-none bg-white rounded-l-lg px-2"
                />
                <input
                  type="text"
                  placeholder="Total Marks"
                  value={totalMarks}
                  readOnly
                  className="bg-blue w-1/3 h-12 mx-auto p-auto rounded-r-lg"
                />
              </div>
            </div>

            <div className="flex items-center justify-content">
              <button
                className="btn bg-blue focus:outline-none focus:ring w-full text-white py-2 px-4 rounded-xl"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>

            <ToastContainer />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
