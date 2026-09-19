import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useUser, useAuth } from '@clerk/clerk-react';
import { fetchWithAuth } from '../../services/api';
import { Loader2, ArrowLeft, Gauge, Zap, Cog } from 'lucide-react';

export default function CarDetails() {
  const { id } = useParams();
  const { user } = useUser();
  const { getToken } = useAuth();
  
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    async function loadCar() {
      try {
        const result = await fetchWithAuth(`/api/v1/cars/${id}/`, getToken);
        setCar(result);
        if (result.images && result.images.length > 0) {
          setMainImage(result.images[0].image_url);
        } else if (result.primary_image_url) {
          setMainImage(result.primary_image_url);
        } else {
          setMainImage('https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=800');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadCar();
  }, [id, getToken]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0D12] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-[#00E5FF] animate-spin" />
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="min-h-screen bg-[#0A0D12] text-white p-8 flex flex-col items-center justify-center">
        <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-lg text-center max-w-lg">
          <h2 className="text-xl font-['Sora'] text-red-400 mb-2">Error Loading Car</h2>
          <p className="text-gray-400 font-['Plus_Jakarta_Sans']">{error || 'Car not found'}</p>
          <Link to="/marketplace" className="mt-4 inline-block text-[#00E5FF] hover:underline">
            &larr; Back to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  // Check if current user is the seller
  const isSeller = user?.id === car.seller?.clerk_user_id;

  const allImages = car.images && car.images.length > 0 
    ? car.images.map(img => img.image_url)
    : car.primary_image_url ? [car.primary_image_url] : ['https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=800'];

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#0A0D12] text-white p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        
        <Link to="/marketplace" className="inline-flex items-center text-gray-400 hover:text-white font-['Space_Grotesk'] text-sm tracking-widest uppercase mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Marketplace
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column: Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-[#0E131A]">
              <img src={mainImage} alt={car.title} className="w-full h-full object-cover" />
            </div>
            
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {allImages.map((imgUrl, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setMainImage(imgUrl)}
                    className={`aspect-video rounded-md overflow-hidden border-2 transition-all ${mainImage === imgUrl ? 'border-[#00E5FF]' : 'border-transparent hover:border-white/20'}`}
                  >
                    <img src={imgUrl} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover opacity-80 hover:opacity-100" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Details & Actions */}
          <div className="flex flex-col">
            <div className="mb-2 text-[#00E5FF] font-['Space_Grotesk'] font-bold tracking-widest uppercase text-sm">
              {car.year} • {car.brand}
            </div>
            <h1 className="text-4xl md:text-5xl font-['Sora'] font-bold mb-6 leading-tight">
              {car.model}
            </h1>
            
            <div className="text-3xl font-bold font-['Space_Grotesk'] mb-8 text-white">
              ${parseFloat(car.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>

            {/* Specifications Grid */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-[#0E131A] border border-white/10 rounded-lg p-4 flex flex-col items-center justify-center text-center">
                <Gauge className="w-6 h-6 text-gray-500 mb-2" />
                <div className="text-xs text-gray-400 font-['Space_Grotesk'] uppercase tracking-wider mb-1">Mileage</div>
                <div className="font-semibold">{car.mileage.toLocaleString()} mi</div>
              </div>
              <div className="bg-[#0E131A] border border-white/10 rounded-lg p-4 flex flex-col items-center justify-center text-center">
                <Zap className="w-6 h-6 text-gray-500 mb-2" />
                <div className="text-xs text-gray-400 font-['Space_Grotesk'] uppercase tracking-wider mb-1">Fuel</div>
                <div className="font-semibold">{car.fuel_type || 'Gas'}</div>
              </div>
              <div className="bg-[#0E131A] border border-white/10 rounded-lg p-4 flex flex-col items-center justify-center text-center">
                <Cog className="w-6 h-6 text-gray-500 mb-2" />
                <div className="text-xs text-gray-400 font-['Space_Grotesk'] uppercase tracking-wider mb-1">Transmission</div>
                <div className="font-semibold">{car.transmission || 'Automatic'}</div>
              </div>
            </div>

            <div className="mb-8 flex-1">
              <h3 className="text-lg font-['Sora'] font-semibold mb-3 border-b border-white/10 pb-2">Description</h3>
              <p className="text-gray-400 font-['Plus_Jakarta_Sans'] leading-relaxed whitespace-pre-wrap">
                {car.description || 'No description provided.'}
              </p>
            </div>

            <div className="border-t border-white/10 pt-6 mt-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00E5FF] to-blue-600 flex items-center justify-center text-white font-bold font-['Sora'] shadow-lg">
                    {car.seller?.first_name?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 font-['Plus_Jakarta_Sans']">Listed by</div>
                    <div className="font-semibold font-['Sora']">{car.seller?.first_name} {car.seller?.last_name}</div>
                  </div>
                </div>
              </div>

              {!isSeller ? (
                <button className="w-full bg-[#00E5FF] hover:bg-[#00b3cc] text-[#0A0D12] font-bold py-4 rounded-md transition-all font-['Sora'] shadow-[0_0_20px_rgba(0,229,255,0.2)] hover:shadow-[0_0_25px_rgba(0,229,255,0.4)] text-lg">
                  Buy Now
                </button>
              ) : (
                <div className="w-full bg-[#0E131A] border border-[#00E5FF]/20 text-[#00E5FF] font-bold py-4 rounded-md text-center font-['Sora']">
                  This is your listing
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
