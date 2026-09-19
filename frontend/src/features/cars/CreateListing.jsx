import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { fetchWithAuth } from '../../services/api';
import { UploadCloud, X, Loader2 } from 'lucide-react';

export default function CreateListing() {
  const { getToken } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '', brand: '', model: '', year: '', price: '',
    mileage: '', fuel_type: 'Gas', transmission: 'Automatic', description: ''
  });
  
  const [images, setImages] = useState([]); // File objects
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 4) {
      alert("Maximum 4 images allowed.");
      return;
    }
    setImages(prev => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const uploadToCloudinary = async (file) => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    
    if (!cloudName || cloudName === 'your_cloud_name') {
      throw new Error("Cloudinary not configured. Check .env");
    }

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', uploadPreset);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: data
    });

    if (!res.ok) {
      throw new Error("Failed to upload image to Cloudinary");
    }

    const json = await res.json();
    return json.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setError(null);
    
    try {
      // 1. Upload images directly to Cloudinary
      const uploadedUrls = await Promise.all(images.map(img => uploadToCloudinary(img)));
      
      // 2. Submit form data + image URLs to backend
      const payload = {
        ...formData,
        year: parseInt(formData.year, 10),
        price: parseFloat(formData.price),
        mileage: parseInt(formData.mileage, 10),
        image_urls: uploadedUrls
      };
      
      await fetchWithAuth('/api/v1/cars/', getToken, {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      
      // Success, redirect to marketplace
      navigate('/marketplace');
      
    } catch (err) {
      setError(err.message);
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0D12] text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold font-['Sora'] mb-8">List Your Vehicle</h2>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg text-red-400 mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 1. Basic Info */}
          <div className="bg-[#0E131A] border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-['Sora'] font-semibold mb-4 text-[#00E5FF]">1. Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">Listing Title</label>
                <input required name="title" value={formData.title} onChange={handleChange} placeholder="e.g. 2021 Porsche 911 GT3 RS" className="w-full bg-[#0A0D12] border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">Brand</label>
                <input required name="brand" value={formData.brand} onChange={handleChange} placeholder="Porsche" className="w-full bg-[#0A0D12] border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">Model</label>
                <input required name="model" value={formData.model} onChange={handleChange} placeholder="911 GT3" className="w-full bg-[#0A0D12] border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">Year</label>
                <input required type="number" name="year" value={formData.year} onChange={handleChange} placeholder="2021" className="w-full bg-[#0A0D12] border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF]" />
              </div>
            </div>
          </div>

          {/* 2. Specs */}
          <div className="bg-[#0E131A] border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-['Sora'] font-semibold mb-4 text-[#00E5FF]">2. Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">Mileage</label>
                <input required type="number" name="mileage" value={formData.mileage} onChange={handleChange} placeholder="12000" className="w-full bg-[#0A0D12] border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">Fuel Type</label>
                <select name="fuel_type" value={formData.fuel_type} onChange={handleChange} className="w-full bg-[#0A0D12] border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF]">
                  <option>Gas</option>
                  <option>Hybrid</option>
                  <option>Electric</option>
                  <option>Diesel</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">Transmission</label>
                <select name="transmission" value={formData.transmission} onChange={handleChange} className="w-full bg-[#0A0D12] border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF]">
                  <option>Automatic</option>
                  <option>Manual</option>
                  <option>PDK</option>
                </select>
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows="4" className="w-full bg-[#0A0D12] border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF]" placeholder="Detail the condition, history, and modifications..."></textarea>
            </div>
          </div>

          {/* 3. Pricing */}
          <div className="bg-[#0E131A] border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-['Sora'] font-semibold mb-4 text-[#00E5FF]">3. Pricing</h3>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">Asking Price (USD)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input required type="number" name="price" value={formData.price} onChange={handleChange} placeholder="250000" className="w-full bg-[#0A0D12] border border-white/10 rounded-md pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF]" />
              </div>
            </div>
          </div>

          {/* 4. Media */}
          <div className="bg-[#0E131A] border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-['Sora'] font-semibold mb-4 text-[#00E5FF]">4. Media (Max 4)</h3>
            <div 
              className="border-2 border-dashed border-white/20 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-[#00E5FF]/50 transition-colors bg-[#0A0D12]/50"
              onClick={() => fileInputRef.current?.click()}
            >
              <UploadCloud className="w-12 h-12 text-gray-500 mb-4" />
              <p className="text-gray-300 font-['Plus_Jakarta_Sans'] mb-2">Click to browse or drag images here</p>
              <p className="text-xs text-gray-500">Supports JPG, PNG (Max 5MB each)</p>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                multiple 
                accept="image/*" 
                className="hidden" 
              />
            </div>
            
            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {images.map((img, idx) => (
                  <div key={idx} className="relative aspect-video rounded-md overflow-hidden border border-white/10">
                    <img src={URL.createObjectURL(img)} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                    <button type="button" onClick={() => removeImage(idx)} className="absolute top-2 right-2 p-1 bg-black/60 rounded-full hover:bg-red-500/80 transition-colors">
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <button 
              type="submit" 
              disabled={uploading}
              className="bg-[#00E5FF] hover:bg-[#00b3cc] text-[#0A0D12] font-bold py-4 px-10 rounded-md transition-all font-['Sora'] shadow-[0_0_20px_rgba(0,229,255,0.2)] flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? (
                <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Publishing...</>
              ) : 'Publish Listing'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
