
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Search, Filter, AlertCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import ShoppingCart, { CartItem } from '@/components/ShoppingCart';
import CheckoutPage, { CheckoutData } from '@/components/CheckoutPage';
import { products, Product, productManager } from '@/data/products';

export default function Home() {
  // ============================================
  // حالة التطبيق (State Management)
  // ============================================
  
  // حالة السلة
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // حالة الفلترة والبحث
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'phone' | 'laptop'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high' | 'rating'>('name');

  // حالة النجاح للطلبات
  const [successMessage, setSuccessMessage] = useState('');

  // ============================================
  // خوارزميات التصفية والترتيب (مُحسنة باستخدام useMemo)
  // ============================================
  const filteredProducts = useMemo(() => {
    // 1. جلب المنتجات حسب الفئة المحددة (O(n))
    let result = productManager.getByCategory(selectedCategory);

    // 2. تطبيق خوارزمية البحث النصي إذا كان هناك استعلام
    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery)
      );
    }

    // 3. خوارزمية ترتيب البيانات
    // استخدام خوارزمية فرز محسنة (TimSort في محرك V8)
    const sortedResult = [...result];
    switch (sortBy) {
      case 'price-low':
        sortedResult.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sortedResult.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sortedResult.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
      default:
        sortedResult.sort((a, b) => a.name.localeCompare(b.name, 'ar'));
    }

    return sortedResult;
  }, [selectedCategory, searchQuery, sortBy]);

  // ============================================
  // دوال التعامل مع السلة (مُحسنة باستخدام useCallback)
  // ============================================
  
  // إضافة منتج إلى السلة
  const handleAddToCart = useCallback((product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  // تحديث كمية المنتج
  const handleUpdateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveItem(productId);
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.product.id === productId
            ? { ...item, quantity }
            : item
        )
      );
    }
  }, []);

  // حذف منتج من السلة
  const handleRemoveItem = useCallback((productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  }, []);

  // معالجة الدفع وإتمام الطلب
  const handleCheckout = useCallback((data: CheckoutData) => {
    // محاكاة إرسال البيانات إلى الخادم
    console.log('بيانات الدفع:', data);
    
    // عرض رسالة النجاح
    setSuccessMessage(`✓ تم استقبال طلبك بنجاح! سيتم توصيله إلى ${data.address} في ${data.city}`);
    
    // إغلاق النوافذ
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    
    // مسح السلة بعد إتمام الطلب
    setCartItems([]);
    
    // إخفاء الرسالة التلقائي بعد 5 ثوان
    setTimeout(() => setSuccessMessage(''), 5000);
  }, []);

  // حساب إجمالي عدد المنتجات باستخدام reduce
  const cartCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* الرأس */}
      <Header cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />

      {/* المحتوى الرئيسي */}
      <main className="flex-1">
        {/* قسم البطل (Hero) - مع فيديو خلفي */}
        <section className="relative h-screen min-h-[600px]; overflow-hidden flex items-center justify-center">
          {/* صورة الخلفية */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 animate-slow-pan"
            style={{
              backgroundImage: 'url(images/image.png)',
            }}
          >
            {/* تدرج علوي */}
            <div className="absolute inset-0 bg-gradient-to-b; from-[#1E3A5F]/90 via-[#1E3A5F]/70 to-background/90 backdrop-blur-[2px]" />
          </div>

          {/* المحتوى */}
          <div className="relative z-10 text-center text-white px-4 container mx-auto flex flex-col items-center">
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-secondary/30 bg-secondary/10 backdrop-blur-sm text-secondary font-medium text-sm tracking-widest uppercase animate-fade-in-up">
              مرحباً بك في عالم التقنية الفاخرة
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 tracking-tight animate-fade-in-up animation-delay-100" style={{ fontFamily: 'Playfair Display' }}>
              <span className=" from-white to-white/70">متجر باريس</span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-gray-200 max-w-2xl mx-auto font-light leading-relaxed animate-fade-in-up animation-delay-200">
              أحدث الهواتف والابتوبات بأفضل الأسعار والجودة العالية. اكتشف تشكيلتنا الحصرية الآن.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-300">
              <button
                onClick={() => {
                  const section = document.getElementById('products');
                  section?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-primary text-lg px-8 py-4"
              >
                تصفح المنتجات
              </button>
              <button
                onClick={() => {
                  const section = document.getElementById('features');
                  section?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-outline border-white/30 text-white hover:bg-white hover:text-primary text-lg px-8 py-4 backdrop-blur-sm"
              >
                تعرف علينا أكثر
              </button>
            </div>
          </div>
          
          {/* مؤشر التمرير لأسفل */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center opacity-70">
            <span className="text-white text-xs mb-2 tracking-widest uppercase">اكتشف</span>
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
              <div className="w-1 h-2 bg-secondary rounded-full animate-scroll-down"></div>
            </div>
          </div>
        </section>

        {/* رسالة النجاح */}
        {successMessage && (
          <div className="bg-green-50 border-b-4 border-green-500 p-4 text-center">
            <p className="text-green-700 font-semibold">{successMessage}</p>
          </div>
        )}

        {/* قسم المنتجات */}
        <section id="products" className="container py-12 md:py-20">
          {/* العنوان */}
          <div className="mb-12">
            <h2 className="section-title">المنتجات المميزة</h2>
            <p className="text-muted-foreground mt-2">
              اختر من مجموعتنا الواسعة من الهواتف والابتوبات الحديثة
            </p>
          </div>

          {/* أدوات الفلترة والبحث */}
          <div className="bg-muted rounded-lg p-4 md:p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* البحث */}
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute right-3 top-3 text-muted-foreground" size={20} />
                  <input
                    type="text"
                    placeholder="ابحث عن منتج..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-bar pl-10"
                  />
                </div>
              </div>

              {/* الفئة */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as 'all' | 'phone' | 'laptop')}
                className="form-input"
              >
                <option value="all">جميع الفئات</option>
                <option value="phone">الهواتف</option>
                <option value="laptop">الابتوبات</option>
              </select>

              {/* الترتيب */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'price-low' | 'price-high' | 'rating')}
                className="form-input"
              >
                <option value="name">الترتيب: الاسم</option>
                <option value="price-low">السعر: من الأقل</option>
                <option value="price-high">السعر: من الأعلى</option>
                <option value="rating">التقييم: الأعلى</option>
              </select>
            </div>
          </div>

          {/* عدد النتائج */}
          <div className="mb-6 text-sm text-muted-foreground">
            تم العثور على <span className="font-bold text-foreground">{filteredProducts.length}</span> منتج
          </div>

          {/* شبكة المنتجات */}
          {filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map(product => {
                const cartItem = cartItems.find(item => item.product.id === product.id);
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    quantity={cartItem?.quantity || 0}
                    onAddToCart={handleAddToCart}
                    onQuantityChange={(quantity) => handleUpdateQuantity(product.id, quantity)}
                    isInCart={!!cartItem}
                  />
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-lg text-muted-foreground">لم يتم العثور على منتجات</p>
              <p className="text-sm text-muted-foreground mt-2">حاول تغيير معايير البحث</p>
            </div>
          )}
        </section>

        {/* قسم المميزات */}
        <section id="features" className="bg-muted py-12 md:py-16">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚚</span>
                </div>
                <h3 className="font-bold text-lg mb-2">توصيل سريع</h3>
                <p className="text-muted-foreground">توصيل مجاني لجميع الطلبات في اليمن</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="font-bold text-lg mb-2">آمن وموثوق</h3>
                <p className="text-muted-foreground">توصيل موثوقيه</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💯</span>
                </div>
                <h3 className="font-bold text-lg mb-2">ضمان 100%</h3>
                <p className="text-muted-foreground">ضمان الرضا أو استرجاع كامل المبلغ</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* الفوتر */}
      <Footer />

      {/* سلة المشتريات */}
      <ShoppingCart
        items={cartItems}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* صفحة الدفع */}
      <CheckoutPage
        items={cartItems}
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onSubmit={handleCheckout}
      />
    </div>
  );
}
