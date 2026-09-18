import { useEffect, useState } from 'react';
import { useAuth, UserButton } from '@clerk/clerk-react';
import { fetchWithAuth } from '../../services/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, Car, ShoppingCart, Loader2 } from 'lucide-react';

export default function Dashboard() {
  const { getToken } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const result = await fetchWithAuth('/api/v1/dashboard/', getToken);
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, [getToken]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0D12] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-[#00E5FF] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0A0D12] text-white p-8 flex flex-col items-center justify-center">
        <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-lg text-center max-w-lg">
          <h2 className="text-xl font-['Sora'] text-red-400 mb-2">Failed to load dashboard</h2>
          <p className="text-gray-400 font-['Plus_Jakarta_Sans']">{error}</p>
        </div>
      </div>
    );
  }

  const hasData = data.total_earnings > 0 || data.cars_listed > 0 || data.orders > 0;

  return (
    <div className="min-h-screen bg-[#0A0D12] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0E131A] px-8 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold font-['Sora'] text-white">DriveSphere</h1>
        <div className="flex items-center gap-4">
          <UserButton appearance={{ elements: { userButtonAvatarBox: "w-10 h-10" } }} />
        </div>
      </header>

      <main className="p-4 sm:p-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold font-['Sora'] mb-8">Overview</h2>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#0E131A] border border-white/10 rounded-lg p-6 flex flex-col relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400 font-['Space_Grotesk'] tracking-wider uppercase text-sm font-semibold">Total Earnings</span>
              <DollarSign className="w-5 h-5 text-[#00E5FF]" />
            </div>
            <div className="text-4xl font-['Sora'] font-bold text-white">
              ${data.total_earnings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>

          <div className="bg-[#0E131A] border border-white/10 rounded-lg p-6 flex flex-col relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400 font-['Space_Grotesk'] tracking-wider uppercase text-sm font-semibold">Cars Listed</span>
              <Car className="w-5 h-5 text-[#00E5FF]" />
            </div>
            <div className="text-4xl font-['Sora'] font-bold text-white">
              {data.cars_listed}
            </div>
          </div>

          <div className="bg-[#0E131A] border border-white/10 rounded-lg p-6 flex flex-col relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400 font-['Space_Grotesk'] tracking-wider uppercase text-sm font-semibold">Orders</span>
              <ShoppingCart className="w-5 h-5 text-[#00E5FF]" />
            </div>
            <div className="text-4xl font-['Sora'] font-bold text-white">
              {data.orders}
            </div>
          </div>
        </div>

        {/* Chart Area */}
        <div className="bg-[#0E131A] border border-white/10 rounded-lg p-6">
          <h3 className="text-xl font-['Sora'] font-semibold mb-6">Sales Overview</h3>
          
          {!hasData ? (
            <div className="h-64 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-md bg-[#0A0D12]">
              <p className="text-gray-400 font-['Plus_Jakarta_Sans'] mb-2">No sales data yet</p>
              <p className="text-sm text-gray-500 font-['Space_Grotesk'] tracking-wide">LIST YOUR FIRST CAR TO START EARNING</p>
            </div>
          ) : (
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.sales_overview} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="name" stroke="#8E9AA8" tick={{ fill: '#8E9AA8', fontSize: 12 }} axisLine={{ stroke: 'rgba(255,255,255,0.1)' }} tickLine={false} dy={10} />
                  <YAxis stroke="#8E9AA8" tick={{ fill: '#8E9AA8', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#141C24', borderColor: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: '8px' }}
                    itemStyle={{ color: '#00E5FF', fontWeight: 'bold' }}
                    formatter={(value) => [`$${value}`, 'Sales']}
                  />
                  <Line type="monotone" dataKey="sales" stroke="#00E5FF" strokeWidth={3} dot={{ r: 4, fill: '#0E131A', stroke: '#00E5FF', strokeWidth: 2 }} activeDot={{ r: 6, fill: '#00E5FF', stroke: '#0E131A', strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
