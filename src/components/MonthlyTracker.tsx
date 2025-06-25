import React from 'react';
import { Calendar, Baby, Heart, TrendingUp } from 'lucide-react';
// Import the shared navigator component
import MonthNavigator from './MonthNavigator';

const monthlyData = [
  // ... your monthlyData array remains unchanged
  { month: 1, fruit: 'Poppy Seed', fruitImage: '/fruits/poppy.png', size: '0.25 cm', weight: '1 gram', development: 'Fertilization and implantation occur; early embryo starts developing.', motherChanges: 'You may not know you’re pregnant yet, but hormonal changes begin.', },
  { month: 2, fruit: 'Blueberry', fruitImage: '/fruits/blueberry.png', size: '1.3 cm', weight: '1 gram', development: 'Neural tube forms, organs begin developing, heart starts beating.', motherChanges: 'Morning sickness and fatigue are common.', },
  { month: 3, fruit: 'Lime', fruitImage: '/fruits/lime.png', size: '5.3 cm', weight: '14 grams', development: 'Baby’s arms, legs, fingers, and toes are forming. Reflexes begin.', motherChanges: 'Energy may start to return, nausea may ease.', },
  { month: 4, fruit: 'Avocado', fruitImage: '/fruits/avacado.png', size: '11.4 cm', weight: '100 grams', development: 'Facial features develop, baby can yawn, hiccup, and suck thumb.', motherChanges: 'Baby bump shows, more energy, fewer symptoms.', },
  { month: 5, fruit: 'Banana', fruitImage: '/fruits/banana.jpg', size: '16.5 cm', weight: '298 grams', development: 'Baby kicks and hears sounds, gender can often be identified.', motherChanges: 'You may feel baby’s movements (quickening).', },
  { month: 6, fruit: 'Mango', fruitImage: '/fruits/mango.png', size: '29.5 cm', weight: '600 grams', development: 'Skin becomes opaque, baby responds to light and sound.', motherChanges: 'Stretch marks may appear; back pain begins.', },
  { month: 7, fruit: 'Eggplant', fruitImage: '/fruits/eggplant.jpg', size: '37.5 cm', weight: '1.3 kg', development: 'Baby’s brain and organs continue maturing.', motherChanges: 'Braxton Hicks contractions may start.', },
  { month: 8, 'fruit': 'Pineapple', 'fruitImage': '/fruits/pineapple.jpg', 'size': '43.2 cm', 'weight': '2 kg', development: 'Fat accumulates, baby moves into head-down position.', motherChanges: 'Frequent urination, fatigue, and difficulty sleeping.', },
  { month: 9, 'fruit': 'Watermelon', 'fruitImage': '/fruits/watermelon.jpg', 'size': '49.5 cm', 'weight': '3.2 kg', development: 'Baby is full term, lungs mature, ready for birth.', motherChanges: 'Nesting instinct kicks in, labor signs may begin.', },
];

// --- MODIFICATION 1: UPDATE THE PROPS INTERFACE ---
// It now accepts the props being passed from App.tsx
interface MonthlyTrackerProps {
  currentMonth: number;
  onNext: () => void;
  onPrev: () => void;
}

// --- MODIFICATION 2: USE THE NEW PROPS ---
const MonthlyTracker: React.FC<MonthlyTrackerProps> = ({ currentMonth, onNext, onPrev }) => {
  const data = monthlyData[currentMonth - 1];

  // A small safety check in case the month is invalid
  if (!data) {
    return <div>Loading data...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-pink-100">
        
        {/* --- MODIFICATION 3: PASS THE HANDLERS TO THE NAVIGATOR --- */}
        <MonthNavigator 
          currentMonth={currentMonth} 
          onNext={onNext} 
          onPrev={onPrev} 
        />

        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center">
            <Baby className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Pregnancy Tracker</h2>
            <p className="text-gray-600">Baby's Size Comparison</p>
          </div>
        </div>

        {/* Image Display */}
        <div className="flex items-center justify-center mb-6">
          <img
            src={data.fruitImage}
            alt={data.fruit}
            className="w-[120px] h-[120px] object-contain rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Fruit Size */}
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Size of a {data.fruit}</h3>
          <div className="flex justify-center space-x-6 text-sm text-gray-600">
            <div>
              <span className="font-medium">Length:</span> {data.size}
            </div>
            <div>
              <span className="font-medium">Weight:</span> {data.weight}
            </div>
          </div>
        </div>
      </div>

      {/* Development Cards (No changes needed here) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Baby's Development Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-blue-100">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Baby's Development</h3>
          </div>
          <p className="text-gray-600 leading-relaxed">{data.development}</p>
        </div>
        {/* Your Body Changes Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-rose-100">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-rose-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Your Body Changes</h3>
          </div>
          <p className="text-gray-600 leading-relaxed">{data.motherChanges}</p>
        </div>
      </div>

      {/* Progress Bar (No changes needed here) */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-purple-100">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <Calendar className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Overall Progress</h3>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
          <div
            className="bg-gradient-to-r from-purple-400 to-pink-400 h-3 rounded-full transition-all duration-500"
            style={{ width: `${(data.month / 9) * 100}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 text-center">
          {data.month} of 9 months completed ({Math.round((data.month / 9) * 100)}%)
        </p>
      </div>
    </div>
  );
};

export default MonthlyTracker;