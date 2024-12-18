'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Menu, X } from 'lucide-react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Papa from 'papaparse';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { saveAs } from 'file-saver';

const Invite = () => {
  const [email, setEmail] = useState('');
  const [regNo, setRegNo] = useState('');
  const [emails, setEmails] = useState([]);
  const [role, setRole] = useState('student');
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const handleAddInvite = () => {
    if (email && regNo && !emails.some((invite) => invite.email === email)) {
      setEmails([...emails, { email, regNo }]);
      setEmail('');
      setRegNo('');
    }
  };

  const handleRemoveInvite = (emailToRemove) => {
    setInvites(emails.filter((invite) => invite.email !== emailToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddInvite();
    }
  };

  const handleSendInvite = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}mail/sendMail/invite/student`,
        {
          userMail: localStorage.getItem('userEmail'),
          role: role,
          universityName: params.cName,
          GovName: params.govName,
          toEmails: emails,
          domain: {
            name: params.govName,
            version: '1',
            chainId: 1337,
            verifyingContract: params.govAdd,
          },
        }
      );

      let receivedMail = response.data.map((val) => val.accepted[0]);
      let totalMail = emails;
      console.log(receivedMail, totalMail);
      if (response.status === 200) {
        toast.success('Invitations sent successfully');
        generateCsv(totalMail, receivedMail);
      } else {
        toast.error('Failed to send invitations');
      }
    } catch (error) {
      toast.error('An error occurred while sending invitations');
    } finally {
      setLoading(false);
    }
  };

  const checkJoinStatus = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_URL +
          'become/getAllMemFromGov/stud/' +
          params.govAdd
      );

      const joinStatus = response.data;

      const joinedMails = joinStatus.map((val) => val.email);
      console.log(joinedMails);

      updateCsvWithJoinStatus(joinedMails);
    } catch (error) {
      toast.error('An error occurred while checking join status');
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          const parsedInvites = result.data.map((row) => ({
            email: row.email,
            regNo: row.regNo,
          }));
          setInvites([...invites, ...parsedInvites]);
        },
        error: (error) => {
          toast.error('An error occurred while parsing the CSV file');
        },
      });
    }
  };

  const generateCsv = (totalMail, receivedMail) => {
    const csvData = totalMail.map((invite) => {
      return {
        email: invite.email,
        status: receivedMail.includes(invite.email) ? 'Sent' : 'Not Sent',
      };
    });
    console.log(csvData);

    const csvString = Papa.unparse(csvData);
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'Student_email_status.csv');
  };

  const updateCsvWithJoinStatus = (joinedEmails) => {
    if (joinedEmails.length === 0) {
      toast.info('No users have joined yet');
      return;
    }

    const csvData = joinedEmails.map((email) => {
      return {
        email: email,
        status: 'Joined',
      };
    });

    const csvString = Papa.unparse(csvData);
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'student_join_status.csv');
  };

  return (
    <div className="m-4 md:mx-auto w-11/12 flex flex-col">
      <div className="mt-4 flex  drop-shadow-md p-12 rounded-2xl flex-col justify-between  gap-y-2">
        <div className="flex w-full  items-center justify-between gap-3">
          <div>
            <Label htmlFor="role" className="text-xl">
              Role:{' '}
            </Label>

            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="bg-blue text-white w-24 p-2 border rounded-md"
            >
              <option value="student">student</option>
            </select>
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <Menu />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white">
                <DropdownMenuItem
                  className="hover:bg-white text-black"
                  onClick={checkJoinStatus}
                >
                  Excel Download
                </DropdownMenuItem>
                <Link
                  href={`/user/mentor/approval/${params.govAdd}/${params.govName}/${params.cName}`}
                >
                  <DropdownMenuItem className="hover:bg-white text-black">
                    {' '}
                    Approval
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex md:flex-row my-4 flex-col gap-y-4 justify-between  items-center gap-x-2">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <div className="flex gap-x-2">
              <Input
                type="email"
                id="To"
                placeholder="Enter email and press Enter"
                className="bg-gray w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="regNo">Reg.No</Label>
            <div className="flex gap-x-2">
              <Input
                type="text"
                id="RegNo"
                placeholder="Enter Reg.no and press Enter"
                className="bg-gray w-full"
                value={regNo}
                onChange={(e) => setRegNo(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>

          <Button
            onClick={handleAddInvite}
            className="bg-blue text-white w-60 h-12"
          >
            Add
          </Button>
        </div>

        <div className="flex md:flex-row flex-col gap-y-4 gap-x-20">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="To">To:</Label>
            <div className="flex flex-col gap-2">
              <div className="bg-gray h-60 p-2 overflow-y-auto">
                {emails.map((invite, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-white p-2 mb-1 rounded-xl"
                  >
                    <span>
                      {invite.email} - {invite.regNo}
                    </span>
                    <Button
                      variant="outline"
                      className="hover:bg-red-500 border-none text-red-500 hover:text-white"
                      onClick={() => handleRemoveInvite(invite.email)}
                    >
                      <X />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-x-2">
          <Button
            className="bg-blue text-white w-24"
            onClick={handleSendInvite}
            disabled={loading}
          >
            {loading ? 'Inviting...' : 'Invite'}
          </Button>
          <Button
            variant="outline"
            className="hover:bg-blue w-24 border-blue border"
            onClick={() => document.getElementById('csvInput').click()}
          >
            Import CSV
          </Button>
          <input
            type="file"
            id="csvInput"
            accept=".csv"
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Invite;
