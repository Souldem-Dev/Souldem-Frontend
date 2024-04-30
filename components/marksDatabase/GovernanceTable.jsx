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
import { PaginationDesign } from './Pagination';

const governanceTable = [
  {
    serial_no: 1,
    governance_name: 'Cse_2025',
    students: 4000,
    graders: 500,
    others: 10,
    semester: 8,
    batch: '2022 - 2025',
    data: 'https://ui.shadcn.com/docs/components/form',
  },

  {
    serial_no: 2,
    governance_name: 'Cse_2025',
    students: 3500,
    graders: 450,
    others: 15,
    semester: 7,
    batch: '2021 - 2024',
    data: 'https://ui.shadcn.com/docs/components/form',
  },
  {
    serial_no: 3,
    governance_name: 'Cse_2025',
    students: 4200,
    graders: 550,
    others: 20,
    semester: 6,
    batch: '2020 - 2023',
    data: 'https://ui.shadcn.com/docs/components/card',
  },
  {
    serial_no: 4,
    governance_name: 'Cse_2025',
    students: 3800,
    graders: 480,
    others: 12,
    semester: 5,
    batch: '2019 - 2022',
    data: 'https://ui.shadcn.com/docs/components/modal',
  },
  {
    serial_no: 5,
    governance_name: 'Cse_2025',
    students: 4100,
    graders: 520,
    others: 18,
    semester: 4,
    batch: '2018 - 2021',
    data: 'https://ui.shadcn.com/docs/components/dropdown',
  },
  {
    serial_no: 6,
    governance_name: 'Cse_2025',
    students: 3700,
    graders: 470,
    others: 14,
    semester: 3,
    batch: '2017 - 2020',
    data: 'https://ui.shadcn.com/docs/components/navbar',
  },
  {
    serial_no: 7,
    governance_name: 'Cse_2025',
    students: 4400,
    graders: 580,
    others: 22,
    semester: 2,
    batch: '2016 - 2019',
    data: 'https://ui.shadcn.com/docs/components/slider',
  },
  {
    serial_no: 8,
    governance_name: 'Cse_2025',
    students: 3600,
    graders: 460,
    others: 16,
    semester: 1,
    batch: '2015 - 2018',
    data: 'https://ui.shadcn.com/docs/components/tooltip',
  },
  {
    serial_no: 6,
    governance_name: 'Cse_2025',
    students: 3700,
    graders: 470,
    others: 14,
    semester: 3,
    batch: '2017 - 2020',
    data: 'https://ui.shadcn.com/docs/components/navbar',
  },
  {
    serial_no: 7,
    governance_name: 'Cse_2025',
    students: 4400,
    graders: 580,
    others: 22,
    semester: 2,
    batch: '2016 - 2019',
    data: 'https://ui.shadcn.com/docs/components/slider',
  },
  {
    serial_no: 8,
    governance_name: 'Cse_2025',
    students: 3600,
    graders: 460,
    others: 16,
    semester: 1,
    batch: '2015 - 2018',
    data: 'https://ui.shadcn.com/docs/components/tooltip',
  },
];

export function GovernanceTable() {
  return (
    <Table className="w-11/12 my-2 ">
      <TableHeader className="border-gray border bg-white">
        <TableRow>
          <TableHead className="font-bold">Serial_no</TableHead>
          <TableHead className="font-bold"> Name of Governance</TableHead>
          <TableHead className="font-bold"> Students</TableHead>
          <TableHead className="font-bold">Graders</TableHead>
          <TableHead className="font-bold">Others</TableHead>
          <TableHead className="font-bold">Semester</TableHead>
          <TableHead className="font-bold">Batch</TableHead>
          <TableHead className="font-bold">data</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {governanceTable.map((governanceTable, index) => (
          <TableRow key={index}>
            <TableCell>{governanceTable.serial_no}</TableCell>
            <TableCell>{governanceTable.governance_name}</TableCell>
            <TableCell>{governanceTable.students}</TableCell>
            <TableCell>{governanceTable.graders}</TableCell>
            <TableCell>{governanceTable.others}</TableCell>
            <TableCell>{governanceTable.semester}</TableCell>
            <TableCell>{governanceTable.batch}</TableCell>
            <TableCell>
              <Link href={governanceTable.data} className="underline text-blue">
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
