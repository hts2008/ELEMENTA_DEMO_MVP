import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Microscope, Wind, Zap, Home as HomeIcon, ChevronDown, Atom } from 'lucide-react';
import { MOCK_PRODUCTS, ELEMENTS } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { ScrollReveal } from '../components/ScrollReveal';
import { Element3DCard } from '../components/Element3DCard';

// Wrapper to handle individual hover state for the 3D effect
const ElementCardWrapper = ({ el, idx }: { el: any, idx: number }) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <div 
      className="h-full relative block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link 
        to={`/shop?element=${el.code}`}
        className="relative h-96 block w-full border border-concrete-200 dark:border-concrete-800 flex flex-col justify-between transition-all duration-500 overflow-hidden rounded-2xl group/card shadow-lg"
      >
        {/* 3D Background Layer */}
        <Element3DCard image={el.image} isHovered={hovered} />

        {/* Overlay Content (HTML on top of Canvas) */}
        <div className="absolute inset-0 p-8 flex flex-col justify-between z-20 pointer-events-none">
            {/* Header */}
            <div className="flex justify-between items-start">
                <span className="font-mono text-xs font-bold text-concrete-500 group-hover/card:text-white transition-colors">0{idx + 1}</span>
                <div className="text-concrete-500 group-hover/card:text-amber-500 transition-colors transform group-hover/card:scale-110 duration-500 group-hover/card:rotate-12">
                  {el.code === 'Ba' && <Wind size={40} strokeWidth={1} />}
                  {el.code === 'Sc' && <Microscope size={40} strokeWidth={1} />}
                  {el.code === 'Ki' && <Zap size={40} strokeWidth={1} />}
                  {el.code === 'Hm' && <HomeIcon size={40} strokeWidth={1} />}
                </div>
            </div>

            {/* Footer */}
            <div className="transform transition-transform duration-500 group-hover/card:-translate-y-2">
                <div className="font-display font-bold text-6xl mb-2 text-concrete-700 dark:text-concrete-300 group-hover/card:text-amber-500 transition-all duration-500 mix-blend-overlay group-hover/card:mix-blend-normal">
                  [{el.code}]
                </div>
                <h3 className="font-display font-bold text-xl uppercase mb-1 text-white shadow-black drop-shadow-md">{el.name}</h3>
                <p className="font-mono text-[10px] text-concrete-300 uppercase tracking-wider">{el.full}</p>
                
                <div className="h-0 group-hover/card:h-auto overflow-hidden transition-all duration-300 opacity-0 group-hover/card:opacity-100 delay-100">
                  <p className="font-sans text-xs text-white mt-4 pt-4 border-t border-dashed border-amber-500/50">
                    {el.desc}
                  </p>
                </div>
            </div>
        </div>

        {/* Scan line effect overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_2px,transparent_2px)] bg-[size:100%_4px] opacity-10 pointer-events-none z-30"></div>
        <div className="absolute inset-0 border-2 border-transparent group-hover/card:border-amber-500 transition-colors duration-500 rounded-2xl z-30 pointer-events-none"></div>
      </Link>
    </div>
  );
};

export const HomePage = () => {
  const featuredProducts = MOCK_PRODUCTS.slice(0, 4);

  return (
    <div className="w-full bg-white dark:bg-concrete-950 overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-concrete-100 dark:bg-concrete-950">
        <div className="absolute inset-0 z-0">
           <img 
             src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=2073&auto=format&fit=crop" 
             alt="Elementa Lab" 
             className="w-full h-full object-cover grayscale opacity-10 dark:opacity-20 mix-blend-multiply dark:mix-blend-luminosity animate-pulse-slow"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-concrete-950 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Content - Fades up */}
          <div className="text-left space-y-8">
            <ScrollReveal direction="down" delay={100}>
                <div className="inline-block border border-amber-500 text-amber-500 bg-amber-500/10 px-3 py-1 font-mono text-[10px] tracking-[0.2em] uppercase backdrop-blur-sm">
                   System v2.1 Ready
                </div>
            </ScrollReveal>
            
            <ScrollReveal direction="left" delay={300} blur={5}>
                <h1 className="font-display font-black text-6xl md:text-8xl lg:text-9xl leading-[0.85] tracking-tighter text-black dark:text-white uppercase mix-blend-hard-light">
                  The <br/>
                  Science <br/>
                  <span className="text-amber-500">Of</span> <br/>
                  Comfort.
                </h1>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={500}>
                <p className="font-mono text-concrete-700 dark:text-concrete-300 text-sm md:text-base max-w-md leading-relaxed border-l-2 border-amber-500 pl-4">
                  Tại ELEMENTA, quần áo là lớp da thứ hai. Phục vụ cuộc sống của bạn, chứ không bắt bạn phục vụ nó.
                </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={700}>
                <div className="flex gap-4 pt-4">
                   <Link 
                    to="/shop" 
                    className="group relative bg-black dark:bg-white text-white dark:text-black font-bold px-8 py-4 font-mono uppercase tracking-widest text-xs overflow-hidden"
                  >
                    <span className="relative z-10 group-hover:text-amber-500 transition-colors flex items-center gap-2">
                      Khám Phá Ngay <ArrowRight size={14} />
                    </span>
                    <div className="absolute inset-0 bg-concrete-800 dark:bg-concrete-200 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                  </Link>
                </div>
            </ScrollReveal>
          </div>

          {/* Right: Rotating Hologram Element - Comes from right */}
          <div className="hidden md:flex justify-end relative perspective-1000">
             <ScrollReveal mode="scroll" x={200} y={0} rotate={45} blur={10} scale={0.5} speed={0.4}>
                 <div className="relative w-80 h-80 md:w-96 md:h-96 bg-amber-500 flex items-center justify-center shadow-[0_0_50px_rgba(255,179,0,0.3)] animate-tilt transform-style-3d">
                    <div className="absolute top-4 left-4 font-mono text-black font-bold text-lg">06</div>
                    <div className="text-[180px] font-display font-bold leading-none text-black tracking-tighter mt-[-20px]">
                       El.
                    </div>
                    <div className="absolute bottom-4 right-4 font-mono text-black font-bold text-sm tracking-widest">
                       CARBON
                    </div>
                    <div className="absolute inset-4 border border-black/10"></div>
                    <div className="absolute -top-10 -right-10 w-20 h-20 border-t-2 border-r-2 border-concrete-300 dark:border-concrete-700 animate-pulse"></div>
                    <div className="absolute -bottom-10 -left-10 w-20 h-20 border-b-2 border-l-2 border-concrete-300 dark:border-concrete-700 animate-pulse"></div>
                 </div>
             </ScrollReveal>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-concrete-500 dark:text-concrete-400 animate-bounce">
          <span className="font-mono text-[10px] uppercase tracking-widest">Cuộn xuống</span>
          <ChevronDown size={20} />
        </div>
      </section>

      {/* Periodic Table Navigation (Elements) - 3D Dissolve Effect */}
      <section className="py-32 bg-concrete-50 dark:bg-concrete-950 border-t border-concrete-200 dark:border-concrete-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-20 flex flex-col md:flex-row justify-between items-end border-b border-concrete-300 dark:border-concrete-800 pb-6">
            <ScrollReveal direction="left">
                <div>
                   <span className="font-mono text-amber-500 text-xs font-bold tracking-widest mb-2 block">BẢNG HỆ THỐNG</span>
                   <h2 className="font-display font-bold text-4xl md:text-5xl uppercase text-black dark:text-white">Chọn Nguyên Tố<span className="text-amber-500 animate-pulse">_</span></h2>
                </div>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={200}>
                <p className="font-mono text-xs text-concrete-500 max-w-xs mt-4 md:mt-0 text-right">
                  Mỗi dòng sản phẩm là một nguyên tố riêng biệt, được tối ưu hóa cho từng mục đích sử dụng.
                </p>
            </ScrollReveal>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 group/grid">
            {Object.values(ELEMENTS).map((el, idx) => {
              // Calculate custom scatter directions for assembly effect
              const xOffset = idx % 2 === 0 ? -100 : 100;
              const yOffset = idx < 2 ? -100 : 100;
              
              return (
              <ScrollReveal 
                 key={el.code} 
                 mode="scroll"
                 x={xOffset}
                 y={yOffset}
                 blur={10}
                 scale={0.8}
                 speed={0.6}
                 className="h-full"
              >
                 <ElementCardWrapper el={el} idx={idx} />
              </ScrollReveal>
            )}}
          </div>
        </div>
      </section>

      {/* Featured Products - Scroll Assembly */}
      <section className="py-32 bg-white dark:bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
             <ScrollReveal direction="right">
                 <div>
                   <div className="flex items-center gap-2 mb-2">
                     <div className="w-2 h-2 bg-amber-500 animate-pulse"></div>
                     <h2 className="font-mono text-xs font-bold tracking-widest uppercase text-amber-500">LABORATORY ISSUE</h2>
                   </div>
                   <p className="font-display font-bold text-4xl uppercase text-black dark:text-white">Mẫu vật mới nhất</p>
                 </div>
             </ScrollReveal>
             <ScrollReveal direction="left">
                 <Link to="/shop" className="group flex items-center gap-4 font-mono text-xs font-bold border border-concrete-300 dark:border-concrete-700 px-6 py-3 hover:bg-amber-500 hover:border-amber-500 hover:text-black dark:text-white dark:hover:text-black transition-all">
                   XEM TẤT CẢ <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                 </Link>
             </ScrollReveal>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {featuredProducts.map((product, i) => (
              <ScrollReveal 
                key={product.id} 
                mode="scroll" 
                y={100 + (i * 50)} // Staggered Y offset
                blur={5}
                scale={0.9}
                speed={0.7}
              >
                  <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section - Zoom Assembly & Light/Dark Mode Fix */}
      <section className="py-32 bg-concrete-100 dark:bg-concrete-950 text-concrete-900 dark:text-white relative overflow-hidden transition-colors duration-500">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 dark:opacity-10 mix-blend-overlay"></div>
         <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <ScrollReveal mode="scroll" scale={0.5} blur={20} speed={0.5}>
                <h2 className="font-display font-black text-5xl md:text-7xl mb-8 uppercase leading-tight text-black dark:text-white">
                   Không Logo.<br/>
                   <span className="text-amber-500">Chỉ có Chất Liệu.</span>
                </h2>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={300}>
                <p className="font-mono text-concrete-600 dark:text-concrete-400 leading-loose max-w-2xl mx-auto mb-12">
                   Chúng tôi tin rằng khách hàng thường phải trả 80% chi phí cho logo thương hiệu và chỉ nhận lại 20% giá trị vải vóc. ELEMENTA ra đời để đảo ngược tỷ lệ đó.
                </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left border-t border-concrete-300 dark:border-concrete-800 pt-12">
               <ScrollReveal mode="scroll" x={-100} blur={5} speed={0.8}>
                   <div>
                      <h4 className="font-bold font-display text-xl mb-2 text-amber-500">01. NGUYÊN BẢN</h4>
                      <p className="text-sm text-concrete-600 dark:text-concrete-400 font-mono">Vải tự dệt (In-house Fabric). Kiểm soát định lượng GSM chính xác.</p>
                   </div>
               </ScrollReveal>
               <ScrollReveal mode="scroll" y={100} blur={5} speed={0.8}>
                   <div>
                      <h4 className="font-bold font-display text-xl mb-2 text-amber-500">02. TINH GIẢN</h4>
                      <p className="text-sm text-concrete-600 dark:text-concrete-400 font-mono">Loại bỏ chi tiết thừa. Tập trung vào công năng và cấu trúc dệt.</p>
                   </div>
               </ScrollReveal>
               <ScrollReveal mode="scroll" x={100} blur={5} speed={0.8}>
                   <div>
                      <h4 className="font-bold font-display text-xl mb-2 text-amber-500">03. MINH BẠCH</h4>
                      <p className="text-sm text-concrete-600 dark:text-concrete-400 font-mono">Giá gốc tận xưởng. Không chi phí ẩn. M2C Model.</p>
                   </div>
               </ScrollReveal>
            </div>
         </div>
      </section>
    </div>
  );
};
