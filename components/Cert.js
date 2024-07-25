'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './cert.css';

const Cert = ({ governAdd, nonce, marks }) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [imageSrc, setImageSrc] = useState(null);

  const userMail = 'kayefiv960@ikangou.com';

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`aadhaar/image/${userMail}`);
        if (response.ok) {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          setImageSrc(url);
        } else {
          console.error('Failed to fetch image');
        }
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();
  }, [userMail]);

  const handleDownloadPdf = async () => {
    const input = componentRef.current;
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('download.pdf');
  };

  const totalMarks = (internal, external) => internal + external;
  const calculateGrade = (totalMarks) => (totalMarks >= 90 ? 'A' : 'B');

  return (
    <div className="container" ref={componentRef}>
      <div className="background-design"></div>
      <div className="background-design-left"></div>
      <div className="header flex">
        <div className="justify-start w-1/2">
          <h1>Chandigarh University</h1>
          <h2>Marksheet</h2>
          <p>Student Name: Jayanth</p>
          <p>Class: 222</p>
          <p>Nonce Number: {nonce}</p>
          <p>Gov Add: {governAdd}</p>
        </div>

        <div className="w-1/2">
          {' '}
          {imageSrc && <img src={imageSrc} alt="User" className="user-image" />}
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Internal Marks</th>
            <th>External Marks</th>
            <th>Total Marks</th>

            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {marks.map((subject, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
            >
              <td>{subject.subjectName}</td>
              <td>{subject.internalMark}</td>
              <td>{subject.externalMark}</td>
              <td>{totalMarks(subject.internalMark, subject.externalMark)}</td>

              <td>
                {calculateGrade(
                  totalMarks(subject.internalMark, subject.externalMark)
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="footer">
        <div className="signature">
          <div>
            <p>Principal's Signature:</p>
            <p>__________________________</p>
          </div>
          <div>
            <p>Date:</p>
            <p>__/__/____</p>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-center space-x-4">
        <button
          onClick={handlePrint}
          className="bg-purple-600 text-white py-2 px-4 rounded"
        >
          Print
        </button>
        <button
          onClick={handleDownloadPdf}
          className="bg-purple-600 text-white py-2 px-4 rounded"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default Cert;
