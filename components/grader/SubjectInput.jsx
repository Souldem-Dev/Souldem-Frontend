'use client';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MarksTable from './MarksTable';
import StudentInfo from './StudentInfo';
import Image from 'next/image';
import poster from '@/app/assets/marksDB/poster.svg';

const SubjectInput = ({ govAdd }) => {
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
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row justify-center ">
          <div className="hidden md:flex w-1/3">
            <Image src={poster} alt="poster" />
          </div>
          <div className="p-20 w-2/3 bg-white border-2xl">
            <div className="md:p-4 flex flex-col m-2 md:m-12 gap-y-4">
              <div className="flex items-center justify-content">
                <label className="text-para font-bold w-1/2">Nonce :</label>
                <input
                  type="number"
                  placeholder="Enter Nonce"
                  value={nonce}
                  onChange={(e) => setNonce(e.target.value)}
                  className="text-para border-0 focus:ring-0 focus:outline-none bg-gray rounded-xl px-2 h-12 w-full"
                />
              </div>

              <div className="flex items-center justify-content">
                <label className="text-para font-bold w-1/2">
                  Subject Name :
                </label>
                <select
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  className="text-para border-0 focus:ring-0 focus:outline-none bg-gray rounded-xl px-2 h-12 w-full"
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

              <div className="flex items-center justify-content">
                <label className="text-para font-bold w-1/2">
                  Subject Code :
                </label>
                <select
                  value={subjectCode}
                  onChange={(e) => setSubjectCode(e.target.value)}
                  className="w-full h-12 text-para border-0 focus:ring-0 focus:outline-none bg-gray rounded-xl px-2"
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

              <div className="flex items-center justify-content">
                <label className="text-para font-bold w-1/2">
                  Semester Number :
                </label>
                <input
                  type="text"
                  placeholder="Enter Semester Number"
                  value={semNo}
                  onChange={(e) => setSemNo(e.target.value)}
                  className="w-full h-12 text-para border-0 focus:ring-0 focus:outline-none bg-gray rounded-xl px-2"
                />
              </div>

              <div className="flex items-center justify-content gap-4">
                <label className="text-para font-bold w-1/2">
                  Select Marks Type :
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="internal"
                    name="marksType"
                    value="internal"
                    checked={selectedOption === 'internal'}
                    onChange={handleOptionChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="internal"
                    className={`btn cursor-pointer py-2 px-4 rounded-xl ${
                      selectedOption === 'internal'
                        ? 'bg-blue text-white'
                        : 'bg-white text-blue border border-blue'
                    }`}
                  >
                    Internal Marks
                  </label>

                  <input
                    type="radio"
                    id="external"
                    name="marksType"
                    value="external"
                    checked={selectedOption === 'external'}
                    onChange={handleOptionChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="external"
                    className={`btn cursor-pointer py-2 px-4 rounded-xl ${
                      selectedOption === 'external'
                        ? 'bg-blue text-white'
                        : 'bg-white text-blue border border-blue'
                    }`}
                  >
                    External Marks
                  </label>
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
      </div>
      {formData && <MarksTable formData={formData} />}
    </main>
  );
};

export default SubjectInput;
