import { useState } from 'react';
import { Filter, X } from 'lucide-react';

export default function FilterSidebar({ filters, onChange }) {
  const [localFilters, setLocalFilters] = useState(filters);
  const [isOpen, setIsOpen] = useState(false); // For mobile

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    onChange(localFilters);
    setIsOpen(false);
  };

  const clearFilters = () => {
    const cleared = { brand: '', model: '', year_min: '', year_max: '', max_price: '' };
    setLocalFilters(cleared);
    onChange(cleared);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Toggle */}
      <div className="md:hidden p-4 border-b border-white/10 flex justify-between items-center bg-[#0E131A]">
        <span className="font-['Sora'] font-semibold">Filters</span>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 bg-white/5 rounded-md">
          {isOpen ? <X className="w-5 h-5" /> : <Filter className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Content */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:block w-full md:w-72 bg-[#0E131A] border-r border-white/10 p-6 flex-shrink-0 h-full overflow-y-auto`}>
        <div className="flex justify-between items-center mb-8">
          <h3 className="font-['Space_Grotesk'] tracking-widest uppercase text-sm font-bold text-[#00E5FF]">Filters</h3>
          <button onClick={clearFilters} className="text-xs text-gray-500 hover:text-white transition-colors">Clear All</button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Brand</label>
            <input 
              type="text" 
              name="brand"
              value={localFilters.brand}
              onChange={handleChange}
              placeholder="e.g. Porsche"
              className="w-full bg-[#0A0D12] border border-white/10 rounded-md px-3 py-2 text-white focus:outline-none focus:border-[#00E5FF] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Model</label>
            <input 
              type="text" 
              name="model"
              value={localFilters.model}
              onChange={handleChange}
              placeholder="e.g. 911 GT3 RS"
              className="w-full bg-[#0A0D12] border border-white/10 rounded-md px-3 py-2 text-white focus:outline-none focus:border-[#00E5FF] transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Min Year</label>
              <input 
                type="number" 
                name="year_min"
                value={localFilters.year_min}
                onChange={handleChange}
                placeholder="2018"
                className="w-full bg-[#0A0D12] border border-white/10 rounded-md px-3 py-2 text-white focus:outline-none focus:border-[#00E5FF] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Max Year</label>
              <input 
                type="number" 
                name="year_max"
                value={localFilters.year_max}
                onChange={handleChange}
                placeholder="2024"
                className="w-full bg-[#0A0D12] border border-white/10 rounded-md px-3 py-2 text-white focus:outline-none focus:border-[#00E5FF] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Max Price</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input 
                type="number" 
                name="max_price"
                value={localFilters.max_price}
                onChange={handleChange}
                placeholder="250000"
                className="w-full bg-[#0A0D12] border border-white/10 rounded-md pl-8 pr-3 py-2 text-white focus:outline-none focus:border-[#00E5FF] transition-colors"
              />
            </div>
          </div>

          <button 
            onClick={applyFilters}
            className="w-full bg-[#00E5FF] hover:bg-[#00b3cc] text-[#0A0D12] font-bold py-3 rounded-md transition-all font-['Sora'] mt-4"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
}
