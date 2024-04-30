import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import { PaginationDesign } from './Pagination';

const studentTable = [
  {
    serial_no: 1,
    student_name: 'John Doe',
    Wallet_Id: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN3',
    UID: '22BCS10036',
    Current_semester: 7,
    Marksheet: 'https://ui.shadcn.com/docs/components/table',
  },
  {
    serial_no: 2,
    student_name: 'Jane Smith',
    Wallet_Id: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN4',
    UID: '22BCS10037',
    Current_semester: 6,
    Marksheet: 'https://ui.shadcn.com/docs/components/table',
  },
  {
    serial_no: 3,
    student_name: 'Alice Johnson',
    Wallet_Id: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN5',
    UID: '22BCS10038',
    Current_semester: 5,
    Marksheet: 'https://ui.shadcn.com/docs/components/table',
  },
  {
    serial_no: 4,
    student_name: 'Bob Williams',
    Wallet_Id: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN6',
    UID: '22BCS10039',
    Current_semester: 4,
    Marksheet: 'https://example.com/marksheet/4',
  },
  {
    serial_no: 5,
    student_name: 'Emily Brown',
    Wallet_Id: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN7',
    UID: '22BCS10040',
    Current_semester: 3,
    Marksheet: 'https://ui.shadcn.com/docs/components/table',
  },
  {
    serial_no: 6,
    student_name: 'Michael Wilson',
    Wallet_Id: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN8',
    UID: '22BCS10041',
    Current_semester: 2,
    Marksheet: 'https://ui.shadcn.com/docs/components/table',
  },
  {
    serial_no: 7,
    student_name: 'Olivia Lee',
    Wallet_Id: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN9',
    UID: '22BCS10042',
    Current_semester: 1,
    Marksheet: 'https://ui.shadcn.com/docs/components/table',
  },
];

export function StudentsTable() {
  return (
    <Table className="w-11/12 my-2 ">
      <TableHeader className="border-gray border bg-white">
        <TableRow>
          <TableHead>Serial_no</TableHead>
          <TableHead> Name of Student</TableHead>
          <TableHead> Wallet ID</TableHead>
          <TableHead>UID</TableHead>
          <TableHead>Current Semester</TableHead>
          <TableHead> Marksheet Link</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {studentTable.map((studentTable) => (
          <TableRow key={studentTable.serial_no}>
            <TableCell>{studentTable.serial_no}</TableCell>
            <TableCell>{studentTable.student_name}</TableCell>
            <TableCell>{studentTable.Wallet_Id}</TableCell>
            <TableCell>{studentTable.UID}</TableCell>
            <TableCell>{studentTable.Current_semester}</TableCell>
            <TableCell>
              <Link
                href={studentTable.Marksheet}
                className="underline text-blue"
              >
                View
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <PaginationDesign />
    </Table>
  );
}
