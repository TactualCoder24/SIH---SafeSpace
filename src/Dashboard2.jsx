    import React, { useState, useEffect, useMemo } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { UserButton, useUser } from '@clerk/clerk-react';

    // Custom hooks for better code organization
    const useTime = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
        setCurrentTime(new Date());
        }, 60000);
        return () => clearInterval(timer);
    }, []);

    return currentTime;
    };

    const useGreeting = (time) => {
    return useMemo(() => {
        const hour = time.getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 17) return 'Good Afternoon';
        return 'Good Evening';
    }, [time]);
    };

    // Configuration objects
    const SIDEBAR_ITEMS = [
    { id: 'overview', label: 'Overview', icon: '🏠' },
    { id: 'chatbot', label: 'AI Psychologist', icon: '🤖' },
    { id: 'games', label: 'Wellness Games', icon: '🎮' },
    { id: 'sessions', label: 'Book Session', icon: '📅' },
    { id: 'progress', label: 'My Progress', icon: '📊' },
    { id: 'resources', label: 'Resources', icon: '📚' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
    ];

    const QUICK_ACTIONS = [
    {
        title: 'Start Chat Session',
        description: 'Talk to our AI counselor',
        icon: '💬',
        color: 'from-emerald-600 to-emerald-700',
        section: 'chatbot'
    },
    {
        title: 'Play Mindfulness Game',
        description: 'Relax with guided activities',
        icon: '🧘',
        color: 'from-green-600 to-green-700',
        section: 'games'
    },
    {
        title: 'Book Appointment',
        description: 'Schedule with a professional',
        icon: '👨‍⚕️',
        color: 'from-teal-600 to-teal-700',
        section: 'sessions'
    },
    {
        title: 'View Progress',
        description: 'Check your wellness journey',
        icon: '📈',
        color: 'from-lime-600 to-lime-700',
        section: 'progress'
    }
    ];

    // Interactive Games Components
    const BreathingExercise = ({ onBack }) => {
    const [isActive, setIsActive] = useState(false);
    const [phase, setPhase] = useState('inhale'); // 'inhale', 'hold', 'exhale'
    const [count, setCount] = useState(4);
    const [cycle, setCycle] = useState(0);

    useEffect(() => {
        let interval;
        if (isActive) {
        interval = setInterval(() => {
            setCount(prev => {
            if (prev <= 1) {
                if (phase === 'inhale') {
                setPhase('hold');
                return 4;
                } else if (phase === 'hold') {
                setPhase('exhale');
                return 4;
                } else {
                setPhase('inhale');
                setCycle(c => c + 1);
                return 4;
                }
            }
            return prev - 1;
            });
        }, 1000);
        }
        return () => clearInterval(interval);
    }, [isActive, phase]);

    const getInstruction = () => {
        switch(phase) {
        case 'inhale': return 'Breathe In...';
        case 'hold': return 'Hold...';
        case 'exhale': return 'Breathe Out...';
        default: return 'Ready to begin?';
        }
    };

    return (
        <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 backdrop-blur-md rounded-3xl p-8 border border-green-400/30 text-center">
        <button 
            onClick={onBack}
            className="mb-4 text-green-300 hover:text-white transition-colors"
        >
            ← Back to Games
        </button>
        
        <h3 className="text-2xl font-bold text-white mb-8">Breathing Exercise</h3>
        
        <div className={`w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold text-2xl transition-transform duration-1000 ${
            isActive && phase === 'inhale' ? 'scale-125' : 
            isActive && phase === 'exhale' ? 'scale-75' : 'scale-100'
        }`}>
            {count}
        </div>
        
        <p className="text-xl text-white mb-6">{getInstruction()}</p>
        <p className="text-green-300 mb-8">Cycles completed: {cycle}</p>
        
        <div className="space-y-4">
            <button
            onClick={() => setIsActive(!isActive)}
            className={`px-8 py-3 rounded-xl font-medium transition-all ${
                isActive 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
            >
            {isActive ? 'Stop' : 'Start Breathing'}
            </button>
            
            {!isActive && (
            <button
                onClick={() => { setCount(4); setPhase('inhale'); setCycle(0); }}
                className="ml-4 px-6 py-3 bg-green-500/20 hover:bg-green-500/30 text-green-300 rounded-xl transition-all"
            >
                Reset
            </button>
            )}
        </div>
        </div>
    );
    };

    const MoodTracker = ({ onBack }) => {
    const [selectedMood, setSelectedMood] = useState('');
    const [note, setNote] = useState('');
    const [savedEntries, setSavedEntries] = useState([]);

    const moods = [
        { emoji: '😊', label: 'Happy', color: 'from-green-400 to-green-500' },
        { emoji: '😌', label: 'Calm', color: 'from-emerald-400 to-emerald-500' },
        { emoji: '😔', label: 'Sad', color: 'from-blue-400 to-blue-500' },
        { emoji: '😰', label: 'Anxious', color: 'from-yellow-400 to-orange-500' },
        { emoji: '😴', label: 'Tired', color: 'from-purple-400 to-purple-500' },
        { emoji: '😤', label: 'Frustrated', color: 'from-red-400 to-red-500' }
    ];

    const saveMood = () => {
        if (selectedMood) {
        const entry = {
            mood: selectedMood,
            note,
            timestamp: new Date().toLocaleString()
        };
        setSavedEntries(prev => [entry, ...prev].slice(0, 5));
        setSelectedMood('');
        setNote('');
        }
    };

    return (
        <div className="bg-gradient-to-br from-emerald-500/20 to-green-600/20 backdrop-blur-md rounded-3xl p-8 border border-emerald-400/30">
        <button 
            onClick={onBack}
            className="mb-4 text-emerald-300 hover:text-white transition-colors"
        >
            ← Back to Games
        </button>
        
        <h3 className="text-2xl font-bold text-white mb-8 text-center">How are you feeling?</h3>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
            {moods.map((mood, index) => (
            <button
                key={index}
                onClick={() => setSelectedMood(mood.label)}
                className={`p-4 rounded-2xl transition-all transform hover:scale-105 ${
                selectedMood === mood.label 
                    ? `bg-gradient-to-br ${mood.color} scale-105 shadow-lg` 
                    : 'bg-white/10 hover:bg-white/20'
                }`}
            >
                <div className="text-3xl mb-2">{mood.emoji}</div>
                <div className="text-white text-sm">{mood.label}</div>
            </button>
            ))}
        </div>
        
        <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What's on your mind? (optional)"
            className="w-full bg-white/10 border border-emerald-400/30 rounded-2xl px-4 py-3 text-white placeholder-emerald-200/60 focus:outline-none focus:border-emerald-300 mb-6"
            rows={3}
        />
        
        <button
            onClick={saveMood}
            disabled={!selectedMood}
            className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 disabled:from-gray-600 disabled:to-gray-700 text-white py-3 rounded-2xl font-medium transition-all disabled:cursor-not-allowed"
        >
            Save Mood Entry
        </button>
        
        {savedEntries.length > 0 && (
            <div className="mt-8">
            <h4 className="text-lg font-semibold text-white mb-4">Recent Entries</h4>
            <div className="space-y-3">
                {savedEntries.map((entry, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-4 border border-emerald-400/20">
                    <div className="flex justify-between items-start">
                    <span className="text-emerald-300 font-medium">{entry.mood}</span>
                    <span className="text-emerald-200/60 text-xs">{entry.timestamp}</span>
                    </div>
                    {entry.note && <p className="text-white/80 text-sm mt-2">{entry.note}</p>}
                </div>
                ))}
            </div>
            </div>
        )}
        </div>
    );
    };

    const GratitudeJournal = ({ onBack }) => {
    const [gratitudeText, setGratitudeText] = useState('');
    const [entries, setEntries] = useState([]);

    const addEntry = () => {
        if (gratitudeText.trim()) {
        const entry = {
            text: gratitudeText,
            date: new Date().toLocaleDateString()
        };
        setEntries(prev => [entry, ...prev].slice(0, 10));
        setGratitudeText('');
        }
    };

    return (
        <div className="bg-gradient-to-br from-green-500/20 to-teal-600/20 backdrop-blur-md rounded-3xl p-8 border border-green-400/30">
        <button 
            onClick={onBack}
            className="mb-4 text-green-300 hover:text-white transition-colors"
        >
            ← Back to Games
        </button>
        
        <h3 className="text-2xl font-bold text-white mb-6 text-center">🌟 Gratitude Journal</h3>
        <p className="text-green-200 text-center mb-8">What are you grateful for today?</p>
        
        <div className="mb-6">
            <textarea
            value={gratitudeText}
            onChange={(e) => setGratitudeText(e.target.value)}
            placeholder="I'm grateful for..."
            className="w-full bg-white/10 border border-green-400/30 rounded-2xl px-6 py-4 text-white placeholder-green-200/60 focus:outline-none focus:border-green-300 mb-4"
            rows={4}
            />
            <button
            onClick={addEntry}
            disabled={!gratitudeText.trim()}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-700 text-white py-3 rounded-2xl font-medium transition-all disabled:cursor-not-allowed"
            >
            Add Gratitude Entry
            </button>
        </div>
        
        {entries.length > 0 && (
            <div>
            <h4 className="text-lg font-semibold text-white mb-4">Your Gratitude Collection</h4>
            <div className="space-y-3 max-h-60 overflow-y-auto">
                {entries.map((entry, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-4 border border-green-400/20">
                    <p className="text-white/90 mb-2">{entry.text}</p>
                    <p className="text-green-300 text-xs">{entry.date}</p>
                </div>
                ))}
            </div>
            </div>
        )}
        </div>
    );
    };

    // Component parts
    const WelcomeSection = ({ user, greeting }) => (
    <div className="bg-gradient-to-r from-[#406246]/80 to-[#2d4532]/80 backdrop-blur-md rounded-3xl p-8 border border-green-400/30 shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
        Welcome Back, {user?.firstName || 'Friend'}! 🌿
        </h2>
        <p className="text-green-50/90 text-lg leading-relaxed">
        {greeting}! How are you feeling today? Your mental wellness journey continues here in your peaceful space.
        </p>
    </div>
    );

    const QuickActionsGrid = ({ actions, onActionClick }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {actions.map((action, index) => (
        <div
            key={index}
            className={`bg-gradient-to-br ${action.color} rounded-3xl p-6 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl group border border-green-400/20`}
            onClick={() => onActionClick(action.section)}
        >
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
            {action.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{action.title}</h3>
            <p className="text-green-50/90 leading-relaxed">{action.description}</p>
        </div>
        ))}
    </div>
    );

    const WellnessTip = () => {
    const tips = [
        "Take a moment to breathe deeply. Inhale peace, exhale stress. Remember, it's okay to take things one step at a time.",
        "Nature has a wonderful way of healing. Take a moment to appreciate the green world around you.",
        "Progress, not perfection. Every small step towards wellness counts and deserves celebration.",
        "Your mental health is just as important as your physical health. Be gentle with yourself today.",
        "Like plants need water and sunlight, you need rest and self-care to flourish."
    ];
    
    const [currentTip] = useState(tips[Math.floor(Math.random() * tips.length)]);

    return (
        <div className="bg-gradient-to-r from-emerald-600/20 to-green-600/20 backdrop-blur-md rounded-3xl p-8 border border-emerald-400/30 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">💡</span>
            <h3 className="text-xl font-bold text-white">Today's Wellness Tip</h3>
        </div>
        <p className="text-green-50/90 leading-relaxed italic">
            "{currentTip}"
        </p>
        </div>
    );
    };

    const ChatInterface = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        { type: 'bot', text: 'Hello! I\'m your AI wellness companion. 🌱 How are you feeling today?' }
    ]);

    const aiResponses = [
        "That sounds like a lot to handle. Can you tell me more about what's been weighing on your mind?",
        "I hear you. It's completely normal to feel that way. What usually helps you when you're feeling like this?",
        "Thank you for sharing that with me. You're being very brave by talking about your feelings.",
        "That's a positive step! How did that make you feel when you accomplished it?",
        "I understand. Sometimes it helps to break things down into smaller, manageable pieces. What's one small thing you could try today?",
        "Your feelings are valid. It's okay to have difficult days. What kind of support do you feel you need right now?"
    ];

    const handleSendMessage = () => {
        if (message.trim()) {
        setMessages(prev => [...prev, { type: 'user', text: message }]);
        setMessage('');
        // Simulate bot response
        setTimeout(() => {
            const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
            setMessages(prev => [...prev, { type: 'bot', text: randomResponse }]);
        }, 1000);
        }
    };

    return (
        <div className="bg-gradient-to-br from-[#406246]/20 to-[#2d4532]/20 backdrop-blur-md rounded-3xl p-6 border border-green-400/30 h-full flex flex-col">
        <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">🤖</span>
            <h2 className="text-2xl font-bold text-white">AI Wellness Companion</h2>
        </div>
        
        <div className="bg-green-900/20 rounded-2xl p-4 flex-1 mb-4 overflow-y-auto space-y-3 border border-green-500/20">
            {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs px-4 py-2 rounded-2xl ${
                msg.type === 'user' 
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white' 
                    : 'bg-green-800/30 text-green-50 border border-green-500/30'
                }`}>
                {msg.text}
                </div>
            </div>
            ))}
        </div>
        
        <div className="flex gap-3">
            <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Share your thoughts..."
            className="flex-1 bg-green-900/20 border border-green-400/30 rounded-2xl px-6 py-4 text-white placeholder-green-200/50 focus:outline-none focus:border-green-300 focus:ring-2 focus:ring-green-400/20 transition-all"
            />
            <button 
            onClick={handleSendMessage}
            className="bg-gradient-to-r from-[#406246] to-[#2d4532] hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
            Send
            </button>
        </div>
        </div>
    );
    };

    const WellnessGames = () => {
    const [activeGame, setActiveGame] = useState(null);

    const games = [
        { 
        id: 'breathing', 
        title: 'Breathing Exercise', 
        description: 'Guided breathing for relaxation', 
        color: 'from-green-500 to-emerald-600', 
        icon: '🫁',
        component: BreathingExercise
        },
        { 
        id: 'mood', 
        title: 'Mood Tracker', 
        description: 'Log your daily emotions', 
        color: 'from-emerald-500 to-teal-600', 
        icon: '😊',
        component: MoodTracker
        },
        { 
        id: 'gratitude', 
        title: 'Gratitude Journal', 
        description: 'Write what you\'re grateful for', 
        color: 'from-teal-500 to-green-600', 
        icon: '📝',
        component: GratitudeJournal
        },
        { 
        id: 'meditation', 
        title: 'Meditation Timer', 
        description: '5-minute mindfulness session', 
        color: 'from-lime-500 to-green-600', 
        icon: '🧘‍♀️'
        },
        { 
        id: 'nature', 
        title: 'Nature Sounds', 
        description: 'Calming background audio', 
        color: 'from-green-600 to-emerald-700', 
        icon: '🌿'
        },
        { 
        id: 'affirmations', 
        title: 'Daily Affirmations', 
        description: 'Positive self-talk practice', 
        color: 'from-emerald-600 to-green-700', 
        icon: '✨'
        }
    ];

    if (activeGame) {
        const GameComponent = activeGame.component;
        return <GameComponent onBack={() => setActiveGame(null)} />;
    }

    return (
        <div className="space-y-8">
        <div className="flex items-center gap-3">
            <span className="text-3xl">🎮</span>
            <h2 className="text-3xl font-bold text-white">Wellness Games & Activities</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game, index) => (
            <div 
                key={index} 
                className={`bg-gradient-to-br ${game.color} rounded-3xl p-6 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-xl group border border-green-400/30`}
                onClick={() => game.component ? setActiveGame(game) : null}
            >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {game.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{game.title}</h3>
                <p className="text-green-50/90 text-sm mb-4 leading-relaxed">{game.description}</p>
                <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl text-sm transition-all duration-300 transform hover:scale-105 font-medium">
                {game.component ? 'Play Now' : 'Coming Soon'}
                </button>
            </div>
            ))}
        </div>
        </div>
    );
    };

    const BookingInterface = () => {
    const [selectedProfessional, setSelectedProfessional] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [description, setDescription] = useState('');
    const [sessionType, setSessionType] = useState('individual');

    const professionals = [
        { name: 'Dr. Sarah Johnson', specialty: 'Anxiety & Depression', rating: '4.9', image: '👩‍⚕️', available: 'Today' },
        { name: 'Dr. Michael Chen', specialty: 'Stress Management', rating: '4.8', image: '👨‍⚕️', available: 'Tomorrow' },
        { name: 'Dr. Emily Davis', specialty: 'Relationship Counseling', rating: '4.9', image: '👩‍⚕️', available: 'This Week' }
    ];

    const sessionTypes = [
        { id: 'individual', label: 'Individual Session', price: '$80', duration: '50 minutes' },
        { id: 'couple', label: 'Couples Session', price: '$120', duration: '60 minutes' },
        { id: 'group', label: 'Group Session', price: '$40', duration: '90 minutes' }
    ];

    return (
        <div className="space-y-8">
        <div className="bg-gradient-to-r from-[#406246]/80 to-[#2d4532]/80 backdrop-blur-md rounded-3xl p-8 border border-green-400/30 shadow-2xl">
            <div className="flex items-center gap-3 mb-8">
            <span className="text-3xl">📅</span>
            <h2 className="text-3xl font-bold text-white">Book a Session</h2>
            </div>
            
            {/* Session Type Selection */}
            <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Select Session Type</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {sessionTypes.map((type) => (
                <div
                    key={type.id}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    sessionType === type.id
                        ? 'border-green-400 bg-green-500/20'
                        : 'border-green-400/30 bg-green-900/20 hover:bg-green-800/30'
                    }`}
                    onClick={() => setSessionType(type.id)}
                >
                    <h4 className="text-white font-semibold">{type.label}</h4>
                    <p className="text-green-300">{type.price}</p>
                    <p className="text-green-200 text-sm">{type.duration}</p>
                </div>
                ))}
            </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <span>👨‍⚕️</span>
                Available Professionals
                </h3>
                <div className="space-y-4">
                {professionals.map((doctor, index) => (
                    <div 
                    key={index} 
                    className={`bg-green-900/20 rounded-2xl p-6 border transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                        selectedProfessional === doctor.name 
                        ? 'border-green-400 bg-green-500/20 scale-105' 
                        : 'border-green-400/20 hover:border-green-400/40'
                    }`}
                    onClick={() => setSelectedProfessional(doctor.name)}
                    >
                    <div className="flex items-start gap-4">
                        <div className="text-3xl">{doctor.image}</div>
                        <div className="flex-1">
                        <h4 className="font-semibold text-white text-lg">{doctor.name}</h4>
                        <p className="text-green-300 mb-2">{doctor.specialty}</p>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                            <span className="text-yellow-400">⭐</span>
                            <span className="text-yellow-400 font-medium">{doctor.rating}/5.0</span>
                            </div>
                            <span className="text-green-400 text-sm bg-green-900/30 px-2 py-1 rounded">{doctor.available}</span>
                        </div>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            </div>
            
            <div>
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <span>📋</span>
                Schedule Appointment
                </h3>
                <div className="space-y-6">
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-green-900/20 border border-green-400/30 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-green-300 focus:ring-2 focus:ring-green-400/20 transition-all"
                />
                <select 
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full bg-green-900/20 border border-green-400/30 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-green-300 focus:ring-2 focus:ring-green-400/20 transition-all"
                >
                    <option value="">Select Time</option>
                    <option value="09:00">9:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                </select>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief description of what you'd like to discuss..."
                    className="w-full bg-green-900/20 border border-green-400/30 rounded-2xl px-6 py-4 text-white placeholder-green-200/50 focus:outline-none focus:border-green-300 focus:ring-2 focus:ring-green-400/20 h-32 resize-none transition-all"
                />
                <button 
                    className="w-full bg-gradient-to-r from-[#406246] to-[#2d4532] hover:from-green-600 hover:to-green-700 text-white py-4 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!selectedProfessional || !selectedDate || !selectedTime}
                >
                    Book Appointment ({sessionTypes.find(t => t.id === sessionType)?.price})
                </button>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
    };

    const ProgressDashboard = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('week');
    
    const weeklyData = {
        activities: [
        { label: 'Chat Sessions', value: 5, icon: '💬', change: '+2' },
        { label: 'Meditation Minutes', value: 45, icon: '🧘', change: '+15' },
        { label: 'Wellness Games', value: 8, icon: '🎮', change: '+3' }
        ],
        mood: { trend: 'improving', percentage: 15, emoji: '😊' },
        streak: 7
    };

    const monthlyData = {
        activities: [
        { label: 'Chat Sessions', value: 18, icon: '💬', change: '+6' },
        { label: 'Meditation Minutes', value: 180, icon: '🧘', change: '+45' },
        { label: 'Wellness Games', value: 25, icon: '🎮', change: '+12' }
        ],
        mood: { trend: 'stable', percentage: 8, emoji: '😌' },
        streak: 21
    };

    const currentData = selectedPeriod === 'week' ? weeklyData : monthlyData;

    return (
        <div className="space-y-8">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
            <span className="text-3xl">📊</span>
            <h2 className="text-3xl font-bold text-white">Your Wellness Progress</h2>
            </div>
            <div className="flex bg-green-900/30 rounded-2xl p-1 border border-green-400/30">
            <button
                onClick={() => setSelectedPeriod('week')}
                className={`px-6 py-2 rounded-xl transition-all ${
                selectedPeriod === 'week' 
                    ? 'bg-gradient-to-r from-[#406246] to-[#2d4532] text-white' 
                    : 'text-green-300 hover:text-white'
                }`}
            >
                This Week
            </button>
            <button
                onClick={() => setSelectedPeriod('month')}
                className={`px-6 py-2 rounded-xl transition-all ${
                selectedPeriod === 'month' 
                    ? 'bg-gradient-to-r from-[#406246] to-[#2d4532] text-white' 
                    : 'text-green-300 hover:text-white'
                }`}
            >
                This Month
            </button>
            </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Activities Card */}
            <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-md rounded-3xl p-8 border border-green-400/30 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">📈</span>
                <h3 className="text-xl font-semibold text-white">Activities</h3>
            </div>
            <div className="space-y-4">
                {currentData.activities.map((item, index) => (
                <div key={index} className="flex justify-between items-center bg-green-900/20 rounded-xl p-4 border border-green-500/20">
                    <div className="flex items-center gap-3">
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-green-100 text-sm">{item.label}</span>
                    </div>
                    <div className="text-right">
                    <span className="text-white font-bold text-xl">{item.value}</span>
                    <span className="text-green-400 text-xs ml-2">{item.change}</span>
                    </div>
                </div>
                ))}
            </div>
            </div>
            
            {/* Mood Trends */}
            <div className="bg-gradient-to-br from-emerald-600/20 to-teal-600/20 backdrop-blur-md rounded-3xl p-8 border border-emerald-400/30 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">💚</span>
                <h3 className="text-xl font-semibold text-white">Mood Trends</h3>
            </div>
            <div className="text-center">
                <div className="text-6xl mb-4">{currentData.mood.emoji}</div>
                <p className="text-green-100 text-lg mb-2">Overall mood {currentData.mood.trend}!</p>
                <p className="text-green-400 font-semibold">+{currentData.mood.percentage}% from last {selectedPeriod}</p>
            </div>
            </div>
            
            {/* Streak Counter */}
            <div className="bg-gradient-to-br from-teal-600/20 to-green-600/20 backdrop-blur-md rounded-3xl p-8 border border-teal-400/30 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">🔥</span>
                <h3 className="text-xl font-semibold text-white">Wellness Streak</h3>
            </div>
            <div className="text-center">
                <div className="text-5xl font-bold text-orange-400 mb-2">{currentData.streak}</div>
                <p className="text-green-100">consecutive days</p>
                <p className="text-green-400 text-sm mt-2">Keep it up!</p>
            </div>
            </div>
            
            {/* Achievements */}
            <div className="bg-gradient-to-br from-lime-600/20 to-emerald-600/20 backdrop-blur-md rounded-3xl p-8 border border-lime-400/30 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">🏆</span>
                <h3 className="text-xl font-semibold text-white">Achievements</h3>
            </div>
            <div className="space-y-3">
                <div className="bg-yellow-500/20 border border-yellow-400/30 rounded-xl p-3 text-center">
                <div className="text-2xl mb-1">🥇</div>
                <p className="text-yellow-300 text-sm font-medium">{currentData.streak} Day Streak</p>
                </div>
                <div className="bg-green-500/20 border border-green-400/30 rounded-xl p-3 text-center">
                <div className="text-2xl mb-1">🌱</div>
                <p className="text-green-300 text-sm font-medium">Mindful Master</p>
                </div>
                <div className="bg-blue-500/20 border border-blue-400/30 rounded-xl p-3 text-center">
                <div className="text-2xl mb-1">💙</div>
                <p className="text-blue-300 text-sm font-medium">Self-Care Hero</p>
                </div>
            </div>
            </div>
        </div>
        
        {/* Weekly Goal Progress */}
        <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 backdrop-blur-md rounded-3xl p-8 border border-green-400/30 shadow-xl">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span>🎯</span>
            {selectedPeriod === 'week' ? 'Weekly' : 'Monthly'} Goals
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
                { goal: 'Daily Check-ins', current: selectedPeriod === 'week' ? 5 : 18, target: selectedPeriod === 'week' ? 7 : 30 },
                { goal: 'Meditation Sessions', current: selectedPeriod === 'week' ? 3 : 12, target: selectedPeriod === 'week' ? 5 : 20 },
                { goal: 'Wellness Activities', current: selectedPeriod === 'week' ? 8 : 25, target: selectedPeriod === 'week' ? 10 : 35 }
            ].map((item, index) => {
                const percentage = (item.current / item.target) * 100;
                return (
                <div key={index} className="bg-green-900/20 rounded-2xl p-6 border border-green-500/20">
                    <h4 className="text-white font-medium mb-4">{item.goal}</h4>
                    <div className="flex justify-between text-sm text-green-300 mb-2">
                    <span>{item.current}/{item.target}</span>
                    <span>{Math.round(percentage)}%</span>
                    </div>
                    <div className="w-full bg-green-900/30 rounded-full h-2">
                    <div 
                        className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                    </div>
                </div>
                );
            })}
            </div>
        </div>
        </div>
    );
    };

    const ResourcesSection = () => {
    const [selectedCategory, setSelectedCategory] = useState('articles');

    const categories = [
        { id: 'articles', label: 'Articles', icon: '📖' },
        { id: 'videos', label: 'Videos', icon: '🎥' },
        { id: 'podcasts', label: 'Podcasts', icon: '🎧' },
        { id: 'books', label: 'Books', icon: '📚' }
    ];

    const resources = {
        articles: [
        { title: '5 Breathing Techniques for Anxiety', author: 'Dr. Sarah Mitchell', time: '8 min read', category: 'Anxiety' },
        { title: 'Building Daily Mindfulness Habits', author: 'Mark Johnson', time: '12 min read', category: 'Mindfulness' },
        { title: 'The Science of Gratitude', author: 'Dr. Emily Chen', time: '15 min read', category: 'Positive Psychology' },
        { title: 'Managing Stress in Modern Life', author: 'Lisa Thompson', time: '10 min read', category: 'Stress Management' }
        ],
        videos: [
        { title: 'Guided Meditation for Beginners', creator: 'Mindful Space', duration: '15 min', views: '2.1M' },
        { title: 'Yoga for Mental Health', creator: 'Wellness Studio', duration: '25 min', views: '890K' },
        { title: 'Understanding Anxiety', creator: 'Mental Health Hub', duration: '18 min', views: '1.5M' },
        { title: 'Building Self-Compassion', creator: 'Dr. Amanda Lee', duration: '20 min', views: '756K' }
        ],
        podcasts: [
        { title: 'The Mental Health Toolkit', host: 'Dr. Michael Roberts', episodes: '45 episodes', rating: '4.8' },
        { title: 'Mindful Living', host: 'Sarah Green', episodes: '78 episodes', rating: '4.9' },
        { title: 'Anxiety Solutions', host: 'Dr. Jane Smith', episodes: '32 episodes', rating: '4.7' },
        { title: 'Wellness Wednesday', host: 'Team Wellness', episodes: '156 episodes', rating: '4.6' }
        ],
        books: [
        { title: 'The Anxiety and Worry Workbook', author: 'David A. Clark', rating: '4.5', genre: 'Self-Help' },
        { title: 'Mindfulness for Beginners', author: 'Jon Kabat-Zinn', rating: '4.7', genre: 'Mindfulness' },
        { title: 'The Happiness Project', author: 'Gretchen Rubin', rating: '4.4', genre: 'Personal Growth' },
        { title: 'Feeling Good', author: 'David D. Burns', rating: '4.6', genre: 'Psychology' }
        ]
    };

    return (
        <div className="space-y-8">
        <div className="flex items-center gap-3">
            <span className="text-3xl">📚</span>
            <h2 className="text-3xl font-bold text-white">Wellness Resources</h2>
        </div>
        
        {/* Category Selection */}
        <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
            <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl transition-all ${
                selectedCategory === category.id
                    ? 'bg-gradient-to-r from-[#406246] to-[#2d4532] text-white'
                    : 'bg-green-900/20 text-green-300 hover:text-white hover:bg-green-800/30 border border-green-500/20'
                }`}
            >
                <span>{category.icon}</span>
                <span className="font-medium">{category.label}</span>
            </button>
            ))}
        </div>
        
        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources[selectedCategory].map((resource, index) => (
            <div key={index} className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-md rounded-3xl p-6 border border-green-400/30 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
                <h3 className="text-lg font-bold text-white mb-2">{resource.title}</h3>
                <div className="text-green-300 text-sm space-y-1">
                {selectedCategory === 'articles' && (
                    <>
                    <p>By {resource.author}</p>
                    <div className="flex justify-between">
                        <span>{resource.time}</span>
                        <span className="bg-green-700/30 px-2 py-1 rounded text-xs">{resource.category}</span>
                    </div>
                    </>
                )}
                {selectedCategory === 'videos' && (
                    <>
                    <p>By {resource.creator}</p>
                    <div className="flex justify-between">
                        <span>{resource.duration}</span>
                        <span>{resource.views} views</span>
                    </div>
                    </>
                )}
                {selectedCategory === 'podcasts' && (
                    <>
                    <p>Hosted by {resource.host}</p>
                    <div className="flex justify-between">
                        <span>{resource.episodes}</span>
                        <span>⭐ {resource.rating}</span>
                    </div>
                    </>
                )}
                {selectedCategory === 'books' && (
                    <>
                    <p>By {resource.author}</p>
                    <div className="flex justify-between">
                        <span className="bg-green-700/30 px-2 py-1 rounded text-xs">{resource.genre}</span>
                        <span>⭐ {resource.rating}</span>
                    </div>
                    </>
                )}
                </div>
                <button className="mt-4 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl text-sm transition-all">
                {selectedCategory === 'articles' ? 'Read Article' : 
                selectedCategory === 'videos' ? 'Watch Video' :
                selectedCategory === 'podcasts' ? 'Listen Now' : 'View Details'}
                </button>
            </div>
            ))}
        </div>
        </div>
    );
    };

    const SettingsSection = () => {
    const [notifications, setNotifications] = useState({
        dailyReminder: true,
        sessionAlerts: true,
        progressUpdates: false,
        weeklyReport: true
    });

    const [preferences, setPreferences] = useState({
        theme: 'green',
        language: 'english',
        timezone: 'UTC-5'
    });

    return (
        <div className="space-y-8">
        <div className="flex items-center gap-3">
            <span className="text-3xl">⚙️</span>
            <h2 className="text-3xl font-bold text-white">Settings</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Notifications */}
            <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-md rounded-3xl p-8 border border-green-400/30 shadow-xl">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <span>🔔</span>
                Notifications
            </h3>
            <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-4 bg-green-900/20 rounded-2xl border border-green-500/20">
                    <span className="text-green-100 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <button
                    onClick={() => setNotifications(prev => ({ ...prev, [key]: !value }))}
                    className={`w-12 h-6 rounded-full transition-all ${
                        value ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                    >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        value ? 'translate-x-6' : 'translate-x-1'
                    }`}></div>
                    </button>
                </div>
                ))}
            </div>
            </div>
            
            {/* Preferences */}
            <div className="bg-gradient-to-br from-emerald-600/20 to-teal-600/20 backdrop-blur-md rounded-3xl p-8 border border-emerald-400/30 shadow-xl">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <span>🎨</span>
                Preferences
            </h3>
            <div className="space-y-6">
                <div>
                <label className="block text-green-100 mb-2">Theme</label>
                <select 
                    value={preferences.theme}
                    onChange={(e) => setPreferences(prev => ({ ...prev, theme: e.target.value }))}
                    className="w-full bg-green-900/20 border border-green-400/30 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-green-300"
                >
                    <option value="green">Forest Green</option>
                    <option value="blue">Ocean Blue</option>
                    <option value="purple">Lavender Purple</option>
                </select>
                </div>
                
                <div>
                <label className="block text-green-100 mb-2">Language</label>
                <select 
                    value={preferences.language}
                    onChange={(e) => setPreferences(prev => ({ ...prev, language: e.target.value }))}
                    className="w-full bg-green-900/20 border border-green-400/30 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-green-300"
                >
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                </select>
                </div>
                
                <div>
                <label className="block text-green-100 mb-2">Timezone</label>
                <select 
                    value={preferences.timezone}
                    onChange={(e) => setPreferences(prev => ({ ...prev, timezone: e.target.value }))}
                    className="w-full bg-green-900/20 border border-green-400/30 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-green-300"
                >
                    <option value="UTC-5">Eastern Time</option>
                    <option value="UTC-6">Central Time</option>
                    <option value="UTC-7">Mountain Time</option>
                    <option value="UTC-8">Pacific Time</option>
                </select>
                </div>
            </div>
            </div>
        </div>
        
        {/* Account Settings */}
        <div className="bg-gradient-to-r from-teal-600/20 to-green-600/20 backdrop-blur-md rounded-3xl p-8 border border-teal-400/30 shadow-xl">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span>👤</span>
            Account Settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-2xl transition-all transform hover:scale-105">
                Update Profile
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-2xl transition-all transform hover:scale-105">
                Change Password
            </button>
            <button className="bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-2xl transition-all transform hover:scale-105">
                Export Data
            </button>
            <button className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-2xl transition-all transform hover:scale-105">
                Delete Account
            </button>
            </div>
        </div>
        </div>
    );
    };

    // Main Dashboard Component
    const Dashboard = () => {
    const [selectedSection, setSelectedSection] = useState('overview');
    const currentTime = useTime();
    const greeting = useGreeting(currentTime);
    const navigate = useNavigate();
    const { user } = useUser();

    const renderMainContent = () => {
        switch (selectedSection) {
        case 'overview':
            return (
            <div className="space-y-8">
                <WelcomeSection user={user} greeting={greeting} />
                <QuickActionsGrid 
                actions={QUICK_ACTIONS} 
                onActionClick={setSelectedSection} 
                />
                <WellnessTip />
            </div>
            );
        case 'chatbot':
            return <ChatInterface />;
        case 'games':
            return <WellnessGames />;
        case 'sessions':
            return <BookingInterface />;
        case 'progress':
            return <ProgressDashboard />;
        case 'resources':
            return <ResourcesSection />;
        case 'settings':
            return <SettingsSection />;
        default:
            return (
            <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-md rounded-3xl p-12 border border-green-400/30 text-center shadow-2xl">
                <div className="text-6xl mb-4">🚧</div>
                <h2 className="text-2xl font-bold text-white mb-4">Coming Soon</h2>
                <p className="text-green-100">This section is under development.</p>
            </div>
            );
        }
    };

    return (
        <div className="w-full h-screen flex bg-gradient-to-br from-[#1a2b1f] via-[#2d4532] to-[#406246] overflow-hidden">
        {/* Modern Sidebar */}
        <div className="w-72 bg-black/30 backdrop-blur-xl border-r border-green-400/20 flex flex-col shadow-2xl">
            {/* Logo/Header */}
            <div className="p-8 border-b border-green-400/20">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-[#406246] to-[#2d4532] rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                🌿
                </div>
                <div>
                <h1 className="text-2xl font-bold text-white">SafeSpace</h1>
                <p className="text-green-200 text-sm">Your Wellness Sanctuary</p>
                </div>
            </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-6">
            <div className="space-y-3">
                {SIDEBAR_ITEMS.map((item) => (
                <button
                    key={item.id}
                    onClick={() => setSelectedSection(item.id)}
                    className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 group ${
                    selectedSection === item.id
                        ? 'bg-gradient-to-r from-[#406246] to-[#2d4532] text-white shadow-lg scale-105 border border-green-300/30'
                        : 'text-green-200 hover:bg-green-800/30 hover:text-white'
                    }`}
                >
                    <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                </button>
                ))}
            </div>
            </nav>

            {/* User Info */}
            <div className="p-6 border-t border-green-400/20">
            <div className="flex items-center space-x-4 bg-green-900/20 rounded-2xl p-4 border border-green-500/20">
                <div className="w-12 h-12 bg-gradient-to-r from-[#406246] to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">
                    {(user?.firstName || 'U').charAt(0)}
                </span>
                </div>
                <div>
                <p className="text-white font-medium">{user?.firstName || 'User'}</p>
                <p className="text-green-300 text-sm">{currentTime.toLocaleDateString()}</p>
                </div>
            </div>
            </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
            {/* Modern Header */}
            <header className="bg-black/20 backdrop-blur-xl border-b border-green-400/20 px-8 py-6 shadow-xl">
            <div className="flex items-center justify-between">
                <div>
                <h1 className="text-3xl font-bold text-white mb-1">
                    {SIDEBAR_ITEMS.find(item => item.id === selectedSection)?.label || 'Dashboard'}
                </h1>
                <p className="text-green-200">
                    {greeting}, {user?.firstName || 'Friend'} • {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                </div>

                <div className="flex items-center space-x-4">
                <UserButton 
                    appearance={{
                    elements: {
                        avatarBox: "w-12 h-12 rounded-full bg-gradient-to-r from-[#406246] to-emerald-500 border-2 border-green-300/30 shadow-lg"
                    }
                    }}
                />
                <button
                    onClick={() => navigate('/')}
                    className="bg-green-800/30 hover:bg-green-700/40 text-white px-6 py-3 rounded-2xl transition-all duration-300 border border-green-400/30 hover:border-green-300/50 transform hover:scale-105 font-medium shadow-lg"
                >
                    Back to Home
                </button>
                </div>
            </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 p-8 overflow-y-auto">
            {renderMainContent()}
            </main>
        </div>
        </div>
    );
    };

    export default Dashboard;