'use client';
import React, { useState } from 'react';
import axios from 'axios';

const SubjectInput = () => {
  const [subjectCode, setSubjectCode] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [selectedOption, setSelectedOption] = useState('internal');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true); // Disable form during submission

      // Prepare payload based on selectedOption
      const payload = {
        subjectCode,
        subjectName,
        marksType: selectedOption,
      };

      // Simulate sending data to another component (replace with actual logic)
      console.log('Sending data to another component:', payload);

      // Example: sending data using axios to a backend endpoint
      // const response = await axios.post('/api/sendDataToAnotherComponent', payload);
      // Handle response if needed

      // Reset form state after submission
      setSubjectCode('');
      setSubjectName('');
      setSelectedOption('internal');

      // Optionally handle success feedback
      console.log('Data submitted successfully');
    } catch (error) {
      console.error('Error submitting data:', error);
      // Handle error if needed
    } finally {
      setIsSubmitting(false); // Re-enable form after submission
    }
  };

  return (
    <div className="w-1/2 p-4 flex flex-col m-12 gap-y-4">
      <div className="flex items-center justify-content">
        <label className="text-para font-bold w-1/3">Subject Code</label>
        <input
          type="text"
          placeholder="Enter Subject Code"
          value={subjectCode}
          onChange={(e) => setSubjectCode(e.target.value)}
          className="w-2/3 h-12 text-para border-0 focus:ring-0 focus:outline-none bg-gray rounded-xl px-2"
        />
      </div>
      <div className="flex items-center justify-content">
        <label className="text-para font-bold w-1/3">Subject Name</label>
        <input
          type="text"
          placeholder="Enter Subject Name"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          className="text-para border-0 focus:ring-0 focus:outline-none bg-gray rounded-xl px-2 h-12 w-2/3"
        />
      </div>

      <div className="flex items-center justify-content gap-4">
        <label className="text-para font-bold">Select Marks Type</label>
        <div className="flex items-center">
          <input
            type="radio"
            id="internal"
            name="marksType"
            value="internal"
            checked={selectedOption === 'internal'}
            onChange={() => handleOptionChange('internal')}
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
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            id="external"
            name="marksType"
            value="external"
            checked={selectedOption === 'external'}
            onChange={() => handleOptionChange('external')}
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
          className={`btn bg-blue focus:outline-none focus:ring w-full text-white py-2 px-4 rounded-xl ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </div>
  );
};

export default SubjectInput;
