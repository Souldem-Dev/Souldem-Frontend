'use client';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MarksTable from './MarksTable';
import StudentInfo from './StudentInfo';

const SubjectInput = () => {
  const [subjectCode, setSubjectCode] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [selectedOption, setSelectedOption] = useState('internal');
  const [formData, setFormData] = useState(null);

  const handleOptionChange = async (event) => {
    const selected = event.target.value;
    setSelectedOption(selected);

    // try {
    //   if (selected === 'internal') {
    //     const response = await axios.post(
    //       process.env.NEXT_PUBLIC_BACKEND_URL + 'marksheets/allowInternalMarks',
    //       {
    //         governAdd: '0xbD5ED0d45129dD88D87CfB9228905252fB83b1a6',
    //         semNo: 9,
    //         internal: true,
    //         external: false,
    //       }
    //     );
    //     if (response.status === 200) {
    //       toast.success('Internal Marks Allowed');
    //     }
    //     console.log(response.data);
    //   } else if (selected === 'external') {
    //     const response = await axios.post(
    //       process.env.NEXT_PUBLIC_BACKEND_URL + 'marksheets/allowExternalMarks',
    //       {
    //         governAdd: '0xbD5ED0d45129dD88D87CfB9228905252fB83b1a6',
    //         semNo: 9,
    //         internal: false,
    //         external: true,
    //       }
    //     );
    //     if (response.status === 200) {
    //       console.log('Success');
    //       toast.success('External Marks Allowed');
    //     }
    //     console.log(response.data);
    //   }
    // } catch (error) {
    //   console.error('Error:', error);
    //   toast.error('An error occurred. Please try again.');
    // }
  };

  const handleSubmit = () => {
    const response = {
      subjectCode: subjectCode,
      subjectName: subjectName,
      selectedOption: selectedOption,
    };
    console.log(response);
    setFormData(response);
  };

  return (
    <main>
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row">
          <div>
            <StudentInfo />
          </div>
          <div>
            <div className=" md:p-4 flex flex-col m-2 md:m-12 gap-y-4">
              <div className="flex items-center justify-content">
                <label className="text-para font-bold w-1/3">
                  Subject Code
                </label>
                <input
                  type="text"
                  placeholder="Enter Subject Code"
                  value={subjectCode}
                  onChange={(e) => setSubjectCode(e.target.value)}
                  className="w-full h-12 text-para border-0 focus:ring-0 focus:outline-none bg-gray rounded-xl px-2"
                />
              </div>
              <div className="flex items-center justify-content">
                <label className="text-para font-bold w-1/3">
                  Subject Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Subject Name"
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  className="text-para border-0 focus:ring-0 focus:outline-none bg-gray rounded-xl px-2 h-12 w-full"
                />
              </div>

              <div className="flex items-center justify-content gap-4">
                <label className="text-para font-bold w-1/3">
                  Select Marks Type
                </label>
                <div className="flex  items-center gap-2">
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
      {formData && <MarksTable formData={formData} />}{' '}
    </main>
  );
};

export default SubjectInput;
