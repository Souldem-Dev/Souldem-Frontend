"use client"
import Footer from '@/components/Footer';
import GovSidebar from '@/components/governance/GovSidebar';
import Navbar from '@/components/Navbar';
import { createContext, useState } from 'react';
import '../globals.css';
export const WalletContext = createContext()
export default function GovernanceLayout({ children }) {
let [signer,setSigner] = useState(null);
let [isConnected,setIsConnected] = useState(false);
let [walletAdd,setWalletAdd] = useState("")

  return (
 <WalletContext.Provider value={{walletSigner :[signer,setSigner],connection:[isConnected,setIsConnected],walletAddr:[walletAdd,setWalletAdd]}}>
     <main>
      <Navbar />
      <div className="flex  bg-[#FAFAFD]">
        <GovSidebar />

        {children}
      </div>

      <Footer />
    </main>
 </WalletContext.Provider>
  );
}
