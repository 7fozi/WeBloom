// src/layouts/DesktopLayout.tsx
import { Heart, Baby } from 'lucide-react';

// This component receives all the necessary state and handlers as props
export const DesktopLayout = ({ state, handlers, refs, navigationItems }: any) => (
  <div className="flex flex-col h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50">
    <header className="bg-white/90 backdrop-blur-lg shadow-lg z-50 border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <button
              onClick={handlers.handleLogoClick}
              className={`w-12 h-12 bg-gradient-to-br from-pink-400 via-rose-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 ease-in-out
              ${state.isLogoUp ? '-translate-y-3' : 'translate-y-0'}`}
              aria-label="Go to home and animate logo"
            >
              <Baby className="w-7 h-7 text-white" />
            </button>
            <div>
  {/* Line 1: The Main Title */}
  <h1 className="flex items-baseline text-xl font-bold space-x-2">
    <span className="bg-gradient-to-r from-pink-600 via-rose-600 to-orange-600 bg-clip-text text-transparent">
      We Bloom
    </span>
    <span className="text-gray-300 font-light">|</span>
    <span className="text-lg text-gray-500 font-semibold">
      Pregnancy Companion
    </span>
  </h1>
  {/* Line 2: The Subtitle */}
  <p className="text-xs text-gray-500 mt-1">
    Your journey to motherhood
  </p>
</div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-pink-100 to-rose-100 rounded-full">
              <Heart className="w-4 h-4 text-pink-500 animate-pulse" />
              <span className="text-sm text-pink-600 font-medium">Week {state.currentWeek}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6 overflow-hidden">
      <div ref={refs.sidebarRef} className="lg:col-span-1 overflow-y-auto">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-pink-100/50">
          <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center space-x-2">
            <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full"></div>
            <span>Navigation</span>
          </h2>
          <nav className="space-y-2">
            {navigationItems.map((item: any) => (
              <button
                key={item.id}
                onClick={() => handlers.setActiveSection(item.id)}
                className={`w-full group flex items-center space-x-3 p-3 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md ${
                  state.activeSection === item.id ? `${item.color} shadow-lg scale-[1.02]` : `text-gray-600 hover:bg-gray-50 ${item.hoverColor}`
                }`}
              >
                <div className={`p-2 rounded-xl transition-colors duration-300 ${state.activeSection === item.id ? 'bg-white/30' : 'group-hover:bg-white/50'}`}>
                  <item.icon className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">{item.label}</span>
                {state.activeSection === item.id && <div className="ml-auto w-2 h-2 bg-current rounded-full animate-pulse"></div>}
              </button>
            ))}
          </nav>
          <div className="mt-8 p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl border border-pink-100">
            <p className="text-sm italic text-gray-700 text-center">"A baby is something you carry inside you for nine months..."</p>
            <p className="text-xs text-gray-500 text-center mt-2">- Mary Mason</p>
          </div>
        </div>
      </div>
      <div ref={refs.mainContentRef} className="lg:col-span-3 overflow-y-auto">
        <div className="transition-all duration-500 ease-out transform">{handlers.renderActiveSection()}</div>
      </div>
    </div>
  </div>
);