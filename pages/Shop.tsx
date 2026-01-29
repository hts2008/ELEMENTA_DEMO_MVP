import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Filter, X, ChevronDown, Check } from 'lucide-react';
import { MOCK_PRODUCTS, ELEMENTS } from '../constants';
import { ProductCard } from '../components/ProductCard';

export const ShopPage = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const elementParam = queryParams.get('element');

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedElement, setSelectedElement] = useState<string | null>(elementParam);
  const [priceRange, setPriceRange] = useState(1000000);

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(p => {
      const matchElement = selectedElement ? p.element === selectedElement : true;
      const matchPrice = p.price <= priceRange;
      return matchElement && matchPrice;
    });
  }, [selectedElement, priceRange]);

  return (
    <div className="pt-32 pb-20 min-h-screen bg-concrete-50 dark:bg-concrete-950 transition-colors duration-300">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 pb-6 border-b border-concrete-200 dark:border-concrete-800">
           <div>
             <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 bg-amber-500"></span>
                <span className="font-mono text-xs text-amber-500 font-bold uppercase tracking-widest">Kho Hàng</span>
             </div>
             <h1 className="font-display font-black text-4xl md:text-5xl uppercase text-black dark:text-white tracking-tight">Danh Mục Thiết Bị</h1>
           </div>
           
           <div className="flex flex-col items-end gap-1 mt-4 md:mt-0 w-full md:w-auto">
              <span className="font-mono text-xs text-concrete-500">TRẠNG THÁI: SẴN SÀNG</span>
              <p className="font-mono text-xl font-bold text-black dark:text-white">
               {filteredProducts.length} <span className="text-xs font-normal text-concrete-500">MẪU VẬT</span>
             </p>
           </div>
        </div>

        {/* Toolbar for Mobile */}
        <div className="flex md:hidden gap-4 mb-8">
             <button 
               onClick={() => setMobileFiltersOpen(true)}
               className="flex-1 flex items-center justify-center gap-2 bg-white dark:bg-concrete-900 border border-concrete-300 dark:border-concrete-700 py-3 px-4 font-mono text-xs font-bold uppercase text-black dark:text-white"
             >
               <Filter size={14} /> Bộ Lọc
             </button>
             
             <div className="relative flex-1">
               <select className="w-full appearance-none bg-white dark:bg-concrete-900 border border-concrete-300 dark:border-concrete-700 py-3 px-4 pr-8 font-mono text-xs font-bold uppercase focus:border-amber-500 outline-none rounded-none text-black dark:text-white">
                 <option>Mới nhất</option>
                 <option>Giá: Thấp đến Cao</option>
                 <option>Giá: Cao đến Thấp</option>
               </select>
               <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50 text-black dark:text-white" size={14} />
             </div>
        </div>

        <div className="flex gap-12">
          {/* Desktop Filters */}
          <aside className="hidden md:block w-72 shrink-0">
             <div className="sticky top-28 bg-white dark:bg-concrete-900 border border-concrete-200 dark:border-concrete-800 p-6 shadow-sm">
               <div className="border-b border-black dark:border-white pb-4 mb-6 flex justify-between items-center">
                  <h3 className="font-display font-bold text-xl uppercase text-black dark:text-white">MANIFEST</h3>
                  <span className="text-[10px] font-mono border border-concrete-500 px-1 text-concrete-500">REF: FLTR</span>
               </div>

               {/* Elements Filter */}
               <div className="mb-8">
                 <h3 className="font-mono font-bold text-xs uppercase text-amber-500 mb-4 tracking-wider flex items-center gap-2">
                    <span className="w-1 h-1 bg-amber-500"></span> Phân loại Nguyên Tố
                 </h3>
                 <div className="space-y-1">
                   <label className="flex items-center gap-3 cursor-pointer group p-2 hover:bg-concrete-100 dark:hover:bg-concrete-800 transition-colors">
                     <div className={`w-4 h-4 border flex items-center justify-center ${selectedElement === null ? 'border-amber-500 bg-amber-500' : 'border-concrete-400'}`}>
                        {selectedElement === null && <Check size={10} className="text-black" />}
                     </div>
                     <input 
                       type="radio" 
                       name="element" 
                       checked={selectedElement === null}
                       onChange={() => setSelectedElement(null)}
                       className="hidden"
                     />
                     <span className={`font-mono text-xs uppercase ${selectedElement === null ? 'font-bold text-black dark:text-white' : 'text-concrete-500'}`}>TẤT CẢ</span>
                   </label>
                   
                   {Object.values(ELEMENTS).map(el => (
                     <label key={el.code} className="flex items-center gap-3 cursor-pointer group p-2 hover:bg-concrete-100 dark:hover:bg-concrete-800 transition-colors">
                        <div className={`w-4 h-4 border flex items-center justify-center ${selectedElement === el.code ? 'border-amber-500 bg-amber-500' : 'border-concrete-400'}`}>
                            {selectedElement === el.code && <Check size={10} className="text-black" />}
                        </div>
                       <input 
                         type="radio" 
                         name="element" 
                         checked={selectedElement === el.code}
                         onChange={() => setSelectedElement(el.code)}
                         className="hidden"
                       />
                       <div>
                          <span className={`font-mono text-xs uppercase block ${selectedElement === el.code ? 'font-bold text-black dark:text-white' : 'text-concrete-500'}`}>[{el.code}] {el.name}</span>
                       </div>
                     </label>
                   ))}
                 </div>
               </div>

               {/* Price Filter */}
               <div>
                 <h3 className="font-mono font-bold text-xs uppercase text-amber-500 mb-4 tracking-wider flex items-center gap-2">
                    <span className="w-1 h-1 bg-amber-500"></span> Ngân Sách
                 </h3>
                 <input 
                   type="range" 
                   min="0" 
                   max="1000000" 
                   step="50000"
                   value={priceRange}
                   onChange={(e) => setPriceRange(Number(e.target.value))}
                   className="w-full h-1 bg-concrete-200 dark:bg-concrete-700 rounded-none appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-amber-500 [&::-webkit-slider-thumb]:rounded-none"
                 />
                 <div className="flex justify-between font-mono text-[10px] mt-3 text-concrete-500">
                   <span>0 ₫</span>
                   <span className="font-bold text-black dark:text-white">{'<'} {priceRange.toLocaleString()} ₫</span>
                 </div>
               </div>
               
               {/* Sort (Desktop) */}
               <div className="mt-8 pt-8 border-t border-dashed border-concrete-300 dark:border-concrete-700">
                  <h3 className="font-mono font-bold text-xs uppercase text-amber-500 mb-4 tracking-wider">Sắp xếp</h3>
                  <select className="w-full bg-transparent border border-concrete-300 dark:border-concrete-700 p-2 font-mono text-xs focus:border-amber-500 outline-none text-black dark:text-white">
                     <option>Mới nhất</option>
                     <option>Giá tăng dần</option>
                     <option>Giá giảm dần</option>
                  </select>
               </div>
             </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
             {filteredProducts.length > 0 ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                 {filteredProducts.map(p => (
                   <ProductCard key={p.id} product={p} />
                 ))}
               </div>
             ) : (
               <div className="text-center py-32 border border-dashed border-concrete-300 dark:border-concrete-800 bg-white dark:bg-concrete-900/50">
                 <p className="font-mono text-concrete-500 mb-2">KHÔNG TÌM THẤY MẪU VẬT PHÙ HỢP.</p>
                 <button onClick={() => { setSelectedElement(null); setPriceRange(1000000); }} className="mt-4 px-6 py-2 bg-black dark:bg-white text-white dark:text-black hover:bg-amber-500 dark:hover:bg-amber-500 hover:text-black transition-colors font-mono text-xs uppercase font-bold">RESET BỘ LỌC</button>
               </div>
             )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      <div className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm md:hidden transition-opacity ${mobileFiltersOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className={`absolute inset-y-0 right-0 w-80 bg-concrete-100 dark:bg-concrete-900 shadow-xl transform transition-transform duration-300 ${mobileFiltersOpen ? 'translate-x-0' : 'translate-x-full'}`}>
           <div className="p-6 border-b border-concrete-200 dark:border-concrete-800 flex justify-between items-center bg-white dark:bg-black">
             <h3 className="font-display font-bold text-xl uppercase text-black dark:text-white">CẤU HÌNH LỌC</h3>
             <button onClick={() => setMobileFiltersOpen(false)} className="text-black dark:text-white"><X /></button>
           </div>
           <div className="p-6 space-y-8 overflow-y-auto h-[calc(100%-80px)]">
               {/* Mobile Element Filter */}
               <div>
                 <h4 className="font-mono font-bold text-amber-500 mb-4 text-xs uppercase tracking-widest">NGUYÊN TỐ</h4>
                 <div className="flex flex-wrap gap-2">
                   <button 
                      onClick={() => setSelectedElement(null)}
                      className={`px-4 py-3 border font-mono text-xs font-bold w-full text-left text-black dark:text-white ${selectedElement === null ? 'border-amber-500 text-amber-500 bg-amber-500/10' : 'border-concrete-300 dark:border-concrete-700'}`}
                   >
                     TẤT CẢ
                   </button>
                   {Object.values(ELEMENTS).map(el => (
                     <button 
                        key={el.code}
                        onClick={() => setSelectedElement(el.code)}
                        className={`px-4 py-3 border font-mono text-xs font-bold w-full text-left flex justify-between text-black dark:text-white ${selectedElement === el.code ? 'border-amber-500 text-amber-500 bg-amber-500/10' : 'border-concrete-300 dark:border-concrete-700'}`}
                     >
                       <span>[{el.code}] {el.name}</span>
                       {selectedElement === el.code && <Check size={14} />}
                     </button>
                   ))}
                 </div>
               </div>
               
               {/* Mobile Price */}
               <div>
                  <h4 className="font-mono font-bold text-amber-500 mb-4 text-xs uppercase tracking-widest">NGÂN SÁCH TỐI ĐA</h4>
                  <input 
                   type="range" 
                   min="0" 
                   max="1000000" 
                   step="50000"
                   value={priceRange}
                   onChange={(e) => setPriceRange(Number(e.target.value))}
                   className="w-full accent-amber-500"
                 />
                 <div className="text-right font-mono mt-2 font-bold text-black dark:text-white">₫{priceRange.toLocaleString()}</div>
               </div>
           </div>
           <div className="absolute bottom-0 left-0 right-0 p-4 bg-white dark:bg-black border-t border-concrete-200 dark:border-concrete-800">
             <button onClick={() => setMobileFiltersOpen(false)} className="w-full bg-amber-500 text-black font-bold py-3 uppercase font-mono tracking-wider hover:bg-amber-400 transition-colors">
               Áp Dụng ({filteredProducts.length})
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};