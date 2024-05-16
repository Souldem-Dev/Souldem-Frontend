"use client";
import Image from 'next/image';
import React, { useContext } from 'react';
import logo from '@/app/assets/logo.svg';
import Link from 'next/link';
import { Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {ethers} from "ethers"
import { useEffect } from 'react';
import { useState } from 'react';
import { WalletContext } from '@/app/governance/layout';
const Navbar = () => {
  const {walletSigner,connection,walletAddr}= useContext(WalletContext)
let [isConnected,setIsConnected] = connection;
let [walletAdd,setWalletAdd] = walletAddr
let [walletProvider,setWalletProvider] = walletSigner
  useEffect(()=>{
   async function checkConnection(){
    if(window.ethereum){
      let isWalletConnected = window.ethereum.selectedAddress
      if(isWalletConnected){
        let firstSet = isWalletConnected.slice(0,7);
        let secondSet = isWalletConnected.slice(37,43)
        let add = firstSet+"..."+secondSet
        let provider = new ethers.BrowserProvider(window.ethereum);
        let signer = await provider.getSigner()
    setWalletAdd(add)
    setIsConnected(true)
    setWalletProvider(signer)   
      }

    }
   }

   checkConnection()
  },[])

  if (typeof window !== "undefined") {
  window.ethereum.on("accountsChanged",(account)=>{
if(account.length == 0)
setIsConnected(false)
  })

  window.ethereum.on("chainChanged",()=>{
    console.log("chain")
      })
    
  }

  let connectWallet = async()=>{
   try{
if(window.ethereum){
  let provider = new ethers.BrowserProvider(window.ethereum);
let signer = await provider.getSigner()
let address = await signer.getAddress()
let firstSet = address.slice(0,7);
let secondSet = address.slice(37,43)
let add = firstSet+"..."+secondSet
setWalletAdd(add)
setIsConnected(true)
setWalletProvider(signer)
console.log({walletAddress: address})

}else{
  alert("install metamask wallet!")
}
   }catch(err){
    console.log(err)
   }

  }
  return (
    <main className="flex justify-between  items-center w-full   drop-shadow-md h-20 bg-white px-8">
      <Link href="/governance">
        <div className="flex justify-center items-center">
          <Image src={logo} alt="Logo" />
        </div>
      </Link>
     

     <div>
{isConnected?<span className='hidden mr-2.5 lg:inline bg-slate-200 p-2 rounded-full'>{walletAdd}</span>
:null}
     <Button className="bg-black text-white " onClick={connectWallet}>
      {isConnected? <> <Wallet className='mr-1'/> wallet connected</>: <> <Wallet className='mr-1'/> Connect Wallet</>}
      </Button>
     </div>
    </main>
  );
};

export default Navbar;
