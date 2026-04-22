

import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-[#1A2F4A] to-[#0F1C2E] text-white mt-20 relative overflow-hidden">
      {/* تأثيرات خلفية للفوتر */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-50"></div>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-5 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
      </div>

      {/* المحتوى الرئيسي */}
      <div className="container py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* عن المتجر */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <h3 className="font-bold text-2xl text-white tracking-wide" style={{ fontFamily: 'Playfair Display' }}>
                متجر باريس
              </h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed opacity-90">
              متجر متخصص في بيع الهواتف الذكية والابتوبات بأفضل الأسعار والجودة العالية. نوفر أحدث التقنيات من أفضل الماركات العالمية بتجربة تسوق فاخرة.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 hover:-translate-y-1">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 hover:-translate-y-1">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 hover:-translate-y-1">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* الروابط السريعة */}
          <div>
            <h3 className="font-bold text-lg mb-4">الروابط السريعة</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                  الرئيسية
                </a>
              </li>
              <li>
                <a href="#phones" className="text-gray-300 hover:text-secondary transition-colors">
                  الهواتف
                </a>
              </li>
              <li>
                <a href="#laptops" className="text-gray-300 hover:text-secondary transition-colors">
                  الابتوبات
                </a>
              </li>
              <li>
              </li>
            </ul>
          </div>

          {/* سياسات المتجر */}
          <div>
            <h3 className="font-bold text-lg mb-4">السياسات</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                  سياسة الخصوصية
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                  شروط الاستخدام
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                  سياسة الاسترجاع
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                  الضمان
                </a>
              </li>
            </ul>
          </div>

          {/* التواصل */}
          <div>
            <h3 className="font-bold text-lg mb-4">تواصل معنا</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-secondary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-300">777 062 772 967+</p>
                  <p className="text-sm text-gray-300">337 807 782 967+</p>
                  <p className="text-xs text-gray-400">متاح 24/7</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-secondary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-300">mohammedmojepp4063177@gmail.com</p>
                  <p className="text-xs text-gray-400">نرد خلال ساعة</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-secondary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-300">اليمن - صنعاء</p>
                  <p className="text-xs text-gray-400">حده</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* الفاصل */}
        <div className="border-t border-gray-700 pt-8">
          {/* الشهادات والدفع */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-semibold text-sm mb-3">طرق الدفع المقبولة</h4>
              <div className="flex gap-3 flex-wrap">
                <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                  VISA
                </div>
                <div className="w-12 h-8 bg-red-600 rounded flex items-center justify-center text-white text-xs font-bold">
                  MC
                </div>
                <div className="w-12 h-8 bg-blue-800 rounded flex items-center justify-center text-white text-xs font-bold">
                  AX
                </div>
                <div className="w-12 h-8 bg-gray-600 rounded flex items-center justify-center text-white text-xs font-bold">
                  Pay
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">شهادات الأمان</h4>
              <div className="flex gap-3">
                <div className="px-3 py-2 bg-green-700 rounded text-xs font-bold">
                  🔒 SSL
                </div>
                <div className="px-3 py-2 bg-green-700 rounded text-xs font-bold">
                  ✓ موثوق
                </div>
              </div>
            </div>
          </div>

          {/* حقوق النشر */}
          <div className="border-t border-gray-700 pt-6 text-center">
            <p className="text-gray-400 text-sm mb-2">
              © {currentYear} متجر باريس للهواتف والابتوبات. جميع الحقوق محفوظة.
            </p>
            
          </div>
        </div>
      </div>
    </footer>
  );
}
