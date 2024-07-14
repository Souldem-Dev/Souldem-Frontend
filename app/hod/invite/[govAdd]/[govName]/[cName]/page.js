'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams } from 'next/navigation';
const Page = () => {
  const [email, setEmail] = useState('');
  const [emails, setEmails] = useState([]);
  const [id, setId] = useState('');
  const [role, setRole] = useState('mentor');
const params = useParams()
  const handleAddEmail = () => {
    if (email && !emails.includes(email)) {
      setEmails([...emails, email]);
      setEmail('');
    }
  };
  console.log[emails];

  const handleRemoveEmail = (emailToRemove) => {
    setEmails(emails.filter((email) => email !== emailToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddEmail();
    }
  };

  const handleSendInvite = async () => {
if(emails.length !=0){
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_BACKEND_URL + 'mail/sendMail/invite/user',
      {
        role: role,
        universityName: params.cName,
        GovName: params.govName,
        userMail:localStorage.getItem('userEmail'),
        toEmails: emails,
        uniqueId:10,
        domain:{
          name: params.govName,
          version: '1',
          chainId:1337,
          verifyingContract: params.govAdd
      }
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
  }
}else{
  alert("enter email")
}
  };
console.log(role)
  return (
    <div className="m-4 w-11/12 flex flex-col">
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
            <option value="mentor">Mentor</option>
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

export default Page;
