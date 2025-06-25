import { useState, useEffect, useRef } from 'react';
import MonthlyTracker from './components/MonthlyTracker';
import DietNutrition from './components/DietNutrition';
import ExerciseYoga from './components/ExerciseYoga';
import KnowledgeHub from './components/KnowledgeHub';
import DailyTips from './components/DailyTips';
import ImportantDates from './components/ImportantDates';
import SleepRest from './components/SleepRest';
import MindMood from './components/MindMood';
import PartnerInvolvement from './components/PartnerInvolvement';

// Import our new layout components and the media query hook
import { DesktopLayout } from './layouts/DesktopLayout';
import { MobileLayout } from './layouts/MobileLayout';
import { useMediaQuery } from './hooks/useMediaQuery';
import { Baby, Utensils, Activity, BookOpen, Heart, Calendar, Moon, Brain, Users } from 'lucide-react';


// Data and helper functions remain in the main App file to be passed down
const navigationItems = [
  { id: 'tracker', label: 'Monthly Tracker', icon: Baby, color: 'bg-pink-100 text-pink-600', hoverColor: 'hover:bg-pink-200' },
  { id: 'diet', label: 'Diet & Nutrition', icon: Utensils, color: 'bg-green-100 text-green-600', hoverColor: 'hover:bg-green-200' },
  { id: 'exercise', label: 'Exercise & Yoga', icon: Activity, color: 'bg-purple-100 text-purple-600', hoverColor: 'hover:bg-purple-200' },
  { id: 'knowledge', label: 'Knowledge Hub', icon: BookOpen, color: 'bg-blue-100 text-blue-600', hoverColor: 'hover:bg-blue-200' },
  { id: 'tips', label: 'Daily Tips', icon: Heart, color: 'bg-rose-100 text-rose-600', hoverColor: 'hover:bg-rose-200' },
  { id: 'dates', label: 'Important Dates', icon: Calendar, color: 'bg-orange-100 text-orange-600', hoverColor: 'hover:bg-orange-200' },
  { id: 'sleep', label: 'Sleep & Rest', icon: Moon, color: 'bg-indigo-100 text-indigo-600', hoverColor: 'hover:bg-indigo-200' },
  { id: 'mood', label: 'Mind & Mood', icon: Brain, color: 'bg-teal-100 text-teal-600', hoverColor: 'hover:bg-teal-200' },
  { id: 'partner', label: 'Partner Support', icon: Users, color: 'bg-amber-100 text-amber-600', hoverColor: 'hover:bg-amber-200' },
];

const convertWeekToMonth = (week: number): number => {
  if (week >= 1 && week <= 4) return 1;
  if (week >= 5 && week <= 8) return 2;
  if (week >= 9 && week <= 13) return 3;
  if (week >= 14 && week <= 17) return 4;
  if (week >= 18 && week <= 22) return 5;
  if (week >= 23 && week <= 27) return 6;
  if (week >= 28 && week <= 31) return 7;
  if (week >= 32 && week <= 35) return 8;
  if (week >= 36) return 9;
  return 1;
};


// The main App component is now a clean "brain"
const App: React.FC = () => {
  // --- All state lives here ---
  const [activeSection, setActiveSection] = useState('tracker');
  const [currentWeek, setCurrentWeek] = useState(() => {
    const savedWeek = localStorage.getItem('pregnancyApp_currentWeek');
    return savedWeek ? parseInt(savedWeek, 10) : 24;
  });
  const [currentMonth, setCurrentMonth] = useState(1);
  const [isLogoUp, setIsLogoUp] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // --- All refs live here ---
  const mainContentRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  
  // --- This hook determines which layout to render ---
  const isDesktop = useMediaQuery('(min-width: 1024px)'); // Tailwind's 'lg' breakpoint

  // --- All effects live here ---
  useEffect(() => {
    localStorage.setItem('pregnancyApp_currentWeek', currentWeek.toString());
    setCurrentMonth(convertWeekToMonth(currentWeek));
  }, [currentWeek]);

  useEffect(() => {
    // This scroll logic adapts to the current layout
    if (isDesktop && mainContentRef.current) {
      // For desktop, scroll the specific content panel
      mainContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (!isDesktop) {
      // For mobile, scroll the whole window
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeSection, isDesktop]);

  // --- All handlers live here ---
  const handleLogoClick = () => {
    setActiveSection('tracker');
    setCurrentWeek(1);
    if (isDesktop && sidebarRef.current) {
      sidebarRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (isLogoUp) return;
    setIsLogoUp(true);
    setTimeout(() => { setIsLogoUp(false); }, 300);
  };

  const handleNextMonth = () => {
    if (currentMonth < 9) {
      const nextMonthStartWeek = [1, 5, 9, 14, 18, 23, 28, 32, 36][currentMonth];
      setCurrentWeek(nextMonthStartWeek);
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth > 1) {
      const prevMonthStartWeek = [1, 5, 9, 14, 18, 23, 28, 32, 36][currentMonth - 2];
      setCurrentWeek(prevMonthStartWeek);
    }
  };
  
  const renderActiveSection = () => {
    switch (activeSection) {
      case 'tracker': return <MonthlyTracker currentMonth={currentMonth} onNext={handleNextMonth} onPrev={handlePrevMonth} />;
      case 'diet': return <DietNutrition currentMonth={currentMonth} onNext={handleNextMonth} onPrev={handlePrevMonth} />;
      case 'exercise': return <ExerciseYoga currentMonth={currentMonth} onNext={handleNextMonth} onPrev={handlePrevMonth} />;
      case 'knowledge': return <KnowledgeHub />;
      case 'tips': return <DailyTips />;
      case 'dates': return <ImportantDates />;
      case 'sleep': return <SleepRest />;
      case 'mood': return <MindMood />;
      case 'partner': return <PartnerInvolvement />;
      default: return <MonthlyTracker currentMonth={currentMonth} onNext={handleNextMonth} onPrev={handlePrevMonth} />;
    }
  };

  // Bundle up props to pass them cleanly to the layout components
  const stateProps = { activeSection, currentWeek, isLogoUp, isMenuOpen, currentMonth };
  const handlerProps = { setActiveSection, setIsMenuOpen, handleLogoClick, renderActiveSection };
  const refProps = { sidebarRef, mainContentRef };

  // --- The final render logic is simple and clean ---
  return isDesktop
    ? <DesktopLayout state={stateProps} handlers={handlerProps} refs={refProps} navigationItems={navigationItems} />
    : <MobileLayout state={stateProps} handlers={handlerProps} navigationItems={navigationItems} />;
}

export default App;
// A small change to force a new commit
