// Основные типы для приложения

export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    role: 'customer' | 'doctor' | 'admin';
    preferences?: UserPreferences;
  }
  
  export interface UserPreferences {
    language: 'uk' | 'en' | 'ru';
    currency: 'UAH' | 'USD' | 'EUR';
    notifications: {
      email: boolean;
      push: boolean;
      sms: boolean;
    };
  }
  
  export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    currency: string;
    images: string[];
    category: ProductCategory;
    brand: string;
    inStock: boolean;
    stockCount: number;
    rating: number;
    reviewCount: number;
    specifications: Record<string, string>;
    tags: string[];
    isNew?: boolean;
    isBestseller?: boolean;
    discount?: number;
  }
  
  export interface ProductCategory {
    id: string;
    name: string;
    slug: string;
    description: string;
    icon: string;
    image: string;
    parentId?: string;
    children?: ProductCategory[];
    productCount: number;
  }
  
  export interface CartItem {
    productId: string;
    product: Product;
    quantity: number;
    selectedOptions?: Record<string, string>;
    addedAt: Date;
  }
  
  export interface SearchSuggestion {
    id: string;
    text: string;
    type: 'product' | 'category' | 'brand' | 'term';
    image?: string;
    url: string;
    priority: number;
  }
  
  export interface NavigationItem {
    id: string;
    label: string;
    href: string;
    icon?: string;
    children?: NavigationItem[];
    badge?: string;
    isNew?: boolean;
    description?: string;
  }
  
  export interface HeaderState {
    isSearchOpen: boolean;
    isCartOpen: boolean;
    isUserMenuOpen: boolean;
    isMobileMenuOpen: boolean;
    searchQuery: string;
    searchSuggestions: SearchSuggestion[];
    isSearching: boolean;
  }
  
  // API Response types
  export interface ApiResponse<T> {
    data: T;
    success: boolean;
    message?: string;
    meta?: {
      total: number;
      page: number;
      limit: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  }
  
  export interface SearchResponse {
    products: Product[];
    categories: ProductCategory[];
    suggestions: SearchSuggestion[];
    total: number;
  }
  
  // Component Props types
  export interface BaseComponentProps {
    className?: string;
    children?: React.ReactNode;
  }
  
  export interface ButtonProps extends BaseComponentProps {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'medical';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    disabled?: boolean;
    loading?: boolean;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
  }
  
  export interface InputProps extends BaseComponentProps {
    type?: string;
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
    error?: string;
    icon?: React.ReactNode;
    size?: 'sm' | 'md' | 'lg';
  }
  
  // Animation types
  export interface AnimationConfig {
    initial?: Record<string, any>;
    animate?: Record<string, any>;
    exit?: Record<string, any>;
    transition?: Record<string, any>;
  }
  
  // Store types (для Zustand)
  export interface CartStore {
    items: CartItem[];
    isOpen: boolean;
    totalItems: number;
    totalPrice: number;
    addItem: (product: Product, quantity?: number) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    toggleCart: () => void;
  }
  
  export interface SearchStore {
    query: string;
    suggestions: SearchSuggestion[];
    isOpen: boolean;
    isLoading: boolean;
    recentSearches: string[];
    setQuery: (query: string) => void;
    setSuggestions: (suggestions: SearchSuggestion[]) => void;
    addRecentSearch: (query: string) => void;
    clearRecentSearches: () => void;
    toggleSearch: () => void;
  }
  
  export interface AuthStore {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (userData: Partial<User>) => Promise<void>;
    updateProfile: (userData: Partial<User>) => Promise<void>;
  }