'use client';
import React, { useContext, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '@/app/assets/logo.svg';
import CoinDesign from '@/app/assets/CoinDesign.svg';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import { ethers } from 'ethers';

import { WalletContext } from '@/app/university/WalletContext';
import { Wallet } from 'lucide-react';

const page = () => {
  const { walletSigner, connection, walletAddr } = useContext(WalletContext);

  const router = useRouter();
  const [isConnecting, setIsConnecting] = useState(false);

  const [isConnected, setIsConnected] = useState(false);
  const createCollege = async () => {
    let collegeName = document.getElementById('collegeName');
    if (collegeName.value.length >= 3) {
      let provider = new ethers.BrowserProvider(window.ethereum);
      let signer = await provider.getSigner();

      let domain = {
        name: 'BASE_FACTORY',
        version: '1',
        chainId: 80002,
        verifyingContract: '0x4D6a18A04DA817c09e456E2e2040C9411949F6dA',
      };

      let types = {
        Create: [
          { name: 'wallet', type: 'address' },
          { name: 'universityName', type: 'string' },
        ],
      };
      let value = {
        wallet: await signer.getAddress(),
        universityName: collegeName.value,
      };
      try {
        let signature = await signer.signTypedData(domain, types, value);
        console.log(signature);
        axios
          .post(
            process.env.NEXT_PUBLIC_BACKEND_URL + 'factory/createUniversity',
            {
              owner: await signer.getAddress(),
              signature,
              universityName: collegeName.value,
            }
          )
          .then((res) => {
            console.log(res.data);
            if (res.data._type === 'TransactionResponse') {
              toast.success('College Created!');
              router.push('/university/governance');
            }
          })
          .catch((err) => {
            console.log(err);
            toast.error(err.response.data.reason);
          });
      } catch (err) {
        console.log(err);
      }
    } else {
      alert('Enter college name!');
    }
  };

  const connectWallet = async () => {
    if (isConnecting) {
      return; // Prevent multiple simultaneous connection attempts
    }

    setIsConnecting(true); // Start the connection process

    try {
      // Check if MetaMask is installed
      if (!window.ethereum) {
        throw new Error('No Ethereum wallet found. Please install MetaMask.');
      }

      // Request access to user accounts from MetaMask
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      // Once connected, update the connection state
      connection[1](true);

      console.log('Connected to wallet:', accounts[(0, 1, 2)]);

      // Redirect to the governance page
      router.push('/university/governance');
    } catch (error) {
      console.error(error);
      alert('Failed to connect wallet: ' + error.message);
    } finally {
      setIsConnecting(false); // Reset connection status
    }
  };

  return (
    //{' '}
    // <PrivateRoute allowedAddress={walletAddr[0]} isConnected={isConnected}>
    <main className="flex flex-col md:flex-row h-screen lg:overflow-hidden relative">
      <div className="lg:w-4/6 md:w-3/6 flex flex-col md:bg-gray">
        <Image src={logo} alt="Logo" className="m-4 h-1/12" />
        <Image
          src={CoinDesign}
          alt="CoinDesign"
          className="grow w-auto h-auto object-cover max-md:hidden"
        />
      </div>
      <div className="lg:w-2/6 md:w-3/6 h-screen bg-white flex flex-col items-center justify-center px-20 gap-y-4">
        <div>
          <h3 className="text-3xl font-bold">Create a college in </h3>
          <h1 className="text-blue text-4xl font-extrabold ">Souldem</h1>
          <p className="text-gray-300">
            Have your college on Souldem network for easier management of
            examinations
          </p>
        </div>
        <Input
          type="text"
          placeholder="Enter College Name"
          className="text-dark"
          id="collegeName"
        />
        <Button
          className="bg-blue text-white p-2 px-4 rounded-l w-full"
          onClick={createCollege}
        >
          Create College
        </Button>
        <p className="text-gray-300">------if already created------</p>
        <Button
          className="bg-blue text-white p-2 px-4 rounded-l w-full"
          onClick={connectWallet}
        >
          Connect Wallet
        </Button>
      </div>

      <ToastContainer />
    </main>
    // </PrivateRoute>
  );
};

export default page;
