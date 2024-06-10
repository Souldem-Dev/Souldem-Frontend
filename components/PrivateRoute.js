import { useContext, useEffect, useState } from 'react';
import { WalletContext } from '@/app/university/WalletContext';
import { useRouter } from 'next/navigation';

const PrivateRoute = ({ children }) => {
  const { walletAddr, connection } = useContext(WalletContext);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !connection) {
      router.push('/university/createCollege'); // Redirect to create college page
    } else if (!isLoading && connection) {
      router.push('/university/governance'); // Redirect to governance page
    }
  }, [isLoading, connection, router]);
};

export default PrivateRoute;
