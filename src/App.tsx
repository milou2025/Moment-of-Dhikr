import { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Moon, 
  Sun, 
  Play, 
  Pause, 
  Heart, 
  Share2, 
  Mail, 
  Instagram, 
  Twitter, 
  Facebook,
  ChevronRight,
  Sparkles,
  Volume2,
  BookOpen,
  MessageCircle,
  CheckCircle2
} from 'lucide-react';
import { QURAN_VERSES, HADITHS, DAILY_DHIKR, QuranVerse, Hadith, Dhikr } from './constants';

export default function App() {
  const [activeVerse, setActiveVerse] = useState<QuranVerse>(QURAN_VERSES[0]);
  const [activeHadith, setActiveHadith] = useState<Hadith>(HADITHS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [dhikrCounts, setDhikrCounts] = useState<Record<number, number>>({
    1: 0, 2: 0, 3: 0, 4: 0
  });
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const incrementDhikr = (id: number) => {
    setDhikrCounts(prev => ({ ...prev, [id]: prev[id] + 1 }));
    // Simple haptic-like feedback if supported
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  };

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-gold-500/30 selection:text-gold-500">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gold-500 rounded-full flex items-center justify-center">
            <Moon className="text-emerald-950 w-5 h-5 fill-current" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-white">NUR</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
          <a href="#quran" className="hover:text-gold-500 transition-colors">Quran</a>
          <a href="#hadith" className="hover:text-gold-500 transition-colors">Hadith</a>
          <a href="#dhikr" className="hover:text-gold-500 transition-colors">Dhikr</a>
          <a href="#reminders" className="hover:text-gold-500 transition-colors">Reminders</a>
        </div>
        <button className="bg-gold-500 hover:bg-gold-600 text-emerald-950 px-4 py-2 rounded-full text-sm font-bold transition-all transform hover:scale-105 active:scale-95">
          Join Community
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold-500/20 rounded-full blur-[120px]" />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-500 text-xs font-bold mb-6">
              <Sparkles className="w-3 h-3" />
              DAILY SPIRITUAL NOURISHMENT
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-8 leading-tight">
              Illuminate Your Heart with <span className="text-gold-500 italic">Remembrance</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              A sanctuary for the modern Muslim. Connect with the words of Allah and His Messenger (ﷺ) every single day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#quran" className="bg-white text-emerald-950 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-all">
                Start Reading
              </a>
              <a href="#dhikr" className="glass text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all">
                Daily Dhikr
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quran Section */}
      <section id="quran" className="py-24 px-6 bg-[#080c0f]">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
              <BookOpen className="text-emerald-500 w-6 h-6" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Verse of the Day</h2>
              <p className="text-gray-500">Reflect on the words of the Creator</p>
            </div>
          </div>

          <motion.div 
            className="glass rounded-[2rem] p-8 md:p-12 relative overflow-hidden group"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <BookOpen className="w-48 h-48 text-gold-500" />
            </div>

            <div className="relative z-10">
              <div className="text-right mb-12">
                <p className="arabic-text text-4xl md:text-6xl text-white leading-[1.8] md:leading-[1.8]">
                  {activeVerse.text}
                </p>
              </div>
              
              <div className="max-w-2xl">
                <p className="text-xl md:text-2xl text-gray-300 font-serif italic mb-6">
                  "{activeVerse.translation}"
                </p>
                <div className="flex items-center gap-4 text-sm font-bold text-gold-500">
                  <span>Surah {activeVerse.surah}</span>
                  <span className="w-1 h-1 rounded-full bg-gold-500/30" />
                  <span>Ayah {activeVerse.ayah}</span>
                </div>
              </div>

              <div className="mt-12 flex flex-wrap items-center gap-6">
                <button 
                  onClick={toggleAudio}
                  className="w-16 h-16 rounded-full bg-gold-500 flex items-center justify-center text-emerald-950 hover:scale-110 transition-transform active:scale-95"
                >
                  {isPlaying ? <Pause className="fill-current" /> : <Play className="fill-current ml-1" />}
                </button>
                <audio 
                  ref={audioRef} 
                  src={activeVerse.audioUrl} 
                  onEnded={() => setIsPlaying(false)}
                />
                
                <div className="flex gap-3">
                  <button className="p-4 rounded-full glass hover:bg-white/10 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="p-4 rounded-full glass hover:bg-white/10 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hadith Section */}
      <section id="hadith" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-gold-500/10 flex items-center justify-center">
                  <MessageCircle className="text-gold-500 w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold text-white">Prophetic Wisdom</h2>
              </div>
              
              <motion.div 
                key={activeHadith.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10">
                  <p className="text-xl text-gray-200 leading-relaxed mb-6 font-serif">
                    {activeHadith.text}
                  </p>
                  <p className="text-sm font-bold text-gold-500 uppercase tracking-widest">
                    — {activeHadith.source}
                  </p>
                </div>

                <div className="p-8 rounded-[2rem] bg-gold-500/5 border border-gold-500/10">
                  <h4 className="text-gold-500 font-bold mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Reflection
                  </h4>
                  <p className="text-gray-400 leading-relaxed">
                    {activeHadith.explanation}
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-[3rem] overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=1000" 
                  alt="Islamic Architecture"
                  className="object-cover w-full h-full opacity-60"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05080a] to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 glass p-6 rounded-2xl max-w-[200px]">
                <p className="text-xs text-gray-400 mb-2">Daily Goal</p>
                <p className="text-lg font-bold text-white">Read 1 Hadith</p>
                <div className="w-full h-1 bg-white/10 rounded-full mt-3">
                  <div className="w-full h-full bg-gold-500 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dhikr Section */}
      <section id="dhikr" className="py-24 px-6 bg-[#080c0f]">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Daily Dhikr</h2>
          <p className="text-gray-500">Keep your tongue moist with the remembrance of Allah</p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DAILY_DHIKR.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => incrementDhikr(item.id)}
              className="glass p-8 rounded-[2.5rem] text-center group relative overflow-hidden transition-all hover:border-gold-500/50"
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute top-4 right-6 text-4xl font-black text-white/5 group-hover:text-gold-500/10 transition-colors">
                {dhikrCounts[item.id]}
              </div>
              <p className="arabic-text text-3xl text-white mb-4 group-hover:text-gold-500 transition-colors">
                {item.arabic}
              </p>
              <p className="text-sm font-bold text-gold-500 mb-1">{item.transliteration}</p>
              <p className="text-xs text-gray-500">{item.translation}</p>
              
              <div className="mt-6 flex justify-center">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-gold-500 group-hover:text-emerald-950 transition-all">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="reminders" className="py-24 px-6">
        <div className="max-w-4xl mx-auto glass rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-500/20 via-transparent to-transparent" />
          </div>

          <div className="relative z-10">
            <div className="w-20 h-20 bg-gold-500 rounded-3xl flex items-center justify-center mx-auto mb-8 rotate-3">
              <Mail className="text-emerald-950 w-10 h-10" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Never Miss a Reminder</h2>
            <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto">
              Join 15,000+ Muslims receiving daily Quran verses and Hadiths directly in their inbox.
            </p>

            <AnimatePresence mode="wait">
              {!subscribed ? (
                <motion.form 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                >
                  <input 
                    type="email" 
                    placeholder="your@email.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white focus:outline-none focus:border-gold-500 transition-colors"
                  />
                  <button 
                    type="submit"
                    className="bg-gold-500 text-emerald-950 px-8 py-4 rounded-full font-bold hover:bg-gold-600 transition-all whitespace-nowrap"
                  >
                    Subscribe Now
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-4 text-gold-500"
                >
                  <CheckCircle2 className="w-16 h-16" />
                  <p className="text-2xl font-bold">You're on the list!</p>
                  <p className="text-gray-400">Check your inbox for your first reminder.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gold-500 rounded-full flex items-center justify-center">
                <Moon className="text-emerald-950 w-5 h-5 fill-current" />
              </div>
              <span className="text-xl font-bold tracking-tighter text-white">NUR</span>
            </div>
            <p className="text-gray-500 max-w-sm leading-relaxed mb-8">
              Spreading the light of Islam through beautiful design and daily reminders. Our mission is to help you stay connected to your faith in a busy world.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-gold-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-gold-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-gold-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Resources</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Quran Library</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Hadith Collection</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Dhikr Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Prayer Times</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Support</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-600 text-xs">
          <p>© 2026 NUR. All rights reserved.</p>
          <p>Made with heart for the Ummah.</p>
        </div>
      </footer>
    </div>
  );
}
