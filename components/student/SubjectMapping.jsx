'use client';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Image from 'next/image';

const SubjectMapping = ({ govAdd }) => {
  const [subjectCode, setSubjectCode] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [selectedOption, setSelectedOption] = useState('internal');
  const [formData, setFormData] = useState(null);
  const [semNo, setSemNo] = useState('');
  const [nonce, setNonce] = useState(0);

  // Subject options
  const subjects = [
    { code: 'MTH', name: 'Maths' },
    { code: 'ENG', name: 'English' },
    { code: 'TAM', name: 'Tamil' },
  ];

  const handleOptionChange = async (event) => {
    const selected = event.target.value;
    setSelectedOption(selected);
  };

  const handleSubmit = () => {
    const semNoInt = parseInt(semNo);
    const nonceInt = parseInt(nonce);

    if (isNaN(semNoInt) || isNaN(nonceInt)) {
      toast.error('Semester Number and Nonce must be integers');
      return;
    }

    const response = {
      subjectCode: subjectCode,
      subjectName: subjectName,
      semNo: semNoInt,
      nonce: nonceInt,
      govAdd: govAdd,
      selectedOption: selectedOption,
    };
    console.log(response);
    setFormData(response);
  };

  return (
    <main>
      <div className="flex flex-col md:flex-row mx-auto justify-center ">
        <div className="p-20   border-2xl">
          <div className="md:p-4 flex flex-col m-2 md:m-12 gap-y-4">
            <div className="flex flex-col gap-y-4">
              <label className="text-para font-bold w-1/2">
                Subject Name :
              </label>
              <select
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                className="text-para border focus:ring-0 focus:outline-none bg-white rounded-xl  h-12 w-full"
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
              <label className="text-para font-bold w-1/2">
                Subject Code :
              </label>
              <select
                value={subjectCode}
                onChange={(e) => setSubjectCode(e.target.value)}
                className="w-full h-12 text-para border-0 focus:ring-0 focus:outline-none bg-white rounded-xl px-2"
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
                Semester Number :
              </label>
              <input
                type="text"
                placeholder="Enter Semester Number"
                value={semNo}
                onChange={(e) => setSemNo(e.target.value)}
                className="w-full h-12 text-para border-0 focus:ring-0 focus:outline-none bg-white rounded-xl px-2"
              />
            </div>

            <div className="flex flex-row gap-y-4">
              <div>
                <label className="text-para font-bold w-1/2">
                  Internal Marks
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Internal Marks"
                    value={semNo}
                    onChange={(e) => setSemNo(e.target.value)}
                    className="w-2/3 h-24 text-para border-0 focus:ring-0 focus:outline-none bg-white rounded-l-lg px-2"
                  />
                  <span className="bg-blue w-1/3 h-24 text-center m-auto rounded-r-lg">
                    24
                  </span>
                </div>
              </div>
              <div>
                <label className="text-para font-bold w-1/2">
                  Semester Number :
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Internal Marks"
                    value={semNo}
                    onChange={(e) => setSemNo(e.target.value)}
                    className="w-2/3 h-24 text-para border-0 focus:ring-0 focus:outline-none bg-white rounded-l-lg px-2"
                  />
                  <span className="bg-blue w-1/3 h-24 text-center m-auto rounded-r-lg">
                    24
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label className="text-para font-bold w-1/2">Total Marks :</label>
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Internal Marks"
                  value={semNo}
                  onChange={(e) => setSemNo(e.target.value)}
                  className="w-2/3 h-12 text-para border-0 focus:ring-0 focus:outline-none bg-white rounded-l-lg px-2"
                />
                <span className="bg-blue w-1/3 h-12 text-center m-auto rounded-r-lg">
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
