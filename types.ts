export interface Product {
  id: string;
  name: string;
  price: number;
  element: 'Ba' | 'Sc' | 'Ki' | 'Hm';
  category: string;
  image: string;
  description: string;
  techSpecs: {
    fabric: string;
    weight: string;
    weave: string;
    origin: string;
  };
  inStock: boolean;
  isNew?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface FilterState {
  category: string | null;
  element: string | null;
  minPrice: number;
  maxPrice: number;
}