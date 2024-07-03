'use client';
import {
  enterInternalMarks,
  enterExternalMarks,
  updateInternalMarks,
  updateExternalMarks,
  getResult,
} from '@/components/grader/Api';

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
import { toast } from 'react-toastify';

const ShadUITableComponent = ({
  subjectCode,
  subjectName,
  marksType: selectedOption,
}) => {
  const [sections, setSections] = useState([
    {
      name: 'Section 1',
      rows: [{ marksObtained: '', totalMarks: '' }],
    },
  ]);

  const handleSubmit = async (sectionId, rowId) => {
    const section = sections.find((s) => s.id === sectionId);
    const row = section.rows.find((r) => r.id === rowId);
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_URL + 'marksheets/allowInternalMarks',
        {
          governAdd: '0xbD5ED0d45129dD88D87CfB9228905252fB83b1a6',
          semNo: 9,
          internal: true,
          external: false,
        }
      );
      if (response.status === 200) {
        console.log('Success');
        toast.success('Internal Marks Allowed');
      }
      console.log(response.data);
      // Log the response data if needed
    } catch (error) {
      console.error('Error:', error);
    }

    try {
      if (row.isSubmitted) {
        await updateInternalMarks({
          governAdd: 'your-governAdd',
          nonce: 'your-nonce',
          subjectCode: 'your-subjectCode',
          newInternalMark: row.marksObtained,
          newEachMarkArrInternal: [],
          semesterNo: 'your-semesterNo',
        });
      } else {
        await enterInternalMarks({
          governAdd: 'your-governAdd',
          nonce: 'your-nonce',
          subjectName: 'your-subjectName',
          subjectCode: 'your-subjectCode',
          internalMark: row.marksObtained,
          eachMarkArrInternal: [],
          graderAdd: 'your-graderAdd',
          totalInternalMark: row.totalMarks,
          semesterNo: 'your-semesterNo',
        });
      }
      const updatedSections = sections.map((s) => {
        if (s.id === sectionId) {
          const updatedRows = s.rows.map((r) =>
            r.id === rowId ? { ...r, isSubmitted: true } : r
          );
          return { ...s, rows: updatedRows };
        }
        return s;
      });
      setSections(updatedSections);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const addSection = () => {
    const newSectionId = sections.length + 1;
    const newSection = {
      id: newSectionId,
      name: `Section ${newSectionId}`,
      rows: [{ id: 1, marksObtained: '', totalMarks: '', isSubmitted: false }],
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
          isSubmitted: false,
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

  const deleteRow = (sectionId, rowId) => {
    const updatedSections = sections.map((section) => {
      if (section.id === sectionId) {
        const updatedRows = section.rows.filter((row) => row.id !== rowId);
        return { ...section, rows: updatedRows };
      }
      return section;
    });
    setSections(updatedSections);
  };

  const deleteSection = (sectionId) => {
    const updatedSections = sections.filter(
      (section) => section.id !== sectionId
    );
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

  // const handleSubmit = (sectionId, rowId) => {
  //   const updatedSections = sections.map((section) => {
  //     if (section.id === sectionId) {
  //       const updatedRows = section.rows.map((row) =>
  //         row.id === rowId ? { ...row, isSubmitted: true } : row
  //       );
  //       return { ...section, rows: updatedRows };
  //     }
  //     return section;
  //   });
  //   setSections(updatedSections);
  // };

  const handleUpdate = (sectionId, rowId) => {
    const updatedSections = sections.map((section) => {
      if (section.id === sectionId) {
        const updatedRows = section.rows.map((row) =>
          row.id === rowId ? { ...row, isSubmitted: false } : row
        );
        return { ...section, rows: updatedRows };
      }
      return section;
    });
    setSections(updatedSections);
  };

  return (
    <div>
      <div className="flex  justify-between items-center m-4">
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
              <Button
                onClick={() => deleteSection(section.id)}
                className="bg-red-500 text-white ml-1 p-2"
              >
                <Trash2 />
              </Button>
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
                <TableHead className="font-bold"></TableHead>
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
                      className="bg-gray h-8 px-4"
                      disabled={row.isSubmitted}
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
                      className="bg-gray h-8 px-4"
                      disabled={row.isSubmitted}
                    />
                  </TableCell>
                  <TableCell className="flex items-center">
                    {row.isSubmitted ? (
                      <>
                        <CheckCircle className="ml-2 text-green-500 mr-2" />
                        <Button
                          onClick={() => handleUpdate(section.id, row.id)}
                          className="bg-yellow-500 text-white h-8"
                        >
                          <Edit3 />
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={() => handleSubmit(section.id, row.id)}
                        className="bg-blue text-white h-8"
                      >
                        Submit
                      </Button>
                    )}
                    <Button
                      onClick={() => deleteRow(section.id, row.id)}
                      className="bg-red-500 text-white h-8 ml-2"
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
    </div>
  );
};

export default ShadUITableComponent;
