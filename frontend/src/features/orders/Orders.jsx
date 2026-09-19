import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { fetchWithAuth } from '../../services/api';
import { Loader2, DownloadCloud, FileText } from 'lucide-react';

export default function Orders() {
  const { getToken } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await fetchWithAuth('/api/v1/orders/', getToken);
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, [getToken]);

  const handleDownloadInvoice = async (orderId) => {
    try {
      setDownloadingId(orderId);
      const token = await getToken();
      
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/invoices/${orderId}/download/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate invoice');
      }
      
      // Convert to blob and download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Invoice_DriveSphere_${orderId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
      
    } catch (err) {
      alert(err.message);
    } finally {
      setDownloadingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-[#0A0D12] flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-[#00E5FF] animate-spin mb-4" />
        <p className="text-gray-400 font-['Space_Grotesk'] tracking-widest uppercase text-sm">Loading Orders</p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#0A0D12] text-white p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <FileText className="w-8 h-8 text-[#00E5FF]" />
          <h1 className="text-3xl font-bold font-['Sora']">Your Purchases</h1>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg text-red-400 mb-6 font-['Plus_Jakarta_Sans']">
            {error}
          </div>
        )}

        {orders.length === 0 ? (
          <div className="bg-[#0E131A] border border-white/5 rounded-2xl p-12 text-center">
            <div className="w-20 h-20 bg-[#0A0D12] rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
              <FileText className="w-10 h-10 text-gray-500" />
            </div>
            <h3 className="text-xl font-bold font-['Sora'] mb-2">No purchases yet</h3>
            <p className="text-gray-400 font-['Plus_Jakarta_Sans'] mb-6 max-w-md mx-auto">
              Once you buy a vehicle from the marketplace, your order history and invoices will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const car = order.car;
              const imgUrl = car?.primary_image_url || 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=800';
              
              return (
                <div key={order.id} className="bg-[#0E131A] border border-white/10 rounded-xl p-4 flex flex-col md:flex-row items-center gap-6 hover:border-white/20 transition-colors">
                  
                  {/* Thumbnail */}
                  <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden shrink-0 bg-[#0A0D12] border border-white/5">
                    <img src={imgUrl} alt={car?.model} className="w-full h-full object-cover" />
                  </div>

                  {/* Details */}
                  <div className="flex-1 w-full">
                    <div className="text-xs text-[#00E5FF] font-['Space_Grotesk'] tracking-widest uppercase mb-1">
                      Order #{order.id} • {new Date(order.created_at).toLocaleDateString()}
                    </div>
                    <h3 className="text-xl font-bold font-['Sora'] mb-2">
                      {car ? `${car.year} ${car.brand} ${car.model}` : 'Vehicle Unavailable'}
                    </h3>
                    <div className="flex items-center gap-4 text-sm font-['Plus_Jakarta_Sans'] text-gray-400">
                      <span className="flex items-center gap-1">
                        Status: <span className="text-green-400 font-semibold">{order.status}</span>
                      </span>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="w-full md:w-auto flex flex-row md:flex-col items-center md:items-end justify-between gap-4 shrink-0 border-t border-white/10 md:border-t-0 pt-4 md:pt-0">
                    <div className="text-2xl font-bold font-['Space_Grotesk']">
                      ${parseFloat(order.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                    
                    <button 
                      onClick={() => handleDownloadInvoice(order.id)}
                      disabled={downloadingId === order.id}
                      className="flex items-center justify-center gap-2 bg-[#0A0D12] hover:bg-white/5 border border-white/20 text-white font-['Sora'] font-semibold py-2 px-4 rounded-md transition-all disabled:opacity-50"
                    >
                      {downloadingId === order.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <DownloadCloud className="w-4 h-4 text-[#00E5FF]" />
                      )}
                      <span>Invoice</span>
                    </button>
                  </div>
                  
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
