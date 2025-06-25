import React, { useState } from 'react';
import { BookOpen, HelpCircle, AlertTriangle, Search, ChevronRight } from 'lucide-react';

const articles = [
  {
    id: 1,
    title: 'Understanding Prenatal Checkups',
    category: 'Medical',
    readTime: '5 min read',
    summary: 'Essential guide to what happens during your prenatal appointments',
    content: 'Regular prenatal checkups are crucial for monitoring both your health and your baby\'s development...'
  },
  {
    id: 2,
    title: 'Common Pregnancy Symptoms',
    category: 'Health',
    readTime: '4 min read',
    summary: 'Learn about normal pregnancy symptoms and when to seek help',
    content: 'Morning sickness, fatigue, and mood changes are common during pregnancy...'
  },
  {
    id: 3,
    title: 'Preparing for Labor and Delivery',
    category: 'Labor',
    readTime: '8 min read',
    summary: 'Everything you need to know about the birthing process',
    content: 'Understanding the stages of labor can help you feel more prepared and confident...'
  }
];

const faqs = [
  {
    question: 'How much weight should I gain during pregnancy?',
    answer: 'Weight gain recommendations vary based on your pre-pregnancy BMI. Generally, women with normal BMI should gain 25-35 pounds during pregnancy.'
  },
  {
    question: 'Is it safe to exercise during pregnancy?',
    answer: 'Most women can safely exercise during pregnancy. Low-impact activities like walking, swimming, and prenatal yoga are generally recommended.'
  },
  {
    question: 'What medications are safe during pregnancy?',
    answer: 'Always consult your healthcare provider before taking any medications. Some over-the-counter drugs may not be safe during pregnancy.'
  },
  {
    question: 'How often should I feel my baby move?',
    answer: 'You should feel your baby move regularly after 28 weeks. Contact your doctor if you notice a significant decrease in movement.'
  }
];

const myths = [
  {
    myth: 'You should eat for two during pregnancy',
    fact: 'You only need about 300 extra calories per day in the second and third trimesters. Quality of food matters more than quantity.'
  },
  {
    myth: 'You can\'t exercise during pregnancy',
    fact: 'Regular exercise is beneficial for most pregnant women and can help with labor and recovery.'
  },
  {
    myth: 'Heartburn means your baby will have lots of hair',
    fact: 'Heartburn is caused by hormonal changes and pressure from the growing uterus, not by baby\'s hair growth.'
  },
  {
    myth: 'You should avoid all seafood during pregnancy',
    fact: 'Low-mercury fish like salmon and sardines are actually beneficial and safe to eat during pregnancy in moderation.'
  }
];

const KnowledgeHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'articles' | 'faqs' | 'myths'>('articles');
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContent = () => {
    if (activeTab === 'articles') {
      return articles.filter(article => 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (activeTab === 'faqs') {
      return faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return myths.filter(myth => 
      myth.myth.toLowerCase().includes(searchTerm.toLowerCase()) ||
      myth.fact.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-blue-100">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Knowledge Hub</h2>
            <p className="text-gray-600">Reliable information for your pregnancy journey</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search articles, FAQs, or myths..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-2">
          {[
            { key: 'articles', label: 'Articles', icon: BookOpen },
            { key: 'faqs', label: 'FAQs', icon: HelpCircle },
            { key: 'myths', label: 'Myth Busters', icon: AlertTriangle }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.key
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      <div className="space-y-4">
        {activeTab === 'articles' && (
          <>
            {filteredContent().map((article: any) => (
              <div
                key={article.id}
                className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200 cursor-pointer"
                onClick={() => setSelectedArticle(selectedArticle === article.id ? null : article.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {article.category}
                      </span>
                      <span className="text-sm text-gray-500">{article.readTime}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{article.title}</h3>
                    <p className="text-gray-600">{article.summary}</p>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${
                    selectedArticle === article.id ? 'rotate-90' : ''
                  }`} />
                </div>
                
                {selectedArticle === article.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed">{article.content}</p>
                  </div>
                )}
              </div>
            ))}
          </>
        )}

        {activeTab === 'faqs' && (
          <>
            {filteredContent().map((faq: any, index: number) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
              >
                <div
                  className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800 pr-4">{faq.question}</h3>
                    <ChevronRight className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 flex-shrink-0 ${
                      expandedFAQ === index ? 'rotate-90' : ''
                    }`} />
                  </div>
                </div>
                
                {expandedFAQ === index && (
                  <div className="px-6 pb-6 border-t border-gray-200 bg-gray-50">
                    <p className="text-gray-700 leading-relaxed pt-4">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </>
        )}

        {activeTab === 'myths' && (
          <>
            {filteredContent().map((mythItem: any, index: number) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-orange-100"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-red-600 mb-1">MYTH</h4>
                      <p className="text-gray-800 font-medium">{mythItem.myth}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-green-600 mb-1">FACT</h4>
                      <p className="text-gray-700">{mythItem.fact}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Empty State */}
      {filteredContent().length === 0 && (
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-12 shadow-lg border border-gray-100 text-center">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No results found</h3>
          <p className="text-gray-600">Try adjusting your search terms or browse different categories.</p>
        </div>
      )}
    </div>
  );
};

export default KnowledgeHub;