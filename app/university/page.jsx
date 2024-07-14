import './globals.css';
import WalletProvider from './university/WalletContext';

export default function Page({ children }) {
  return (
    <html lang="en">
      <WalletProvider>{children}</WalletProvider>
    </html>
  );
}
