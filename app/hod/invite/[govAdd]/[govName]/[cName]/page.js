'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
<<<<<<< HEAD:app/hod/invite/[govAdd]/[govName]/[cName]/page.js
import { useParams } from 'next/navigation';
=======
import ProposalBanner from '@/components/student/ProposalBanner';
import FunctionCard from '@/components/proposal/FunctionCard';

>>>>>>> fc629df (&&):app/university/(university)/governance/invite/page.jsx
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
<<<<<<< HEAD:app/hod/invite/[govAdd]/[govName]/[cName]/page.js
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
=======
      <ProposalBanner />
>>>>>>> fc629df (&&):app/university/(university)/governance/invite/page.jsx

      <FunctionCard />
    </div>
  );
};

export default Page;
