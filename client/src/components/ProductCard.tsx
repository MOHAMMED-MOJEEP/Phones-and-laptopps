/**
 * مكون بطاقة المنتج
 * عرض منتج واحد مع الصورة والسعر والتقييم
 * 
 * التصميم: Modern Luxury Tech Minimalism
 * - ظلال ناعمة عند التمرير
 * - تأثير الرفع (lift effect)
 * - عرض واضح للسعر والخصم
 */

import { Star, Plus, Minus } from 'lucide-react';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
  quantity?: number;
  onAddToCart?: (product: Product) => void;
  onQuantityChange?: (quantity: number) => void;
  isInCart?: boolean;
}

export default function ProductCard({
  product,
  quantity = 0,
  onAddToCart,
  onQuantityChange,
  isInCart = false,
}: ProductCardProps) {
  // حساب نسبة الخصم
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="product-card group">
      {/* صورة المنتج */}
      <div className="relative overflow-hidden bg-muted h-64 sm:h-72 p-6 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-10 pointer-events-none"></div>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out z-0 mix-blend-multiply"
        />
        
        {/* شارة الخصم */}
        {discountPercent > 0 && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold z-20 shadow-lg shadow-red-500/30 animate-pulse">
            -{discountPercent}%
          </div>
        )}

        {/* شارة المخزون */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-white font-bold text-lg">غير متوفر</span>
          </div>
        )}
      </div>

      {/* معلومات المنتج */}
      <div className="p-4 sm:p-5">
        {/* اسم المنتج */}
        <h3 className="text-base sm:text-lg font-bold text-foreground mb-2 line-clamp-2 hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* الوصف */}
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* التقييم */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.floor(product.rating) ? 'fill-secondary text-secondary' : 'text-muted-foreground'}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.reviews} تقييم)
          </span>
        </div>

        {/* السعر */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl sm:text-2xl font-bold text-primary">
            {product.price.toLocaleString('ar-SA')} ر.س
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {product.originalPrice.toLocaleString('ar-SA')} ر.س
            </span>
          )}
        </div>

        {/* الأزرار */}
        {isInCart ? (
          <div className="flex items-center gap-2 bg-muted rounded-lg p-2">
            <button
              onClick={() => onQuantityChange?.(Math.max(0, quantity - 1))}
              className="flex-1 p-2 hover:bg-white rounded transition-colors"
              aria-label="تقليل الكمية"
            >
              <Minus size={16} className="mx-auto text-foreground" />
            </button>
            <span className="flex-1 text-center font-bold text-foreground">
              {quantity}
            </span>
            <button
              onClick={() => onQuantityChange?.(quantity + 1)}
              className="flex-1 p-2 hover:bg-white rounded transition-colors"
              aria-label="زيادة الكمية"
            >
              <Plus size={16} className="mx-auto text-foreground" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => onAddToCart?.(product)}
            disabled={!product.inStock}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {product.inStock ? 'أضف إلى السلة' : 'غير متوفر'}
          </button>
        )}
      </div>
    </div>
  );
}
