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
import { Pencil, Save } from 'lucide-react';
import axios from 'axios';

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
      };
      console.log(sections);
      console.log('IPFS JSON:', ipfsJson);

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
        console.log('Internal marks entered');
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
        console.log('External marks entered');
      }
    } catch (error) {
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

      const updateType = formData.selectedOption;

      console.log('update type:', updateType);
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
      console.log(data);
      console.log(`${updateType} marks updated`);
    } catch (error) {
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

  return (
    <main className="flex">
      <div>
        <div className="flex justify-between items-center m-4">
          <h1 className="text-2xl font-bold">Marks Table</h1>
          <Button onClick={addSection} className="bg-green-500 text-white mb-4">
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
                  <h1 className="text-2xl font-bold">{section.name}</h1>
                )}
                <button
                  onClick={() => toggleEditSectionName(section.name)}
                  className="ml-1 bg-blue text-white rounded p-2"
                >
                  {section.isEditing ? <Save /> : <Pencil />}
                </button>
              </div>
              <Button
                onClick={() => addRowToSection(section.name)}
                className="bg-blue text-white"
              >
                Add Row
              </Button>
            </div>
            <Table>
              <TableHeader className="border-gray-300 border bg-gray-200">
                <TableRow>
                  <TableHead className="font-bold">ID</TableHead>
                  <TableHead className="font-bold">Marks Obtained</TableHead>
                  <TableHead className="font-bold">Total Marks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-white">
                {section.rows.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    <TableCell>{rowIndex + 1}</TableCell>
                    <TableCell>
                      <input
                        type="text"
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
                        className="bg-gray h-8 px-4 w-full border border-gray-300 rounded"
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
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
                        className="bg-gray h-8 px-4 w-full border border-gray-300 rounded"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ))}

        <div>
          <Button
            onClick={handleSubmit}
            className="bg-green-500 text-white mb-4"
          >
            Submit Marks
          </Button>
          <Button onClick={handleUpdate} className="bg-blue text-white mb-4">
            Update
          </Button>
        </div>
      </div>
    </main>
  );
};

export default MarksTable;
