import React, { useState } from 'react';
import { Brain, Heart, Play, Pause, RotateCcw, Smile, Frown, Meh } from 'lucide-react';

const meditationTracks = [
  {
    id: 1,
    title: 'Prenatal Breathing Meditation',
    duration: '10 minutes',
    description: 'Gentle breathing exercises to connect with your baby',
    category: 'Breathing'
  },
  {
    id: 2,
    title: 'Body Scan for Pregnancy',
    duration: '15 minutes',
    description: 'Progressive relaxation focusing on your changing body',
    category: 'Relaxation'
  },
  {
    id: 3,
    title: 'Anxiety Relief Meditation',
    duration: '12 minutes',
    description: 'Calming meditation to reduce pregnancy worries',
    category: 'Anxiety Relief'
  },
  {
    id: 4,
    title: 'Bonding with Baby',
    duration: '8 minutes',
    description: 'Visualization meditation to connect with your unborn child',
    category: 'Bonding'
  }
];

const anxietyExercises = [
  {
    name: '4-7-8 Breathing',
    description: 'Inhale for 4, hold for 7, exhale for 8 counts',
    steps: [
      'Sit comfortably with your back straight',
      'Inhale quietly through your nose for 4 counts',
      'Hold your breath for 7 counts',
      'Exhale completely through your mouth for 8 counts',
      'Repeat 3-4 times'
    ]
  },
  {
    name: '5-4-3-2-1 Grounding',
    description: 'Use your senses to ground yourself in the present moment',
    steps: [
      'Name 5 things you can see around you',
      'Name 4 things you can touch',
      'Name 3 things you can hear',
      'Name 2 things you can smell',
      'Name 1 thing you can taste'
    ]
  },
  {
    name: 'Progressive Muscle Relaxation',
    description: 'Tense and release muscle groups to reduce physical tension',
    steps: [
      'Start with your toes - tense for 5 seconds, then relax',
      'Move up to your calves, thighs, and so on',
      'Work through each muscle group up to your head',
      'Focus on the contrast between tension and relaxation',
      'End with deep breathing'
    ]
  }
];

const moodTrackerOptions = [
  { mood: 'Great', emoji: '😊', color: 'bg-green-100 text-green-600', value: 5 },
  { mood: 'Good', emoji: '🙂', color: 'bg-blue-100 text-blue-600', value: 4 },
  { mood: 'Okay', emoji: '😐', color: 'bg-yellow-100 text-yellow-600', value: 3 },
  { mood: 'Not Great', emoji: '😟', color: 'bg-orange-100 text-orange-600', value: 2 },
  { mood: 'Difficult', emoji: '😢', color: 'bg-red-100 text-red-600', value: 1 }
];

const MindMood: React.FC = () => {
  const [playingTrack, setPlayingTrack] = useState<number | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<number | null>(null);
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [moodHistory, setMoodHistory] = useState<Array<{date: string, mood: number, notes: string}>>([]);
  const [moodNotes, setMoodNotes] = useState('');

  const togglePlay = (trackId: number) => {
    setPlayingTrack(playingTrack === trackId ? null : trackId);
  };

  const saveMoodEntry = () => {
    if (selectedMood !== null) {
      const newEntry = {
        date: new Date().toLocaleDateString(),
        mood: selectedMood,
        notes: moodNotes.trim()
      };
      setMoodHistory([newEntry, ...moodHistory.slice(0, 6)]);
      setSelectedMood(null);
      setMoodNotes('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-teal-100">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-full flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Mind & Mood</h2>
            <p className="text-gray-600">Mental wellness during pregnancy</p>
          </div>
        </div>
      </div>

      {/* Mood Tracker */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-pink-100">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
            <Heart className="w-5 h-5 text-pink-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">How are you feeling today?</h3>
        </div>
        
        <div className="grid grid-cols-5 gap-3 mb-4">
          {moodTrackerOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => setSelectedMood(option.value)}
              className={`p-4 rounded-xl transition-all duration-200 hover:scale-105 ${
                selectedMood === option.value
                  ? `${option.color} shadow-md scale-105`
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <div className="text-2xl mb-2">{option.emoji}</div>
              <div className="text-sm font-medium text-gray-700">{option.mood}</div>
            </button>
          ))}
        </div>

        {selectedMood !== null && (
          <div className="space-y-4">
            <textarea
              value={moodNotes}
              onChange={(e) => setMoodNotes(e.target.value)}
              placeholder="Any thoughts or notes about how you're feeling? (optional)"
              className="w-full h-24 p-4 bg-pink-50 border border-pink-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button
              onClick={saveMoodEntry}
              className="w-full py-3 bg-gradient-to-r from-pink-400 to-rose-400 text-white font-medium rounded-xl hover:from-pink-500 hover:to-rose-500 transition-all duration-200"
            >
              Save Mood Entry
            </button>
          </div>
        )}

        {/* Mood History */}
        {moodHistory.length > 0 && (
          <div className="mt-6 pt-6 border-t border-pink-200">
            <h4 className="text-md font-semibold text-gray-800 mb-3">Recent Mood History</h4>
            <div className="space-y-2">
              {moodHistory.slice(0, 3).map((entry, index) => {
                const moodOption = moodTrackerOptions.find(opt => opt.value === entry.mood);
                return (
                  <div key={index} className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{moodOption?.emoji}</span>
                      <div>
                        <span className="font-medium text-gray-800">{moodOption?.mood}</span>
                        <p className="text-sm text-gray-600">{entry.date}</p>
                      </div>
                    </div>
                    {entry.notes && (
                      <p className="text-sm text-gray-600 italic max-w-xs truncate">{entry.notes}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Meditation Tracks */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-purple-100">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <Play className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Meditation Tracks</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {meditationTracks.map((track) => (
            <div key={track.id} className="p-4 bg-purple-50 rounded-xl">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-800">{track.title}</h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                    <span>{track.duration}</span>
                    <span>•</span>
                    <span>{track.category}</span>
                  </div>
                </div>
                <button
                  onClick={() => togglePlay(track.id)}
                  className="p-2 bg-purple-200 text-purple-600 rounded-full hover:bg-purple-300 transition-colors"
                >
                  {playingTrack === track.id ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="text-gray-700 text-sm">{track.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Anxiety Relief Exercises */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
          <RotateCcw className="w-6 h-6 text-blue-600" />
          <span>Anxiety Relief Exercises</span>
        </h3>
        
        {anxietyExercises.map((exercise, index) => (
          <div
            key={index}
            className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-blue-100 overflow-hidden"
          >
            <div
              className="p-6 cursor-pointer hover:bg-blue-50 transition-colors"
              onClick={() => setSelectedExercise(selectedExercise === index ? null : index)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">{exercise.name}</h4>
                  <p className="text-gray-600 text-sm">{exercise.description}</p>
                </div>
                <div className={`w-3 h-3 bg-blue-500 transform transition-transform duration-200 ${
                  selectedExercise === index ? 'rotate-45' : ''
                }`} style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}></div>
              </div>
            </div>
            
            {selectedExercise === index && (
              <div className="px-6 pb-6 border-t border-blue-200 bg-blue-50">
                <div className="pt-4">
                  <h5 className="font-semibold text-gray-800 mb-3">Steps:</h5>
                  <ol className="list-decimal list-inside space-y-2">
                    {exercise.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="text-gray-700">{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mental Health Resources */}
      <div className="bg-gradient-to-r from-teal-100 to-cyan-100 rounded-2xl p-6 border border-teal-200">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-teal-200 rounded-full flex items-center justify-center flex-shrink-0">
            <Heart className="w-5 h-5 text-teal-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Remember</h3>
            <p className="text-gray-700 mb-4">
              It's completely normal to experience a range of emotions during pregnancy. 
              These tools can help, but if you're experiencing persistent anxiety, depression, 
              or other mental health concerns, please reach out to your healthcare provider.
            </p>
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>Crisis Support:</strong> If in immediate distress, call emergency services</p>
              <p><strong>Mental Health Hotline:</strong> Available 24/7 for support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MindMood;