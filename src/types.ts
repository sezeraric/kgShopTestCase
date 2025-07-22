export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface NavigationProps {
  navigation: any;
  route: any;
}

export interface ToastProps {
  text1?: string;
  text2?: string;
}

export interface StepperProps {
  steps: string[];
  currentStep: number;
}

export interface CartItemCardProps {
  item: CartItem;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
  onPress: () => void;
}

export interface StickyButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
} 