export interface Product {
  id: string;
  name: string;
  category: 'phone' | 'laptop';
  price: number;
  originalPrice?: number;
  description: string;
  specs: string[];
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
}

// ============================================
// خوارزميات وهياكل بيانات لإدارة المنتجات
// تم استخدام هيكل بيانات Map لتسريع عملية البحث عن المنتجات (O(1) complexity)
// ============================================
class ProductManager {
  private productsMap: Map<string, Product>;
  private productsList: Product[];

  constructor(products: Product[]) {
    this.productsList = products;
    this.productsMap = new Map();
    // بناء هيكل البيانات Map لتسريع الوصول
    products.forEach(product => {
      this.productsMap.set(product.id, product);
    });
  }

  // الحصول على جميع المنتجات
  getAll(): Product[] {
    return this.productsList;
  }

  // البحث عن منتج بواسطة المعرف بسرعة فائقة (O(1))
  getById(id: string): Product | undefined {
    return this.productsMap.get(id);
  }

  // جلب المنتجات حسب الفئة
  getByCategory(category: 'phone' | 'laptop' | 'all'): Product[] {
    if (category === 'all') return this.productsList;
    return this.productsList.filter(p => p.category === category);
  }

  // خوارزمية بحث متقدمة مع دعم البحث الجزئي
  search(query: string): Product[] {
    const lowerQuery = query.toLowerCase();
    return this.productsList.filter(
      p => p.name.toLowerCase().includes(lowerQuery) || p.description.toLowerCase().includes(lowerQuery)
    );
  }
}

export const products: Product[] = [
  // ============================================
  // الهواتف  (12 هاتف)
  // ============================================

  { id: 'phone-1', name: 'iPhone 15 Pro Max', category: 'phone', price: 4999, originalPrice: 5299, description: 'أحدث هاتف من Apple بشاشة Super Retina XDR وكاميرا احترافية بدقة 48 ميجابكسل', specs: ['شاشة 6.7 بوصة', 'معالج A17 Pro', 'كاميرا 48MP', 'بطارية 4685 mAh', 'شحن سريع 45W'], image: '/images/phone/1.jpg', rating: 4.9, reviews: 2340, inStock: true, },
  { id: 'phone-2', name: 'Samsung Galaxy S24 Ultra', category: 'phone', price: 4799, originalPrice: 5099, description: 'هاتف فلاجشيب من Samsung مع كاميرا 200MP وشاشة Dynamic AMOLED 2X', specs: ['شاشة 6.8 بوصة', 'معالج Snapdragon 8 Gen 3', 'كاميرا 200MP', 'بطارية 5000 mAh', 'شحن سريع 45W'], image: '/images/phone/2.jpg', rating: 4.8, reviews: 1890, inStock: true, },
  { id: 'phone-3', name: 'iPhone 15 Pro', category: 'phone', price: 3999, originalPrice: 4299, description: 'نسخة أصغر من iPhone 15 Pro مع نفس المواصفات الاحترافية', specs: ['شاشة 6.1 بوصة', 'معالج A17 Pro', 'كاميرا 48MP', 'بطارية 3349 mAh', 'شحن سريع 45W'], image: '/images/phone/3.jpg', rating: 4.8, reviews: 1950, inStock: true, },
  { id: 'phone-4', name: 'Samsung Galaxy S24', category: 'phone', price: 3599, originalPrice: 3899, description: 'نسخة معيارية من Galaxy S24 بمواصفات قوية وسعر مناسب', specs: ['شاشة 6.2 بوصة', 'معالج Snapdragon 8 Gen 3', 'كاميرا 50MP', 'بطارية 4000 mAh', 'شحن سريع 25W'], image: '/images/phone/4.jpg', rating: 4.7, reviews: 1650, inStock: true, },
  { id: 'phone-5', name: 'Google Pixel 8 Pro', category: 'phone', price: 3899, originalPrice: 4199, description: 'هاتف Google مع أفضل كاميرا ذكية وأداء AI متقدم', specs: ['شاشة 6.7 بوصة', 'معالج Tensor G3', 'كاميرا 50MP', 'بطارية 5050 mAh', 'شحن سريع 30W'], image: '/images/phone/5.jpg', rating: 4.8, reviews: 1420, inStock: true, },
  { id: 'phone-6', name: 'Google Pixel 8', category: 'phone', price: 2999, originalPrice: 3299, description: 'نسخة معيارية من Pixel 8 بكاميرا ذكية وسعر منخفض', specs: ['شاشة 6.2 بوصة', 'معالج Tensor G3', 'كاميرا 50MP', 'بطارية 4700 mAh', 'شحن سريع 30W'], image: '/images/phone/6.jpg', rating: 4.6, reviews: 980, inStock: true, },
  { id: 'phone-7', name: 'OnePlus 12', category: 'phone', price: 3299, originalPrice: 3599, description: 'هاتف سريع مع شاشة عالية الجودة وبطارية قوية', specs: ['شاشة 6.7 بوصة', 'معالج Snapdragon 8 Gen 3', 'كاميرا 50MP', 'بطارية 5400 mAh', 'شحن سريع 100W'], image: '/images/phone/7.jpg', rating: 4.7, reviews: 1210, inStock: true, },
  { id: 'phone-8', name: 'Samsung Galaxy A54', category: 'phone', price: 1999, originalPrice: 2299, description: 'هاتف متوسط الفئة من Samsung بسعر منخفض وأداء جيد', specs: ['شاشة 6.4 بوصة', 'معالج Exynos 1280', 'كاميرا 50MP', 'بطارية 5000 mAh', 'شحن سريع 25W'], image: '/images/phone/8.jpg', rating: 4.4, reviews: 890, inStock: true, },
  { id: 'phone-9', name: 'Xiaomi 14 Ultra', category: 'phone', price: 3799, originalPrice: 4099, description: 'هاتف Xiaomi بكاميرا احترافية وسعر تنافسي', specs: ['شاشة 6.73 بوصة', 'معالج Snapdragon 8 Gen 3', 'كاميرا 50MP', 'بطارية 5300 mAh', 'شحن سريع 90W'], image: '/images/phone/9.jpg', rating: 4.7, reviews: 1340, inStock: true, },
  { id: 'phone-10', name: 'Xiaomi Redmi Note 13', category: 'phone', price: 1299, originalPrice: 1599, description: 'هاتف اقتصادي من Xiaomi بمواصفات جيدة جداً', specs: ['شاشة 6.67 بوصة', 'معالج MediaTek Helio G99', 'كاميرا 50MP', 'بطارية 5000 mAh', 'شحن سريع 33W'], image: '/images/phone/10.jpg', rating: 4.3, reviews: 650, inStock: true, },
  { id: 'phone-11', name: 'Google Pixel 8 Pro', category: 'phone', price: 3899, originalPrice: 4199, description: 'هاتف Google مع أفضل كاميرا ذكية وأداء AI متقدم', specs: ['شاشة 6.7 بوصة', 'معالج Tensor G3', 'كاميرا 50MP', 'بطارية 5050 mAh', 'شحن سريع 30W'], image: '/images/phone/5.jpg', rating: 4.8, reviews: 1420, inStock: true, },
  { id: 'phone-12', name: 'Google Pixel 8', category: 'phone', price: 2999, originalPrice: 3299, description: 'نسخة معيارية من Pixel 8 بكاميرا ذكية وسعر منخفض', specs: ['شاشة 6.2 بوصة', 'معالج Tensor G3', 'كاميرا 50MP', 'بطارية 4700 mAh', 'شحن سريع 30W'], image: '/images/phone/6.jpg', rating: 4.6, reviews: 980, inStock: true, },

  // ============================================
  // الابتوبات (12 لابتوب)
  // ============================================

  { id: 'laptop-1', name: 'MacBook Pro 16" M3 Max', category: 'laptop', price: 9999, originalPrice: 10999, description: 'أقوى MacBook Pro مع معالج M3 Max وشاشة Liquid Retina XDR', specs: ['معالج M3 Max', 'ذاكرة 36GB', 'تخزين 1TB SSD', 'شاشة 16 بوصة', 'بطارية 25 ساعة'], image: '/images/laptop/1.jpg', rating: 4.9, reviews: 1850, inStock: true, },
  { id: 'laptop-2', name: 'MacBook Pro 14" M3', category: 'laptop', price: 7999, originalPrice: 8799, description: 'MacBook Pro 14 بوصة مع معالج M3 قوي', specs: ['معالج M3', 'ذاكرة 16GB', 'تخزين 512GB SSD', 'شاشة 14 بوصة', 'بطارية 18 ساعة'], image: '/images/laptop/2.jpg', rating: 4.8, reviews: 1620, inStock: true, },
  { id: 'laptop-3', name: 'MacBook Air M2', category: 'laptop', price: 4999, originalPrice: 5499, description: 'MacBook Air خفيف الوزن مع معالج M2', specs: ['معالج M2', 'ذاكرة 8GB', 'تخزين 256GB SSD', 'شاشة 13 بوصة', 'بطارية 15 ساعة'], image: '/images/laptop/3.jpg', rating: 4.7, reviews: 2100, inStock: true, },
  { id: 'laptop-4', name: 'Dell XPS 15', category: 'laptop', price: 5999, originalPrice: 6799, description: 'لابتوب Dell احترافي مع شاشة OLED عالية الجودة', specs: ['معالج Intel i7', 'ذاكرة 16GB', 'تخزين 512GB SSD', 'شاشة 15 بوصة OLED', 'بطارية 13 ساعة'], image: '/images/laptop/4.jpg', rating: 4.7, reviews: 1420, inStock: true, },
  { id: 'laptop-5', name: 'Dell XPS 13', category: 'laptop', price: 3999, originalPrice: 4499, description: 'لابتوب Dell محمول وخفيف مع شاشة صغيرة', specs: ['معالج Intel i5', 'ذاكرة 8GB', 'تخزين 512GB SSD', 'شاشة 13 بوصة', 'بطارية 12 ساعة'], image: '/images/laptop/5.jpg', rating: 4.6, reviews: 980, inStock: true, },
  { id: 'laptop-6', name: 'HP Spectre x360 16', category: 'laptop', price: 5499, originalPrice: 6199, description: 'لابتوب HP قابل للتحويل مع شاشة تاتش', specs: ['معالج Intel i7', 'ذاكرة 16GB', 'تخزين 512GB SSD', 'شاشة 16 بوصة تاتش', 'بطارية 13 ساعة'], image: '/images/laptop/6.jpg', rating: 4.6, reviews: 850, inStock: true, },
  { id: 'laptop-7', name: 'Lenovo ThinkPad X1 Carbon', category: 'laptop', price: 4499, originalPrice: 5099, description: 'لابتوب Lenovo احترافي للعمل والإنتاجية', specs: ['معالج Intel i7', 'ذاكرة 16GB', 'تخزين 512GB SSD', 'شاشة 14 بوصة', 'بطارية 15 ساعة'], image: '/images/laptop/7.jpg', rating: 4.7, reviews: 1200, inStock: true, },
  { id: 'laptop-8', name: 'ASUS ZenBook 14', category: 'laptop', price: 3299, originalPrice: 3799, description: 'لابتوب ASUS خفيف وأنيق بسعر منخفض', specs: ['معالج AMD Ryzen 5', 'ذاكرة 8GB', 'تخزين 512GB SSD', 'شاشة 14 بوصة', 'بطارية 13 ساعة'], image: '/images/laptop/8.jpg', rating: 4.5, reviews: 720, inStock: true, },
  { id: 'laptop-9', name: 'ASUS ROG Zephyrus G14', category: 'laptop', price: 6999, originalPrice: 7799, description: 'لابتوب ألعاب ASUS قوي وخفيف الوزن', specs: ['معالج Intel i9', 'ذاكرة 32GB', 'تخزين 1TB SSD', 'شاشة 14 بوصة 120Hz', 'بطارية 10 ساعات'], image: '/images/laptop/9.jpg', rating: 4.8, reviews: 1340, inStock: true, },
  { id: 'laptop-10', name: 'ASUS ProArt StudioBook', category: 'laptop', price: 7999, originalPrice: 8999, description: 'لابتوب احترافي للمصممين والفنانين', specs: ['معالج Intel i9', 'ذاكرة 32GB', 'تخزين 1TB SSD', 'شاشة 16 بوصة 4K', 'بطارية 12 ساعة'], image: '/images/laptop/10.jpg', rating: 4.8, reviews: 650, inStock: true, },
  { id: 'laptop-11', name: 'Dell Precision 5680', category: 'laptop', price: 8999, originalPrice: 9999, description: 'لابتوب احترافي من Dell للعمل الثقيل', specs: ['معالج Intel Xeon', 'ذاكرة 32GB', 'تخزين 1TB SSD', 'شاشة 16 بوصة 4K', 'بطارية 10 ساعات'], image: '/images/laptop/5.jpg', rating: 4.7, reviews: 520, inStock: true, },
  { id: 'laptop-12', name: 'HP Pavilion 15', category: 'laptop', price: 1999, originalPrice: 2399, description: 'لابتوب HP اقتصادي للاستخدام العام', specs: ['معالج AMD Ryzen 5', 'ذاكرة 8GB', 'تخزين 256GB SSD', 'شاشة 15 بوصة', 'بطارية 8 ساعات'], image: '/images/laptop/8.jpg', rating: 4.2, reviews: 450, inStock: true, },
];

// إنشاء مثيل لإدارة المنتجات باستخدام الهيكل الجديد
export const productManager = new ProductManager(products);

/**
 * دالة للحصول على المنتجات حسب الفئة
 * تعتمد على خوارزمية محسنة
 */
export function getProductsByCategory(category: 'phone' | 'laptop'): Product[] {
  return productManager.getByCategory(category);
}

/**
 * دالة للبحث عن المنتجات
 * تعتمد على خوارزمية بحث مرنة
 */
export function searchProducts(query: string): Product[] {
  return productManager.search(query);
}
