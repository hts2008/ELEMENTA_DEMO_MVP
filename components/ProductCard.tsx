import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { ELEMENTS } from '../constants';
import { ShoppingBag, Eye, Scan, Plus } from 'lucide-react';
import { useApp } from '../context/store';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useApp();
  const elInfo = ELEMENTS[product.element];

  return (
    <div className="group relative bg-white dark:bg-concrete-900 border border-concrete-200 dark:border-concrete-800 hover:border-amber-500 dark:hover:border-amber-500 transition-all duration-300 flex flex-col h-full overflow-hidden">
      
      {/* Image Container with Scan Effect */}
      <Link to={`/product/${product.id}`} className="relative aspect-[3/4] overflow-hidden bg-concrete-100 dark:bg-concrete-800 block cursor-pointer">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:opacity-80"
        />
        
        {/* Scanning Overlay Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
           <div className="absolute top-0 left-0 w-full h-[2px] bg-amber-500 shadow-[0_0_10px_#FFB300] animate-scan"></div>
           <div className="absolute inset-0 bg-amber-500/10"></div>
           
           {/* Technical Grid Overlay */}
           <div className="absolute inset-0 bg-[linear-gradient(rgba(255,179,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,179,0,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
           
           {/* Center Reticle */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-amber-500 flex items-center justify-center">
              <Scan size={24} className="text-amber-500 animate-pulse" />
           </div>
        </div>

        {/* Top Badges */}
        <div className="absolute top-0 left-0 p-3 w-full flex justify-between items-start z-10">
           <div className="bg-white/90 dark:bg-black/90 backdrop-blur text-black dark:text-amber-500 font-mono text-[10px] px-2 py-1 font-bold tracking-widest border border-concrete-200 dark:border-amber-500/30">
             [{elInfo.code}]
           </div>
           {product.isNew && (
             <div className="bg-amber-500 text-black font-mono text-[10px] px-2 py-1 font-bold animate-pulse">
               NEW
             </div>
           )}
        </div>
      </Link>

      {/* Info Section */}
      <div className="p-4 flex-1 flex flex-col bg-white dark:bg-concrete-900 relative z-20">
        <div className="mb-1">
          <span className="font-mono text-[10px] uppercase text-concrete-500 tracking-wider">{product.category}</span>
        </div>
        
        <Link to={`/product/${product.id}`} className="block mb-3">
           <h3 className="font-display font-bold text-sm md:text-base leading-tight group-hover:text-amber-500 transition-colors uppercase tracking-tight text-black dark:text-white line-clamp-2">
             {product.name}
           </h3>
        </Link>
        
        <div className="mt-auto flex justify-between items-end border-t border-dashed border-concrete-200 dark:border-concrete-800 pt-3 mb-3">
           <div className="font-mono text-[10px] text-concrete-500">
              SPEC: {product.techSpecs.weight}
           </div>
           <div className="font-mono font-bold text-sm text-black dark:text-white">
              ₫{product.price.toLocaleString()}
           </div>
        </div>

        {/* Quick Add Button - Always Visible but highlighted on hover */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            addToCart(product, 'M', 'Carbon Ink');
          }}
          className="w-full bg-concrete-100 dark:bg-concrete-800 text-black dark:text-white border border-concrete-200 dark:border-concrete-700 py-2 font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-amber-500 hover:border-amber-500 hover:text-black transition-all flex items-center justify-center gap-2 group/btn"
        >
          <Plus size={12} className="group-hover/btn:rotate-90 transition-transform" /> 
          Thêm Nhanh
        </button>
      </div>
    </div>
  );
};