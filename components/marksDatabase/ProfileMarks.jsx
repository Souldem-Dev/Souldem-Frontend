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
import Link from 'next/link';

const profileMarks = [
  {
    subject_code: '22CSH-101',
    subject_name: 'Java Programming',
    internal_marks: 30,
    external_marks: 40,
    total_marks: 70,
    grade: 'A',
  },
  {
    subject_code: '22CSH-102',
    subject_name: 'Data Structures',
    internal_marks: 35,
    external_marks: 45,
    total_marks: 80,
    grade: 'A+',
  },
  {
    subject_code: '22CSH-103',
    subject_name: 'Database Management',
    internal_marks: 28,
    external_marks: 38,
    total_marks: 66,
    grade: 'B+',
  },
  {
    subject_code: '22CSH-104',
    subject_name: 'Operating Systems',
    internal_marks: 32,
    external_marks: 42,
    total_marks: 74,
    grade: 'A',
  },
  {
    subject_code: '22CSH-105',
    subject_name: 'Software Engineering',
    internal_marks: 40,
    external_marks: 50,
    total_marks: 90,
    grade: 'A+',
  },
  {
    subject_code: '22CSH-106',
    subject_name: 'Computer Networks',
    internal_marks: 36,
    external_marks: 46,
    total_marks: 82,
    grade: 'A+',
  },
  {
    subject_code: '22CSH-107',
    subject_name: 'Web Development',
    internal_marks: 34,
    external_marks: 44,
    total_marks: 78,
    grade: 'A',
  },
];

export function ProfileMarks() {
  return (
    <main>
      <h1 className="text-xl font-bold text-center my-4"> Semester 1</h1>

      <Table className="w-5/6 mx-2 ">
        <TableHeader className="border-gray border bg-white">
          <TableRow>
            <TableHead className="font-bold">Subject_code</TableHead>
            <TableHead className="font-bold"> Subject</TableHead>
            <TableHead className="font-bold"> Internals</TableHead>
            <TableHead className="font-bold">Externals</TableHead>
            <TableHead className="font-bold">Total Marks</TableHead>
            <TableHead className="font-bold">Grade</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {profileMarks.map((subject, index) => (
            <TableRow key={index}>
              <TableCell>{subject.subject_code}</TableCell>
              <TableCell>{subject.subject_name}</TableCell>
              <TableCell>{subject.internal_marks}</TableCell>
              <TableCell>{subject.external_marks}</TableCell>
              <TableCell>{subject.total_marks}</TableCell>
              <TableCell>{subject.grade}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
