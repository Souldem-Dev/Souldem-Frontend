'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { ColorPicker, useColor } from 'react-color-palette';
import 'react-color-palette/css';

const CertTemplateForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    universityLoc: '',
    AffliatedTo: '',
    Autonomous: false, // Boolean
    Private: false, // Boolean
  });

  const [marksheetColor, setMarksheetColor] = useColor('hex', '#561ecb');
  const [provisionalColor, setProvisionalColor] = useColor('hex', '#00aaff');

  const [showMarksheetPicker, setShowMarksheetPicker] = useState(false);
  const [showProvisionalPicker, setShowProvisionalPicker] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}marksheets/setCertTemplate`,
        {
          ...formData,
          marksheetColor: marksheetColor.hex,
          provisionalColor: provisionalColor.hex,
        }
      );
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Set Certificate Template</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            University email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md bg-white focus:ring focus:ring-indigo-200"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="universityLoc"
            className="block text-sm font-medium text-gray-700"
          >
            University Location
          </label>
          <input
            type="text"
            id="universityLoc"
            name="universityLoc"
            value={formData.universityLoc}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md bg-white focus:ring focus:ring-indigo-200"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Marksheet Color
          </label>
          <div
            className="mt-2 p-2 w-full border rounded-md bg-white cursor-pointer"
            style={{ backgroundColor: marksheetColor.hex }}
            onClick={() => setShowMarksheetPicker(!showMarksheetPicker)}
          >
            {marksheetColor.hex}
          </div>
          {showMarksheetPicker && (
            <div className="mt-2">
              <ColorPicker
                color={marksheetColor}
                onChange={setMarksheetColor}
                width={300}
                height={150}
              />
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Provisional Certificate Color
          </label>
          <div
            className="mt-2 p-2 w-full border rounded-md bg-white cursor-pointer"
            style={{ backgroundColor: provisionalColor.hex }}
            onClick={() => setShowProvisionalPicker(!showProvisionalPicker)}
          >
            {provisionalColor.hex || 'Select a color'}
          </div>
          {showProvisionalPicker && (
            <div className="mt-2">
              <ColorPicker
                color={provisionalColor}
                onChange={setProvisionalColor}
                width={300}
                height={150}
              />
            </div>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="AffliatedTo"
            className="block text-sm font-medium text-gray-700"
          >
            Affiliated To
          </label>
          <input
            type="text"
            id="AffliatedTo"
            name="AffliatedTo"
            value={formData.AffliatedTo}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md bg-white focus:ring focus:ring-indigo-200"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="Autonomous"
            className="block text-sm font-medium text-gray-700"
          >
            Autonomous
          </label>
          <input
            type="checkbox"
            id="Autonomous"
            name="Autonomous"
            checked={formData.Autonomous}
            onChange={handleChange}
            className="mt-1"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="Private"
            className="block text-sm font-medium text-gray-700"
          >
            Private
          </label>
          <input
            type="checkbox"
            id="Private"
            name="Private"
            checked={formData.Private}
            onChange={handleChange}
            className="mt-1"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CertTemplateForm;
