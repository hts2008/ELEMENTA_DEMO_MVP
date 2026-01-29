import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Truck, Shield, Ruler, Box, CheckCircle } from 'lucide-react';
import { MOCK_PRODUCTS, SIZES, COLORS } from '../constants';
import { useApp } from '../context/store';
import { Product3DViewer } from '../components/Product3DViewer';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useApp();
  
  const product = MOCK_PRODUCTS.find(p => p.id === id);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(COLORS[1]);

  if (!product) return <div className="pt-32 text-center font-mono">MẪU VẬT KHÔNG TỒN TẠI TRONG HỆ THỐNG</div>;

  return (
    <div className="pt-24 min-h-screen bg-concrete-50 dark:bg-concrete-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        
        {/* Breadcrumb / Back */}
        <button onClick={() => navigate(-1)} className="group flex items-center gap-2 text-concrete-500 hover:text-amber-500 mb-8 font-mono text-xs uppercase tracking-widest transition-colors">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Quay lại Kho
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Column: 3D Viewer & Gallery */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative">
                 {/* Spec Overlay on Viewer */}
                 <div className="absolute top-4 right-4 z-10 flex flex-col items-end gap-1 pointer-events-none">
                    <span className="bg-black text-white px-2 py-1 font-mono text-[9px] uppercase">FIG. 0{product.id}</span>
                    <span className="bg-amber-500 text-black px-2 py-1 font-mono text-[9px] uppercase font-bold">3D DESIGN</span>
                 </div>
                 <Product3DViewer imageUrl={product.image} />
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {[1,2,3,4].map((i) => (
                <div key={i} className="aspect-square bg-concrete-200 dark:bg-concrete-800 overflow-hidden cursor-pointer hover:border-2 border-amber-500 transition-all group relative rounded-lg">
                   <img src={`https://picsum.photos/id/${100 + parseInt(product.id) + i}/400/400`} alt="detail" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                   <div className="absolute bottom-1 right-1 bg-black/50 text-white text-[8px] font-mono px-1">IMG_0{i}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Info & Actions - Technical Document Style */}
          <div className="lg:col-span-5">
            <div className="mb-4 flex items-center gap-3 border-b border-concrete-300 dark:border-concrete-700 pb-4">
              <span className="bg-concrete-200 dark:bg-concrete-800 px-2 py-1 font-mono text-[10px] font-bold text-amber-500 uppercase tracking-wider">[{product.element}] SERIES</span>
              <span className="h-4 w-[1px] bg-concrete-400"></span>
              <span className="font-mono text-[10px] uppercase text-concrete-500">MÃ: {product.element}-00{product.id}</span>
              {product.isNew && <span className="ml-auto bg-amber-500 text-black px-2 py-1 font-mono text-[9px] font-bold uppercase animate-pulse">NEW ARRIVAL</span>}
            </div>
            
            <h1 className="font-display font-black text-4xl lg:text-5xl mb-2 leading-tight uppercase tracking-tight text-black dark:text-white">{product.name}</h1>
            <p className="font-mono text-sm text-amber-500 mb-6 font-bold uppercase tracking-widest">
               Tiêu chuẩn Swiss-Tech Minimalism
            </p>
            
            <div className="flex items-center justify-between mb-8 pb-8 border-b border-dashed border-concrete-300 dark:border-concrete-700">
              <span className="font-display font-bold text-3xl">₫{product.price.toLocaleString()}</span>
              <button className="text-concrete-500 hover:text-amber-500 transition-colors"><Share2 size={20} strokeWidth={1.5} /></button>
            </div>

            <div className="bg-concrete-100 dark:bg-concrete-900 p-4 border-l-2 border-amber-500 mb-8">
              <p className="font-mono text-xs text-concrete-600 dark:text-concrete-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Selectors */}
            <div className="space-y-6 mb-8">
              {/* Color */}
              <div>
                <label className="block font-mono text-[10px] font-bold mb-3 uppercase tracking-wider text-concrete-500">Màu Sắc: <span className="text-black dark:text-white">{selectedColor.name}</span></label>
                <div className="flex gap-3">
                  {COLORS.map(c => (
                    <button 
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={`group relative w-10 h-10 flex items-center justify-center transition-all ${selectedColor.name === c.name ? 'scale-110' : 'hover:scale-105'}`}
                    >
                      <div className={`w-8 h-8 border border-concrete-300 dark:border-concrete-600 shadow-sm ${selectedColor.name === c.name ? 'ring-2 ring-amber-500 ring-offset-2 dark:ring-offset-black' : ''}`} style={{ backgroundColor: c.hex }}></div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <div className="flex justify-between mb-3">
                  <label className="font-mono text-[10px] font-bold uppercase tracking-wider text-concrete-500">Kích Thước: <span className="text-black dark:text-white">{selectedSize}</span></label>
                  <button className="flex items-center gap-1 font-mono text-[10px] font-bold text-concrete-500 hover:text-amber-500 uppercase transition-colors"><Ruler size={12} /> Bảng Thông Số Rập</button>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {SIZES.map(s => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`py-3 font-mono font-bold text-sm border transition-all ${selectedSize === s ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white' : 'border-concrete-300 dark:border-concrete-700 hover:border-amber-500 text-concrete-500 hover:text-amber-500'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <button 
              onClick={() => addToCart(product, selectedSize, selectedColor.name)}
              className="group w-full bg-amber-500 hover:bg-amber-400 text-black font-display font-black text-lg py-4 uppercase tracking-widest transition-all mb-4 relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">Thêm Vào Túi <Box size={18} strokeWidth={2}/></span>
              <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 skew-x-12"></div>
            </button>
            
            {/* Trust Signals */}
            <div className="grid grid-cols-2 gap-4 mb-10 p-4 border border-concrete-200 dark:border-concrete-800 bg-white dark:bg-black/20">
              <div className="flex items-center gap-3 text-[10px] font-mono font-bold text-concrete-500 uppercase">
                <Truck size={16} className="text-amber-500" /> <span>Free ship {'>'} 500k</span>
              </div>
              <div className="flex items-center gap-3 text-[10px] font-mono font-bold text-concrete-500 uppercase">
                <Shield size={16} className="text-amber-500" /> <span>Bảo hành trọn đời</span>
              </div>
            </div>

            {/* FULL TECH SPECS (No Tabs) */}
            <div className="space-y-6">
                <h3 className="font-display font-bold text-xl uppercase border-b border-black dark:border-white pb-2 text-black dark:text-white">Dữ Liệu Kỹ Thuật</h3>
                
                {/* 1. Material Specs */}
                <div className="bg-concrete-50 dark:bg-concrete-900 border border-concrete-200 dark:border-concrete-800 p-6">
                    <h4 className="font-mono font-bold text-xs text-amber-500 mb-4 uppercase tracking-widest">01. Thông Số Vật Liệu</h4>
                    <ul className="space-y-3 font-mono text-xs">
                     <li className="flex justify-between border-b border-dashed border-concrete-300 dark:border-concrete-700 pb-2">
                       <span className="text-concrete-500">CHẤT LIỆU CHÍNH</span>
                       <span className="font-bold text-black dark:text-white">{product.techSpecs.fabric}</span>
                     </li>
                     <li className="flex justify-between border-b border-dashed border-concrete-300 dark:border-concrete-700 pb-2">
                       <span className="text-concrete-500">ĐỊNH LƯỢNG (GSM)</span>
                       <span className="font-bold text-black dark:text-white">{product.techSpecs.weight}</span>
                     </li>
                     <li className="flex justify-between border-b border-dashed border-concrete-300 dark:border-concrete-700 pb-2">
                       <span className="text-concrete-500">CÔNG NGHỆ DỆT</span>
                       <span className="font-bold text-black dark:text-white">{product.techSpecs.weave}</span>
                     </li>
                     <li className="flex justify-between">
                       <span className="text-concrete-500">LAB SẢN XUẤT</span>
                       <span className="font-bold text-black dark:text-white">{product.techSpecs.origin}</span>
                     </li>
                   </ul>
                </div>

                {/* 2. Fit Guide */}
                <div className="bg-concrete-50 dark:bg-concrete-900 border border-concrete-200 dark:border-concrete-800 p-6">
                    <h4 className="font-mono font-bold text-xs text-amber-500 mb-4 uppercase tracking-widest">02. Dáng Vóc & Fit</h4>
                    <div className="font-mono text-xs text-concrete-600 dark:text-concrete-400 space-y-2">
                        <div className="flex items-center gap-2 text-black dark:text-white font-bold"><CheckCircle size={12}/> Fit Model: 182cm / 75kg mặc size L.</div>
                        <p>• Thiết kế dựa trên hệ quy chiếu nhân trắc học người Việt (2025 Standard).</p>
                        <p>• Dung sai sản xuất cho phép +/- 1.0cm.</p>
                        <p>• Cấu trúc rập 3D giúp tối ưu chuyển động vùng vai và nách.</p>
                    </div>
                </div>

                {/* 3. Care */}
                <div className="bg-concrete-50 dark:bg-concrete-900 border border-concrete-200 dark:border-concrete-800 p-6">
                    <h4 className="font-mono font-bold text-xs text-amber-500 mb-4 uppercase tracking-widest">03. Bảo Quản & Độ Bền</h4>
                    <div className="grid grid-cols-2 gap-4 font-mono text-[10px] text-concrete-600 dark:text-concrete-400 uppercase">
                        <div className="flex items-center gap-2 border border-concrete-300 dark:border-concrete-700 p-2"><div className="w-2 h-2 bg-black dark:bg-white rounded-full"></div> Giặt lạnh 30°C</div>
                        <div className="flex items-center gap-2 border border-concrete-300 dark:border-concrete-700 p-2"><div className="w-2 h-2 bg-black dark:bg-white rounded-full"></div> Không thuốc tẩy</div>
                        <div className="flex items-center gap-2 border border-concrete-300 dark:border-concrete-700 p-2"><div className="w-2 h-2 bg-black dark:bg-white rounded-full"></div> Phơi bóng râm</div>
                        <div className="flex items-center gap-2 border border-concrete-300 dark:border-concrete-700 p-2"><div className="w-2 h-2 bg-black dark:bg-white rounded-full"></div> Ủi nhiệt thấp</div>
                    </div>
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};