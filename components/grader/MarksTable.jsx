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
import { Trash2, Pencil, Save, CheckCircle, Edit3 } from 'lucide-react';
import axios from 'axios';
// import {
//   enterInternalMarks,
//   enterExternalMarks,
//   updateInternalMarks,
//   updateExternalMarks,
// } from '@/components/grader/Api';

const MarksTable = ({ formData }) => {
  const [sections, setSections] = useState([
    {
      id: 1,
      name: 'Section 1',
      rows: [{ id: 1, marksObtained: '', totalMarks: '', isSubmitted: false }],
    },
  ]);

  const handleSubmit = async () => {
    try {
      console.log(formData.governAdd)
      const ipfsJson = {
        governAdd: formData.govAdd,
        nonce: parseInt(formData.nonce),
        semesterNo: parseInt(formData.semNo),
        subjectName: formData.subjectName,
        subjectCode: formData.subjectCode,
        marks: [
          {
            internalMark: 90,
            eachMarkArrInternal: sections,
            totalInternalMark: 100,
          },
        ],
        externalMark: 0,
        eachMarkArrExternal: [],
        totalExternalMark: 0,
        graderAdd: localStorage.getItem('userPublicAddress')
      };
      console.log(sections);
      console.log('IPFS JSON:', ipfsJson);

      if (formData.selectedOption === 'internal') {
        await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}marksheets/enterInternalMarks`,
          {
            ...ipfsJson,
            internalMark: 90,
            eachMarkArrInternal: ipfsJson.marks[0].eachMarkArrInternal,
            totalInternalMark: 90,
          }
        );
        console.log('Internal marks entered');
      } else if (formData.selectedOption === 'external') {
        await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}marksheets/enterExternalMark`,
          {
            ...ipfsJson,
            externalMark: 90,
            eachMarkArrExternal: ipfsJson.marks[0].eachMarkArrExternal,
            totalExternalMark: 90,
          }
        );
        console.log('External marks entered');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const addSection = () => {
    const newSectionId = sections.length + 1;
    const newSection = {
      id: newSectionId,
      name: `Section ${newSectionId}`,
      rows: [{ id: 1, marksObtained: '', totalMarks: '' }],
    };
    setSections([...sections, newSection]);
  };

  const addRowToSection = (sectionId) => {
    const updatedSections = sections.map((section) => {
      if (section.id === sectionId) {
        const newRow = {
          id: section.rows.length + 1,
          marksObtained: '',
          totalMarks: '',
        };
        return { ...section, rows: [...section.rows, newRow] };
      }
      return section;
    });
    setSections(updatedSections);
  };

  const handleInputChange = (sectionId, rowId, field, value) => {
    const updatedSections = sections.map((section) => {
      if (section.id === sectionId) {
        const updatedRows = section.rows.map((row) =>
          row.id === rowId ? { ...row, [field]: value } : row
        );
        return { ...section, rows: updatedRows };
      }
      return section;
    });
    setSections(updatedSections);
  };

  const handleSectionNameChange = (sectionId, newName) => {
    const updatedSections = sections.map((section) =>
      section.id === sectionId ? { ...section, name: newName } : section
    );
    setSections(updatedSections);
  };

  const toggleEditSectionName = (sectionId) => {
    const updatedSections = sections.map((section) =>
      section.id === sectionId
        ? { ...section, isEditing: !section.isEditing }
        : section
    );
    setSections(updatedSections);
  };

  const handleSectionNameKeyPress = (e, sectionId) => {
    if (e.key === 'Enter') {
      handleSectionNameChange(sectionId, e.target.value);
      toggleEditSectionName(sectionId);
    }
  };

  return (
    <main className="">
      <div>
        <div className="flex justify-between items-center m-4">
          <h1 className="text-2xl font-bold">Marks Table</h1>
          <Button onClick={addSection} className="bg-green-500 text-white mb-4">
            Add Section
          </Button>
        </div>

        {sections.map((section) => (
          <div key={section.id} className="mb-8">
            <div className="flex justify-between items-center m-4">
              <div className="flex items-center">
                {section.isEditing ? (
                  <input
                    type="text"
                    defaultValue={section.name}
                    onBlur={(e) =>
                      handleSectionNameChange(section.id, e.target.value)
                    }
                    onKeyUp={(e) => handleSectionNameKeyPress(e, section.id)}
                    className="text-2xl font-bold mb-2 w-full border border-gray-300 rounded"
                    autoFocus
                  />
                ) : (
                  <h1 className="text-2xl font-bold">{section.name}</h1>
                )}
                <button
                  onClick={() => toggleEditSectionName(section.id)}
                  className="ml-1 bg-blue text-white rounded p-2"
                >
                  {section.isEditing ? <Save /> : <Pencil />}
                </button>
              </div>
              <Button
                onClick={() => addRowToSection(section.id)}
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
                {section.rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>
                      <input
                        type="text"
                        value={row.marksObtained}
                        onChange={(e) =>
                          handleInputChange(
                            section.id,
                            row.id,
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
                            section.id,
                            row.id,
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
        </div>
      </div>
    </main>
  );
};

export default MarksTable;
