import React, { useState } from 'react';
import { Moon, Bed, Clock, Heart, Volume2, VolumeX } from 'lucide-react';

const sleepPositions = [
  {
    trimester: 'First Trimester',
    positions: [
      { name: 'Any comfortable position', safe: true, description: 'Sleep in any position that feels comfortable' },
      { name: 'Back sleeping', safe: true, description: 'Still safe during early pregnancy' },
      { name: 'Side sleeping', safe: true, description: 'Start practicing left side sleeping' }
    ]
  },
  {
    trimester: 'Second Trimester',
    positions: [
      { name: 'Left side sleeping', safe: true, description: 'Optimal blood flow to baby and kidneys' },
      { name: 'Right side sleeping', safe: true, description: 'Acceptable alternative to left side' },
      { name: 'Back sleeping', safe: false, description: 'Avoid after 20 weeks - can compress blood vessels' }
    ]
  },
  {
    trimester: 'Third Trimester',
    positions: [
      { name: 'Left side sleeping', safe: true, description: 'Best position for you and baby' },
      { name: 'Right side sleeping', safe: true, description: 'Good alternative if left side is uncomfortable' },
      { name: 'Back sleeping', safe: false, description: 'Avoid completely - can cause complications' }
    ]
  }
];

const sleepTips = [
  'Use a pregnancy pillow to support your belly and back',
  'Keep your bedroom cool and dark',
  'Establish a consistent bedtime routine',
  'Avoid large meals and caffeine before bedtime',
  'Try a warm bath or gentle stretches before sleep',
  'Keep a glass of water by your bedside',
  'Use blackout curtains or an eye mask',
  'Practice relaxation techniques before sleep'
];

const relaxationTechniques = [
  {
    name: 'Progressive Muscle Relaxation',
    duration: '10-15 minutes',
    description: 'Tense and release each muscle group starting from your toes up to your head',
    steps: [
      'Lie down comfortably',
      'Start with your toes - tense for 5 seconds, then relax',
      'Move up through each muscle group',
      'Focus on the feeling of relaxation'
    ]
  },
  {
    name: 'Deep Breathing Exercise',
    duration: '5-10 minutes',
    description: 'Slow, deep breathing to calm your mind and body',
    steps: [
      'Breathe in slowly through your nose for 4 counts',
      'Hold your breath for 4 counts',
      'Exhale slowly through your mouth for 6 counts',
      'Repeat until you feel relaxed'
    ]
  },
  {
    name: 'Guided Imagery',
    duration: '15-20 minutes',
    description: 'Visualize peaceful scenes to promote relaxation',
    steps: [
      'Close your eyes and get comfortable',
      'Imagine a peaceful place',
      'Focus on all the sensory details',
      'Let yourself fully experience the calm'
    ]
  }
];

const SleepRest: React.FC = () => {
  const [selectedTrimester, setSelectedTrimester] = useState(0);
  const [selectedTechnique, setSelectedTechnique] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sleepHours, setSleepHours] = useState(8);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-indigo-100">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center">
            <Moon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Sleep & Rest</h2>
            <p className="text-gray-600">Better sleep for a healthier pregnancy</p>
          </div>
        </div>
      </div>

      {/* Sleep Tracker */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-blue-100">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <Clock className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Sleep Goal</h3>
        </div>
        
        <div className="bg-blue-50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-700">Target: 8-10 hours per night</span>
            <span className="text-blue-600 font-semibold">{sleepHours} hours</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
            <div 
              className="bg-gradient-to-r from-blue-400 to-indigo-400 h-4 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((sleepHours / 10) * 100, 100)}%` }}
            ></div>
          </div>
          
          <input
            type="range"
            min="4"
            max="12"
            value={sleepHours}
            onChange={(e) => setSleepHours(parseInt(e.target.value))}
            className="w-full mt-2"
          />
        </div>
      </div>

      {/* Sleep Positions */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-green-100">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <Bed className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Safe Sleep Positions</h3>
        </div>
        
        <div className="flex space-x-2 mb-4">
          {sleepPositions.map((period, index) => (
            <button
              key={index}
              onClick={() => setSelectedTrimester(index)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                selectedTrimester === index
                  ? 'bg-green-500 text-white shadow-md'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              {period.trimester}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {sleepPositions[selectedTrimester].positions.map((position, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl border-2 ${
                position.safe 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  position.safe ? 'bg-green-500' : 'bg-red-500'
                }`}>
                  <span className="text-white text-sm">{position.safe ? '✓' : '✗'}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{position.name}</h4>
                  <p className="text-gray-600 text-sm">{position.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sleep Tips */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-purple-100">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <Heart className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Sleep Tips</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sleepTips.map((tip, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <p className="text-gray-700">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Relaxation Techniques */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
          <Moon className="w-6 h-6 text-indigo-600" />
          <span>Relaxation Techniques</span>
        </h3>
        
        {relaxationTechniques.map((technique, index) => (
          <div
            key={index}
            className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
          >
            <div
              className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => setSelectedTechnique(selectedTechnique === index ? null : index)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">{technique.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{technique.duration}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPlaying(!isPlaying);
                  }}
                  className="p-2 bg-indigo-100 text-indigo-600 rounded-full hover:bg-indigo-200 transition-colors"
                >
                  {isPlaying ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
              </div>
            </div>
            
            {selectedTechnique === index && (
              <div className="px-6 pb-6 border-t border-gray-200 bg-gray-50">
                <div className="pt-4 space-y-4">
                  <p className="text-gray-700">{technique.description}</p>
                  <div>
                    <h5 className="font-semibold text-gray-800 mb-2">Steps:</h5>
                    <ol className="list-decimal list-inside space-y-1">
                      {technique.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="text-gray-700">{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Sleep Quality Reminder */}
      <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl p-6 border border-indigo-200">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-indigo-200 rounded-full flex items-center justify-center flex-shrink-0">
            <Moon className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Quality Sleep Matters</h3>
            <p className="text-gray-700">
              Getting adequate, quality sleep during pregnancy is crucial for both your health and 
              your baby's development. If you're experiencing persistent sleep problems, 
              consult with your healthcare provider.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SleepRest;