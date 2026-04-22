/**
 * مكون الرأس (Header)
 * يحتوي على شعار المتجر والملاحة والسلة
 * 
 * التصميم: Modern Luxury Tech Minimalism
 * - شعار فاخر باللون الذهبي
 * - ملاحة بسيطة وأنيقة
 * - عداد السلة بارز
 */

import { useState } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

export default function Header({ cartCount, onCartClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="glass-header transition-all duration-300">
      <div className="container">
        <div className="flex items-center justify-between h-20">
          {/* الشعار */}
          <div className="flex items-center gap-3 cursor-pointer hover-scale" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-white font-bold text-xl" style={{ fontFamily: 'Playfair Display' }}>B</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-primary tracking-tight" style={{ fontFamily: 'Playfair Display' }}>
                متجر باريس
              </h1>
              <p className="text-xs text-muted-foreground font-medium tracking-wider">للهواتف والابتوبات</p>
            </div>
          </div>

          {/* الملاحة - سطح المكتب */}
          <nav className="hidden md:flex items-center gap-8 bg-muted/30 px-6 py-2 rounded-full border border-border/50">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-foreground hover:text-primary hover:scale-105 transition-all duration-300 font-bold text-sm">
              الرئيسية
            </button>
            <button onClick={() => {
              const section = document.getElementById('products');
              section?.scrollIntoView({ behavior: 'smooth' });
            }} className="text-foreground hover:text-primary hover:scale-105 transition-all duration-300 font-bold text-sm">
              الهواتف
            </button>
            <button onClick={() => {
              const section = document.getElementById('products');
              section?.scrollIntoView({ behavior: 'smooth' });
            }} className="text-foreground hover:text-primary hover:scale-105 transition-all duration-300 font-bold text-sm">
              الابتوبات
            </button>
            <button onClick={() => {
              const section = document.getElementById('features');
              section?.scrollIntoView({ behavior: 'smooth' });
            }} className="text-foreground hover:text-primary hover:scale-105 transition-all duration-300 font-bold text-sm">
              عن المتجر
            </button>
          </nav>

          {/* أيقونة السلة والقائمة */}
          <div className="flex items-center gap-4">
            {/* زر السلة */}
            <button
              onClick={onCartClick}
              className="relative p-2.5 bg-muted/50 hover:bg-primary/10 hover:text-primary rounded-xl transition-all duration-300 group"
              aria-label="سلة المشتريات"
            >
              <ShoppingCart className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-secondary-foreground text-xs font-bold rounded-full flex items-center justify-center shadow-md animate-in zoom-in">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>

            {/* زر القائمة - الهاتف */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors duration-200"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* القائمة - الهاتف */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-border py-4 space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="block w-full text-right px-4 py-2 text-foreground hover:bg-muted rounded-lg transition-colors"
            >
              الرئيسية
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                const section = document.getElementById('products');
                section?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="block w-full text-right px-4 py-2 text-foreground hover:bg-muted rounded-lg transition-colors"
            >
              الهواتف
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                const section = document.getElementById('products');
                section?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="block w-full text-right px-4 py-2 text-foreground hover:bg-muted rounded-lg transition-colors"
            >
              الابتوبات
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                const section = document.getElementById('features');
                section?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="block w-full text-right px-4 py-2 text-foreground hover:bg-muted rounded-lg transition-colors"
            >
              عن المتجر
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
