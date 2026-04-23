'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart, Check, Zap } from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';
import { useState } from 'react';
import { useCartStore } from '@/lib/cart-store';

interface ProductCardProps {
  id: string;
  title: string;
  category: string;
  originalPrice: number;
  salePrice: number;
  discount_percentage?: number; // From DB
  discount?: number; // Legacy/Fallback
  thumbnail1: string;
  thumbnail2?: string;
  rating: number;
}

const ProductCard = ({
  id,
  title,
  category,
  originalPrice,
  salePrice,
  discount_percentage,
  discount,
  thumbnail1,
  thumbnail2,
  rating
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem, isInCart } = useCartStore();
  const inCart = isInCart(id);
  const displayDiscount = discount_percentage || discount || Math.round(((originalPrice - salePrice) / originalPrice) * 100);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({ id, title, salePrice, originalPrice, thumbnail1, category });
  };

  return (
    <div 
      className="group relative bg-white rounded-3xl overflow-hidden flex flex-col h-full transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-transparent hover:border-primary/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <Link href={`/product/${id}`} className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={thumbnail1}
          alt={title}
          fill
          className={cn(
            "object-cover transition-all duration-700 ease-in-out group-hover:scale-110",
            isHovered && thumbnail2 ? "opacity-0" : "opacity-100"
          )}
        />
        {thumbnail2 && (
          <Image
            src={thumbnail2}
            alt={title}
            fill
            className={cn(
              "object-cover transition-all duration-700 ease-in-out group-hover:scale-110",
              isHovered ? "opacity-100" : "opacity-0"
            )}
          />
        )}
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
           <div className="bg-primary text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-xl shadow-primary/20 flex items-center gap-1 uppercase tracking-tighter">
             <Zap size={10} className="fill-white" />
             {displayDiscount}% OFF
           </div>
        </div>

        {category === 'Hot' && (
          <div className="absolute top-4 right-4 bg-red-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-xl shadow-red-500/20 animate-pulse">
            HOT
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/5 px-2.5 py-1 rounded-full">
            {category}
          </span>
          <div className="flex items-center gap-1 text-accent">
            <Star size={12} fill="currentColor" />
            <span className="text-xs font-bold">{rating ? rating.toFixed(1) : '5.0'}</span>
          </div>
        </div>

        <Link href={`/product/${id}`} className="block mb-4">
          <h3 className="font-bold text-base line-clamp-2 leading-tight group-hover:text-primary transition-colors">
            {title}
          </h3>
        </Link>

        <div className="mt-auto pt-5 border-t border-border/50 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-muted-foreground line-through font-medium">
              {formatCurrency(originalPrice)}
            </span>
            <span className="text-xl font-black text-foreground tracking-tight">
              {formatCurrency(salePrice)}
            </span>
          </div>
          
          <button
            onClick={handleAddToCart}
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
              inCart
                ? "bg-green-500 text-white shadow-lg shadow-green-500/20"
                : "bg-muted text-foreground hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/20"
            )}
            title={inCart ? 'In Cart' : 'Add to Cart'}
          >
            {inCart ? <Check size={18} /> : <ShoppingCart size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
