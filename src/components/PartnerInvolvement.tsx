import React, { useState } from 'react';
import { Users, Heart, Baby, Lightbulb, CheckCircle, Gift } from 'lucide-react';

const partnerTips = [
  {
    category: 'Emotional Support',
    icon: Heart,
    color: 'bg-pink-100 text-pink-600',
    tips: [
      'Listen without trying to fix everything',
      'Validate her feelings and experiences',
      'Be patient with mood swings - they\'re normal',
      'Offer physical comfort like hugs and back rubs',
      'Ask how you can help each day'
    ]
  },
  {
    category: 'Practical Support',
    icon: CheckCircle,
    color: 'bg-green-100 text-green-600',
    tips: [
      'Help with household chores without being asked',
      'Take over tasks that are difficult during pregnancy',
      'Attend prenatal appointments together',
      'Help prepare the baby\'s room and essentials',
      'Research and discuss parenting approaches together'
    ]
  },
  {
    category: 'Health & Wellness',
    icon: Lightbulb,
    color: 'bg-blue-100 text-blue-600',
    tips: [
      'Encourage healthy eating by cooking nutritious meals',
      'Join her in pregnancy-safe exercises',
      'Help track appointments and important dates',
      'Support her in taking prenatal vitamins',
      'Create a calm, stress-free environment at home'
    ]
  }
];

const supportActivities = [
  {
    title: 'Baby Moon Planning',
    description: 'Plan a special getaway before baby arrives',
    duration: 'Weekend or longer',
    ideas: [
      'Choose a relaxing destination',
      'Book pregnancy-friendly activities',
      'Plan for comfort and rest',
      'Create lasting memories together'
    ]
  },
  {
    title: 'Nursery Preparation',
    description: 'Work together to create the perfect baby space',
    duration: 'Several weekends',
    ideas: [
      'Pick colors and themes together',
      'Assemble furniture as a team',
      'Organize baby clothes by size',
      'Create a cozy reading corner'
    ]
  },
  {
    title: 'Prenatal Classes',
    description: 'Learn about childbirth and parenting together',
    duration: '6-8 weeks',
    ideas: [
      'Attend birthing classes',
      'Learn baby care basics',
      'Practice breathing techniques',
      'Meet other expecting couples'
    ]
  },
  {
    title: 'Memory Making',
    description: 'Document the pregnancy journey together',
    duration: 'Throughout pregnancy',
    ideas: [
      'Take monthly bump photos',
      'Keep a pregnancy journal together',
      'Record voice messages to your baby',
      'Create a pregnancy photo book'
    ]
  }
];

const commonConcerns = [
  {
    concern: 'Feeling overwhelmed about becoming a parent',
    response: 'It\'s completely normal to feel this way. Talk about your fears together and remember that parenting is learned, not instinctual.',
    tips: ['Read parenting books together', 'Talk to experienced parents', 'Consider parenting classes']
  },
  {
    concern: 'Worried about the birth process',
    response: 'Birth can be unpredictable, but being informed helps. Attend classes and discuss birth preferences with your partner.',
    tips: ['Create a birth plan together', 'Tour the hospital or birthing center', 'Practice relaxation techniques']
  },
  {
    concern: 'Concerned about relationship changes',
    response: 'Your relationship will evolve, but this can strengthen your bond. Keep communicating and make time for each other.',
    tips: ['Schedule regular date nights', 'Maintain physical intimacy as comfortable', 'Discuss expectations openly']
  },
  {
    concern: 'Financial worries about raising a child',
    response: 'Financial planning is important but don\'t let it overwhelm you. Start with basics and adjust as you go.',
    tips: ['Create a baby budget together', 'Research cost-saving strategies', 'Plan for parental leave']
  }
];

const PartnerInvolvement: React.FC = () => {
  const [selectedActivity, setSelectedActivity] = useState<number | null>(null);
  const [expandedConcern, setExpandedConcern] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-amber-100">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Partner Support</h2>
            <p className="text-gray-600">Strengthening your bond during pregnancy</p>
          </div>
        </div>
      </div>

      {/* Partner Tips */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
          <Gift className="w-6 h-6 text-amber-600" />
          <span>Tips for Partners</span>
        </h3>
        
        {partnerTips.map((category, index) => {
          const Icon = category.icon;
          return (
            <div key={index} className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-10 h-10 ${category.color} rounded-full flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800">{category.category}</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {category.tips.map((tip, tipIndex) => (
                  <div key={tipIndex} className={`p-3 ${category.color.replace('text-', 'bg-').replace('-600', '-50')} rounded-lg`}>
                    <div className="flex items-start space-x-2">
                      <div className={`w-2 h-2 ${category.color.replace('bg-', 'bg-').replace('text-', '').replace('-100', '-500')} rounded-full mt-2`}></div>
                      <p className="text-gray-700 text-sm">{tip}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Support Activities */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
          <Baby className="w-6 h-6 text-purple-600" />
          <span>Activities to Do Together</span>
        </h3>
        
        {supportActivities.map((activity, index) => (
          <div
            key={index}
            className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-purple-100 overflow-hidden"
          >
            <div
              className="p-6 cursor-pointer hover:bg-purple-50 transition-colors"
              onClick={() => setSelectedActivity(selectedActivity === index ? null : index)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">{activity.title}</h4>
                  <p className="text-gray-600 text-sm">{activity.description}</p>
                  <span className="text-xs text-purple-600 font-medium mt-1 inline-block">{activity.duration}</span>
                </div>
                <div className={`transform transition-transform duration-200 ${
                  selectedActivity === index ? 'rotate-90' : ''
                }`}>
                  <div className="w-3 h-3 bg-purple-500" style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}></div>
                </div>
              </div>
            </div>
            
            {selectedActivity === index && (
              <div className="px-6 pb-6 border-t border-purple-200 bg-purple-50">
                <div className="pt-4">
                  <h5 className="font-semibold text-gray-800 mb-3">Ideas to try:</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {activity.ideas.map((idea, ideaIndex) => (
                      <div key={ideaIndex} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{idea}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Common Concerns */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
          <Lightbulb className="w-6 h-6 text-blue-600" />
          <span>Common Concerns & How to Help</span>
        </h3>
        
        {commonConcerns.map((item, index) => (
          <div
            key={index}
            className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-blue-100 overflow-hidden"
          >
            <div
              className="p-6 cursor-pointer hover:bg-blue-50 transition-colors"
              onClick={() => setExpandedConcern(expandedConcern === index ? null : index)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">{item.concern}</h4>
                  <p className="text-gray-600">{item.response}</p>
                </div>
                <div className={`transform transition-transform duration-200 ml-4 ${
                  expandedConcern === index ? 'rotate-90' : ''
                }`}>
                  <div className="w-3 h-3 bg-blue-500" style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}></div>
                </div>
              </div>
            </div>
            
            {expandedConcern === index && (
              <div className="px-6 pb-6 border-t border-blue-200 bg-blue-50">
                <div className="pt-4">
                  <h5 className="font-semibold text-gray-800 mb-3">Helpful actions:</h5>
                  <div className="space-y-2">
                    {item.tips.map((tip, tipIndex) => (
                      <div key={tipIndex} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <span className="text-gray-700">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Communication Tips */}
      <div className="bg-gradient-to-r from-rose-100 to-pink-100 rounded-2xl p-6 border border-rose-200">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-rose-200 rounded-full flex items-center justify-center flex-shrink-0">
            <Heart className="w-5 h-5 text-rose-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Communication is Key</h3>
            <p className="text-gray-700 mb-4">
              Open, honest communication is the foundation of good partnership during pregnancy. 
              Remember to check in with each other regularly, share your feelings, and work together as a team.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Good communication includes:</h4>
                <ul className="space-y-1 text-gray-700">
                  <li>• Active listening</li>
                  <li>• Expressing needs clearly</li>
                  <li>• Being patient and understanding</li>
                  <li>• Regular check-ins</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Remember to discuss:</h4>
                <ul className="space-y-1 text-gray-700">
                  <li>• Birth preferences</li>
                  <li>• Parenting styles</li>
                  <li>• Household responsibilities</li>
                  <li>• Future plans and goals</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerInvolvement;