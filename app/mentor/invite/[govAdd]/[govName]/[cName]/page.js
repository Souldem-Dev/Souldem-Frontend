'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const Invite = () => {
  const [email, setEmail] = useState('');
  const [regNo, setRegNo] = useState('');
  const [invites, setInvites] = useState([]);
  const [role, setRole] = useState('mentor');
  const params = useParams();

  const handleAddInvite = () => {
    if (email && regNo && !invites.some((invite) => invite.email === email)) {
      setInvites([...invites, { email, regNo }]);
      setEmail('');
      setRegNo('');
    }
  };

  console.log(invites);

  const handleRemoveInvite = (emailToRemove) => {
    setInvites(invites.filter((invite) => invite.email !== emailToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddInvite();
    }
  };

  const handleSendInvite = async () => {
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_URL + 'mail/sendMail/invite/student',
        {
          url: 'https://souldem.com/invite',
          role: role,
          universityName: params.cName,
          GovName: params.govName,
          toEmails: invites,
          domain:{
            name: params.govName,
            version: '1',
            chainId: 1337,
            verifyingContract: params.govAdd,
          },
        }
      );

      console.log(response);

      if (response.status === 200) {
        toast.success('Invitations sent successfully');
      } else {
        toast.error('Failed to send invitations');
      }
    } catch (error) {
      toast.error('An error occurred while sending invitations');
    }  };

  return (
    <div className="m-4 w-11/12 flex flex-col">
         <div className="flex gap-x-4 items-center mx-auto">
        <Link
          href={`/mentor//invite/${params.govAdd}/${params.govName}/${params.cName}`}
        >
          <button className="px-4 py-2 rounded-md bg-white text-blue hover:border-2 hover:border-blue">
            {' '}
            invite
          </button>
        </Link>

        <Link
          href={`/mentor/approval/${params.govAdd}/${params.govName}/${params.cName}`}

          // href={'/university/governance/marksEntryToggle'}
        >
          <button className="px-4 py-2 rounded-md bg-blue text-white hover:border-blue hover:border-2">
            {' '}
            approval
          </button>
        </Link>
      </div>
      <div className="mt-4 flex flex-col justify-between gap-y-2">
        <div className="flex w-full max-w-sm items-center gap-3">
          <Label htmlFor="role" className=" text-xl">
            Role:{' '}
          </Label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="bg-blue text-white w-24 p-2 border rounded-md"
          >
            <option value="mentor">student</option>
          </select>
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

          <Button onClick={handleAddInvite} className="bg-blue text-white">
            Add
          </Button>
        </div>

        <div className="flex md:flex-row flex-col gap-y-4 gap-x-20">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="To">To:</Label>
            <div className="flex flex-col gap-2">
              <div className="bg-gray h-60 p-2 overflow-y-auto">
                {invites.map((invite, index) => (
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
          >
            Invite
          </Button>
          <Button
            variant="outline"
            className="hover:bg-blue w-24 border-blue border"
          >
            Import CSV
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Invite;
