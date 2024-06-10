// WalletContext.jsx
import { createContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

export const WalletContext = createContext();

const WalletProvider = ({ children }) => {
  const [signer, setSigner] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [connection, setConnection] = useState(false);

  // useEffect(() => {
  //   const connectWallet = async () => {
  //     if (window.ethereum) {

  //       const provider = new ethers.providers.Web3Provider(window.ethereum);
  //       const signer = provider.getSigner();
  //       setSigner(signer);
  //       setWalletAddress(await signer.getAddress());
  //       setIsConnected(true);
  //       setConnection(true); // Set connection to true when wallet is connected
  //     }
  //   };
  //   connectWallet();
  // }, []);

  return (
    <WalletContext.Provider
      value={{
        signer,
        isConnected,
        walletAddress,
        connection,
        setConnection,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
