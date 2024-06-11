// WalletContext.jsx
import { createContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

export const WalletContext = createContext();

const WalletProvider = ({ children }) => {
  const [signer, setSigner] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  let [walletAdd, setWalletAdd] = useState('');
  const [connection, setConnection] = useState(false);

  useEffect(() => {
    const connectWallet = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setWalletAdd(address);
        setIsConnected(true);
      }
    };

    connectWallet();
  }, []);
  return (
    <WalletContext.Provider
      value={{
        walletSigner: [signer, setSigner],
        connection: [isConnected, setIsConnected],
        walletAddr: [walletAdd, setWalletAdd],
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
