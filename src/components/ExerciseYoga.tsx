import React, { useState } from 'react';
import { Activity, Heart, Users, Play, Clock, Target, Wind } from 'lucide-react';
import MonthNavigator from './MonthNavigator'; // Uses the navigator

// --- Data remains the same ---
const exerciseData = {
    // ... your exerciseData object remains unchanged
    1: { title: 'Month 1 (Weeks 1-4)', exercises: [ { name: 'Gentle Walking', duration: '15-20 minutes', description: 'Low-impact cardio to establish a routine.', benefits: 'Improves circulation and boosts energy.' }, { name: 'Pelvic Floor Exercises (Kegels)', duration: '5 minutes daily', description: 'Contract and relax pelvic muscles.', benefits: 'Supports bladder control and strengthens the pelvic base.' }, ], breathingTechniques: [ 'Deep Belly Breathing (Dirga Pranayama)', 'Focus on slow, intentional breaths.', 'Practice for 5 minutes daily to calm the mind.' ], postureGuidance: [ 'Be mindful of your posture while sitting and standing.', 'Keep your back straight and shoulders relaxed (Tadasana - Mountain Pose awareness).', 'Avoid slouching.' ] },
    2: { title: 'Month 2 (Weeks 5-8)', exercises: [ { name: 'Cat-Cow Pose (Marjaryasana-Bitilasana)', duration: '10-15 repetitions', description: 'A gentle spinal movement to increase flexibility.', benefits: 'Relieves back tension and improves posture.' }, { name: 'Neck and Shoulder Rolls', duration: '5 minutes', description: 'Slow, controlled movements to release stiffness.', benefits: 'Reduces tension headaches and upper body stiffness.' }, ], breathingTechniques: [ 'Alternate Nostril Breathing (Nadi Shodhana)', 'Helps balance energy and reduce anxiety.', 'Continue with Deep Belly Breathing.' ], postureGuidance: [ 'Take frequent breaks if you have a desk job.', 'Use a cushion for lower back support.', 'Stand up and stretch every hour.' ] },
    3: { title: 'Month 3 (Weeks 9-12)', exercises: [ { name: 'Butterfly Pose (Baddha Konasana)', duration: '5-10 minutes', description: 'Sit with soles of feet together, gently flap knees.', benefits: 'Opens up hips and improves flexibility in the groin area.' }, { name: 'Wall Sits', duration: '30-60 seconds, 3 reps', description: 'Slide down a wall into a seated position.', benefits: 'Strengthens quadriceps and glutes safely.' }, ], breathingTechniques: [ 'Box Breathing (4-4-4-4 count)', 'A structured technique to manage stress.', 'Practice when feeling overwhelmed.' ], postureGuidance: [ 'Avoid lifting heavy objects.', 'Bend at your knees, not your waist, when picking things up.', 'Maintain a neutral spine.' ] },
    4: { title: 'Month 4 (Weeks 13-16)', exercises: [ { name: 'Stationary Cycling', duration: '20-30 minutes', description: 'Low-impact cardio with good support.', benefits: 'Maintains cardiovascular health without stressing joints.' }, { name: 'Modified Triangle Pose (Trikonasana)', duration: '3-5 breaths per side', description: 'Use a block or chair for support, avoid deep twists.', benefits: 'Stretches hamstrings, groin, and hips.' }, ], breathingTechniques: [ 'Victorious Breath (Ujjayi Pranayama)', 'A gentle, audible breath to build internal heat and focus.', 'Inhale and exhale through the nose with a slight constriction in the throat.' ], postureGuidance: [ 'Start sleeping on your side, preferably the left.', 'Use pillows between your knees and under your belly for support.', 'Avoid lying flat on your back.' ] },
    5: { title: 'Month 5 (Weeks 17-20)', exercises: [ { name: 'Swimming or Water Aerobics', duration: '30 minutes', description: 'Full-body workout where water supports your weight.', benefits: 'Reduces swelling and relieves joint pressure.' }, { name: 'Light Strength Training', duration: '15-20 minutes', description: 'Use light weights or resistance bands for bicep curls, side leg raises.', benefits: 'Maintains muscle tone and strength.' }, ], breathingTechniques: [ 'Three-Part Breath (Dirga Swasam Pranayama)', 'Inhale into the belly, then rib cage, then chest.', 'Increases lung capacity and promotes relaxation.' ], postureGuidance: [ 'Choose supportive, acomfortable footwear.', 'Avoid high heels.', 'Ensure your workstation is ergonomic.' ] },
    6: { title: 'Month 6 (Weeks 21-24)', exercises: [ { name: 'Pelvic Tilts', duration: '10-15 repetitions', description: 'Lie on your back (or stand) and gently tilt your pelvis.', benefits: 'Strengthens abdominal muscles and can ease back pain.' }, { name: 'Modified Warrior II (Virabhadrasana II)', duration: '3-5 breaths per side', description: 'Take a shorter stance and avoid overextending.', benefits: 'Strengthens legs and opens hips.' }, ], breathingTechniques: [ 'Counted Breathing (Inhale 4, Exhale 6)', 'Longer exhales activate the relaxation response.', 'Excellent for calming the nervous system.' ], postureGuidance: [ 'Be mindful of your changing center of gravity.', 'Move slowly and deliberately to prevent falls.', 'Distribute weight evenly on both feet when standing.' ] },
    7: { title: 'Month 7 (Weeks 25-28)', exercises: [ { name: 'Birthing Ball Bouncing', duration: '10-15 minutes', description: 'Sit on a birthing ball and gently bounce or rock hips.', benefits: 'Reduces pelvic pressure and prepares for labor.' }, { name: 'Wall Push-ups', duration: '10-12 repetitions', description: 'Modified push-ups against a wall.', benefits: 'Maintains upper body strength safely.' }, ], breathingTechniques: [ 'Cooling Breath (Shitali Pranayama)', 'Inhale through a curled tongue to cool the body.', 'Helpful for managing heartburn or feeling overheated.' ], postureGuidance: [ 'Consider using a maternity support belt for belly and back support.', 'Elevate your feet when sitting for long periods.', 'Practice good posture to allow baby maximum room.' ] },
    8: { title: 'Month 8 (Weeks 29-32)', exercises: [ { name: 'Garland Pose (Malasana) with Support', duration: 'Hold for 30-60 seconds', description: 'A deep squat, using blocks or a wall for support.', benefits: 'Opens the pelvis and stretches the lower back.' }, { name: 'Ankle Pumps & Circles', duration: '5 minutes, several times a day', description: 'Simple foot movements while sitting or lying down.', benefits: 'Improves circulation and helps prevent swelling (edema).' }, ], breathingTechniques: [ 'Patterned Breathing (e.g., Hee-Hee-Hoo)', 'Practice light, rhythmic breathing patterns for labor.', 'Helps build focus and stamina.' ], postureGuidance: [ 'Continue sleeping on your side with ample pillow support.', 'Avoid sudden twisting movements.', 'Listen to your body and move in ways that feel good.' ] },
    9: { title: 'Month 9 (Weeks 33-40+)', exercises: [ { name: 'Gentle Hip Circles on Ball', duration: '5-10 minutes', description: 'Sit on a birthing ball and make slow circles with your hips.', benefits: 'Encourages baby into an optimal position and relieves pressure.' }, { name: 'Child\'s Pose (Balasana) - Wide Knee', duration: 'Hold as long as comfortable', description: 'Rest with knees wide apart to make room for the belly.', benefits: 'A restful pose that gently stretches the hips and back.' }, ], breathingTechniques: [ 'Visualization Breathing', 'Breathe in calm, breathe out tension.', 'Focus on breathing for labor and delivery.' ], postureGuidance: [ 'Rest as much as possible.', 'Practice positions that may be comfortable during labor (e.g., leaning forward).', 'Focus on alignment to reduce discomfort.' ] }
};

// --- MODIFICATION 1: UPDATE THE PROPS INTERFACE ---
interface ExerciseYogaProps {
  currentMonth: number;
  onNext: () => void;
  onPrev: () => void;
}

// --- MODIFICATION 2: UPDATE THE COMPONENT SIGNATURE ---
const ExerciseYoga: React.FC<ExerciseYogaProps> = ({ currentMonth, onNext, onPrev }) => {
  const [activeExercise, setActiveExercise] = useState<number | null>(null);
  const data = exerciseData[currentMonth as keyof typeof exerciseData];

  // A small safety check
  if (!data) {
    return <div>Loading exercise data...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-purple-100">
        
        {/* --- MODIFICATION 3: PASS THE NEW PROPS TO THE NAVIGATOR --- */}
        <MonthNavigator 
          currentMonth={currentMonth} 
          onNext={onNext}
          onPrev={onPrev}
        />
        
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-violet-400 rounded-full flex items-center justify-center">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Exercise & Yoga</h2>
            <p className="text-gray-600">Safe movements for your pregnancy journey</p>
          </div>
        </div>
      </div>

      {/* Exercise Cards */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border-purple-50">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center space-x-2 mb-4">
          <Target className="w-6 h-6 text-purple-600" />
          <span>Recommended Exercises & Asanas for Month {currentMonth}</span>
        </h3>
        
        {data.exercises.map((exercise, index) => (
          <div
            key={index}
            className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-purple-100 overflow-hidden mb-4"
          >
            <div
              className="p-4 md:p-6 cursor-pointer hover:bg-purple-50 transition-colors"
              onClick={() => setActiveExercise(activeExercise === index ? null : index)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Play className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">{exercise.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{exercise.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`transform transition-transform duration-300 ${
                  activeExercise === index ? 'rotate-90' : ''
                }`}>
                  <Play className="w-5 h-5 text-purple-400" />
                </div>
              </div>
            </div>
            
            {activeExercise === index && (
              <div className="px-4 md:px-6 pb-6 border-t border-purple-100 bg-purple-50/50">
                <div className="pt-4 space-y-3">
                  <p className="text-gray-700">{exercise.description}</p>
                  <div className="flex items-start space-x-2 text-green-700">
                    <Heart className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <p><strong>Benefits:</strong> {exercise.benefits}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Breathing Techniques */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-blue-100">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <Wind className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">Pranayama (Breathing)</h3>
        </div>
        <div className="space-y-3">
          {data.breathingTechniques.map((technique, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-700">{technique}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Posture Guidance */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-green-100">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <Users className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">Posture Guidance</h3>
        </div>
        <div className="space-y-3">
          {data.postureGuidance.map((guidance, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-700">{guidance}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Reminder */}
      <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl p-6 border border-orange-200 shadow-lg">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-white/50 rounded-full flex items-center justify-center flex-shrink-0 border border-orange-200">
            <Heart className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Safety First!</h3>
            <p className="text-gray-700">
              Always consult with your doctor or a qualified prenatal yoga instructor before starting any exercise program. 
              Stop immediately if you experience pain, dizziness, or unusual symptoms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseYoga;