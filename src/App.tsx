import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  ArrowLeft,
  MapPin,
  MessageSquare,
  Phone,
  Menu,
  X,
  Check,
  AlertCircle,
  Heart,
  Users,
  Smile,
  Ear,
  Handshake,
  Wrench,
  Sparkles,
  Mail,
  Globe,
  Download
} from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { translations } from './translations';

export default function App() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const t = translations[lang];
  const isRtl = lang === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang, isRtl]);

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'ar' : 'en');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setShowSuccessModal(true);
        form.reset();
      } else {
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error(error);
      setShowErrorModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['solutions', 'process', 'why-us', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section);
          return;
        }
      }
      if (window.scrollY < 100) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-stone-800 selection:bg-orange-200 selection:text-stone-900 font-sans" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Navigation */}
      <nav className={`fixed top-0 start-0 end-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#fdfbf7]/95 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
              {!logoError && (
                <img 
                  src="https://i.postimg.cc/7YCZDRh6/logo-png.jpg" 
                  alt="ADS Logo" 
                  className={`h-10 w-auto me-3 rounded-sm transition-all ${scrolled ? 'opacity-100' : 'opacity-90 brightness-0 invert'}`} 
                  onError={() => setLogoError(true)}
                />
              )}
              <span className={`font-serif font-bold text-2xl tracking-tight transition-colors ${scrolled ? 'text-stone-900' : 'text-white'}`}>
                ADS<span className={scrolled ? 'text-orange-600' : 'text-orange-400'}>.</span>
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
              <button onClick={() => scrollToSection('solutions')} className={`font-medium text-sm uppercase tracking-widest transition-colors ${scrolled ? (activeSection === 'solutions' ? 'text-orange-600' : 'text-stone-600 hover:text-orange-600') : 'text-white/80 hover:text-white'}`}>{t.nav.howWeHelp}</button>
              <button onClick={() => scrollToSection('process')} className={`font-medium text-sm uppercase tracking-widest transition-colors ${scrolled ? (activeSection === 'process' ? 'text-orange-600' : 'text-stone-600 hover:text-orange-600') : 'text-white/80 hover:text-white'}`}>{t.nav.ourApproach}</button>
              <button onClick={() => scrollToSection('why-us')} className={`font-medium text-sm uppercase tracking-widest transition-colors ${scrolled ? (activeSection === 'why-us' ? 'text-orange-600' : 'text-stone-600 hover:text-orange-600') : 'text-white/80 hover:text-white'}`}>{t.nav.whyUs}</button>
              <button onClick={() => scrollToSection('contact')} className={`px-6 py-2.5 rounded-full font-medium text-sm uppercase tracking-widest transition-all ${scrolled ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-md' : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm border border-white/30'}`}>
                {t.nav.letsTalk}
              </button>
              <button onClick={toggleLang} className={`flex items-center font-medium text-sm uppercase tracking-widest transition-colors ${scrolled ? 'text-stone-600 hover:text-orange-600' : 'text-white/80 hover:text-white'}`}>
                <Globe className="w-4 h-4 me-1" />
                {t.nav.langToggle}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4 rtl:space-x-reverse">
              <button onClick={toggleLang} className={`flex items-center font-medium text-sm uppercase tracking-widest transition-colors ${scrolled ? 'text-stone-600 hover:text-orange-600' : 'text-white/80 hover:text-white'}`}>
                <Globe className="w-4 h-4 me-1" />
                {t.nav.langToggle}
              </button>
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`focus:outline-none transition-colors ${scrolled ? 'text-stone-800' : 'text-white'}`}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#fdfbf7] border-b border-stone-200 shadow-lg absolute w-full top-full start-0 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-2">
                <button onClick={() => scrollToSection('solutions')} className="block w-full text-start px-3 py-3 text-stone-700 hover:bg-stone-100 rounded-md font-serif text-lg">{t.nav.howWeHelp}</button>
                <button onClick={() => scrollToSection('process')} className="block w-full text-start px-3 py-3 text-stone-700 hover:bg-stone-100 rounded-md font-serif text-lg">{t.nav.ourApproach}</button>
                <button onClick={() => scrollToSection('why-us')} className="block w-full text-start px-3 py-3 text-stone-700 hover:bg-stone-100 rounded-md font-serif text-lg">{t.nav.whyUs}</button>
                <button onClick={() => scrollToSection('contact')} className="block w-full text-center mt-4 bg-orange-600 text-white px-4 py-3 rounded-full font-medium uppercase tracking-widest text-sm shadow-md">
                  {t.nav.letsTalk}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src="https://i.postimg.cc/Z5BH8JRb/image.jpg" 
            alt="Malta Street" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-stone-900/40 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 via-transparent to-[#fdfbf7]"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.3 }
              }
            }}
            className="max-w-4xl mx-auto"
          >
            <motion.span 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
              }}
              className="inline-block py-1.5 px-4 rounded-full bg-white/10 backdrop-blur-md text-white text-xs uppercase tracking-[0.2em] mb-8 border border-white/20 font-medium"
            >
              {t.hero.badge}
            </motion.span>
            <motion.h1 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
              }}
              className="text-5xl md:text-6xl lg:text-7xl font-serif text-white leading-[1.1] mb-8 drop-shadow-lg"
            >
              {t.hero.title1} <br className="hidden md:block" />
              <span className="italic font-light text-orange-200">{t.hero.title2}</span>
            </motion.h1>
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
              }}
              className="text-xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-md"
            >
              {t.hero.desc}
            </motion.p>
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
              }}
              className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 sm:rtl:space-x-reverse mt-12"
            >
              <button onClick={() => scrollToSection('contact')} className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full font-medium text-sm uppercase tracking-widest transition-all shadow-xl hover:shadow-2xl flex items-center justify-center">
                {t.hero.btnTalk}
                <ArrowIcon className="ms-3 w-4 h-4" />
              </button>
              <button onClick={() => scrollToSection('solutions')} className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-medium text-sm uppercase tracking-widest transition-all flex items-center justify-center">
                {t.hero.btnExplore}
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-12 bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-stone-400 uppercase tracking-widest mb-8">
            {t.socialProof.trustedBy}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <img src="https://upload.wikimedia.org/wikipedia/commons/1/17/USAID-Identity.svg" alt="USAID" className="h-10 md:h-14 w-auto object-contain" referrerPolicy="no-referrer" />
            <img src="https://i.postimg.cc/Jz6rCSHp/International_House_Malta.png" alt="International House Malta" className="h-14 md:h-20 w-auto object-contain" referrerPolicy="no-referrer" />
            <img src="https://i.postimg.cc/5274WDQn/Trust_Consultancy_Development.png" alt="Trust Consultancy & Development" className="h-14 md:h-20 w-auto object-contain" referrerPolicy="no-referrer" />
            <img src="https://i.postimg.cc/x1xfVBNg/Dale_Carnegie_Associates_Global.png" alt="Dale Carnegie & Associates Global" className="h-14 md:h-20 w-auto object-contain" referrerPolicy="no-referrer" />
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-24 bg-[#fdfbf7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-serif text-stone-800 mb-6">{t.pain.title}</h2>
            <p className="text-lg text-stone-500 font-light leading-relaxed">{t.pain.desc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { icon: Wrench, title: t.pain.cards[0].title, desc: t.pain.cards[0].desc },
              { icon: Users, title: t.pain.cards[1].title, desc: t.pain.cards[1].desc },
              { icon: Heart, title: t.pain.cards[2].title, desc: t.pain.cards[2].desc },
              { icon: Sparkles, title: t.pain.cards[3].title, desc: t.pain.cards[3].desc },
              { icon: Ear, title: t.pain.cards[4].title, desc: t.pain.cards[4].desc },
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="bg-white rounded-[2rem] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow border border-stone-100"
              >
                <div className="w-14 h-14 bg-orange-50 rounded-full flex items-center justify-center mb-8">
                  <item.icon className="w-6 h-6 text-orange-600" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-serif text-stone-800 mb-4">{item.title}</h3>
                <p className="text-stone-500 font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="bg-stone-800 rounded-[2rem] p-10 text-white flex flex-col justify-center relative overflow-hidden"
            >
              <div className="absolute top-0 end-0 -mt-10 -me-10 text-stone-700 opacity-20">
                <Smile className="w-48 h-48" strokeWidth={1} />
              </div>
              <h3 className="text-3xl font-serif mb-6 relative z-10">{t.pain.ctaTitle}</h3>
              <button onClick={() => scrollToSection('contact')} className="flex items-center text-orange-300 hover:text-orange-200 font-medium tracking-wide group relative z-10 w-fit">
                {t.pain.ctaBtn}
                <ArrowIcon className={`ms-3 w-5 h-5 transition-transform ${isRtl ? 'group-hover:-translate-x-2' : 'group-hover:translate-x-2'}`} />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-24 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-orange-600 font-medium tracking-[0.2em] uppercase text-xs">{t.solutions.badge}</span>
            <h2 className="text-4xl md:text-5xl font-serif text-stone-800 mt-4 mb-6">{t.solutions.title}</h2>
            <p className="text-stone-500 text-lg font-light leading-relaxed">{t.solutions.desc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[
              {
                icon: Sparkles,
                image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2940&auto=format&fit=crop",
                title: t.solutions.cards[0].title,
                desc: t.solutions.cards[0].desc
              },
              {
                icon: Heart,
                image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=2940&auto=format&fit=crop",
                title: t.solutions.cards[1].title,
                desc: t.solutions.cards[1].desc
              },
              {
                icon: Users,
                image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=2940&auto=format&fit=crop",
                title: t.solutions.cards[2].title,
                desc: t.solutions.cards[2].desc
              },
              {
                icon: Handshake,
                image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2940&auto=format&fit=crop",
                title: t.solutions.cards[3].title,
                desc: t.solutions.cards[3].desc
              }
            ].map((solution, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-md transition-all border border-stone-200/50 group flex flex-col"
              >
                <div className="h-56 w-full overflow-hidden relative">
                  <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                  <img src={solution.image} alt={solution.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                </div>
                <div className="p-10 flex-grow relative">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 group-hover:bg-orange-50 transition-colors -mt-16 relative z-20 shadow-sm border border-stone-100">
                    <solution.icon className="w-7 h-7 text-stone-400 group-hover:text-orange-600 transition-colors" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-serif text-stone-800 mb-4">{solution.title}</h3>
                  <p className="text-stone-500 font-light leading-relaxed">{solution.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-24 bg-[#fdfbf7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-serif text-stone-800 mb-6">{t.process.title}</h2>
            <p className="text-lg text-stone-500 font-light leading-relaxed">{t.process.desc}</p>
          </div>

          <div className="relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-12 start-0 w-full h-[1px] bg-stone-200 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
              {[
                { step: t.process.cards[0].step, title: t.process.cards[0].title, desc: t.process.cards[0].desc },
                { step: t.process.cards[1].step, title: t.process.cards[1].title, desc: t.process.cards[1].desc },
                { step: t.process.cards[2].step, title: t.process.cards[2].title, desc: t.process.cards[2].desc },
                { step: t.process.cards[3].step, title: t.process.cards[3].title, desc: t.process.cards[3].desc }
              ].map((process, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  className="relative text-center"
                >
                  <div className="w-24 h-24 mx-auto bg-[#fdfbf7] border border-stone-200 rounded-full flex items-center justify-center mb-8 shadow-sm relative z-10">
                    <span className="text-2xl font-serif italic text-orange-600">{process.step}</span>
                  </div>
                  <h3 className="text-2xl font-serif text-stone-800 mb-3">{process.title}</h3>
                  <p className="text-stone-500 font-light leading-relaxed">{process.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="py-24 bg-stone-900 text-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <div className="relative">
                <div className={`absolute inset-0 bg-orange-900/20 rounded-[2rem] transform ${isRtl ? '-translate-x-4' : 'translate-x-4'} translate-y-4`}></div>
                <img 
                  src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2940&auto=format&fit=crop" 
                  alt="Male Customer Interaction" 
                  className="relative z-10 rounded-[2rem] shadow-2xl object-cover aspect-[4/5] opacity-90"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="lg:w-1/2">
              <span className="text-orange-400 font-medium tracking-[0.2em] uppercase text-xs mb-4 block">{t.whyUs.badge}</span>
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-10">{t.whyUs.title}</h2>
              
              <div className="space-y-8">
                {[
                  { title: t.whyUs.cards[0].title, desc: t.whyUs.cards[0].desc },
                  { title: t.whyUs.cards[1].title, desc: t.whyUs.cards[1].desc },
                  { title: t.whyUs.cards[2].title, desc: t.whyUs.cards[2].desc },
                  { title: t.whyUs.cards[3].title, desc: t.whyUs.cards[3].desc }
                ].map((item, index) => (
                  <div key={index} className="flex group">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-2 h-2 mt-2.5 rounded-full bg-orange-500 group-hover:scale-150 transition-transform"></div>
                    </div>
                    <div className="ms-6">
                      <h4 className="text-xl font-serif text-white mb-2">{item.title}</h4>
                      <p className="text-stone-400 font-light leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-orange-600 font-medium tracking-[0.2em] uppercase text-xs">{t.socialProof.testimonials.badge}</span>
            <h2 className="text-4xl md:text-5xl font-serif text-stone-800 mt-4 mb-6">{t.socialProof.testimonials.title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.socialProof.testimonials.cards.map((testimonial, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="bg-white rounded-[2rem] p-10 shadow-sm border border-stone-100 relative"
              >
                <div className="text-orange-300 text-6xl font-serif absolute top-6 start-8 opacity-50">"</div>
                <p className="text-stone-600 font-light leading-relaxed mb-8 relative z-10 pt-4">
                  {testimonial.quote}
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-stone-200 rounded-full me-4 flex items-center justify-center text-stone-500 font-serif text-xl">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800">{testimonial.author}</h4>
                    <p className="text-sm text-stone-500">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-[#fdfbf7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <span className="text-orange-600 font-medium tracking-[0.2em] uppercase text-xs mb-4 block">{t.contact.badge}</span>
              <h2 className="text-4xl md:text-5xl font-serif text-stone-800 mb-8">{t.contact.title}</h2>
              <p className="text-lg text-stone-500 font-light leading-relaxed mb-12">{t.contact.desc}</p>
              
              <div className="space-y-8">
                <div className="flex items-center group">
                  <div className="w-14 h-14 bg-white rounded-full shadow-sm flex items-center justify-center me-6 border border-stone-100 group-hover:border-orange-200 transition-colors">
                    <Mail className="w-5 h-5 text-stone-400 group-hover:text-orange-600 transition-colors" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-stone-400 mb-1">{t.contact.email}</p>
                    <p className="text-lg font-serif text-stone-800" dir="ltr">marwan@arkan.ly</p>
                  </div>
                </div>
                <div className="flex items-center group">
                  <div className="w-14 h-14 bg-white rounded-full shadow-sm flex items-center justify-center me-6 border border-stone-100 group-hover:border-orange-200 transition-colors">
                    <Phone className="w-5 h-5 text-stone-400 group-hover:text-orange-600 transition-colors" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-stone-400 mb-1">{t.contact.call}</p>
                    <p className="text-lg font-serif text-stone-800" dir="ltr">+218 91 654 2975</p>
                  </div>
                </div>
                <div className="flex items-center group">
                  <div className="w-14 h-14 bg-white rounded-full shadow-sm flex items-center justify-center me-6 border border-stone-100 group-hover:border-orange-200 transition-colors">
                    <MapPin className="w-5 h-5 text-stone-400 group-hover:text-orange-600 transition-colors" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-stone-400 mb-1">{t.contact.location}</p>
                    <p className="text-lg font-serif text-stone-800">{t.contact.locationValue}</p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <a 
                  href="https://wa.me/218916542975" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-4 rounded-full font-medium text-sm uppercase tracking-widest transition-colors flex items-center shadow-lg hover:shadow-xl inline-flex w-fit"
                >
                  <MessageSquare className="w-5 h-5 me-3" />
                  {t.contact.chat}
                </a>
              </div>
            </div>

            <div className="bg-white rounded-[2rem] shadow-xl p-10 border border-stone-100">
              <form action="https://formsubmit.co/marwan@arkan.ly" method="POST" onSubmit={handleSubmit} className="space-y-6">
                <input type="hidden" name="_subject" value="New Lead from ADS Landing Page" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-xs uppercase tracking-widest text-stone-500 mb-2">{t.contact.form.firstName}</label>
                    <input type="text" id="firstName" name="firstName" required className="w-full px-5 py-4 rounded-xl bg-stone-50 border-none focus:ring-2 focus:ring-orange-500 outline-none transition-all font-light" placeholder={t.contact.form.placeholderFirst} />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-xs uppercase tracking-widest text-stone-500 mb-2">{t.contact.form.lastName}</label>
                    <input type="text" id="lastName" name="lastName" required className="w-full px-5 py-4 rounded-xl bg-stone-50 border-none focus:ring-2 focus:ring-orange-500 outline-none transition-all font-light" placeholder={t.contact.form.placeholderLast} />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs uppercase tracking-widest text-stone-500 mb-2">{t.contact.form.workEmail}</label>
                  <input type="email" id="email" name="email" required className="w-full px-5 py-4 rounded-xl bg-stone-50 border-none focus:ring-2 focus:ring-orange-500 outline-none transition-all font-light text-start" placeholder={t.contact.form.placeholderEmail} dir="ltr" />
                </div>
                <div>
                  <label htmlFor="company" className="block text-xs uppercase tracking-widest text-stone-500 mb-2">{t.contact.form.company}</label>
                  <input type="text" id="company" name="company" className="w-full px-5 py-4 rounded-xl bg-stone-50 border-none focus:ring-2 focus:ring-orange-500 outline-none transition-all font-light" placeholder={t.contact.form.placeholderCompany} />
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs uppercase tracking-widest text-stone-500 mb-2">{t.contact.form.help}</label>
                  <textarea id="message" name="message" required rows={4} className="w-full px-5 py-4 rounded-xl bg-stone-50 border-none focus:ring-2 focus:ring-orange-500 outline-none transition-all resize-none font-light" placeholder={t.contact.form.placeholderHelp}></textarea>
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full bg-stone-900 hover:bg-stone-800 text-white font-medium text-sm uppercase tracking-widest py-5 rounded-xl transition-colors shadow-md mt-4 disabled:opacity-70 disabled:cursor-not-allowed">
                  {isSubmitting ? t.contact.form.sending : t.contact.form.send}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-950 text-stone-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-6 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
                {!logoError && (
                  <img 
                    src="https://i.postimg.cc/7YCZDRh6/logo-png.jpg" 
                    alt="ADS Logo" 
                    className="h-8 w-auto me-3 rounded-sm opacity-80 brightness-0 invert" 
                    onError={() => setLogoError(true)}
                  />
                )}
                <span className="font-serif font-bold text-2xl tracking-tight text-white">
                  ADS<span className="text-orange-500">.</span>
                </span>
              </div>
              <p className="max-w-sm font-light leading-relaxed">{t.footer.desc}</p>
            </div>
            <div>
              <h4 className="text-white font-serif text-lg mb-6">{t.footer.destinations}</h4>
              <ul className="space-y-3 font-light">
                <li><a href="#" className="hover:text-orange-400 transition-colors">{t.footer.links.digital}</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">{t.footer.links.smart}</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">{t.footer.links.training}</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">{t.footer.links.custom}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-serif text-lg mb-6">{t.footer.company}</h4>
              <ul className="space-y-3 font-light">
                <li><a href="#" className="hover:text-orange-400 transition-colors">{t.footer.links.about}</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">{t.footer.links.case}</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">{t.footer.links.contact}</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">{t.footer.links.privacy}</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-stone-800/50 text-sm font-light flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; {new Date().getFullYear()} {t.footer.rights}</p>
            <div className="flex items-center gap-6">
              <a
                href="/offline.html"
                download="offline.html"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs transition-colors border border-stone-700/60"
                title={lang === 'ar' ? 'تحميل نسخة HTML كاملة للعمل بدون إنترنت' : 'Download standalone HTML to open offline'}
              >
                <Download className="w-3.5 h-3.5 text-orange-400" />
                <span>{lang === 'ar' ? 'تحميل نسخة للعرض بدون إنترنت' : 'Download Offline Page'}</span>
              </a>
              <div className="flex space-x-6 rtl:space-x-reverse">
                <a href="#" className="hover:text-orange-400 transition-colors">LinkedIn</a>
                <a href="#" className="hover:text-orange-400 transition-colors">Twitter</a>
                <a href="#" className="hover:text-orange-400 transition-colors">Facebook</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/218916542975"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 end-8 z-50 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-2xl transition-transform hover:scale-110 flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <MessageSquare className="w-6 h-6" />
      </a>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-serif text-stone-800 mb-4">{t.modals.successTitle}</h3>
              <p className="text-stone-500 font-light mb-8">{t.modals.successDesc}</p>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium text-sm uppercase tracking-widest py-4 rounded-full transition-colors"
              >
                {t.modals.close}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Error Modal */}
      <AnimatePresence>
        {showErrorModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl"
            >
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-3xl font-serif text-stone-800 mb-4">{t.modals.errorTitle}</h3>
              <p className="text-stone-500 font-light mb-8">{t.modals.errorDesc}</p>
              <button
                onClick={() => setShowErrorModal(false)}
                className="w-full bg-stone-900 hover:bg-stone-800 text-white font-medium text-sm uppercase tracking-widest py-4 rounded-full transition-colors"
              >
                {t.modals.close}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
