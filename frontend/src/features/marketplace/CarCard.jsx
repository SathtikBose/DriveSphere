import { Link } from 'react-router-dom';
import { Gauge, Zap, Cog } from 'lucide-react';

export default function CarCard({ car }) {
  // Use placeholder image if none exists
  const imageUrl = car.primary_image_url || 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=800';

  return (
    <div className="bg-[#0E131A] border border-white/10 rounded-xl overflow-hidden flex flex-col group hover:border-[#00E5FF]/50 transition-colors">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={`${car.year} ${car.brand} ${car.model}`} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-[#0A0D12]/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
          <span className="text-[#00E5FF] font-['Space_Grotesk'] font-bold text-sm">
            ${parseFloat(car.price).toLocaleString()}
          </span>
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="text-xs text-gray-400 font-['Space_Grotesk'] tracking-widest uppercase mb-1">
          {car.year} • {car.brand}
        </div>
        <h3 className="text-xl font-bold font-['Sora'] text-white mb-4 line-clamp-1">
          {car.model}
        </h3>
        
        <div className="grid grid-cols-3 gap-2 mb-6 text-gray-400 text-xs font-['Plus_Jakarta_Sans']">
          <div className="flex flex-col items-center p-2 bg-[#0A0D12] rounded-md border border-white/5">
            <Gauge className="w-4 h-4 mb-1 text-gray-500" />
            <span className="truncate w-full text-center">{car.mileage.toLocaleString()} mi</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-[#0A0D12] rounded-md border border-white/5">
            <Zap className="w-4 h-4 mb-1 text-gray-500" />
            <span className="truncate w-full text-center">{car.fuel_type || 'Gas'}</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-[#0A0D12] rounded-md border border-white/5">
            <Cog className="w-4 h-4 mb-1 text-gray-500" />
            <span className="truncate w-full text-center">{car.transmission || 'Auto'}</span>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-white/10 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Seller: <span className="text-gray-300">{car.seller?.first_name || 'Verified'}</span>
          </div>
          {/* We'll link to details page later when implemented */}
          <Link 
            to={`/marketplace/${car.id}`}
            className="text-[#00E5FF] hover:text-white font-['Space_Grotesk'] text-sm font-bold uppercase tracking-wide transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
