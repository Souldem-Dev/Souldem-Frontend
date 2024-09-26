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

const Page = () => {
  const [email, setEmail] = useState('');
  const [emails, setEmails] = useState([]);
  const [role, setRole] = useState('grader');
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const handleAddEmail = () => {
    if (email && !emails.includes(email)) {
      setEmails([...emails, email]);
      setEmail('');
    }
  };

  const handleRemoveEmail = (emailToRemove) => {
    setEmails(emails.filter((email) => email !== emailToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddEmail();
    }
  };

  const handleSendInvite = async () => {
    setLoading(true);
    if (emails.length !== 0) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}mail/sendMail/invite`,
          {
            role: role,
            universityName: params.cName,
            GovName: params.govName,
            universityMail: localStorage.getItem('email'),
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
    } else {
      alert('Please enter email(s)');
    }
  };

  const generateCsv = (totalMail, receivedMail) => {
    const csvData = totalMail.map((email) => {
      return {
        email: email,
        status: receivedMail.includes(email) ? 'Sent' : 'Not Sent',
      };
    });

    const csvString = Papa.unparse(csvData);
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'Mentor_email_status.csv');
  };

  const checkHodJoinStatus = async () => {
    try {
      const hodResponse = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_URL +
          'become/getAllMemFromGov/hod/' +
          params.govAdd
      );

      console.log(hodResponse);

      const joinStatus = hodResponse.data;

      const joinedMails = joinStatus.map((val) => val.email);
      console.log(joinedMails);

      updateCsvWithJoinStatus(joinedMails, 'Hod');
    } catch (error) {
      toast.error('An error occurred while checking Hod join status');
    }
  };
  const checkGraderJoinStatus = async () => {
    try {
      const graderResponse = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_URL +
          'become/getAllMemFromGov/grader/' +
          params.govAdd
      );

      console.log(graderResponse);

      const joinStatus = graderResponse.data;

      const joinedMails = joinStatus.map((val) => val.email);
      console.log('joined', joinedMails);

      updateCsvWithJoinStatus(joinedMails, 'Grader');
    } catch (error) {
      toast.error('An error occurred while checking Hod join status');
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          const parsedEmails = result.data
            .map((row) => row.email)
            .filter(Boolean);
          setEmails((prevEmails) => [...prevEmails, ...parsedEmails]);
        },
        error: (error) => {
          toast.error('An error occurred while parsing the CSV file');
        },
      });
    }
  };

  const updateCsvWithJoinStatus = (joinedEmails, role) => {
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
    saveAs(blob, `${role}_join_status.csv`);
  };

  return (
    <div className="m-4 w-11/12 flex flex-col p-12">
      <div className="mt-4 flex flex-col justify-between gap-y-2">
        <div className="flex justify-between  items-center gap-3">
          <div>
            <Label htmlFor="role" className="text-xl">
              Role:
            </Label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="bg-blue focus:outline-none  text-white w-24 p-2 border rounded-md"
            >
              <option value="grader">Grader</option>
              <option value="hod">HOD</option>
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
                  onClick={checkGraderJoinStatus}
                >
                  Grader Excel Download
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="hover:bg-white text-black"
                  onClick={checkHodJoinStatus}
                >
                  Hod Excel Download
                </DropdownMenuItem>
                <Link
                  href={`/university/governance/marksEntryToggle/${params.govAdd}/${params.govName}/${params.cName}`}
                >
                  <DropdownMenuItem className="hover:bg-white text-black">
                    {' '}
                    Marks Entry Toggle
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="flex md:flex-row my-4 flex-col gap-y-4 justify-between gap-x-2">
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
              <Button onClick={handleAddEmail} className="bg-blue text-white">
                Add
              </Button>
            </div>
          </div>
        </div>
        <div className="flex md:flex-row flex-col gap-y-4 gap-x-20">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="To">To:</Label>
            <div className="flex flex-col gap-2">
              <div className="bg-gray h-60 p-2 overflow-y-auto">
                {emails.map((email, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-white p-2 mb-1 rounded-xl"
                  >
                    <span>{email}</span>
                    <Button
                      variant="outline"
                      className="hover:bg-red-500 border-none text-red-500 hover:text-white"
                      onClick={() => handleRemoveEmail(email)}
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

export default Page;
