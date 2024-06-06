'use client';
import Image from 'next/image';
import React, { useContext } from 'react';
import logo from '@/app/assets/logo.svg';
import Link from 'next/link';
import { Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlignJustify } from 'lucide-react';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Home, HandCoins, Award, Folder } from 'lucide-react';

import { ethers } from 'ethers';
import { useEffect } from 'react';
import { useState } from 'react';
import { WalletContext } from '@/app/university/layout';
const Navbar = () => {
  const { walletSigner, connection, walletAddr } = useContext(WalletContext);
  let [isConnected, setIsConnected] = connection;
  let [walletAdd, setWalletAdd] = walletAddr;
  let [walletProvider, setWalletProvider] = walletSigner;
  useEffect(() => {
    async function checkConnection() {
      if (window.ethereum) {
        let isWalletConnected = window.ethereum.selectedAddress;
        if (isWalletConnected) {
          let firstSet = isWalletConnected.slice(0, 7);
          let secondSet = isWalletConnected.slice(37, 43);
          let add = firstSet + '...' + secondSet;
          let provider = new ethers.BrowserProvider(window.ethereum);
          let signer = await provider.getSigner();
          setWalletAdd(add);
          setIsConnected(true);
          setWalletProvider(signer);
        }
      }
    }

    checkConnection();
  }, []);

  if (typeof window !== 'undefined') {
    window.ethereum.on('accountsChanged', (account) => {
      if (account.length == 0) setIsConnected(false);
    });

    window.ethereum.on('chainChanged', () => {
      console.log('chain');
    });
  }

  let connectWallet = async () => {
    try {
      if (window.ethereum) {
        let provider = new ethers.BrowserProvider(window.ethereum);
        let signer = await provider.getSigner();
        let address = await signer.getAddress();
        let firstSet = address.slice(0, 7);
        let secondSet = address.slice(37, 43);
        let add = firstSet + '...' + secondSet;
        setWalletAdd(add);
        setIsConnected(true);
        setWalletProvider(signer);
        console.log({ walletAddress: address });
      } else {
        alert('install metamask wallet!');
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <main className="flex justify-between  items-center w-full   drop-shadow-md h-20 bg-white px-8">
      <Link href="/governance">
        <div className="flex justify-center items-center">
          <Image src={logo} alt="Logo" />
        </div>
      </Link>

      <div>
        {isConnected ? (
          <span className="hidden mr-2.5 lg:inline bg-slate-200 p-2 rounded-full">
            {walletAdd}
          </span>
        ) : null}
        <Button className="bg-black text-white " onClick={connectWallet}>
          {isConnected ? (
            <>
              {' '}
              <Wallet className="mr-1" /> wallet connected
            </>
          ) : (
            <>
              {' '}
              <Wallet className="mr-1" /> Connect Wallet
            </>
          )}
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button className="md:hidden bg-blue">
              <AlignJustify className="text-white" />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-60 h-full bg-white drop-shadow-md py-4">
            {' '}
            <div className="flex justify-center items-center py-16">
              <div className="flex flex-col gap-y-4 justify-start items-start">
                <ul className="flex flex-col">
                  <Link
                    href="/university/governance"
                    className="hover:bg-blue hover:text-white active:bg-blue cursor-pointer w-52 p-4 rounded-r-3xl flex gap-x-2"
                  >
                    <Home className="hover:text-white" />
                    <span>Governance</span>
                  </Link>
                  <Link
                    href="/"
                    className="hover:bg-blue hover:text-white active:bg-blue cursor-pointer w-52 p-4 rounded-r-3xl flex gap-x-2"
                  >
                    <HandCoins className="hover:text-white" />
                    <span>Buy tokens</span>
                  </Link>
                  <Link
                    href="/university/certificates"
                    className="hover:bg-blue hover:text-white active:bg-blue cursor-pointer w-52 p-4 rounded-r-3xl flex gap-x-2"
                  >
                    <Award className="hover:text-white" />
                    <span>Certificates</span>
                  </Link>
                  <Link
                    href="/university/marksDatabase"
                    className="hover:bg-blue hover:text-white active:bg-blue cursor-pointer w-52 p-4 rounded-r-3xl flex gap-x-2"
                  >
                    <Folder className="hover:text-white" />
                    <span>Marks database</span>
                  </Link>
                </ul>
              </div>
            </div>
            <div>
              <Button className="bg-black text-white ">
                <Wallet /> Connect Wallet
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </main>
  );
};

export default Navbar;
