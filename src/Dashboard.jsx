import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserButton } from '@clerk/clerk-react';
import { useUser } from '@clerk/clerk-react';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedSection, setSelectedSection] = useState('overview');
  const [userName, setUserName] = useState('User'); // You can replace this with actual user data
  const navigate = useNavigate();
  const { user } = useUser();

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const sidebarItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'chatbot', label: 'AI Chatbot' },
    { id: 'games', label: 'Wellness Games' },
    { id: 'sessions', label: 'Book Session' },
    { id: 'progress', label: 'My Progress' },
    { id: 'resources', label: 'Resources' },
    { id: 'settings', label: 'Settings' }
  ];

  const quickActions = [
    { title: 'Start Chat Session', description: 'Talk to our AI counselor', color: '"bg-[#406246]', action: () => setSelectedSection('chatbot') },
    { title: 'Play Mindfulness Game', description: 'Relax with guided activities', color: '"bg-[#406246]', action: () => setSelectedSection('games') },
    { title: 'Book Appointment', description: 'Schedule with a professional', color: '"bg-[#406246]', action: () => setSelectedSection('sessions') },
    { title: 'View Progress', description: 'Check your wellness journey', color: '"bg-[#406246]', action: () => setSelectedSection('progress') }
  ];

  const renderMainContent = () => {
    switch (selectedSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            
              <h2 className="text-2xl font-bold text-white mb-4">Welcome Back, {user?.firstName}!</h2>
              <p className="text-white/80 text-lg">
                {getGreeting()}! How are you feeling today? Your mental wellness journey continues here.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {quickActions.map((action, index) => (
                <div
                  key={index}
                  className={`${action.color} rounded-2xl p-6 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl`}
                  onClick={action.action}
                >
                  <h3 className="text-xl font-bold text-white mb-2">{action.title}</h3>
                  <p className="text-white/90">{action.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">Today's Wellness Tip</h3>
              <p className="text-white/80">
                "Take a moment to breathe deeply. Inhale peace, exhale stress. Remember, it's okay to take things one step at a time."
              </p>
            </div>
          </div>
        );

      case 'chatbot':
        return (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 h-full">
            <h2 className="text-2xl font-bold text-white mb-4"> AI Wellness Companion</h2>
            <div className="bg-white/5 rounded-xl p-4 h-96 mb-4 overflow-y-auto">
              <div className="text-white/60 text-center mt-32">
                <p>Your AI companion is ready to chat!</p>
                <p className="text-sm mt-2">Start a conversation about how you're feeling today.</p>
              </div>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message here..."
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
              />
              <button className="bg-[#406246] hover:bg-[#2d4532] text-white px-6 py-3 rounded-xl font-medium transition-all duration-300">
                Send
              </button>
            </div>
          </div>
        );

      case 'games':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4"> Wellness Games & Activities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Breathing Exercise', description: 'Guided breathing for relaxation', color: 'bg-blue-600' },
                { title: 'Meditation Timer', description: '5-minute mindfulness session', color: 'bg-green-600' },
                { title: 'Gratitude Journal', description: 'Write what you\'re grateful for', color: 'bg-purple-600' },
                { title: 'Mood Tracker', description: 'Log your daily emotions', color: 'bg-orange-600' },
                { title: 'Stress Ball', description: 'Virtual stress relief game', color: 'bg-red-600' },
                { title: 'Nature Sounds', description: 'Calming background audio', color: 'bg-teal-600' }
              ].map((game, index) => (
                <div key={index} className={`${game.color} rounded-2xl p-6 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-xl`}>
                  <h3 className="text-lg font-bold text-white mb-2">{game.title}</h3>
                  <p className="text-white/90 text-sm">{game.description}</p>
                  <button className="mt-4 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm transition-all duration-300">
                    Start Activity
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'sessions':
        return (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6"> Book a Session</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Available Professionals</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Dr. Sarah Johnson', specialty: 'Anxiety & Depression', rating: '4.9' },
                    { name: 'Dr. Michael Chen', specialty: 'Stress Management', rating: '4.8' },
                    { name: 'Dr. Emily Davis', specialty: 'Relationship Counseling', rating: '4.9' }
                  ].map((doctor, index) => (
                    <div key={index} className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <h4 className="font-semibold text-white">{doctor.name}</h4>
                      <p className="text-white/70 text-sm">{doctor.specialty}</p>
                      <p className="text-yellow-400 text-sm">⭐ {doctor.rating}/5.0</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Schedule Appointment</h3>
                <div className="space-y-4">
                  <input
                    type="date"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40"
                  />
                  <select className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40">
                    <option value="">Select Time</option>
                    <option value="09:00">9:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                  </select>
                  <textarea
                    placeholder="Brief description of what you'd like to discuss..."
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40 h-24 resize-none"
                  ></textarea>
                  <button className="w-full bg-[#406246] hover:bg-[#2d4532] text-white py-3 rounded-xl font-medium transition-all duration-300">
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'progress':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4">Your Wellness Progress</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-4">This Week's Activities</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Chat Sessions</span>
                    <span className="text-white font-semibold">5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Meditation Minutes</span>
                    <span className="text-white font-semibold">45</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Wellness Games</span>
                    <span className="text-white font-semibold">8</span>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-4">Mood Trends</h3>
                <div className="text-center">
                  <div className="text-4xl mb-2">😊</div>
                  <p className="text-white/80">Overall mood improving!</p>
                  <p className="text-green-400 text-sm mt-2">+15% from last week</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Coming Soon</h2>
            <p className="text-white/80">This section is under development.</p>
          </div>
        );
    }
  };

  return (
    <div className="w-full h-screen flex bg-gradient-to-br from-[#406246] via-[#2d4532] to-[#1a2b1f] overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-black/20 backdrop-blur-md border-r border-white/10 flex flex-col">
        {/* Logo/Header */}
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-bold text-white">SafeSpace</h1>
          <p className="text-white/60 text-sm">Your Wellness Dashboard</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedSection(item.id)}
                className={`w-full flex items-center justify-center px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  selectedSection === item.id
                    ? 'bg-white/20 text-white shadow-lg scale-105'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#406246] rounded-full flex items-center justify-center">
              <span className="text-white font-bold">{userName.charAt(0)}</span>
            </div>
            <div>
              <p className="text-white font-medium">{userName}</p>
              <p className="text-white/60 text-sm">{currentTime.toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-black/10 backdrop-blur-md border-b border-white/10 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">
                {sidebarItems.find(item => item.id === selectedSection)?.label || 'Dashboard'}
              </h1>
              <p className="text-white/60">
                {getGreeting()}, {userName} • {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl transition-all duration-300 border border-white/20"
            >
              Back to Home
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
