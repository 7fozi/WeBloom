import React, { useState } from 'react';
import { MessageCircle, Send, User, Bot, Heart, Clock, Star, Search } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: string;
}

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

const commonFAQs: FAQ[] = [
  {
    question: "What foods should I avoid during pregnancy?",
    answer: "Avoid raw or undercooked meats, fish high in mercury, unpasteurized products, raw eggs, and excessive caffeine. Also avoid alcohol and smoking completely.",
    category: "Nutrition"
  },
  {
    question: "How much weight should I gain during pregnancy?",
    answer: "Weight gain depends on your pre-pregnancy BMI. Generally, normal BMI women should gain 25-35 lbs, underweight women 28-40 lbs, and overweight women 15-25 lbs.",
    category: "Health"
  },
  {
    question: "When will I feel my baby move?",
    answer: "First-time mothers typically feel movement between 18-22 weeks, while experienced mothers may feel it as early as 16 weeks. Initial movements feel like butterflies or gas bubbles.",
    category: "Development"
  },
  {
    question: "Is it safe to exercise during pregnancy?",
    answer: "Yes, most women can safely exercise during pregnancy. Low-impact activities like walking, swimming, and prenatal yoga are excellent choices. Always consult your healthcare provider first.",
    category: "Exercise"
  },
  {
    question: "What are Braxton Hicks contractions?",
    answer: "Braxton Hicks are 'practice' contractions that help prepare your uterus for labor. They're usually irregular, mild, and don't increase in intensity or frequency like true labor contractions.",
    category: "Labor"
  },
  {
    question: "How often should I have prenatal checkups?",
    answer: "Typically monthly until 28 weeks, bi-weekly from 28-36 weeks, then weekly until delivery. High-risk pregnancies may require more frequent visits.",
    category: "Medical"
  }
];

const expertResponses = [
  "That's a great question! Based on current medical guidelines, I'd recommend...",
  "Every pregnancy is unique, but generally speaking...",
  "I understand your concern. Here's what the latest research shows...",
  "This is something many expecting mothers ask about. Let me explain...",
  "Thank you for reaching out. From a medical perspective..."
];

const AskExpert: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm Dr. Sarah, your virtual pregnancy consultant. I'm here to help answer your questions about pregnancy, health, and baby development. How can I assist you today?",
      isUser: false,
      timestamp: "10:00 AM"
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isTyping, setIsTyping] = useState(false);

  const categories = ['All', 'Nutrition', 'Health', 'Development', 'Exercise', 'Labor', 'Medical'];

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate expert response
    setTimeout(() => {
      const randomResponse = expertResponses[Math.floor(Math.random() * expertResponses.length)];
      const expertMessage: Message = {
        id: messages.length + 2,
        text: `${randomResponse} If you have specific concerns, please consult with your healthcare provider for personalized advice.`,
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, expertMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleFAQClick = (faq: FAQ) => {
    const userMessage: Message = {
      id: messages.length + 1,
      text: faq.question,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const expertMessage: Message = {
      id: messages.length + 2,
      text: faq.answer,
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage, expertMessage]);
  };

  const filteredFAQs = commonFAQs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-cyan-100">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Ask the Expert</h2>
            <p className="text-gray-600">Get answers to your pregnancy questions</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2 px-3 py-1 bg-green-100 text-green-700 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Dr. Sarah - Online</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-500">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>4.9/5 rating</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-cyan-50/30 to-blue-50/30">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                    message.isUser 
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-br-md' 
                      : 'bg-white shadow-md text-gray-800 rounded-bl-md border border-gray-100'
                  }`}>
                    <div className="flex items-start space-x-2">
                      {!message.isUser && (
                        <div className="w-6 h-6 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Bot className="w-3 h-3 text-white" />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="text-sm leading-relaxed">{message.text}</p>
                        <p className={`text-xs mt-2 ${message.isUser ? 'text-cyan-100' : 'text-gray-500'}`}>
                          {message.timestamp}
                        </p>
                      </div>
                      {message.isUser && (
                        <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <User className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start animate-fade-in">
                  <div className="bg-white shadow-md text-gray-800 rounded-2xl rounded-bl-md border border-gray-100 px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center">
                        <Bot className="w-3 h-3 text-white" />
                      </div>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Input Area */}
            <div className="p-4 border-t border-gray-200 bg-white/50">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Ask your pregnancy question..."
                  className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputText.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Sidebar */}
        <div className="space-y-4">
          {/* Search & Filter */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-gray-100">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-cyan-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Common Questions */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
              <Heart className="w-5 h-5 text-pink-500" />
              <span>Common Questions</span>
            </h3>
            
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {filteredFAQs.map((faq, index) => (
                <div
                  key={index}
                  onClick={() => handleFAQClick(faq)}
                  className="p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg cursor-pointer hover:from-cyan-50 hover:to-blue-50 transition-all duration-200 transform hover:scale-[1.02] hover:shadow-md"
                >
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-800 mb-1">{faq.question}</p>
                      <span className="text-xs text-cyan-600 font-medium">{faq.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Expert Info */}
          <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl p-4 border border-pink-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <User className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">Dr. Sarah Johnson</h4>
              <p className="text-sm text-gray-600 mb-2">Certified Gynecologist</p>
              <div className="flex items-center justify-center space-x-1 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Available 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-gradient-to-r from-orange-100 to-amber-100 rounded-2xl p-6 border border-orange-200">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center flex-shrink-0">
            <Heart className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Important Note</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              This virtual consultation provides general information and should not replace professional medical advice. 
              Always consult with your healthcare provider for personalized medical guidance and treatment plans. 
              In case of emergencies, contact your doctor immediately or call emergency services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskExpert;