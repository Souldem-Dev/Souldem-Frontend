'use client';
import React, { useState } from 'react';
import axios from 'axios'; // Ensure axios is imported
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'next/navigation';

const SubjectMapping = ({}) => {
  const [subjectCode, setSubjectCode] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [semNo, setSemNo] = useState('');
  const [intMarks, setIntMarks] = useState('');
  const [intPassMarks, setIntPassMarks] = useState('');
  const [extMarks, setExtMarks] = useState('');
  const [extPassMarks, setExtPassMarks] = useState('');
  const [totalMarks, setTotalMarks] = useState('');

  const params = useParams();

  const subjects = [
    { code: 'MTH', name: 'Maths' },
    { code: 'ENG', name: 'English' },
    { code: 'TAM', name: 'Tamil' },
  ];

  const handleSubmit = async () => {
    if (
      !subjectName ||
      !subjectCode ||
      !semNo ||
      !intMarks ||
      !extMarks ||
      !totalMarks
    ) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/subMap/createSubjectMap`,
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

          email, // If govAdd is passed from props
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
    <main>
      <div className="flex flex-col md:flex-row mx-auto justify-center ">
        <div className="border-2xl">
          <div className="md:p-4 flex flex-col m-2 md:m-12 gap-y-4">
            <div className="flex flex-col gap-y-4">
              <label className="text-para font-bold w-1/2">Subject Name:</label>
              <select
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                className="text-para border focus:ring-0 focus:outline-none bg-white rounded-xl px-2 h-12 w-full"
              >
                <option value="" disabled>
                  Select Subject Name
                </option>
                {subjects.map((subject) => (
                  <option key={subject.code} value={subject.name}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-y-4">
              <label className="text-para font-bold w-1/2">Subject Code:</label>
              <select
                value={subjectCode}
                onChange={(e) => setSubjectCode(e.target.value)}
                className="w-full h-12 text-para border focus:ring-0 focus:outline-none bg-white rounded-xl px-2"
              >
                <option value="" disabled>
                  Select Subject Code
                </option>
                {subjects.map((subject) => (
                  <option key={subject.code} value={subject.code}>
                    {subject.code}
                  </option>
                ))}
              </select>
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
                    onChange={(e) => setIntPassMarks(e.target.value)}
                    className="w-2/3 h-12 text-para focus:ring-0 focus:outline-none bg-white rounded-l-lg px-2"
                  />
                  <input
                    type="text"
                    placeholder="25"
                    value={intMarks}
                    onChange={(e) => setIntMarks(e.target.value)}
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
                    onChange={(e) => setExtPassMarks(e.target.value)}
                    className="w-2/3 h-12 text-para focus:ring-0 focus:outline-none bg-white rounded-l-lg px-2"
                  />

                  <input
                    type="text"
                    placeholder="75"
                    value={extMarks}
                    onChange={(e) => setExtMarks(e.target.value)}
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
                  placeholder="Enter Total Pass Marks"
                  value={totalMarks}
                  onChange={(e) => setTotalMarks(e.target.value)}
                  className="w-2/3 h-12 text-para border focus:ring-0 focus:outline-none bg-white rounded-l-lg px-2"
                />
                <span className="bg-blue w-1/3 h-12 text-center flex items-center justify-center m-auto rounded-r-lg">
                  24
                </span>
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

export default SubjectMapping;
