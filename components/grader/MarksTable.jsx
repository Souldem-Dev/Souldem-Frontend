'use client';

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { Pencil } from 'lucide-react';
import { Save } from 'lucide-react';

const ShadUITableComponent = () => {
  // Initial state with sections, each section has its rows and input fields for marks
  const [sections, setSections] = useState([
    {
      id: 1,
      name: 'Section 1',
      rows: [{ id: 1, marksObtained: '', totalMarks: '' }],
    },
  ]);

  const [value, setValue] = useState('');

  // Function to add a new section
  const addSection = () => {
    const newSectionId = sections.length + 1;
    const newSection = {
      id: newSectionId,
      name: `Section ${newSectionId}`,
      rows: [{ id: 1, marksObtained: '', totalMarks: '' }],
    };
    setSections([...sections, newSection]);
  };

  // Function to add a new row to a specific section
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

  // Function to handle input change in a specific section and row
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
          <div className="flex  justify-between items-center m-4">
            <div className="flex items-center">
              <div className="flex items-center justify-center">
                {section.isEditing ? (
                  <input
                    type="text"
                    defaultValue={section.name}
                    onBlur={(e) =>
                      handleSectionNameChange(section.id, e.target.value)
                    }
                    onKeyUp={(e) => handleSectionNameKeyPress(e, section.id)}
                    className="text-2xl font-bold mb-2 w-full  border border-gray-300 rounded"
                    autoFocus
                  />
                ) : (
                  <h1 className="text-2xl font-bold">{section.name}</h1>
                )}
                <button
                  onClick={() => toggleEditSectionName(section.id)}
                  className="ml-1 bg-blue text-white  rounded p-2"
                >
                  {section.isEditing ? <Save /> : <Pencil />}
                </button>
              </div>
              <Button
                onClick={() => deleteSection(section.id)}
                className="bg-red-500 text-white ml-1 p-2 "
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
            <TableHeader className="border-gray border bg-gray">
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
                    />
                  </TableCell>
                  <TableCell className="flex items-center">
                    <Button className="bg-blue text-white h-8">Submit</Button>
                    <Button
                      onClick={() => deleteRow(section.id, row.id)}
                      className="bg-red-500 text-white h-8"
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
