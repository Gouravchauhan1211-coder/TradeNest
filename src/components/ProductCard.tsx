'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart, Check } from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';
import { useState } from 'react';
import { useCartStore } from '@/lib/cart-store';

interface ProductCardProps {
  id: string;
  title: string;
  category: string;
  originalPrice: number;
  salePrice: number;
  discount: number;
  thumbnail1: string;
  thumbnail2: string;
  rating: number;
}

const ProductCard = ({
  id,
  title,
  category,
  originalPrice,
  salePrice,
  discount,
  thumbnail1,
  thumbnail2,
  rating
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem, isInCart } = useCartStore();
  const inCart = isInCart(id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({ id, title, salePrice, originalPrice, thumbnail1, category });
  };

  return (
    <div 
      className="group glass-card rounded-xl overflow-hidden flex flex-col h-full"
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
            isHovered ? "opacity-0" : "opacity-100"
          )}
        />
        <Image
          src={thumbnail2}
          alt={title}
          fill
          className={cn(
            "object-cover transition-all duration-700 ease-in-out group-hover:scale-110",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        />
        
        {/* Discount Badge */}
        <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg">
          -{discount}%
        </div>

        {/* Hot Label for specific categories */}
        {category === 'Hot' && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg animate-pulse">
            HOT
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded">
            {category}
          </span>
          <div className="flex items-center gap-1 text-accent">
            <Star size={12} fill="currentColor" />
            <span className="text-xs font-medium">{rating.toFixed(1)}</span>
          </div>
        </div>

        <Link href={`/product/${id}`} className="block group-hover:text-primary transition-colors mb-3">
          <h3 className="font-semibold text-sm line-clamp-2 leading-snug">{title}</h3>
        </Link>

        <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-muted-foreground line-through">
              {formatCurrency(originalPrice)}
            </span>
            <span className="text-lg font-bold text-foreground">
              {formatCurrency(salePrice)}
            </span>
          </div>
          
          <button
            onClick={handleAddToCart}
            className={cn(
              "p-2.5 rounded-lg transition-all active:scale-90",
              inCart
                ? "bg-green-500/10 text-green-600 cursor-default"
                : "glass hover:bg-primary hover:text-white"
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
