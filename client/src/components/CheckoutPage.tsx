/**
 * مكون صفحة الدفع والتحقق من البيانات
 * نموذج شامل لجمع بيانات العميل وخيارات الدفع
 * 
 * التصميم: Modern Luxury Tech Minimalism
 * - نموذج منظم وسهل الاستخدام
 * - تحقق من صحة البيانات
 * - عرض شعارات البطاقات الائتمانية
 */

import { useState } from 'react';
import { X, Check, Lock } from 'lucide-react';
import { CartItem } from './ShoppingCart';

interface CheckoutPageProps {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CheckoutData) => void;
}

export interface CheckoutData {
  // بيانات العميل
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // عنوان التوصيل
  address: string;
  city: string;
  postalCode: string;
  country: string;
  
  // بيانات البطاقة
  cardName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardType: 'visa' | 'mastercard' | 'amex' | 'other';
}

export default function CheckoutPage({
  items,
  isOpen,
  onClose,
  onSubmit,
}: CheckoutPageProps) {
  const [formData, setFormData] = useState<CheckoutData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'المملكة العربية السعودية',
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardType: 'visa',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // حساب الإجمالي
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // التحقق من صحة البيانات
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // التحقق من بيانات العميل
    if (!formData.firstName.trim()) newErrors.firstName = 'الاسم الأول مطلوب';
    if (!formData.lastName.trim()) newErrors.lastName = 'الاسم الأخير مطلوب';
    if (!formData.email.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صحيح';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'رقم الهاتف مطلوب';
    } else if (!/^\d{9,}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'رقم الهاتف غير صحيح';
    }

    // التحقق من عنوان التوصيل
    if (!formData.address.trim()) newErrors.address = 'العنوان مطلوب';
    if (!formData.city.trim()) newErrors.city = 'المدينة مطلوبة';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'الرمز البريدي مطلوب';

    // التحقق من بيانات البطاقة
    if (!formData.cardName.trim()) newErrors.cardName = 'اسم حامل البطاقة مطلوب';
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'رقم البطاقة مطلوب';
    } else if (!/^\d{13,19}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'رقم البطاقة غير صحيح';
    }
    if (!formData.expiryDate.trim()) {
      newErrors.expiryDate = 'تاريخ انتهاء الصلاحية مطلوب';
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'الصيغة: MM/YY';
    }
    if (!formData.cvv.trim()) {
      newErrors.cvv = 'CVV مطلوب';
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'CVV غير صحيح';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // معالجة تغيير الحقول
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // مسح الخطأ عند البدء في الكتابة
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // معالجة رقم البطاقة - إضافة مسافات
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\s/g, '');
    if (value.length > 19) value = value.slice(0, 19);
    
    // إضافة مسافات كل 4 أرقام
    const formatted = value.replace(/(\d{4})/g, '$1 ').trim();
    
    // التعرف على نوع البطاقة
    let cardType: 'visa' | 'mastercard' | 'amex' | 'other' = 'other';
    if (/^4/.test(value)) cardType = 'visa';
    else if (/^5[1-5]/.test(value)) cardType = 'mastercard';
    else if (/^3[47]/.test(value)) cardType = 'amex';
    
    setFormData(prev => ({
      ...prev,
      cardNumber: formatted,
      cardType,
    }));
  };

  // معالجة تاريخ الانتهاء
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    setFormData(prev => ({ ...prev, expiryDate: value }));
  };

  // معالجة CVV
  const handleCVVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setFormData(prev => ({ ...prev, cvv: value }));
  };

  // معالجة الإرسال
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // محاكاة تأخير المعالجة
    setTimeout(() => {
      onSubmit(formData);
      setIsSubmitting(false);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* الخلفية الشفافة */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* لوحة الدفع */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* الرأس */}
            <div className="border-b border-border p-6 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Playfair Display' }}>
                تأكيد الطلب والدفع
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
                aria-label="إغلاق"
              >
                <X className="w-6 h-6 text-foreground" />
              </button>
            </div>

            {/* المحتوى */}
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* ملخص الطلب */}
                <div className="bg-muted rounded-lg p-4">
                  <h3 className="font-bold text-foreground mb-3">ملخص الطلب</h3>
                  <div className="space-y-3 mb-3 max-h-48 overflow-y-auto">
                    {items.map(item => (
                      <div key={item.product.id} className="flex gap-3 pb-3 border-b border-border last:border-0">
                        <div className="w-16 h-16 bg-white rounded-lg overflow-hidden ">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-foreground truncate">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            الكمية: {item.quantity}
                          </p>
                          <p className="text-sm font-bold text-primary mt-1">
                            {(item.product.price * item.quantity).toLocaleString('ar-SA')} ر.س
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between">
                    <span className="font-bold text-foreground">الإجمالي النهائي:</span>
                    <span className="text-lg font-bold text-primary">
                      {total.toLocaleString('ar-SA')} ر.س
                    </span>
                  </div>
                </div>

                {/* بيانات العميل */}
                <div>
                  <h3 className="font-bold text-foreground mb-4">بيانات العميل</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-group">
                      <label className="form-label">الاسم الأول *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`form-input ${errors.firstName ? 'border-red-500' : ''}`}
                        placeholder="أحمد"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                      )}
                    </div>
                    <div className="form-group">
                      <label className="form-label">الاسم الأخير *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`form-input ${errors.lastName ? 'border-red-500' : ''}`}
                        placeholder="محمد"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="form-group">
                      <label className="form-label">البريد الإلكتروني *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                        placeholder="example@email.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>
                    <div className="form-group">
                      <label className="form-label">رقم الهاتف *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`form-input ${errors.phone ? 'border-red-500' : ''}`}
                        placeholder="0501234567"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* عنوان التوصيل */}
                <div>
                  <h3 className="font-bold text-foreground mb-4">عنوان التوصيل</h3>
                  <div className="form-group mb-4">
                    <label className="form-label">العنوان *</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={`form-input ${errors.address ? 'border-red-500' : ''}`}
                      placeholder="شارع / رقم المنزل"
                      rows={2}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="form-group">
                      <label className="form-label">المدينة *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={`form-input ${errors.city ? 'border-red-500' : ''}`}
                        placeholder="صنعاء"
                      />
                      {errors.city && (
                        <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                      )}
                    </div>
                    <div className="form-group">
                      <label className="form-label">الرمز البريدي *</label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className={`form-input ${errors.postalCode ? 'border-red-500' : ''}`}
                        placeholder="12345"
                      />
                      {errors.postalCode && (
                        <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>
                      )}
                    </div>
                    <div className="form-group">
                      <label className="form-label">الدولة</label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="form-input"
                      >
                        <option>اليمن</option>
                        <option>دولة أخرى</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* بيانات البطاقة */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Lock size={20} className="text-primary" />
                    <h3 className="font-bold text-foreground">بيانات الدفع</h3>
                  </div>
                  
                  <div className="form-group mb-4">
                    <label className="form-label">اسم حامل البطاقة *</label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      className={`form-input ${errors.cardName ? 'border-red-500' : ''}`}
                      placeholder="AHMED MOHAMMED"
                    />
                    {errors.cardName && (
                      <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>
                    )}
                  </div>

                  <div className="form-group mb-4">
                    <label className="form-label">رقم البطاقة *</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={handleCardNumberChange}
                        className={`form-input ${errors.cardNumber ? 'border-red-500' : ''}`}
                        placeholder="1234 5678 9012 3456"
                        maxLength={23}
                      />
                      {/* شعارات البطاقات */}
                      <div className="absolute left-3 top-3 flex gap-2">
                        {formData.cardType === 'visa' && (
                          <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs font-bold flex items-center justify-center">
                            VISA
                          </div>
                        )}
                        {formData.cardType === 'mastercard' && (
                          <div className="w-8 h-5 bg-red-600 rounded text-white text-xs font-bold flex items-center justify-center">
                            MC
                          </div>
                        )}
                        {formData.cardType === 'amex' && (
                          <div className="w-8 h-5 bg-blue-800 rounded text-white text-xs font-bold flex items-center justify-center">
                            AX
                          </div>
                        )}
                      </div>
                    </div>
                    {errors.cardNumber && (
                      <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-group">
                      <label className="form-label">تاريخ الانتهاء (MM/YY) *</label>
                      <input
                        type="text"
                        value={formData.expiryDate}
                        onChange={handleExpiryChange}
                        className={`form-input ${errors.expiryDate ? 'border-red-500' : ''}`}
                        placeholder="12/25"
                        maxLength={5}
                      />
                      {errors.expiryDate && (
                        <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>
                      )}
                    </div>
                    <div className="form-group">
                      <label className="form-label">CVV *</label>
                      <input
                        type="text"
                        value={formData.cvv}
                        onChange={handleCVVChange}
                        className={`form-input ${errors.cvv ? 'border-red-500' : ''}`}
                        placeholder="123"
                        maxLength={4}
                      />
                      {errors.cvv && (
                        <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* الأزرار */}
                <div className="flex gap-4 pt-4 border-t border-border">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        جاري المعالجة...
                      </>
                    ) : (
                      <>
                        <Check size={18} />
                        تأكيد الطلب والدفع
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 btn-outline"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
