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
    <div className="w-11/12 bg-white drop-shadow-md h-full p-20 flex flex-col gap-y-8 rounded-xl ">
      <div className="flex ">
        <div className="w-1/2">
          <label className="font-bold text-xl">Authorized Name</label>
          <p className="text-sm text-para">
            Authorized name will be printed under signature.
          </p>
        </div>
        <div className="w-1/2">
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter Authorized Name"
            className=" rounded-xl h-12 px-2 w-full bg-gray"
          />
        </div>
      </div>
      <div className="flex ">
        <div className="w-1/2">
          <label className="font-bold text-xl">
            Authorized University Name
          </label>
          <p className="text-sm text-para">
            Authorized university name will be printed under authorized name.
          </p>
        </div>
        <div className="w-1/2">
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter University Name"
            className=" rounded-xl h-12 px-2 w-full bg-gray"
          />
        </div>
      </div>
      <div>
        <label className="font-bold text-xl">Upload Signature</label>
        <div className="border border-gray w-11/12 h-72 flex p-8 items-center justify-around rounded-lg">
          <div className="bg-gray w-80 h-60 p-4">
            {signaturePreview && (
              <div>
                <Image
                  src={signaturePreview}
                  alt="Preview"
                  width={300}
                  height={150}
                  className=" inset-0  object-fill"
                />
              </div>
            )}
          </div>
          <div>
            <p className="font-bold ">Size: 300x150 pixels</p>
            <p className="font-bold">Format: PNG</p>
            <input
              type="file"
              accept="image/*"
              className="bg-blue text-white my-2"
              onChange={handleSignatureChange}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <div className="w-1/2">
          <label className="font-bold text-xl">
            Color Theme of Certificate{' '}
          </label>
        </div>
        <div className="w-1/2">
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter Authorized Name"
            className=" rounded-xl h-12 px-2 w-full bg-gray"
          />
        </div>
      </div>
      <div className="flex  items-center">
        <div className="w-1/2">
          <label className="font-bold text-xl">
            Authorized University Address
          </label>
          <p className="text-sm text-para ">
            Authorized university Address will be printed beside authorized
            university name.{' '}
          </p>
        </div>
        <div className="w-1/2">
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter University Address"
            className=" rounded-xl h-28 px-2 w-full bg-gray"
          />
        </div>
      </div>
      <div className="flex  items-center justify-between">
        <div className="w-1/2">
          <label className="font-bold text-xl">Choose Type </label>
          <p className="text-sm text-para ">
            Choose which type of Document to Generate
          </p>
        </div>
        <div className="w-1/2 flex gap-x-2 ">
          <button className="btn bg-gradient-to-r from-blue to-D_blue rounded-xl p-2 px-8 text-white flex gap-2">
            <input type="radio" name="type" value="certificate" />
            Certificate
          </button>
          <button className="btn bg-gradient-to-r from-gray to-white rounded-xl p-2 px-8 text-black flex gap-2">
            <input type="radio" name="type" value="degree" />
            marksheet
          </button>
        </div>
      </div>
      <div>
        <label className="font-bold text-xl">Upload logo</label>
        <div className="border border-gray w-11/12 h-72 flex p-8 items-center justify-around rounded-lg">
          <div className="bg-gray w-80 h-60 p-4">
            {logoPreview && (
              <div>
                <Image
                  src={logoPreview}
                  alt="Preview"
                  width={300}
                  height={150}
                  className=" inset-0  object-fill"
                />
              </div>
            )}
          </div>
          <div>
            <p className="font-bold ">Size: 300x150 pixels</p>
            <p className="font-bold">Format: PNG</p>
            <input
              type="file"
              accept="image/*"
              className="bg-blue text-white my-2"
              onChange={handleLogoChange}
            />
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="btn bg-gradient-to-r from-blue to-D_blue focus:outline-none focus:ring  w-28 text-white  py-2 px-4  mr-6  rounded-xl"
      >
        Submit
      </button>
    </div>
  );
};

export default CreateForm;
