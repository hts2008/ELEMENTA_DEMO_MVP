import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Sun, Moon, Menu, X, Trash2, Atom, User, ArrowRight, ShieldCheck, LogIn, ChevronRight, Circle } from 'lucide-react';
import { useApp } from '../context/store';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isDarkMode, toggleTheme, cart, cartIsOpen, setCartIsOpen, removeFromCart, cartTotal } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [navHovered, setNavHovered] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setCartIsOpen(false);
    setLoginOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname, setCartIsOpen]);

  // Animation states for Atomic Dispersion
  // When scrolled and hovered: menu items fly out from left to right with stagger
  const navContainerClasses = scrolled
    ? `fixed top-6 left-6 z-50 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
        navHovered ? 'w-auto pr-8 bg-white/95 dark:bg-concrete-950/95 shadow-2xl backdrop-blur-md border border-concrete-200 dark:border-concrete-800 rounded-full' : 'w-16 h-16 bg-transparent delay-300'
      }`
    : 'fixed top-0 w-full z-50 transition-all duration-500 bg-transparent border-b border-transparent py-4';

  const logoWrapperClasses = scrolled
    ? `w-16 h-16 flex items-center justify-center bg-amber-500 shadow-xl transition-all duration-500 rounded-full ${navHovered ? 'rotate-90 scale-90' : 'rotate-0 scale-100'}`
    : 'w-12 h-12 flex items-center justify-center bg-amber-500 transition-all duration-500 rounded-full'; // Force rounded-full

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-300">
      
      {/* System Marquee - Hides on Scroll */}
      <div className={`fixed top-0 w-full bg-amber-500 text-black text-[9px] font-mono font-bold uppercase py-1 overflow-hidden z-[40] transition-transform duration-500 ${scrolled ? '-translate-y-full' : 'translate-y-0'}`}>
         <div className="animate-marquee whitespace-nowrap flex gap-8">
            <span>System v2.1 Online</span>
            <span>///</span>
            <span>Free Shipping {'>'} 500K</span>
            <span>///</span>
            <span>30-Day Returns</span>
            <span>///</span>
            <span>Engineered in Vietnam</span>
         </div>
      </div>

      {/* REACTIVE NAVIGATION */}
      <div 
        className={navContainerClasses}
        onMouseEnter={() => setNavHovered(true)}
        onMouseLeave={() => setNavHovered(false)}
      >
        <div className={`flex items-center ${scrolled ? '' : 'max-w-[1920px] mx-auto px-4 sm:px-8 justify-between'}`}>
          
          <div className="flex items-center">
             {/* Atomic Logo */}
            <Link to="/" className="group/logo relative z-50">
              <div className={logoWrapperClasses}>
                 <span className="font-display font-bold text-black text-xl relative z-10 transition-transform duration-500">El.</span>
                 
                 {/* Atomic Orbit Animations - Always Active */}
                 <div className="absolute inset-0 rounded-full border border-black/20 dark:border-white/20 animate-spin-slow"></div>
                 <div className="absolute inset-0 rounded-full animate-orbit pointer-events-none">
                    <div className="w-1.5 h-1.5 bg-black dark:bg-white rounded-full"></div>
                 </div>
                 <div className="absolute inset-0 rounded-full animate-orbit-reverse pointer-events-none">
                    <div className="w-1 h-1 bg-white dark:bg-black rounded-full translate-x-3"></div>
                 </div>
              </div>
            </Link>

            {/* Menu Items (Collapsible / Atomic Dispersion) */}
            {/* When not scrolled: static list. When scrolled: only show on hover with fly-out effect */}
            {scrolled ? (
               <div className="flex items-center overflow-hidden h-16">
                 {/* Items fly out when hovered */}
                 <div className={`flex items-center gap-6 ml-4 transition-all duration-500 ${navHovered ? 'opacity-100 translate-x-0 blur-0' : 'opacity-0 -translate-x-full blur-sm pointer-events-none'}`}>
                    <Link to="/shop" className="font-mono text-xs font-bold tracking-widest uppercase hover:text-amber-500 transition-colors whitespace-nowrap delay-[50ms]">Sản Phẩm</Link>
                    <Link to="/about" className="font-mono text-xs font-bold tracking-widest uppercase hover:text-amber-500 transition-colors whitespace-nowrap delay-[100ms]">Phòng Lab</Link>
                    <button onClick={() => setLoginOpen(true)} className="font-mono text-xs font-bold tracking-widest uppercase hover:text-amber-500 transition-colors whitespace-nowrap delay-[150ms]">Tài khoản</button>
                    
                    {/* Inline Actions when Expanded */}
                    <div className="w-[1px] h-4 bg-concrete-300 dark:bg-concrete-700 mx-2"></div>
                    <button onClick={toggleTheme} className="hover:text-amber-500"><Sun size={16} /></button>
                    <button onClick={() => setCartIsOpen(true)} className="hover:text-amber-500 relative">
                      <ShoppingBag size={16} />
                      {cart.length > 0 && <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>}
                    </button>
                 </div>
               </div>
            ) : (
               <div className="hidden md:flex items-center gap-12 ml-12">
                   <Link to="/shop" className="font-mono text-xs font-bold tracking-widest uppercase hover:text-amber-500 transition-colors whitespace-nowrap">Sản Phẩm</Link>
                   <Link to="/about" className="font-mono text-xs font-bold tracking-widest uppercase hover:text-amber-500 transition-colors whitespace-nowrap">Phòng Lab</Link>
                   <button onClick={() => setLoginOpen(true)} className="font-mono text-xs font-bold tracking-widest uppercase hover:text-amber-500 transition-colors whitespace-nowrap">Tài khoản</button>
               </div>
            )}
          </div>

          {/* Right Actions (Standard Layout - Only visible when NOT scrolled) */}
          {!scrolled && (
            <div className="flex items-center gap-6">
              <button onClick={toggleTheme} className="hover:text-amber-500 transition-colors">
                {isDarkMode ? <Sun size={20} strokeWidth={1.5} /> : <Moon size={20} strokeWidth={1.5} />}
              </button>
              <button onClick={() => setLoginOpen(true)} className="hidden sm:block hover:text-amber-500 transition-colors">
                <User size={20} strokeWidth={1.5} />
              </button>
              <button onClick={() => setCartIsOpen(true)} className="relative hover:text-amber-500 transition-colors">
                <ShoppingBag size={20} strokeWidth={1.5} />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-black text-[9px] font-bold font-mono flex items-center justify-center rounded-sm">
                    {cart.length}
                  </span>
                )}
              </button>
              <button className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
                <Menu size={24} strokeWidth={1.5} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Floating Cart Button when scrolled & nav NOT hovered (Quick Access) */}
      {scrolled && !navHovered && (
         <button 
           onClick={() => setCartIsOpen(true)}
           className="fixed top-6 right-6 z-40 w-12 h-12 bg-white dark:bg-concrete-900 border border-concrete-200 dark:border-concrete-800 rounded-full flex items-center justify-center shadow-lg hover:border-amber-500 transition-colors animate-bounce-in"
         >
            <ShoppingBag size={20} />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-amber-500 text-black text-[9px] font-bold rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
         </button>
      )}


      {/* Main Content */}
      <main className="flex-grow pt-0 w-full overflow-x-hidden">
        {children}
      </main>

      {/* Footer - Tech Spec Style */}
      <footer className="bg-concrete-50 dark:bg-concrete-950 border-t border-concrete-200 dark:border-concrete-800 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              <div className="space-y-4">
                 <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-amber-500"></div>
                    <div className="font-display font-black text-2xl text-black dark:text-white">ELEMENTA</div>
                 </div>
                 <p className="font-mono text-xs text-concrete-500">
                    Engineered in Vietnam.<br/>
                    Swiss-Tech Minimalism.<br/>
                    ISO Production Ready.
                 </p>
              </div>
              {/* Footer Links (Same as before) */}
              <div>
                 <h4 className="font-bold text-black dark:text-white mb-4 font-mono text-xs uppercase">Khám Phá</h4>
                 <ul className="space-y-2 text-sm text-concrete-600 dark:text-concrete-400 font-mono">
                    <li><Link to="/shop" className="hover:text-amber-500">Tất cả sản phẩm</Link></li>
                    <li><Link to="/shop?element=Ba" className="hover:text-amber-500">Dòng Base</Link></li>
                    <li><Link to="/shop?element=Sc" className="hover:text-amber-500">Dòng Scholar</Link></li>
                 </ul>
              </div>
               <div>
                 <h4 className="font-bold text-black dark:text-white mb-4 font-mono text-xs uppercase">Hỗ Trợ</h4>
                 <ul className="space-y-2 text-sm text-concrete-600 dark:text-concrete-400 font-mono">
                    <li><a href="#" className="hover:text-amber-500">Chính sách đổi trả</a></li>
                    <li><a href="#" className="hover:text-amber-500">Hướng dẫn chọn size</a></li>
                    <li><a href="#" className="hover:text-amber-500">Câu hỏi thường gặp</a></li>
                 </ul>
              </div>
              <div>
                 <h4 className="font-bold text-black dark:text-white mb-4 font-mono text-xs uppercase">Kết Nối</h4>
                 <div className="flex gap-2">
                    <input type="email" placeholder="Email nhận tin" className="bg-concrete-100 dark:bg-concrete-900 border border-concrete-300 dark:border-concrete-700 px-3 py-2 text-xs font-mono w-full focus:outline-none focus:border-amber-500 text-black dark:text-white" />
                    <button className="bg-amber-500 text-black px-3 font-bold hover:bg-amber-400"><ArrowRight size={14}/></button>
                 </div>
              </div>
           </div>
           <div className="pt-8 border-t border-concrete-200 dark:border-concrete-800 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-[10px] font-mono text-concrete-500 uppercase">© 2026 Elementa Corp. All Rights Reserved.</p>
              <div className="flex gap-4">
                 <div className="w-8 h-5 bg-concrete-200 dark:bg-concrete-800 rounded-sm"></div>
                 <div className="w-8 h-5 bg-concrete-200 dark:bg-concrete-800 rounded-sm"></div>
              </div>
           </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      <div 
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          cartIsOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setCartIsOpen(false)}
      >
        <div 
          className={`absolute top-0 right-0 h-full w-full max-w-md bg-white dark:bg-concrete-950 shadow-2xl transform transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) flex flex-col border-l border-concrete-200 dark:border-concrete-800 ${
            cartIsOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
           <div className="p-6 border-b border-concrete-200 dark:border-concrete-800 flex justify-between items-center bg-concrete-50 dark:bg-concrete-900">
             <h2 className="font-mono font-bold text-sm tracking-widest uppercase text-black dark:text-white">Giỏ Hàng ({cart.length})</h2>
             <button onClick={() => setCartIsOpen(false)} className="text-black dark:text-white hover:text-amber-500"><X size={20} /></button>
           </div>
           
           <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white dark:bg-concrete-950">
             {cart.length === 0 ? (
               <div className="h-full flex flex-col items-center justify-center text-concrete-400 font-mono space-y-4">
                 <ShoppingBag size={48} strokeWidth={1} className="opacity-20 text-black dark:text-white" />
                 <p className="text-xs">CHƯA CÓ SẢN PHẨM</p>
                 <button onClick={() => setCartIsOpen(false)} className="text-amber-500 underline text-xs">TIẾP TỤC MUA SẮM</button>
               </div>
             ) : (
                cart.map((item, idx) => (
                   <div key={`${item.id}-${idx}`} className="flex gap-4">
                      <div className="w-20 h-24 bg-concrete-100 dark:bg-concrete-800">
                         <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                         <div className="flex justify-between items-start">
                            <h3 className="font-display font-bold text-sm text-black dark:text-white uppercase">{item.name}</h3>
                            <button onClick={() => removeFromCart(item.id)} className="text-concrete-400 hover:text-red-500"><Trash2 size={14} /></button>
                         </div>
                         <p className="font-mono text-[10px] text-amber-500 mb-1">[{item.element}] SERIES</p>
                         <p className="font-mono text-[10px] text-concrete-500">Size: {item.selectedSize} | Màu: {item.selectedColor}</p>
                         <div className="flex justify-between items-center mt-4">
                            <span className="font-mono text-xs text-black dark:text-white">x{item.quantity}</span>
                            <span className="font-mono font-bold text-sm text-black dark:text-white">₫{(item.price * item.quantity).toLocaleString()}</span>
                         </div>
                      </div>
                   </div>
                ))
             )}
           </div>

           <div className="p-6 border-t border-concrete-200 dark:border-concrete-800 bg-concrete-50 dark:bg-concrete-900">
              <div className="flex justify-between items-center mb-6">
                 <span className="font-mono text-xs font-bold text-concrete-500 uppercase">Tổng cộng</span>
                 <span className="font-display font-bold text-xl text-amber-500">₫{cartTotal.toLocaleString()}</span>
              </div>
              <button className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-amber-500 dark:hover:bg-amber-500 hover:text-black transition-all py-4 font-mono font-bold uppercase tracking-widest text-xs flex justify-center items-center gap-2">
                 Thanh Toán Ngay <ArrowRight size={14}/>
              </button>
           </div>
        </div>
      </div>

      {/* Login Modal */}
      {loginOpen && (
        <div className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setLoginOpen(false)}>
           <div className="w-full max-w-md bg-white dark:bg-concrete-950 border border-concrete-200 dark:border-concrete-800 p-8 shadow-2xl relative" onClick={e => e.stopPropagation()}>
              <button onClick={() => setLoginOpen(false)} className="absolute top-4 right-4 text-concrete-500 hover:text-black dark:hover:text-white"><X size={20}/></button>
              <div className="mb-8">
                 <h2 className="font-display font-black text-3xl uppercase text-black dark:text-white mb-2">Đăng Nhập</h2>
                 <p className="font-mono text-xs text-concrete-500">Truy cập vào hệ thống dữ liệu khách hàng.</p>
              </div>
              <div className="space-y-4">
                 <input type="email" placeholder="EMAIL" className="w-full bg-concrete-100 dark:bg-concrete-900 border border-concrete-300 dark:border-concrete-700 p-3 font-mono text-sm focus:border-amber-500 outline-none text-black dark:text-white" />
                 <input type="password" placeholder="PASSWORD" className="w-full bg-concrete-100 dark:bg-concrete-900 border border-concrete-300 dark:border-concrete-700 p-3 font-mono text-sm focus:border-amber-500 outline-none text-black dark:text-white" />
                 <button className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-amber-500 dark:hover:bg-amber-500 py-3 font-mono font-bold uppercase transition-colors">Truy Cập</button>
              </div>
           </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[55] bg-white dark:bg-concrete-950 transition-transform duration-300 md:hidden flex flex-col ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
         <div className="p-6 flex justify-between items-center border-b border-concrete-200 dark:border-concrete-800">
            <span className="font-display font-bold text-xl text-black dark:text-white">MENU</span>
            <button onClick={() => setMobileMenuOpen(false)} className="text-black dark:text-white"><X /></button>
         </div>
         <div className="p-8 flex flex-col gap-6">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-display font-bold text-black dark:text-white">TRANG CHỦ</Link>
            <Link to="/shop" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-display font-bold text-black dark:text-white">CỬA HÀNG</Link>
            <button onClick={() => { setMobileMenuOpen(false); setLoginOpen(true); }} className="text-left text-2xl font-display font-bold text-black dark:text-white">ĐĂNG NHẬP</button>
         </div>
      </div>

    </div>
  );
};