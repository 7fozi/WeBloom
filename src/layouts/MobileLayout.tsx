// src/layouts/MobileLayout.tsx
import { useEffect } from 'react';
// Baby icon is no longer needed, so it's removed from the import
import { Menu, X, Heart } from 'lucide-react'; 

export const MobileLayout = ({ state, handlers, navigationItems }: any) => {
  
  // This hook correctly locks background scroll when the menu is open
  useEffect(() => {
    if (state.isMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [state.isMenuOpen]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50">
      <header className="bg-white/90 backdrop-blur-lg shadow-lg sticky top-0 z-40 border-b border-pink-100">
        <div className="mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            
            {/* --- ITEM 1: LEFT --- */}
            <button
              onClick={() => handlers.setIsMenuOpen(true)}
              className="p-2 -ml-2 rounded-md text-gray-600"
              aria-label="Open navigation menu"
            >
              <Menu />
            </button>
            
            {/* --- ITEM 2: CENTER (MODIFIED) --- */}
            {/* This button now contains the title and still acts as the reset button */}
            <button onClick={handlers.handleLogoClick} aria-label="Reset App">
              <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 via-rose-600 to-orange-600 bg-clip-text text-transparent">
                We Bloom
              </h1>
            </button>

            {/* --- ITEM 3: RIGHT --- */}
            <div className="flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-pink-100 to-rose-100 rounded-full">
              <Heart className="w-4 h-4 text-pink-500" />
              <span className="text-sm font-semibold text-pink-600">Week {state.currentWeek}</span>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer (No changes here) */}
      <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${state.isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/30" onClick={() => handlers.setIsMenuOpen(false)}></div>
        <div className={`relative h-full w-3/4 max-w-xs bg-white p-6 shadow-xl transition-transform duration-300 ease-in-out overflow-y-auto ${state.isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Navigation</h2>
            <button onClick={() => handlers.setIsMenuOpen(false)} className="p-1 rounded-full hover:bg-gray-100"><X size={20} /></button>
          </div>
          <nav className="space-y-2">
            {navigationItems.map((item: any) => (
              <button
                key={item.id}
                onClick={() => { handlers.setActiveSection(item.id); handlers.setIsMenuOpen(false); }}
                className={`w-full group flex items-center space-x-3 p-3 rounded-2xl ${state.activeSection === item.id ? item.color : 'text-gray-600'}`}
              >
                <div className={`p-2 rounded-xl ${state.activeSection === item.id ? 'bg-white/30' : ''}`}>
                  <item.icon className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Mobile Content (No changes here) */}
      <main className="p-4">
        {handlers.renderActiveSection()}
      </main>
    </div>
  );
};