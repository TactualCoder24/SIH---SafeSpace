import React, { useState, useEffect, useMemo, createContext, useContext } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { UserButton, useUser } from '@clerk/clerk-react';
    import logo from './assets/logo with name.png'

    // Theme and Language Context
    const AppContext = createContext();

    // Translations
    const translations = {
    english: {
        welcome: 'Welcome Back',
        goodMorning: 'Good Morning',
        goodAfternoon: 'Good Afternoon',
        goodEvening: 'Good Evening',
        overview: 'Overview',
        chatbot: 'AI Psychologist',
        games: 'Wellness Games',
        sessions: 'Book Session',
        progress: 'My Progress',
        resources: 'Resources',
        settings: 'Settings',
        startChat: 'Start Chat Session',
        playMindfulness: 'Play Mindfulness Game',
        bookAppointment: 'Book Appointment',
        viewProgress: 'View Progress',
        talkToCounselor: 'Talk to our AI counselor',
        relaxWithGames: 'Relax with guided activities',
        scheduleWithPro: 'Schedule with a professional',
        checkWellnessJourney: 'Check your wellness journey',
        wellnessTip: "Today's Wellness Tip",
        breathingExercise: 'Breathing Exercise',
        moodTracker: 'Mood Tracker',
        gratitudeJournal: 'Gratitude Journal',
        meditationTimer: 'Meditation Timer',
        stressReliefGame: 'Stress Relief Game',
        dailyAffirmations: 'Daily Affirmations'
    },
    french: {
        welcome: 'Content de vous revoir',
        goodMorning: 'Bonjour',
        goodAfternoon: 'Bon après-midi',
        goodEvening: 'Bonsoir',
        overview: 'Aperçu',
        chatbot: 'Psychologue IA',
        games: 'Jeux de bien-être',
        sessions: 'Réserver une séance',
        progress: 'Mes progrès',
        resources: 'Ressources',
        settings: 'Paramètres',
        startChat: 'Commencer une séance de chat',
        playMindfulness: 'Jouer à un jeu de pleine conscience',
        bookAppointment: 'Prendre rendez-vous',
        viewProgress: 'Voir les progrès',
        talkToCounselor: 'Parlez à notre conseiller IA',
        relaxWithGames: 'Détendez-vous avec des activités guidées',
        scheduleWithPro: 'Planifiez avec un professionnel',
        checkWellnessJourney: 'Vérifiez votre parcours de bien-être',
        wellnessTip: 'Conseil bien-être du jour',
        breathingExercise: 'Exercice de respiration',
        moodTracker: 'Suivi de l\'humeur',
        gratitudeJournal: 'Journal de gratitude',
        meditationTimer: 'Minuteur de méditation',
        stressReliefGame: 'Jeu anti-stress',
        dailyAffirmations: 'Affirmations quotidiennes'
    },
    spanish: {
        welcome: 'Bienvenido de vuelta',
        goodMorning: 'Buenos días',
        goodAfternoon: 'Buenas tardes',
        goodEvening: 'Buenas noches',
        overview: 'Resumen',
        chatbot: 'Psicólogo IA',
        games: 'Juegos de bienestar',
        sessions: 'Reservar sesión',
        progress: 'Mi progreso',
        resources: 'Recursos',
        settings: 'Configuración',
        startChat: 'Iniciar sesión de chat',
        playMindfulness: 'Jugar juego de atención plena',
        bookAppointment: 'Reservar cita',
        viewProgress: 'Ver progreso',
        talkToCounselor: 'Habla con nuestro consejero IA',
        relaxWithGames: 'Relájate con actividades guiadas',
        scheduleWithPro: 'Programa con un profesional',
        checkWellnessJourney: 'Revisa tu viaje de bienestar',
        wellnessTip: 'Consejo de bienestar de hoy',
        breathingExercise: 'Ejercicio de respiración',
        moodTracker: 'Seguidor del estado de ánimo',
        gratitudeJournal: 'Diario de gratitud',
        meditationTimer: 'Temporizador de meditación',
        stressReliefGame: 'Juego anti-estrés',
        dailyAffirmations: 'Afirmaciones diarias'
    }
    };

    // Theme configurations
    const themes = {
    green: {
        primary: 'from-[#406246] to-[#2d4532]',
        secondary: 'from-green-600 to-emerald-600',
        accent: 'from-emerald-500/20 to-green-600/20',
        background: 'from-[#1a2b1f] via-[#2d4532] to-[#406246]',
        border: 'border-green-400/30',
        text: 'text-green-300',
        hover: 'hover:bg-green-800/30'
    },
    blue: {
        primary: 'from-[#1e3a8a] to-[#1e40af]',
        secondary: 'from-blue-600 to-cyan-600',
        accent: 'from-blue-500/20 to-cyan-600/20',
        background: 'from-[#0f172a] via-[#1e293b] to-[#334155]',
        border: 'border-blue-400/30',
        text: 'text-blue-300',
        hover: 'hover:bg-blue-800/30'
    },
    purple: {
        primary: 'from-[#581c87] to-[#7c3aed]',
        secondary: 'from-purple-600 to-violet-600',
        accent: 'from-purple-500/20 to-violet-600/20',
        background: 'from-[#1a0b2e] via-[#2d1b4e] to-[#4c1d95]',
        border: 'border-purple-400/30',
        text: 'text-purple-300',
        hover: 'hover:bg-purple-800/30'
    }
    };

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

    const useGreeting = (time, language) => {
    return useMemo(() => {
        const hour = time.getHours();
        const t = translations[language];
        if (hour < 12) return t.goodMorning;
        if (hour < 17) return t.goodAfternoon;
        return t.goodEvening;
    }, [time, language]);
    };

    // Meditation Timer Component
    const MeditationTimer = ({ onBack }) => {
    const [duration, setDuration] = useState(5);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const { theme } = useContext(AppContext);
    const currentTheme = themes[theme];

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
        interval = setInterval(() => {
            setTimeLeft(time => {
            if (time <= 1) {
                setIsActive(false);
                setIsCompleted(true);
                return 0;
            }
            return time - 1;
            });
        }, 1000);
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const startTimer = () => {
        setTimeLeft(duration * 60);
        setIsActive(true);
        setIsCompleted(false);
    };

    const stopTimer = () => {
        setIsActive(false);
        setTimeLeft(0);
        setIsCompleted(false);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className={`bg-gradient-to-br ${currentTheme.accent} backdrop-blur-md rounded-3xl p-8 ${currentTheme.border} text-center`}>
        <button 
            onClick={onBack}
            className={`mb-4 ${currentTheme.text} hover:text-white transition-colors`}
        >
            ← Back to Games
        </button>
        
        <h3 className="text-2xl font-bold text-white mb-8">🧘‍♀️ Meditation Timer</h3>
        
        {!isActive && !timeLeft && (
            <div className="mb-8">
            <label className="block text-white mb-4">Select Duration (minutes):</label>
            <div className="flex justify-center gap-4">
                {[3, 5, 10, 15, 20].map(min => (
                <button
                    key={min}
                    onClick={() => setDuration(min)}
                    className={`px-4 py-2 rounded-xl transition-all ${
                    duration === min 
                        ? `bg-gradient-to-br ${currentTheme.secondary} text-white` 
                        : `bg-white/10 ${currentTheme.text} hover:bg-white/20`
                    }`}
                >
                    {min}m
                </button>
                ))}
            </div>
            </div>
        )}
        
        <div className={`w-48 h-48 mx-auto mb-8 rounded-full bg-gradient-to-br ${currentTheme.secondary} flex items-center justify-center text-white font-bold text-3xl transition-all duration-1000 ${
            isActive ? 'animate-pulse' : ''
        }`}>
            {timeLeft ? formatTime(timeLeft) : `${duration}:00`}
        </div>
        
        {isCompleted && (
            <div className="mb-6 p-4 bg-green-500/20 rounded-xl border border-green-400/30">
            <p className="text-green-300 text-lg">🎉 Meditation completed! Great job!</p>
            </div>
        )}
        
        <div className="space-y-4">
            {!isActive && !timeLeft && (
            <button
                onClick={startTimer}
                className={`px-8 py-3 bg-gradient-to-br ${currentTheme.secondary} hover:opacity-90 text-white rounded-xl font-medium transition-all`}
            >
                Start Meditation
            </button>
            )}
            
            {isActive && (
            <button
                onClick={() => setIsActive(false)}
                className="px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-medium transition-all"
            >
                Pause
            </button>
            )}
            
            {timeLeft > 0 && !isActive && (
            <button
                onClick={() => setIsActive(true)}
                className={`px-8 py-3 bg-gradient-to-br ${currentTheme.secondary} hover:opacity-90 text-white rounded-xl font-medium transition-all mr-4`}
            >
                Resume
            </button>
            )}
            
            {timeLeft > 0 && (
            <button
                onClick={stopTimer}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all"
            >
                Stop
            </button>
            )}
        </div>
        </div>
    );
    };

    // Stress Relief Game Component
    const StressReliefGame = ({ onBack }) => {
    const [balloons, setBalloons] = useState([]);
    const [score, setScore] = useState(0);
    const [gameActive, setGameActive] = useState(false);
    const { theme } = useContext(AppContext);
    const currentTheme = themes[theme];

    const colors = ['bg-red-400', 'bg-blue-400', 'bg-green-400', 'bg-yellow-400', 'bg-purple-400', 'bg-pink-400'];

    useEffect(() => {
        let interval;
        if (gameActive) {
        interval = setInterval(() => {
            setBalloons(prev => [
            ...prev,
            {
                id: Date.now() + Math.random(),
                color: colors[Math.floor(Math.random() * colors.length)],
                x: Math.random() * 80,
                y: 100
            }
            ].slice(-8)); // Keep max 8 balloons
        }, 1500);
        }
        return () => clearInterval(interval);
    }, [gameActive]);

    useEffect(() => {
        let moveInterval;
        if (gameActive) {
        moveInterval = setInterval(() => {
            setBalloons(prev => prev
            .map(balloon => ({ ...balloon, y: balloon.y - 2 }))
            .filter(balloon => balloon.y > -10)
            );
        }, 100);
        }
        return () => clearInterval(moveInterval);
    }, [gameActive]);

    const popBalloon = (id) => {
        setBalloons(prev => prev.filter(balloon => balloon.id !== id));
        setScore(prev => prev + 1);
    };

    const startGame = () => {
        setGameActive(true);
        setScore(0);
        setBalloons([]);
    };

    const stopGame = () => {
        setGameActive(false);
        setBalloons([]);
    };

    return (
        <div className={`bg-gradient-to-br ${currentTheme.accent} backdrop-blur-md rounded-3xl p-8 ${currentTheme.border} text-center`}>
        <button 
            onClick={onBack}
            className={`mb-4 ${currentTheme.text} hover:text-white transition-colors`}
        >
            ← Back to Games
        </button>
        
        <h3 className="text-2xl font-bold text-white mb-4">🎈 Pop the Balloons</h3>
        <p className="text-white/80 mb-6">Pop the rising balloons to relieve stress!</p>
        
        <div className="mb-4">
            <span className="text-white text-xl">Score: {score}</span>
        </div>
        
        <div className="relative bg-sky-200 rounded-2xl h-80 mb-6 overflow-hidden">
            {balloons.map(balloon => (
            <div
                key={balloon.id}
                className={`absolute w-12 h-16 ${balloon.color} rounded-full cursor-pointer transform hover:scale-110 transition-transform shadow-lg`}
                style={{ 
                left: `${balloon.x}%`, 
                bottom: `${balloon.y}%`,
                clipPath: 'ellipse(50% 60% at 50% 40%)'
                }}
                onClick={() => popBalloon(balloon.id)}
            >
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gray-600"></div>
            </div>
            ))}
            
            {!gameActive && balloons.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-gray-600 text-lg">Click balloons to pop them!</div>
            </div>
            )}
        </div>
        
        <div className="space-y-4">
            {!gameActive ? (
            <button
                onClick={startGame}
                className={`px-8 py-3 bg-gradient-to-br ${currentTheme.secondary} hover:opacity-90 text-white rounded-xl font-medium transition-all`}
            >
                Start Game
            </button>
            ) : (
            <button
                onClick={stopGame}
                className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-all"
            >
                Stop Game
            </button>
            )}
        </div>
        </div>
    );
    };

    // Daily Affirmations Component
    const DailyAffirmations = ({ onBack }) => {
    const [currentAffirmation, setCurrentAffirmation] = useState(0);
    const [favorites, setFavorites] = useState([]);
    const { theme } = useContext(AppContext);
    const currentTheme = themes[theme];

    const affirmations = [
        "I am worthy of love and happiness",
        "I choose peace and calm in this moment",
        "I am capable of handling whatever comes my way",
        "I deserve to take care of my mental health",
        "I am growing stronger every day",
        "My feelings are valid and I honor them",
        "I am exactly where I need to be right now",
        "I choose to focus on what I can control",
        "I am resilient and can overcome challenges",
        "I deserve compassion, especially from myself",
        "Today is full of possibilities",
        "I am learning and growing with each experience",
        "I trust in my ability to make good decisions",
        "I am surrounded by love and support",
        "I choose to see the good in this day"
    ];

    const nextAffirmation = () => {
        setCurrentAffirmation((prev) => (prev + 1) % affirmations.length);
    };

    const previousAffirmation = () => {
        setCurrentAffirmation((prev) => (prev - 1 + affirmations.length) % affirmations.length);
    };

    const toggleFavorite = () => {
        const current = affirmations[currentAffirmation];
        if (favorites.includes(current)) {
        setFavorites(prev => prev.filter(aff => aff !== current));
        } else {
        setFavorites(prev => [...prev, current]);
        }
    };

    return (
        <div className={`bg-gradient-to-br ${currentTheme.accent} backdrop-blur-md rounded-3xl p-8 ${currentTheme.border} text-center`}>
        <button 
            onClick={onBack}
            className={`mb-4 ${currentTheme.text} hover:text-white transition-colors`}
        >
            ← Back to Games
        </button>
        
        <h3 className="text-2xl font-bold text-white mb-8">✨ Daily Affirmations</h3>
        
        <div className={`bg-gradient-to-br ${currentTheme.secondary}/20 backdrop-blur-md rounded-3xl p-8 ${currentTheme.border} mb-8`}>
            <div className="text-6xl mb-6">🌟</div>
            <p className="text-white text-xl font-medium leading-relaxed mb-8">
            "{affirmations[currentAffirmation]}"
            </p>
            
            <div className="flex items-center justify-center gap-6">
            <button
                onClick={previousAffirmation}
                className={`p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all ${currentTheme.border}`}
            >
                ← Previous
            </button>
            
            <button
                onClick={toggleFavorite}
                className={`p-3 rounded-full transition-all ${
                favorites.includes(affirmations[currentAffirmation])
                    ? 'bg-red-500 text-white'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                } ${currentTheme.border}`}
            >
                {favorites.includes(affirmations[currentAffirmation]) ? '❤️' : '🤍'}
            </button>
            
            <button
                onClick={nextAffirmation}
                className={`p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all ${currentTheme.border}`}
            >
                Next →
            </button>
            </div>
        </div>
        
        <div className="text-center">
            <p className={`${currentTheme.text} mb-4`}>
            {currentAffirmation + 1} of {affirmations.length}
            </p>
            {favorites.length > 0 && (
            <p className="text-white/80">
                ❤️ {favorites.length} favorite{favorites.length !== 1 ? 's' : ''}
            </p>
            )}
        </div>
        </div>
    );
    };

    // Enhanced Wellness Games with new components
    const WellnessGames = () => {
    const [activeGame, setActiveGame] = useState(null);
    const { language, theme } = useContext(AppContext);
    const t = translations[language];
    const currentTheme = themes[theme];

    const games = [
        { 
        id: 'breathing', 
        title: t.breathingExercise, 
        description: 'Guided breathing for relaxation', 
        color: `${currentTheme.secondary}`, 
        icon: '🫁',
        component: BreathingExercise
        },
        { 
        id: 'mood', 
        title: t.moodTracker, 
        description: 'Log your daily emotions', 
        color: `${currentTheme.secondary}`, 
        icon: '😊',
        component: MoodTracker
        },
        { 
        id: 'gratitude', 
        title: t.gratitudeJournal, 
        description: 'Write what you\'re grateful for', 
        color: `${currentTheme.secondary}`, 
        icon: '📝',
        component: GratitudeJournal
        },
        { 
        id: 'meditation', 
        title: t.meditationTimer, 
        description: 'Timed mindfulness session', 
        color: `${currentTheme.secondary}`, 
        icon: '🧘‍♀️',
        component: MeditationTimer
        },
        { 
        id: 'stress', 
        title: t.stressReliefGame, 
        description: 'Interactive stress relief activity', 
        color: `${currentTheme.secondary}`, 
        icon: '🎈',
        component: StressReliefGame
        },
        { 
        id: 'affirmations', 
        title: t.dailyAffirmations, 
        description: 'Positive self-talk practice', 
        color: `${currentTheme.secondary}`, 
        icon: '✨',
        component: DailyAffirmations
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
            <h2 className="text-3xl font-bold text-white">{t.games} & Activities</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game, index) => (
            <div 
                key={index} 
                className={`bg-gradient-to-br ${game.color} rounded-3xl p-6 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-xl group ${currentTheme.border}`}
                onClick={() => setActiveGame(game)}
            >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {game.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{game.title}</h3>
                <p className="text-green-50/90 text-sm mb-4 leading-relaxed">{game.description}</p>
                <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl text-sm transition-all duration-300 transform hover:scale-105 font-medium">
                Play Now
                </button>
            </div>
            ))}
        </div>
        </div>
    );
    };

    // Enhanced Settings with working theme and language functionality
    const SettingsSection = () => {
    const { theme, setTheme, language, setLanguage } = useContext(AppContext);
    const [notifications, setNotifications] = useState({
        dailyReminder: true,
        sessionAlerts: true,
        progressUpdates: false,
        weeklyReport: true
    });

    const currentTheme = themes[theme];
    const t = translations[language];

    return (
        <div className="space-y-8">
        <div className="flex items-center gap-3">
            <span className="text-3xl">⚙️</span>
            <h2 className="text-3xl font-bold text-white">{t.settings}</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Notifications */}
            <div className={`bg-gradient-to-br ${currentTheme.accent} backdrop-blur-md rounded-3xl p-8 ${currentTheme.border} shadow-xl`}>
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <span>🔔</span>
                Notifications
            </h3>
            <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                    <span className="text-white capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <button
                    onClick={() => setNotifications(prev => ({ ...prev, [key]: !value }))}
                    className={`w-12 h-6 rounded-full transition-all ${
                        value ? `bg-gradient-to-r ${currentTheme.secondary}` : 'bg-gray-600'
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
            <div className={`bg-gradient-to-br ${currentTheme.accent} backdrop-blur-md rounded-3xl p-8 ${currentTheme.border} shadow-xl`}>
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <span>🎨</span>
                Preferences
            </h3>
            <div className="space-y-6">
                <div>
                <label className="block text-white mb-2">Theme</label>
                <select 
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-white/40"
                >
                    <option value="green" className="bg-gray-800">Forest Green</option>
                    <option value="blue" className="bg-gray-800">Ocean Blue</option>
                    <option value="purple" className="bg-gray-800">Lavender Purple</option>
                </select>
                </div>
                
                <div>
                <label className="block text-white mb-2">Language</label>
                <select 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-white/40"
                >
                    <option value="english" className="bg-gray-800">English</option>
                    <option value="french" className="bg-gray-800">Français</option>
                    <option value="spanish" className="bg-gray-800">Español</option>
                </select>
                </div>
                
                <div>
                <label className="block text-white mb-2">Timezone</label>
                <select className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-white/40">
                    <option value="UTC-5" className="bg-gray-800">Eastern Time</option>
                    <option value="UTC-6" className="bg-gray-800">Central Time</option>
                    <option value="UTC-7" className="bg-gray-800">Mountain Time</option>
                    <option value="UTC-8" className="bg-gray-800">Pacific Time</option>
                </select>
                </div>
            </div>
            </div>
        </div>
        
        {/* Account Settings */}
        <div className={`bg-gradient-to-r ${currentTheme.accent} backdrop-blur-md rounded-3xl p-8 ${currentTheme.border} shadow-xl`}>
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span>👤</span>
            Account Settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button className={`bg-gradient-to-r ${currentTheme.secondary} hover:opacity-90 text-white py-3 px-6 rounded-2xl transition-all transform hover:scale-105`}>
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

    // Enhanced existing components with theme support
    const BreathingExercise = ({ onBack }) => {
    const [isActive, setIsActive] = useState(false);
    const [phase, setPhase] = useState('inhale');
    const [count, setCount] = useState(4);
    const [cycle, setCycle] = useState(0);
    const { theme } = useContext(AppContext);
    const currentTheme = themes[theme];

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
        <div className={`bg-gradient-to-br ${currentTheme.accent} backdrop-blur-md rounded-3xl p-8 ${currentTheme.border} text-center`}>
        <button 
            onClick={onBack}
            className={`mb-4 ${currentTheme.text} hover:text-white transition-colors`}
        >
            ← Back to Games
        </button>
        
        <h3 className="text-2xl font-bold text-white mb-8">Breathing Exercise</h3>
        
        <div className={`w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br ${currentTheme.secondary} flex items-center justify-center text-white font-bold text-2xl transition-transform duration-1000 ${
            isActive && phase === 'inhale' ? 'scale-125' : 
            isActive && phase === 'exhale' ? 'scale-75' : 'scale-100'
        }`}>
            {count}
        </div>
        
        <p className="text-xl text-white mb-6">{getInstruction()}</p>
        <p className={`${currentTheme.text} mb-8`}>Cycles completed: {cycle}</p>
        
        <div className="space-y-4">
            <button
            onClick={() => setIsActive(!isActive)}
            className={`px-8 py-3 rounded-xl font-medium transition-all ${
                isActive 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : `bg-gradient-to-r ${currentTheme.secondary} hover:opacity-90 text-white`
            }`}
            >
            {isActive ? 'Stop' : 'Start Breathing'}
            </button>
            
            {!isActive && (
            <button
                onClick={() => { setCount(4); setPhase('inhale'); setCycle(0); }}
                className={`ml-4 px-6 py-3 bg-white/20 hover:bg-white/30 ${currentTheme.text} rounded-xl transition-all`}
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
    const { theme } = useContext(AppContext);
    const currentTheme = themes[theme];

    const moods = [
        { emoji: '😊', label: 'Happy', color: `${currentTheme.secondary}` },
        { emoji: '😌', label: 'Calm', color: `${currentTheme.secondary}` },
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
        <div className={`bg-gradient-to-br ${currentTheme.accent} backdrop-blur-md rounded-3xl p-8 ${currentTheme.border}`}>
        <button 
            onClick={onBack}
            className={`mb-4 ${currentTheme.text} hover:text-white transition-colors`}
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
            className={`w-full bg-white/10 ${currentTheme.border} rounded-2xl px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:border-white/40 mb-6`}
            rows={3}
        />
        
        <button
            onClick={saveMood}
            disabled={!selectedMood}
            className={`w-full bg-gradient-to-r ${currentTheme.secondary} hover:opacity-90 disabled:from-gray-600 disabled:to-gray-700 text-white py-3 rounded-2xl font-medium transition-all disabled:cursor-not-allowed`}
        >
            Save Mood Entry
        </button>
        
        {savedEntries.length > 0 && (
            <div className="mt-8">
            <h4 className="text-lg font-semibold text-white mb-4">Recent Entries</h4>
            <div className="space-y-3">
                {savedEntries.map((entry, index) => (
                <div key={index} className={`bg-white/5 rounded-xl p-4 ${currentTheme.border}`}>
                    <div className="flex justify-between items-start">
                    <span className={`${currentTheme.text} font-medium`}>{entry.mood}</span>
                    <span className="text-white/60 text-xs">{entry.timestamp}</span>
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
    const { theme } = useContext(AppContext);
    const currentTheme = themes[theme];

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
        <div className={`bg-gradient-to-br ${currentTheme.accent} backdrop-blur-md rounded-3xl p-8 ${currentTheme.border}`}>
        <button 
            onClick={onBack}
            className={`mb-4 ${currentTheme.text} hover:text-white transition-colors`}
        >
            ← Back to Games
        </button>
        
        <h3 className="text-2xl font-bold text-white mb-6 text-center">🌟 Gratitude Journal</h3>
        <p className="text-white/80 text-center mb-8">What are you grateful for today?</p>
        
        <div className="mb-6">
            <textarea
            value={gratitudeText}
            onChange={(e) => setGratitudeText(e.target.value)}
            placeholder="I'm grateful for..."
            className={`w-full bg-white/10 ${currentTheme.border} rounded-2xl px-6 py-4 text-white placeholder-white/60 focus:outline-none focus:border-white/40 mb-4`}
            rows={4}
            />
            <button
            onClick={addEntry}
            disabled={!gratitudeText.trim()}
            className={`w-full bg-gradient-to-r ${currentTheme.secondary} hover:opacity-90 disabled:from-gray-600 disabled:to-gray-700 text-white py-3 rounded-2xl font-medium transition-all disabled:cursor-not-allowed`}
            >
            Add Gratitude Entry
            </button>
        </div>
        
        {entries.length > 0 && (
            <div>
            <h4 className="text-lg font-semibold text-white mb-4">Your Gratitude Collection</h4>
            <div className="space-y-3 max-h-60 overflow-y-auto">
                {entries.map((entry, index) => (
                <div key={index} className={`bg-white/5 rounded-xl p-4 ${currentTheme.border}`}>
                    <p className="text-white/90 mb-2">{entry.text}</p>
                    <p className={`${currentTheme.text} text-xs`}>{entry.date}</p>
                </div>
                ))}
            </div>
            </div>
        )}
        </div>
    );
    };

    // Component parts with theme support
    const WelcomeSection = ({ user, greeting }) => {
    const { theme } = useContext(AppContext);
    const currentTheme = themes[theme];

    return (
        <div className={`bg-gradient-to-r ${currentTheme.primary}/80 backdrop-blur-md rounded-3xl p-8 ${currentTheme.border} shadow-2xl`}>
        <h2 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            Welcome Back, {user?.firstName || 'Friend'}! 🌿
        </h2>
        <p className="text-white/90 text-lg leading-relaxed">
            {greeting}! How are you feeling today? Your mental wellness journey continues here in your peaceful space.
        </p>
        </div>
    );
    };

    const QuickActionsGrid = ({ actions, onActionClick }) => {
    const { theme } = useContext(AppContext);
    const currentTheme = themes[theme];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {actions.map((action, index) => (
            <div
            key={index}
            className={`bg-gradient-to-br ${currentTheme.secondary} rounded-3xl p-6 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl group ${currentTheme.border}`}
            onClick={() => onActionClick(action.section)}
            >
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {action.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{action.title}</h3>
            <p className="text-white/90 leading-relaxed">{action.description}</p>
            </div>
        ))}
        </div>
    );
    };

    const WellnessTip = () => {
    const { theme } = useContext(AppContext);
    const currentTheme = themes[theme];
    
    const tips = [
        "Take a moment to breathe deeply. Inhale peace, exhale stress. Remember, it's okay to take things one step at a time.",
        "Nature has a wonderful way of healing. Take a moment to appreciate the world around you.",
        "Progress, not perfection. Every small step towards wellness counts and deserves celebration.",
        "Your mental health is just as important as your physical health. Be gentle with yourself today.",
        "Like plants need water and sunlight, you need rest and self-care to flourish."
    ];
    
    const [currentTip] = useState(tips[Math.floor(Math.random() * tips.length)]);

    return (
        <div className={`bg-gradient-to-r ${currentTheme.accent} backdrop-blur-md rounded-3xl p-8 ${currentTheme.border} shadow-xl`}>
        <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">💡</span>
            <h3 className="text-xl font-bold text-white">Today's Wellness Tip</h3>
        </div>
        <p className="text-white/90 leading-relaxed italic">
            "{currentTip}"
        </p>
        </div>
    );
    };

    // Enhanced ChatInterface, BookingInterface, ProgressDashboard, and ResourcesSection with theme support
    const ChatInterface = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        { type: 'bot', text: 'Hello! I\'m your AI wellness companion. 🌱 How are you feeling today?' }
    ]);
    const { theme } = useContext(AppContext);
    const currentTheme = themes[theme];

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
        <div className={`bg-gradient-to-br ${currentTheme.accent} backdrop-blur-md rounded-3xl p-6 ${currentTheme.border} h-full flex flex-col`}>
        <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">🤖</span>
            <h2 className="text-2xl font-bold text-white">AI Wellness Companion</h2>
        </div>
        
        <div className={`bg-white/5 rounded-2xl p-4 flex-1 mb-4 overflow-y-auto space-y-3 ${currentTheme.border}`}>
            {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs px-4 py-2 rounded-2xl ${
                msg.type === 'user' 
                    ? `bg-gradient-to-r ${currentTheme.secondary} text-white` 
                    : `bg-white/10 text-white ${currentTheme.border}`
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
            className={`flex-1 bg-white/10 ${currentTheme.border} rounded-2xl px-6 py-4 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all`}
            />
            <button 
            onClick={handleSendMessage}
            className={`bg-gradient-to-r ${currentTheme.primary} hover:opacity-90 text-white px-8 py-4 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg`}
            >
            Send
            </button>
        </div>
        </div>
    );
    };

    // Main Dashboard Component with Context Provider
    const Dashboard = () => {
    const [selectedSection, setSelectedSection] = useState('overview');
    const [theme, setTheme] = useState('green');
    const [language, setLanguage] = useState('english');
    const currentTime = useTime();
    const greeting = useGreeting(currentTime, language);
    const navigate = useNavigate();
    const { user } = useUser();

    const currentTheme = themes[theme];
    const t = translations[language];

    // Configuration objects with translations
    const SIDEBAR_ITEMS = [
        { id: 'overview', label: t.overview, icon: '🏠' },
        { id: 'chatbot', label: t.chatbot, icon: '🤖' },
        { id: 'games', label: t.games, icon: '🎮' },
        { id: 'sessions', label: t.sessions, icon: '📅' },
        { id: 'progress', label: t.progress, icon: '📊' },
        { id: 'resources', label: t.resources, icon: '📚' },
        { id: 'settings', label: t.settings, icon: '⚙️' }
    ];

    const QUICK_ACTIONS = [
        {
        title: t.startChat,
        description: t.talkToCounselor,
        icon: '💬',
        color: currentTheme.secondary,
        section: 'chatbot'
        },
        {
        title: t.playMindfulness,
        description: t.relaxWithGames,
        icon: '🧘',
        color: currentTheme.secondary,
        section: 'games'
        },
        {
        title: t.bookAppointment,
        description: t.scheduleWithPro,
        icon: '👨‍⚕️',
        color: currentTheme.secondary,
        section: 'sessions'
        },
        {
        title: t.viewProgress,
        description: t.checkWellnessJourney,
        icon: '📈',
        color: currentTheme.secondary,
        section: 'progress'
        }
    ];

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
            return <div className={`bg-gradient-to-br ${currentTheme.accent} backdrop-blur-md rounded-3xl p-12 ${currentTheme.border} text-center shadow-2xl`}>
                <div className="text-6xl mb-4">📅</div>
                <h2 className="text-2xl font-bold text-white mb-4">Book Session</h2>
                <p className="text-white/80">This feature will be available soon.</p>
            </div>;
        case 'progress':
            return <div className={`bg-gradient-to-br ${currentTheme.accent} backdrop-blur-md rounded-3xl p-12 ${currentTheme.border} text-center shadow-2xl`}>
                <div className="text-6xl mb-4">📊</div>
                <h2 className="text-2xl font-bold text-white mb-4">Progress Dashboard</h2>
                <p className="text-white/80">Track your wellness journey here.</p>
            </div>;
        case 'resources':
            return <div className={`bg-gradient-to-br ${currentTheme.accent} backdrop-blur-md rounded-3xl p-12 ${currentTheme.border} text-center shadow-2xl`}>
                <div className="text-6xl mb-4">📚</div>
                <h2 className="text-2xl font-bold text-white mb-4">Resources</h2>
                <p className="text-white/80">Educational materials coming soon.</p>
            </div>;
        case 'settings':
            return <SettingsSection />;
        default:
            return (
            <div className={`bg-gradient-to-br ${currentTheme.accent} backdrop-blur-md rounded-3xl p-12 ${currentTheme.border} text-center shadow-2xl`}>
                <div className="text-6xl mb-4">🚧</div>
                <h2 className="text-2xl font-bold text-white mb-4">Coming Soon</h2>
                <p className="text-white/80">This section is under development.</p>
            </div>
            );
        }
    };

    return (
        <AppContext.Provider value={{ theme, setTheme, language, setLanguage }}>
        <div className={`w-full h-screen flex bg-gradient-to-br ${currentTheme.background} overflow-hidden`}>
            {/* Modern Sidebar */}
            <div className="w-72 bg-black/30 backdrop-blur-xl border-r border-white/20 flex flex-col shadow-2xl">
            {/* Logo/Header */}
            <div className="p-8 border-b border-white/20">
                <div className="flex items-center gap-3">
                <div className={`w-12 h-12 bg-gradient-to-r ${currentTheme.primary} rounded-2xl flex items-center justify-center text-2xl shadow-lg`}>
                    <img src={logo} alt="" className='h-25px w-2px' />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-white">SafeSpace</h1>
                    <p className="text-white/70 text-sm">Your Wellness Sanctuary</p>
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
                        ? `bg-gradient-to-r ${currentTheme.primary} text-white shadow-lg scale-105 border border-white/30`
                        : `text-white/70 ${currentTheme.hover} hover:text-white`
                    }`}
                    >
                    <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                    </button>
                ))}
                </div>
            </nav>

            {/* User Info */}
            <div className="p-6 border-t border-white/20">
                <div className={`flex items-center space-x-4 bg-white/5 rounded-2xl p-4 ${currentTheme.border}`}>
                <div className={`w-12 h-12 bg-gradient-to-r ${currentTheme.primary} rounded-full flex items-center justify-center shadow-lg`}>
                    <span className="text-white font-bold text-lg">
                    {(user?.firstName || 'U').charAt(0)}
                    </span>
                </div>
                <div>
                    <p className="text-white font-medium">{user?.firstName || 'User'}</p>
                    <p className="text-white/60 text-sm">{currentTime.toLocaleDateString()}</p>
                </div>
                </div>
            </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
            {/* Modern Header */}
            <header className="bg-black/20 backdrop-blur-xl border-b border-white/20 px-8 py-6 shadow-xl">
                <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-1">
                    {SIDEBAR_ITEMS.find(item => item.id === selectedSection)?.label || 'Dashboard'}
                    </h1>
                    <p className="text-white/70">
                    {greeting}, {user?.firstName || 'Friend'} • {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                </div>

                <div className="flex items-center space-x-4">
                    <UserButton 
                    appearance={{
                        elements: {
                        avatarBox: `w-12 h-12 rounded-full bg-gradient-to-r ${currentTheme.primary} border-2 border-white/30 shadow-lg`
                        }
                    }}
                    />
                    <button
                    onClick={() => navigate('/')}
                    className={`bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-2xl transition-all duration-300 ${currentTheme.border} hover:border-white/50 transform hover:scale-105 font-medium shadow-lg`}
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
        </AppContext.Provider>
    );
    };

    export default Dashboard;