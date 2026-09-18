import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { fetchWithAuth } from '../../services/api';
import { Loader2, Search } from 'lucide-react';
import FilterSidebar from './FilterSidebar';
import CarCard from './CarCard';

export default function Marketplace() {
  const { getToken } = useAuth();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [filters, setFilters] = useState({
    brand: '',
    model: '',
    year_min: '',
    year_max: '',
    max_price: ''
  });

  const loadCars = useCallback(async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });
      
      const result = await fetchWithAuth(`/api/v1/cars/?${queryParams.toString()}`, getToken);
      setCars(result);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filters, getToken]);

  useEffect(() => {
    loadCars();
  }, [loadCars]);

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="w-full h-full flex flex-col md:flex-row">
      {/* Sidebar */}
      <FilterSidebar filters={filters} onChange={handleFilterChange} />

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-8 overflow-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold font-['Sora']">Marketplace</h2>
          <div className="text-gray-400 font-['Space_Grotesk'] text-sm tracking-wide">
            {cars.length} {cars.length === 1 ? 'VEHICLE' : 'VEHICLES'} FOUND
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg text-red-400 mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-10 h-10 text-[#00E5FF] animate-spin" />
          </div>
        ) : cars.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 border border-dashed border-white/10 rounded-xl bg-[#0E131A]/50">
            <Search className="w-12 h-12 text-gray-500 mb-4" />
            <p className="text-gray-400 font-['Plus_Jakarta_Sans'] text-lg">No vehicles match your criteria</p>
            <p className="text-sm text-gray-600 mt-2">Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cars.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
