import { Product } from './types';

export const ELEMENTS = {
  Ba: { 
    code: 'Ba', 
    name: 'Base', 
    full: 'Cốt Lõi Hàng Ngày', 
    color: 'text-gray-400', 
    desc: 'Nền tảng thiết yếu.',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1964&auto=format&fit=crop'
  },
  Sc: { 
    code: 'Sc', 
    name: 'Scholar', 
    full: 'Học Thuật / Công Sở', 
    color: 'text-blue-400', 
    desc: 'Sự tập trung tối đa.',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=2070&auto=format&fit=crop'
  },
  Ki: { 
    code: 'Ki', 
    name: 'Kinetic', 
    full: 'Vận Động / Hiệu Suất', 
    color: 'text-red-400', 
    desc: 'Khí động học.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop'
  },
  Hm: { 
    code: 'Hm', 
    name: 'Home', 
    full: 'Phục Hồi / Tại Gia', 
    color: 'text-green-400', 
    desc: 'Trạng thái không trọng lực.',
    image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=1974&auto=format&fit=crop'
  },
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Áo Thun The Lab [Ba]',
    price: 289000,
    element: 'Ba',
    category: 'Áo Thun',
    // Asian model, white t-shirt, clean studio
    image: 'https://images.unsplash.com/photo-1618517351616-38fb9c5210c6?q=80&w=1887&auto=format&fit=crop',
    description: 'Chiếc áo giáp hàng ngày (The Daily Armor). Cấu trúc vững chãi, che khuyết điểm. Phom Boxy Fit hiện đại, phù hợp với thể trạng người Việt.',
    techSpecs: {
      fabric: '100% Compact Cotton 2-Way',
      weight: '260 GSM (Dày dặn)',
      weave: 'Dệt trơn (Plain Weave)',
      origin: 'Vietnam Lab A1'
    },
    inStock: true,
    isNew: true
  },
  {
    id: '2',
    name: 'Polo Ẩn Hidden [Sc]',
    price: 349000,
    element: 'Sc',
    category: 'Polo',
    // Asian model, smart polo
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c47e356?q=80&w=1887&auto=format&fit=crop',
    description: 'Định nghĩa lại đồng phục. Nẹp ẩn tinh tế (Hidden Placket). Cổ sơ mi ép keo đứng form 90 độ, mang lại vẻ lịch sự nơi công sở.',
    techSpecs: {
      fabric: 'CVC Pique (Cá sấu 65/35)',
      weight: '220 GSM',
      weave: 'Tổ ong (Honeycomb)',
      origin: 'Vietnam Lab B2'
    },
    inStock: true
  },
  {
    id: '3',
    name: 'Tank Top Velocity [Ki]',
    price: 250000,
    element: 'Ki',
    category: 'Đồ Thể Thao',
    // Asian model, gym/sport
    image: 'https://images.unsplash.com/photo-1583467875263-d50dec37a885?q=80&w=1887&auto=format&fit=crop',
    description: 'Khí động học (Aero-Dynamic). Siêu nhẹ, phản quang, thoát nhiệt tối đa với tấm lưới lưng. Dành cho runner và gym.',
    techSpecs: {
      fabric: '100% Poly Microfiber',
      weight: 'Siêu nhẹ',
      weave: 'Quick-dry Mesh',
      origin: 'Vietnam Lab C3'
    },
    inStock: true
  },
  {
    id: '4',
    name: 'Bộ Pyjama Recovery [Hm]',
    price: 890000,
    element: 'Hm',
    category: 'Đồ Mặc Nhà',
    // Asian context, relaxed
    image: 'https://images.unsplash.com/photo-1616847231686-3024c084e68e?q=80&w=1887&auto=format&fit=crop',
    description: 'Trạng thái Zero Gravity. Loại bỏ ma sát, phục hồi năng lượng sau ngày dài. Chất liệu Modal gỗ sồi mát lạnh.',
    techSpecs: {
      fabric: '95% Modal (Gỗ sồi)',
      weight: '300 GSM',
      weave: 'Terry Loop',
      origin: 'Vietnam Lab D4'
    },
    inStock: false
  },
  {
    id: '5',
    name: 'Sơ Mi The Air [Sc]',
    price: 550000,
    element: 'Sc',
    category: 'Sơ Mi',
    // Asian office style
    image: 'https://images.unsplash.com/photo-1563823263056-b08de72251a2?q=80&w=1887&auto=format&fit=crop',
    description: 'Sơ mi kỹ thuật dành cho người làm việc trí óc. Chống nhăn tuyệt đối, kháng khuẩn tự nhiên.',
    techSpecs: {
      fabric: 'Bamboo Fiber + Poly',
      weight: 'Nhẹ, Thoáng',
      weave: 'Poplin',
      origin: 'Vietnam Lab B2'
    },
    inStock: true
  }
];

export const SIZES = ['S', 'M', 'L', 'XL'];
export const COLORS = [
  { name: 'Lab White (Trắng Ngà)', hex: '#F4F4F4' },
  { name: 'Carbon Ink (Đen Than)', hex: '#111111' },
  { name: 'Hyperlink Blue (Xanh)', hex: '#0000FF' },
];