import React from 'react';
import { Utensils, Droplets, AlertCircle, CheckCircle, Apple, Coffee } from 'lucide-react';
import MonthNavigator from './MonthNavigator'; // Uses the navigator

// Data remains the same
const monthData = {
  1: { title: 'Month 1 (Weeks 1-4)', tips: [ 'Start taking 400-600mcg of folic acid daily to prevent neural tube defects.', 'Focus on a balanced diet, even if you don\'t feel very hungry.', 'Avoid alcohol, smoking, and illicit drugs entirely.', 'Consult your doctor about any pre-existing conditions or medications.' ], goodFoods: ['Leafy greens (Palak, Methi)', 'Lentils and Dals (Moong, Masoor)', 'Fortified Atta and Cereals', 'Citrus fruits (Oranges, Mosambi)', 'Bhindi (Okra)'], avoidFoods: ['Alcohol', 'High-mercury fish (Shark, Swordfish)', 'Unpasteurized milk and dairy', 'Processed/cured meats'], indianMeals: [ 'Palak dal (spinach and lentil curry)', 'Mixed vegetable sabzi with roti', 'Besan chilla (gram flour pancake)', 'Fruit chaat with a pinch of salt' ] },
  2: { title: 'Month 2 (Weeks 5-8)', tips: [ 'Eat small, frequent meals to combat morning sickness.', 'Stay hydrated by sipping water throughout the day.', 'Adrak (Ginger) tea or candies can help with nausea.', 'Include iron-rich foods to support increased blood volume.' ], goodFoods: ['Adrak (Ginger)', 'Dry toast or Rusk', 'Bananas', 'Dahi (Yogurt)', 'Nuts and Seeds (Almonds, Walnuts)', 'Murmura (Puffed Rice)'], avoidFoods: ['Raw or undercooked eggs', 'Excessive caffeine (limit to 2 cups of chai/coffee)', 'Raw sprouts', 'Very spicy foods if causing discomfort'], indianMeals: [ 'Vegetable upma with coconut', 'Curd rice with a mild pickle', 'Dal with rice and a dollop of ghee', 'Poha with peanuts and lemon' ] },
  3: { title: 'Month 3 (Weeks 9-12)', tips: [ 'Continue with folic acid. Your baby\'s major organs are forming.', 'Ensure adequate calcium intake for developing bones and teeth.', 'Fiber is important to prevent constipation, a common early pregnancy issue.', 'Listen to your body and rest when you feel tired.' ], goodFoods: ['Dairy (Milk, Paneer, Dahi)', 'Ragi (Finger Millet)', 'Whole grains (Jowar, Brown Rice)', 'Badam (Almonds)', 'Anjeer (Figs) and Munakka (Raisins)'], avoidFoods: ['Unwashed fruits and vegetables', 'Soft, mold-ripened cheeses', 'Street food from unhygienic vendors', 'Pate'], indianMeals: [ 'Ragi porridge or dosa', 'Paneer bhurji (scrambled cottage cheese) with paratha', 'Khichdi with mixed vegetables', 'Idli with sambar and coconut chutney' ] },
  4: { title: 'Month 4 (Weeks 13-16)', tips: [ 'Your energy levels may be returning. Incorporate light exercise.', 'Increase protein intake for your growing baby and placenta.', 'Focus on Vitamin D, which helps with calcium absorption.', 'Your appetite might increase; choose nutrient-dense snacks.' ], goodFoods: ['Ande (Eggs)', 'Lentils and Pulses (like Chana, Rajma)', 'Shakarkandi (Sweet Potatoes)', 'Hung Curd (Chakka)', 'Low-mercury fish (Rohu, if non-veg)'], avoidFoods: ['High-sodium foods (papad, pickles in excess)', 'Sugary drinks and packaged juices', 'Artificial sweeteners in large amounts'], indianMeals: [ 'Rajma chawal (kidney beans and rice) with salad', 'Egg curry with brown rice', 'Aloo gobi with whole wheat chapati', 'Chana sundal (chickpea salad)' ] },
  5: { title: 'Month 5 (Weeks 17-20)', tips: [ 'Omega-3 fatty acids are crucial for your baby\'s brain development.', 'Continue focusing on iron; your doctor might recommend a supplement.', 'Monitor your weight gain. It should be gradual and steady.', 'Stay hydrated to support amniotic fluid levels and prevent UTIs.' ], goodFoods: ['Akhrot (Walnuts)', 'Flax seeds (Alsi)', 'Pomegranate (Anaar)', 'Beetroot', 'Amla (Indian Gooseberry)', 'Leafy Greens (for iron)'], avoidFoods: ['Foods with empty calories (maida-based items)', 'Leftovers not stored properly', 'High-mercury fish'], indianMeals: [ 'Fish curry with rice', 'Beetroot thoran (stir-fry) with roti', 'Masoor dal (red lentils) with vegetables', 'Tandoori chicken (well-cooked) with naan' ] },
  6: { title: 'Month 6 (Weeks 21-24)', tips: [ 'Ensure you are getting enough Vitamin C to help absorb iron.', 'Calcium remains important as your baby\'s skeleton hardens.', 'Heartburn might start; eat smaller meals and avoid lying down right after eating.', 'Drink plenty of water to help with swelling.' ], goodFoods: ['Citrus fruits (Amla, Lemon, Mosambi)', 'Tomatoes', 'Guava (Amrood)', 'Sesame seeds (Til)', 'Dark leafy greens (Palak, Methi)'], avoidFoods: ['Very spicy or oily curries', 'Deep-fried snacks (Samosa, Pakora)', 'Carbonated drinks'], indianMeals: [ 'Lemon rice with peanuts', 'Bhindi masala (okra curry) with chapati', 'Mixed dal fry', 'Vegetable pulao with cucumber raita' ] },
  7: { title: 'Month 7 (Weeks 25-28)', tips: [ 'Your baby is growing rapidly; ensure your calorie intake is adequate.', 'Focus on choline, important for brain and spinal cord development.', 'Increase fiber intake to manage constipation.', 'Prepare for your glucose screening test by managing sugar intake.' ], goodFoods: ['Egg yolk', 'Soybean products (Tofu, Soya chunks)', 'Dalia (Broken Wheat)', 'Oats', 'Apples', 'Khajur (Dates)'], avoidFoods: ['Excess sugar (mithai, sweets)', 'Refined flour (Maida) products', 'Large, heavy meals that cause bloating'], indianMeals: [ 'Moong dal khichdi with a side of yogurt', 'Methi paratha (fenugreek flatbread) with curd', 'Soybean curry with rice', 'Lauki (bottle gourd) sabzi' ] },
  8: { title: 'Month 8 (Weeks 29-32)', tips: [ 'Your baby is putting on fat, so healthy fats are important.', 'Eat foods rich in Vitamin K in preparation for labor.', 'Continue with small, frequent meals as your stomach has less space.', 'Stay well-hydrated to prevent Braxton Hicks contractions caused by dehydration.' ], goodFoods: ['Ghee (in moderation)', 'Nuts and Seeds', 'Nariyal Pani (Coconut Water)', 'Cabbage and Cauliflower', 'Lean Chicken (well-cooked)', 'Fresh Coconut'], avoidFoods: ['Excess salt to manage swelling (avoid adding extra salt)', 'Caffeine, especially in the evening', 'Gas-producing foods like rajma, chhole if they cause discomfort'], indianMeals: [ 'Coconut vegetable stew with appam', 'Dal makhani (use less cream) with roti', 'Jeera rice with any dal', 'Stuffed bell peppers (capsicum)' ] },
  9: { title: 'Month 9 (Weeks 33-40+)', tips: [ 'Focus on easily digestible foods as you near your due date.', 'Dates are thought to help with cervical ripening.', 'Continue a nutrient-dense diet to build strength for labor.', 'Pack some healthy snacks in your hospital bag.' ], goodFoods: ['Khajur (Dates)', 'Munakka (Raisins)', 'Sooji (Semolina) based foods like Halwa or Upma', 'Light soups (Moong Dal soup)', 'Ajwain/Jeera water (consult doctor)'], avoidFoods: ['Heavy, greasy or very spicy meals', 'Foods that might cause indigestion', 'Trying new, unfamiliar foods'], indianMeals: [ 'Sooji (semolina) halwa with nuts', 'Clear vegetable soup', 'Lightly spiced dal and rice', 'Paneer tikka (grilled, not fried)' ] }
};

// --- MODIFICATION 1: UPDATE THE PROPS INTERFACE ---
// It no longer needs `setCurrentMonth`. Instead, it gets the handlers.
interface DietNutritionProps {
  currentMonth: number;
  onNext: () => void;
  onPrev: () => void;
}

// --- MODIFICATION 2: UPDATE THE COMPONENT SIGNATURE ---
const DietNutrition: React.FC<DietNutritionProps> = ({ currentMonth, onNext, onPrev }) => {
  const data = monthData[currentMonth as keyof typeof monthData];

  // A small safety check
  if (!data) {
    return <div>Loading nutrition data...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-green-100">
        
        {/* --- MODIFICATION 3: PASS THE NEW PROPS TO THE NAVIGATOR --- */}
        <MonthNavigator 
          currentMonth={currentMonth} 
          onNext={onNext}
          onPrev={onPrev}
        />

        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
            <Utensils className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Diet & Nutrition</h2>
            <p className="text-gray-600">Healthy eating for you and your baby</p>
          </div>
        </div>
      </div>

      {/* Nutrition Tips */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-blue-100">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">Key Nutrition Tips for Month {currentMonth}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.tips.map((tip, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-gray-700">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Foods Grid (No changes needed here) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-green-100">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Apple className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Foods to Include</h3>
          </div>
          <div className="space-y-2">
            {data.goodFoods.map((food, index) => (
              <div key={index} className="flex items-center space-x-3 p-2 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                <span className="text-gray-700">{food}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-red-100">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Foods to Avoid</h3>
          </div>
          <div className="space-y-2">
            {data.avoidFoods.map((food, index) => (
              <div key={index} className="flex items-center space-x-3 p-2 bg-red-50 rounded-lg">
                <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                <span className="text-gray-700">{food}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Indian Meal Suggestions (No changes needed here) */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-orange-100">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
            <Coffee className="w-5 h-5 text-orange-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">Indian Meal Ideas</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.indianMeals.map((meal, index) => (
            <div key={index} className="p-4 bg-orange-50 rounded-lg">
              <p className="text-gray-700 font-medium">{meal}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hydration Reminder (No changes needed here) */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-cyan-100">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
            <Droplets className="w-5 h-5 text-cyan-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">Hydration Reminder</h3>
        </div>
        <div className="bg-cyan-50 rounded-lg p-4">
          <p className="text-gray-700 mb-2">
            <strong>Daily Goal:</strong> 8-10 glasses of water (2-2.5 liters)
          </p>
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div className="bg-gradient-to-r from-cyan-400 to-blue-400 h-3 rounded-full" style={{ width: '60%' }}></div>
            </div>
            <span className="text-sm text-gray-600">6/10 glasses</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DietNutrition;