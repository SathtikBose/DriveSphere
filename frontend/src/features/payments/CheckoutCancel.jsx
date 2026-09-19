import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

export default function CheckoutCancel() {
  return (
    <div className="min-h-screen bg-[#0A0D12] text-white flex flex-col items-center justify-center p-4">
      <div className="bg-[#0E131A] border border-red-500/20 rounded-2xl p-10 text-center max-w-md w-full shadow-[0_0_50px_rgba(239,68,68,0.05)]">
        <AlertTriangle className="w-20 h-20 text-red-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold font-['Sora'] mb-4 text-white">Payment Cancelled</h1>
        <p className="text-gray-400 font-['Plus_Jakarta_Sans'] mb-8 leading-relaxed">
          Your checkout session was cancelled. No charges were made to your account.
        </p>
        <Link 
          to="/marketplace"
          className="block w-full bg-transparent border border-white/20 hover:border-white text-white font-bold py-4 rounded-md transition-all font-['Sora']"
        >
          Return to Marketplace
        </Link>
      </div>
    </div>
  );
}
