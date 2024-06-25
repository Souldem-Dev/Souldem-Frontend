'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Page = () => {
  const [email, setEmail] = useState('');
  const [emails, setEmails] = useState([]);
  const [id, setId] = useState('');

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
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_URL + 'mail/sendMail/invite',
        {
          url: 'https://souldem.com/invite',
          role: 'Member',
          universityName: 'Your University Name',
          GovName: 'Governance Name',
          toEmails: emails,
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
  };

  return (
    <div className="m-4 w-11/12 flex flex-col">
      <div className="mt-4 flex flex-col justify-between gap-y-2">
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
