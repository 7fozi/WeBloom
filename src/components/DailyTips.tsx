import React, { useState } from 'react';
import { Heart, Sun, Moon, Edit3, Calendar, Smile, Star } from 'lucide-react';

const dailyTips = [
  "Take a moment to connect with your baby today - talk, sing, or play music for them to hear.",
  "Stay hydrated! Carry a water bottle with you and aim for 8-10 glasses throughout the day.",
  "Practice deep breathing exercises for 5 minutes to reduce stress and anxiety.",
  "Take a gentle walk in fresh air to boost your mood and energy levels.",
  "Eat a rainbow of fruits and vegetables to ensure you're getting varied nutrients.",
  "Rest when you need to - your body is doing incredible work growing your baby.",
  "Document your pregnancy journey with photos or journal entries.",
  "Connect with other expecting mothers for support and friendship."
];

const affirmations = [
  "My body knows how to nurture and grow my baby perfectly.",
  "I am strong, capable, and ready for this beautiful journey.",
  "Each day, my baby and I grow stronger together.",
  "I trust my instincts and listen to my body's wisdom.",
  "I am surrounded by love and support during this special time.",
  "My baby is healthy, happy, and developing beautifully.",
  "I embrace the changes in my body with love and gratitude.",
  "I am becoming the mother my baby needs me to be."
];

const moodOptions = [
  { emoji: '😊', label: 'Happy', color: 'bg-yellow-100 text-yellow-600' },
  { emoji: '😌', label: 'Calm', color: 'bg-blue-100 text-blue-600' },
  { emoji: '😴', label: 'Tired', color: 'bg-purple-100 text-purple-600' },
  { emoji: '😰', label: 'Anxious', color: 'bg-orange-100 text-orange-600' },
  { emoji: '🤗', label: 'Grateful', color: 'bg-green-100 text-green-600' },
  { emoji: '😢', label: 'Emotional', color: 'bg-indigo-100 text-indigo-600' }
];

const DailyTips: React.FC = () => {
  const [currentTip] = useState(Math.floor(Math.random() * dailyTips.length));
  const [currentAffirmation] = useState(Math.floor(Math.random() * affirmations.length));
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [journalEntry, setJournalEntry] = useState('');
  const [journalEntries, setJournalEntries] = useState<Array<{date: string, mood: string, entry: string}>>([]);

  const saveJournalEntry = () => {
    if (journalEntry.trim() && selectedMood) {
      const newEntry = {
        date: new Date().toLocaleDateString(),
        mood: selectedMood,
        entry: journalEntry.trim()
      };
      setJournalEntries([newEntry, ...journalEntries]);
      setJournalEntry('');
      setSelectedMood(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-rose-100">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-400 rounded-full flex items-center justify-center">
            <Heart className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Daily Tips & Affirmations</h2>
            <p className="text-gray-600">Nurturing your mind, body, and spirit</p>
          </div>
        </div>
      </div>

      {/* Daily Tip */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-blue-100">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <Sun className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Today's Tip</h3>
        </div>
        <div className="bg-blue-50 rounded-xl p-4">
          <p className="text-gray-700 text-lg leading-relaxed">{dailyTips[currentTip]}</p>
        </div>
      </div>

      {/* Daily Affirmation */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-purple-100">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <Star className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Daily Affirmation</h3>
        </div>
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 text-center">
          <p className="text-gray-800 text-xl font-medium leading-relaxed italic">
            "{affirmations[currentAffirmation]}"
          </p>
        </div>
      </div>

      {/* Mood Tracker */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-green-100">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <Smile className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">How are you feeling today?</h3>
        </div>
        
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-4">
          {moodOptions.map((mood, index) => (
            <button
              key={index}
              onClick={() => setSelectedMood(mood.label)}
              className={`p-4 rounded-xl transition-all duration-200 hover:scale-105 ${
                selectedMood === mood.label
                  ? `${mood.color} shadow-md scale-105`
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <div className="text-2xl mb-2">{mood.emoji}</div>
              <div className="text-sm font-medium text-gray-700">{mood.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Mood Journal */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-amber-100">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
            <Edit3 className="w-5 h-5 text-amber-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Mood Journal</h3>
        </div>
        
        <div className="space-y-4">
          <textarea
            value={journalEntry}
            onChange={(e) => setJournalEntry(e.target.value)}
            placeholder="How are you feeling today? What's on your mind?"
            className="w-full h-32 p-4 bg-amber-50 border border-amber-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          
          <button
            onClick={saveJournalEntry}
            disabled={!journalEntry.trim() || !selectedMood}
            className="w-full py-3 bg-gradient-to-r from-amber-400 to-orange-400 text-white font-medium rounded-xl hover:from-amber-500 hover:to-orange-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Journal Entry
          </button>
        </div>

        {/* Recent Entries */}
        {journalEntries.length > 0 && (
          <div className="mt-6 space-y-3">
            <h4 className="text-md font-semibold text-gray-800 flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Recent Entries</span>
            </h4>
            {journalEntries.slice(0, 3).map((entry, index) => (
              <div key={index} className="p-4 bg-amber-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">{entry.date}</span>
                  <span className="text-sm font-medium text-amber-600">{entry.mood}</span>
                </div>
                <p className="text-gray-700 text-sm">{entry.entry}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pregnancy Do's and Don'ts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Do's */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-green-100">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Pregnancy Do's</h3>
          </div>
          <div className="space-y-3">
            {[
              'Take prenatal vitamins daily',
              'Get regular prenatal checkups',
              'Stay physically active (with doctor approval)',
              'Get plenty of sleep and rest',
              'Practice stress management',
              'Stay hydrated throughout the day'
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Don'ts */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-red-100">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <Moon className="w-5 h-5 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Pregnancy Don'ts</h3>
          </div>
          <div className="space-y-3">
            {[
              'Avoid alcohol and smoking',
              'Limit caffeine intake',
              'Avoid raw or undercooked foods',
              'Don\'t take unprescribed medications',
              'Avoid hot tubs and saunas',
              'Don\'t ignore concerning symptoms'
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyTips;