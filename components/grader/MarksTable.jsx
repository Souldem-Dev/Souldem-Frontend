'use client';
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { CirclePlus, Pencil, Save, Trash, Trash2 } from 'lucide-react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MarksTable = ({ formData }) => {
  const [sections, setSections] = useState([
    {
      name: 'Section 1',
      rows: [{ marksObtained: '', totalMarks: '' }],
    },
  ]);

  const handleSubmit = async () => {
    try {
      const totalMark = sections.reduce((acc, section) => {
        return (
          acc +
          section.rows.reduce(
            (rowAcc, row) => rowAcc + Number(row.totalMarks || 0),
            0
          )
        );
      }, 0);

      const marksObtained = sections.reduce((acc, section) => {
        return (
          acc +
          section.rows.reduce(
            (rowAcc, row) => rowAcc + Number(row.marksObtained || 0),
            0
          )
        );
      }, 0);

      const ipfsJson = {
        governAdd: formData.govAdd,
        nonce: formData.nonce,
        semesterNo: formData.semNo,
        graderAdd: localStorage.getItem('userPublicAddress'),
        subjectName: formData.subjectName,
        subjectCode: formData.subjectCode,
        internalMark: marksObtained,
        eachMarkArrInternal: sections,
        totalInternalMark: totalMark,
        externalMark: 0,
        eachMarkArrExternal: [],
        totalExternalMark: 0,
      };

      if (formData.selectedOption === 'internal') {
        await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}marksheets/enterInternalMarks`,
          {
            ...ipfsJson,
            internalMark: marksObtained,
            eachMarkArrInternal: sections,
            totalInternalMark: totalMark,
          }
        );
        toast.success('Internal marks submitted successfully!');
      } else if (formData.selectedOption === 'external') {
        await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}marksheets/enterExternalMark`,
          {
            ...ipfsJson,
            externalMark: marksObtained,
            totalExternalMark: totalMark,
            eachMarkArrExternal: sections,
          }
        );
        toast.success('External marks submitted successfully!');
      }
    } catch (error) {
      toast.error('Failed to submit marks. Please try again.');
      console.error('Error:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const totalMarkUpdated = sections.reduce((acc, section) => {
        return (
          acc +
          section.rows.reduce(
            (rowAcc, row) => rowAcc + Number(row.totalMarks || 0),
            0
          )
        );
      }, 0);

      const marksObtainedUpdated = sections.reduce((acc, section) => {
        return (
          acc +
          section.rows.reduce(
            (rowAcc, row) => rowAcc + Number(row.marksObtained || 0),
            0
          )
        );
      }, 0);

      const url =
        updateType === 'internal'
          ? `${process.env.NEXT_PUBLIC_BACKEND_URL}marksheets/updateInternal`
          : `${process.env.NEXT_PUBLIC_BACKEND_URL}marksheets/updateExternalMark`;

      const data = {
        governAdd: formData.govAdd,
        nonce: formData.nonce,
        subjectCode: formData.subjectCode,
        semesterNo: formData.semNo,
      };

      if (updateType === 'internal') {
        data.newInternalMark = marksObtainedUpdated;
        data.newEachMarkArrInternal = sections;
        data.newTotalInternalMark = totalMarkUpdated;
      } else {
        data.newExternalMark = marksObtainedUpdated;
        data.newEachMarkArrExternal = sections;
        data.newTotalExternalMark = totalMarkUpdated;
      }

      await axios.patch(url, data);
      toast.success(`${updateType} marks updated successfully!`);
    } catch (error) {
      toast.error('Failed to update marks. Please try again.');
      console.error('Error:', error);
    }
  };

  const addSection = () => {
    const newSection = {
      name: `Section ${sections.length + 1}`,
      rows: [{ marksObtained: '', totalMarks: '' }],
    };
    setSections([...sections, newSection]);
  };

  const addRowToSection = (sectionName) => {
    const updatedSections = sections.map((section) => {
      if (section.name === sectionName) {
        const newRow = {
          marksObtained: '',
          totalMarks: '',
        };
        return { ...section, rows: [...section.rows, newRow] };
      }
      return section;
    });
    setSections(updatedSections);
  };

  const handleInputChange = (sectionName, rowIndex, field, value) => {
    const updatedSections = sections.map((section) => {
      if (section.name === sectionName) {
        const updatedRows = section.rows.map((row, index) =>
          index === rowIndex ? { ...row, [field]: value } : row
        );
        return { ...section, rows: updatedRows };
      }
      return section;
    });
    setSections(updatedSections);
  };

  const handleSectionNameChange = (sectionName, newName) => {
    const updatedSections = sections.map((section) =>
      section.name === sectionName ? { ...section, name: newName } : section
    );
    setSections(updatedSections);
  };

  const toggleEditSectionName = (sectionName) => {
    const updatedSections = sections.map((section) =>
      section.name === sectionName
        ? { ...section, isEditing: !section.isEditing }
        : section
    );
    setSections(updatedSections);
  };

  const handleSectionNameKeyPress = (e, sectionName) => {
    if (e.key === 'Enter') {
      handleSectionNameChange(sectionName, e.target.value);
      toggleEditSectionName(sectionName);
    }
  };

  const deleteSection = (sectionName) => {
    const updatedSections = sections.filter(
      (section) => section.name !== sectionName
    );
    setSections(updatedSections);
  };

  const deleteRow = (sectionName, rowIndex) => {
    const updatedSections = sections.map((section) => {
      if (section.name === sectionName) {
        const updatedRows = section.rows.filter(
          (_, index) => index !== rowIndex
        );
        return { ...section, rows: updatedRows };
      }
      return section;
    });
    setSections(updatedSections);
  };

  return (
    <main className="">
      <div>
        <div className="flex justify-between items-center m-4">
          <h1 className="text-3xl font-bold  text-black">Marks Table</h1>
          <Button onClick={addSection} className="bg-blue text-white mb-4">
            Add Section
          </Button>
        </div>

        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-8">
            <div className="flex justify-between items-center m-4">
              <div className="flex items-center">
                {section.isEditing ? (
                  <input
                    type="text"
                    defaultValue={section.name}
                    onBlur={(e) =>
                      handleSectionNameChange(section.name, e.target.value)
                    }
                    onKeyUp={(e) => handleSectionNameKeyPress(e, section.name)}
                    className="text-2xl font-bold mb-2 w-full border border-gray-300 rounded"
                    autoFocus
                  />
                ) : (
                  <h1 className="text-xl text-black font-semibold">
                    {section.name}
                  </h1>
                )}
                <button
                  onClick={() => toggleEditSectionName(section.name)}
                  className="ml-1 bg-inherit p-2"
                >
                  {section.isEditing ? <Save /> : <Pencil />}
                </button>
              </div>
              <div className="flex">
                <Button
                  onClick={() => addRowToSection(section.name)}
                  className="bg-inherit"
                >
                  <CirclePlus />
                </Button>
                <Button
                  onClick={() => deleteSection(section.name)}
                  className="bg-inherit"
                >
                  <Trash />
                </Button>
              </div>
            </div>
            <Table className="border-2 border-black">
              <TableHeader className="border-gray-300 border bg-gray-200">
                <TableRow>
                  <TableHead className="font-bold text-black">ID</TableHead>
                  <TableHead className="font-bold  text-black">
                    Marks Obtained
                  </TableHead>
                  <TableHead className="font-bold  text-black">
                    Total Marks
                  </TableHead>
                  <TableHead className="font-bold  text-black">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-white">
                {section.rows.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    <TableCell className="text-black">{rowIndex + 1}</TableCell>
                    <TableCell className="text-black">
                      <input
                        type="text"
                        required
                        value={row.marksObtained}
                        onChange={(e) =>
                          handleInputChange(
                            section.name,
                            rowIndex,
                            'marksObtained',
                            e.target.value
                          )
                        }
                        placeholder="Marks Obtained"
                        className="bg-white h-8 px-4 w-full border border-gray-300 rounded"
                      />
                    </TableCell>
                    <TableCell className="text-black">
                      <input
                        type="text"
                        required
                        value={row.totalMarks}
                        onChange={(e) =>
                          handleInputChange(
                            section.name,
                            rowIndex,
                            'totalMarks',
                            e.target.value
                          )
                        }
                        placeholder="Total Marks"
                        className="bg-white h-8 px-4 w-full border border-gray-300 rounded"
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => deleteRow(section.name, rowIndex)}
                        className="bg-red-500 text-white"
                      >
                        <Trash2 />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ))}

        <div className="flex justify-between">
          <Button onClick={handleSubmit} className="bg-red-500 text-white mb-4">
            Add Arrear Marks
          </Button>
          <div>
            <Button
              onClick={handleSubmit}
              className="bg-green-500 text-white mb-4 mx-2"
            >
              Submit Marks
            </Button>
            <Button onClick={handleUpdate} className="bg-blue text-white mb-4">
              Update
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MarksTable;
