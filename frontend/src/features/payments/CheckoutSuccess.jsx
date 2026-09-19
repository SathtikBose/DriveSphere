import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function CheckoutSuccess() {
  return (
    <div className="min-h-screen bg-[#0A0D12] text-white flex flex-col items-center justify-center p-4">
      <div className="bg-[#0E131A] border border-[#00E5FF]/20 rounded-2xl p-10 text-center max-w-md w-full shadow-[0_0_50px_rgba(0,229,255,0.05)]">
        <CheckCircle className="w-20 h-20 text-[#00E5FF] mx-auto mb-6" />
        <h1 className="text-3xl font-bold font-['Sora'] mb-4 text-white">Payment Successful!</h1>
        <p className="text-gray-400 font-['Plus_Jakarta_Sans'] mb-8 leading-relaxed">
          Your order has been securely processed and double-purchase protection confirmed your acquisition. You can view your order details in the dashboard.
        </p>
        <Link 
          to="/dashboard"
          className="block w-full bg-[#00E5FF] hover:bg-[#00b3cc] text-[#0A0D12] font-bold py-4 rounded-md transition-all font-['Sora'] shadow-[0_0_20px_rgba(0,229,255,0.2)]"
        >
          View Dashboard
        </Link>
      </div>
    </div>
  );
}
