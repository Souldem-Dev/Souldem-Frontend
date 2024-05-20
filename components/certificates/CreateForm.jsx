'use client';

import Image from 'next/image';
import React from 'react';
import { useState } from 'react';

const CreateForm = () => {
  const [signatureFile, setSignatureFile] = useState(null);
  const [signaturePreview, setSignaturePreview] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  const handleSignatureChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const previewUrl = URL.createObjectURL(selectedFile);
      setSignatureFile(selectedFile);
      setSignaturePreview(previewUrl);
    }
  };

  const handleLogoChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const previewUrl = URL.createObjectURL(selectedFile);
      setLogoFile(selectedFile);
      setLogoPreview(previewUrl);
    }
  };

  return (
    <div className="w-11/12 bg-white drop-shadow-md h-full py-8 px-4 md:p-20  my-8 flex flex-col gap-y-12 rounded-xl">
      <div className="flex flex-col md:flex-row w-full gap-y-2">
        <div className="md:w-1/2">
          <label className="font-bold text-lg md:text-xl">
            Authorized Name
          </label>
          <p className="text-sm text-para">
            Authorized name will be printed under signature.
          </p>
        </div>
        <div className="md:w-1/2">
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter Authorized Name"
            className="rounded-xl h-12 px-2 min-w-full bg-gray text-sm md:text-base"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full gap-y-2">
        <div className="md:w-1/2">
          <label className="font-bold text-lg md:text-xl">
            Authorized University Name
          </label>
          <p className="text-sm text-para">
            Authorized university name will be printed under authorized name.
          </p>
        </div>
        <div className="md:w-1/2">
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter University Name"
            className="rounded-xl h-12 px-2 min-w-full bg-gray text-sm md:text-base"
          />
        </div>
      </div>

      <div>
        <label className="font-bold text-lg md:text-xl">Upload Signature</label>
        <div className="border-2  border-gray w-full md:w-11/12 h-full flex flex-col md:flex-row gap-y-2  items-center justify-around rounded-lg ">
          <div className="bg-gray w-full md:w-80 h-40 md:h-60 p-4">
            {signaturePreview && (
              <div>
                <Image
                  src={signaturePreview}
                  alt="Preview"
                  width={300}
                  height={150}
                  className="object-fill"
                />
              </div>
            )}
          </div>
          <div>
            <p className="font-bold text-sm md:text-base">
              Size: 300x150 pixels
            </p>
            <p className="font-bold text-sm md:text-base">Format: PNG</p>
            <input
              type="file"
              accept="image/*"
              className="bg-blue text-white my-2 text-sm md:text-base"
              onChange={handleSignatureChange}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full gap-y-2">
        <div className="md:w-1/2">
          <label className="font-bold text-lg md:text-xl">
            Color Theme of Certificate
          </label>
        </div>
        <div className="md:w-1/2">
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter Authorized Name"
            className="rounded-xl h-12 px-2 min-w-full bg-gray text-sm md:text-base"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full gap-y-2">
        <div className="md:w-1/2">
          <label className="font-bold text-lg md:text-xl">
            Authorized University Address
          </label>
          <p className="text-sm text-para">
            Authorized university Address will be printed beside authorized
            university name.
          </p>
        </div>
        <div className="md:w-1/2">
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter University Address"
            className="rounded-xl h-20 md:h-28 px-2 min-w-full bg-gray text-sm md:text-base"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full gap-y-2">
        <div className="md:w-1/2">
          <label className="font-bold text-lg md:text-xl">Choose Type</label>
          <p className="text-sm text-para">
            Choose which type of Document to Generate
          </p>
        </div>
        <div className="md:w-1/2 flex gap-x-2">
          <button className="btn bg-gradient-to-r from-blue to-D_blue rounded-xl p-2 px-4 md:px-8 text-white flex gap-2 text-sm md:text-base">
            <input type="radio" name="type" value="certificate" />
            Certificate
          </button>
          <button className="btn bg-gradient-to-r from-gray to-white rounded-xl p-2 px-4 md:px-8 text-black flex gap-2 text-sm md:text-base">
            <input type="radio" name="type" value="degree" />
            Marksheet
          </button>
        </div>
      </div>

      <div>
        <label className="font-bold text-lg md:text-xl">Upload Logo</label>
        <div className="border border-gray w-full md:w-11/12 h-full flex flex-col md:flex-row gap-y-2 p-8 items-center justify-around rounded-lg">
          <div className="bg-gray w-full md:w-80 h-40 md:h-60 p-4">
            {logoPreview && (
              <div>
                <Image
                  src={logoPreview}
                  alt="Preview"
                  width={300}
                  height={150}
                  className="object-fill"
                />
              </div>
            )}
          </div>
          <div>
            <p className="font-bold text-sm md:text-base">
              Size: 300x150 pixels
            </p>
            <p className="font-bold text-sm md:text-base">Format: PNG</p>
            <input
              type="file"
              accept="image/*"
              className="bg-blue text-white my-2 text-sm md:text-base"
              onChange={handleLogoChange}
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="btn bg-gradient-to-r from-blue to-D_blue focus:outline-none focus:ring w-20 md:w-28 text-white py-2 px-4 rounded-xl text-sm md:text-base"
      >
        Submit
      </button>
    </div>
  );
};

export default CreateForm;
