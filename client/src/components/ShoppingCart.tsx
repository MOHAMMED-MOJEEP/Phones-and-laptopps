

import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Product } from '@/data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface ShoppingCartProps {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export default function ShoppingCart({
  items,
  isOpen,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: ShoppingCartProps) {
  // حساب الإجمالي
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const itemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  if (!isOpen) return null;

  return (
    <>
      {/* الخلفية الشفافة (Backdrop Blur) */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-500 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* لوحة السلة */}
      <div 
        className={`fixed right-0 top-0 bottom-0 w-full sm:w-[400px] bg-white/95 backdrop-blur-xl shadow-2xl z-50 flex flex-col transition-transform duration-500 ease-out border-l border-border/50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* الرأس */}
        <div className="border-b border-border/50 p-4 sm:p-6 flex items-center justify-between bg-muted/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight" style={{ fontFamily: 'Playfair Display' }}>
              سلة المشتريات
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-destructive/10 hover:text-destructive rounded-full transition-colors duration-300"
            aria-label="إغلاق السلة"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* قائمة المنتجات */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center opacity-70 animate-in fade-in duration-500">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6 shadow-inner">
                <ShoppingBag className="w-10 h-10 text-muted-foreground" />
              </div>
              <p className="text-xl font-bold text-foreground mb-2">السلة فارغة حالياً</p>
              <p className="text-sm text-muted-foreground max-w-[200px]">اكتشف منتجاتنا الرائعة وأضفها إلى سلتك لتبدأ عملية الشراء</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, index) => (
                <div 
                  key={item.product.id} 
                  className="cart-item group bg-white border border-border/50 rounded-2xl p-3 flex flex-row items-center gap-4 hover:border-primary/30 hover:shadow-md transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* صورة المنتج */}
                  <div className="w-20 h-20 bg-muted/50 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center p-2 relative group-hover:bg-primary/5 transition-colors">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 mix-blend-multiply"
                    />
                  </div>
                  
                  {/* معلومات المنتج */}
                  <div className="flex-1 min-w-0 py-1">
                    <h3 className="font-bold text-sm text-foreground line-clamp-2 leading-tight mb-1 group-hover:text-primary transition-colors">
                      {item.product.name}
                    </h3>
                    <p className="text-primary font-bold text-sm">
                      {item.product.price.toLocaleString('ar-SA')} <span className="text-xs">ر.س</span>
                    </p>
                  </div>

                  {/* التحكم في الكمية والحذف */}
                  <div className="flex flex-col items-end gap-2">
                    {/* زر الحذف */}
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                      aria-label="حذف المنتج"
                    >
                      <X size={16} />
                    </button>

                    {/* أزرار الكمية */}
                    <div className="flex items-center bg-muted/50 rounded-lg p-1 border border-border/50">
                      <button
                        onClick={() =>
                          onUpdateQuantity(
                            item.product.id,
                            Math.max(0, item.quantity - 1)
                          )
                        }
                        className="w-6 h-6 flex items-center justify-center hover:bg-white rounded shadow-sm transition-colors text-foreground"
                        aria-label="تقليل الكمية"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center font-bold text-sm text-foreground">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="w-6 h-6 flex items-center justify-center hover:bg-white rounded shadow-sm transition-colors text-foreground"
                        aria-label="زيادة الكمية"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* الملخص والأزرار */}
        {items.length > 0 && (
          <div className="border-t border-border/50 p-4 sm:p-6 bg-muted/10 backdrop-blur-sm animate-in slide-in-from-bottom-10 duration-500">
            {/* ملخص الأسعار */}
            <div className="space-y-3 mb-6 bg-white p-4 rounded-2xl border border-border/50 shadow-sm">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground font-medium">عدد المنتجات</span>
                <span className="font-bold text-foreground bg-muted px-2 py-0.5 rounded-md">{itemsCount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground font-medium">المجموع الفرعي</span>
                <span className="font-bold text-foreground">
                  {total.toLocaleString('ar-SA')} ر.س
                </span>
              </div>
              <div className="border-t border-dashed border-border pt-3 mt-1 flex justify-between items-center">
                <span className="font-bold text-foreground">الإجمالي الكلي</span>
                <span className="text-xl font-extrabold text-primary">
                  {total.toLocaleString('ar-SA')} <span className="text-sm font-bold text-primary/80">ر.س</span>
                </span>
              </div>
            </div>

            {/* الأزرار */}
            <div className="flex flex-col gap-3">
              <button
                onClick={onCheckout}
                className="w-full btn-primary py-3.5 shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group"
              >
                <span>متابعة الدفع</span>
                <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </button>
              <button
                onClick={onClose}
                className="w-full py-3 text-sm font-bold text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-xl transition-all"
              >
                الاستمرار في التسوق
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
