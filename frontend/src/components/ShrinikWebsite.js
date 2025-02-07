"use client";
import React, { useState,useEffect, useCallback,useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
//import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';

//import { Badge } from './ui/badge.js';
import LoginPage from './loginPage';
import TeamsPage from './TeamsPage';

//import axios from 'axios';//
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube, FaInstagram, FaRss } from 'react-icons/fa';

import { 
  Code,   Palette,   Gamepad2,   Music, Home, Users, Target, 
  Calendar, MessageCircle, LogIn , Bird, Shield, 
  ArrowRight, ArrowLeft, Zap, 
  Database, Rocket,
  Camera, PenTool, Book, Star, Globe,
  Magnet, 
} from 'lucide-react';
import { motion,AnimatePresence } from 'framer-motion';

import Link from 'next/link';
const Check=()=>{
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Replace 'https://project-name.glitch.me/api/message' with your actual Glitch project URL
    fetch('https://statuesque-marked-beanie.glitch.me/home')
      .then(response => response.json())
      .then(data => {
        console.log("DATTTTT",data);
        setMessage(data.message);
      })
      .catch(error => {
        console.error('Error fetching the message:', error);
      });
  }, []);

  return (
    <div>
      <h1 className='text-black'>Message from Backend:</h1>
      <p className='text-black'>{message}</p>
    </div>
  );
}

const Gallery = () => {
  const [PhotoList, setPhotoList] = useState([]);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const res = await fetch('https://shrinik-project.onrender.com/api/getGallary');
        const data = await res.json();
        console.log('Fetched pictures:', data); // Log the fetched data
        if (Array.isArray(data)) {
          setPhotoList(data);
        } else {
          console.error('Fetched data is not an array:', data);
        }
      } catch (error) {
        console.log('error fetching the pictures', error);
      }
    };
    fetchPhoto();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-300 via-red-200 to-blue-400 p-6 h-max-200">
      <div className="text-gray-900 text-5xl font-extrabold text-center mb-8">Gallery</div><br></br>
      <div className="  grid grid-cols-1 md:grid-cols-3 gap-6 mx-3 justify-between items-center">
        {PhotoList.map((photo) => (
          
          photo.ImageFor === 'gallary' && (
          <li
            key={photo._id}
            className="p-4 border rounded-lg shadow-sm hover:shadow-lg transition duration-500 transform hover:scale-105 bg-orange-200"
          >
            
              <img
                src={photo.imageUrl}
                alt="Gallery"
                className=" mx-auto h-48  transition duration-500 transform hover:scale-110"
              />
            
          </li>)
        ))}
        
      </div>
    </div>
  );
};

const NavBar = ({ Info, setFalse }) => {
  const [isHovered, setIsHovered] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const setlogindisplay = Info.login.setter;

  const navItems = [
    { name: "About", href: "#about", icon: Book, setter: Info.about.setter },
    { name: "Objectives", href: "#objectives", icon: Target, setter: Info.objective.setter },
    { name: "Teams", href: "#teams", icon: Users, setter: Info.team.setter },
    { name: "Avenues", href: "#avenues", icon: Home, setter: Info.avenues.setter },
    { name: "Events", href: "#events", icon: Calendar, setter: Info.events.setter },
    { name: "Contact", href: "#contact", icon: MessageCircle },
  ];

  return (
    <nav className="bg-gradient-to-r from-black via-gray-900 to-black text-white p-4 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <a onClick={() => Info.hero.setter(true)}>
          <div className="flex items-center space-x-4 transform transition-transform duration-300 hover:scale-105">
            <img
              className="rounded-full h-14 w-14 object-cover border-2 border-blue-500 shadow-md"
              src="/images/shriniklogo.jpg"
              alt="Shrinik Club Logo"
            />
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 tracking-wider">
              SHRINIK CLUB
            </h1>
          </div>
        </a>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item, index) => (
            <a
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-2 ${
                isHovered === index ? "text-blue-400" : "text-white"
              } transform transition-all duration-300 hover:scale-110 hover:text-blue-400 group relative`}
              onMouseEnter={() => setIsHovered(index)}
              onMouseLeave={() => setIsHovered(null)}
              onClick={() => item.setter && setFalse(item.setter)}
            >
              <item.icon
                className={`w-5 h-5 ${isHovered === index ? "text-blue-400" : "text-gray-300"} group-hover:animate-pulse`}
              />
              <span className="text-sm font-medium">{item.name}</span>
              <span
                className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform scale-x-0 origin-left transition-transform duration-300 ${
                  isHovered === index ? "scale-x-100" : ""
                }`}
              />
            </a>
          ))}

          {/* Login Link */}
          <a
            onClick={() => setFalse(setlogindisplay)}
            href="#login"
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl"
          >
            <LogIn className="w-5 h-5" />
            <span>Admin</span>
          </a>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black text-white p-4 rounded-md space-y-2 mt-2 shadow-lg">
          {navItems.map((item, index) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center space-x-2 p-2 rounded hover:bg-gray-800 transition"
              onClick={() => {
                item.setter && setFalse(item.setter);
                setIsMenuOpen(false);
              }}
            >
              <item.icon className="w-5 h-5 text-gray-300" />
              <span>{item.name}</span>
            </a>
          ))}

          {/* Login Link in Mobile Menu */}
          <a
            onClick={() => {
              setFalse(setlogindisplay);
              setIsMenuOpen(false);
            }}
            href="#login"
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl"
          >
            <LogIn className="w-5 h-5" />
            <span>Admin</span>
          </a>
        </div>
      )}
    </nav>
  );
};

const Hero = () =>{ 
const canvasRef = useRef(null);

useEffect(() => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');
  
  // Responsive canvas sizing
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Particle class
  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.radius = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 2;
      this.speedY = (Math.random() - 0.5) * 2;
      this.color = this.generateColor();
      this.alpha = 0.5;
      this.grow = true;
    }

    generateColor() {
      const colors = [
        'rgba(33, 150, 243, ',   // Blue
        'rgba(156, 39, 176, ',   // Purple
        'rgba(244, 67, 54, ',    // Red
        'rgba(0, 188, 212, '     // Cyan
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.fill();
      ctx.closePath();
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Pulsating effect
      if (this.grow) {
        this.alpha += 0.01;
        if (this.alpha >= 1) this.grow = false;
      } else {
        this.alpha -= 0.01;
        if (this.alpha <= 0.2) this.grow = true;
      }

      // Wrap around screen
      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;
    }
  }

  // Create particles
  const particlesArray = [];
  const numberOfParticles = 200;
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }

  // Connection logic
  function connectParticles() {
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a; b < particlesArray.length; b++) {
        const dx = particlesArray[a].x - particlesArray[b].x;
        const dy = particlesArray[a].y - particlesArray[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(156, 39, 176, ${1 - distance / 100})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
    }
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Dark gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, 'rgba(0,0,0,0.9)');
    gradient.addColorStop(1, 'rgba(20,20,50,0.9)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particlesArray.forEach(particle => {
      particle.update();
      particle.draw();
    });

    connectParticles();
    requestAnimationFrame(animate);
  }

  animate();

  // Resize handler
  const handleResize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  window.addEventListener('resize', handleResize);

  // Cleanup
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100
    }
  }
};

return (
  <div className="relative min-h-screen overflow-hidden">
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0"
      style={{ position: 'absolute' }}
    />

    <motion.div 
      className="relative z-20 container mx-auto px-4 h-screen flex flex-col justify-center items-center text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 
        variants={itemVariants}
        className="text-8xl md:text-9xl font-black text-transparent bg-clip-text 
        bg-gradient-to-r from-blue-300 via-purple-500 to-pink-500 
        mb-6 tracking-tight leading-tight"
      >
        SHRINIK
      </motion.h1>

      <motion.h2 
        variants={itemVariants}
        className="text-2xl md:text-3xl font-medium text-white mb-4 
        drop-shadow-2xl tracking-wide"
      >
        G.L. Bajaj Institute of Technology and Management
      </motion.h2>

      <motion.p 
        variants={itemVariants}
        className="text-xl md:text-2xl text-white/90 mb-12 
        max-w-2xl mx-auto italic tracking-wider"
      >
        Where Technology Meets Culture
      </motion.p>

      <motion.div 
        variants={itemVariants}
        className="flex justify-center space-x-6"
      >
        {[
          { Icon: Code, color: "blue", text: "Tech Innovators" },
          { Icon: Rocket, color: "purple", text: "Cultural Pioneers" },
          { Icon: Star, color: "pink", text: "Campus Leaders" }
        ].map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            className={`
              p-4 bg-white/10 backdrop-blur-sm 
              rounded-xl border border-white/20
              flex flex-col items-center
              transition-all duration-300
            `}
          >
            <item.Icon 
              className={`text-${item.color}-300 mb-2`} 
              size={40} 
            />
            <span className="text-white text-sm tracking-wider">
              {item.text}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  </div>
);
};

const About = () => {
  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    {
      title: "Club Overview",
      icon: Rocket,
      color: "blue",
      content: (
        <div className="space-y-4">
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-700 leading-relaxed"
          >
            SHRINIK is a dynamic techno-cultural student club formed by passionate Computer Science students. 
            Established on November 22, 2021, we're not just a club - we're a launchpad for student potential.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-blue-50 p-4 rounded-lg border border-blue-100"
          >
            <h4 className="font-bold text-blue-600 flex items-center mb-2">
              <Zap className="mr-2 text-yellow-500" /> Our Impact
            </h4>
            <ul className="list-disc list-inside text-gray-900 space-y-1">
              <li>15+ Events & Workshops</li>
              <li>Spanning Technical & Cultural Domains</li>
              <li>2000+ Registered Members</li>
            </ul>
          </motion.div>
        </div>
      )
    },
    {
      title: "Logo Ideology",
      icon: Bird,
      color: "green",
      content: (
        <div className="space-y-4">
          <motion.h4 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl font-bold text-green-600 mb-2"
          >
            "Vasudhaiva Kutumbakam"
          </motion.h4>
          <div className="grid md:grid-cols-2 gap-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-green-50 p-4 rounded-lg border border-green-100"
            >
              <h4 className="font-bold text-green-600 flex items-center mb-2">
                <Shield className="mr-2 text-green-500" />
                THE GARUDA
              </h4>
              <p className="text-gray-700">
                Vehicle of Lord Vishnu, symbolizing Knowledge, Power & Discipline.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-purple-50 p-4 rounded-lg border border-purple-100"
            >
              <h4 className="font-bold text-purple-600 flex items-center mb-2">
                <Music className="mr-2 text-purple-500" />
                THE SAXOPHONE
              </h4>
              <p className="text-gray-700">
                Represents Songs, Music, and spiritual connection through instruments.
              </p>
            </motion.div>
          </div>
        </div>
      )
    },
    {
      title: "Contact Information",
      icon: Globe,
      color: "purple",
      content: (
        <div className="space-y-4">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-2 gap-4"
          >
            <div>
              <h4 className="font-bold text-purple-600 flex items-center mb-2">
                <Database className="mr-2 text-purple-500" /> Department
              </h4>
              <p className="text-gray-700">Computer Science & Engineering (CSE)</p>
            </div>
            <div>
              <h4 className="font-bold text-purple-600 flex items-center mb-2">
                <Code className="mr-2 text-purple-500" /> Established
              </h4>
              <p className="text-gray-700">November 22, 2021</p>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-purple-50 p-4 rounded-lg border border-purple-100"
          >
            <h4 className="font-bold text-purple-600 mb-2">Leadership</h4>
            <div className="space-y-2">
              <div>
                <p className="font-semibold text-gray-800">President</p>
                <p className="text-gray-700">Aman Gupta</p>
                <p className="text-gray-600 text-sm">amanuniquecoder@gmail.com</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Secretary</p>
                <p className="text-gray-700">Shubhi Singh</p>
                <p className="text-gray-600 text-sm">shubhis921@gmail.com</p>
              </div>
            </div>
          </motion.div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    setActiveSection((prev) => (prev + 1) % sections.length);
  };

  const handlePrev = () => {
    setActiveSection((prev) => (prev - 1 + sections.length) % sections.length);
  };

  const currentSection = sections[activeSection];

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="py-8 bg-gradient-to-br from-blue-800 to-red-90 min-h-[40vh] flex items-center"
    >
      <div className="container">
        <motion.div 
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Section Navigation */}
          <div className="flex justify-between items-center mb-8">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrev}
              className="p-2 bg-ged-200 rounded-full"
            >
              <ArrowLeft className="text-gray-700" />
            </motion.button>

            <h2 className="text-3xl text-black font-bold text-center flex items-center">
              <currentSection.icon 
                className="mr-3 text-blue-600" 
                size={32} 
              />
              {currentSection.title}
            </h2>

            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNext}
              className="p-2 text-black bg-blue-90 rounded-full"
            >
              <ArrowRight className="text-gray-700" />
            </motion.button>
          </div>

          {/* Content Card */}
          <Card className="shadow-2xl bg-orange-200 text-black border-none">
            <CardContent className="p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentSection.content}
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>

          {/* Section Indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {sections.map((_, index) => (
              <motion.div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === activeSection 
                    ? 'bg-blue-600' 
                    : 'bg-gray-300'
                }`}
                initial={{ scale: 0.5 }}
                animate={{ scale: index === activeSection ? 1.2 : 1 }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );

};

const Objectives = () => {
  const objectives = [
    "To help leverage students with the most relevant social and technical skills apart from academics, boosting their functionality and adaptability to work in different environments.",
    "To help students groom their abstract qualities and morale for development as a leader.",
    "To set up a proper framework for student welfare activities directed, by the students, for the students.",
    "To encourage good fellowship and celebrate achievement at both individual and club levels in team events, nurturing an early habit of teamwork and cohesiveness in participants.",
    "To cultivate and process the qualities of decision-making, troubleshooting, and creative approach in students, which will enable them to steer through non-conducive circumstances and take calls on their own."
  ];

  return (
    <motion.section 
      id="objectives" 
      className="py-16 bg-gradient-to-b from-blue-200 to-blue-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1}}
    >
      <div className="container mx-auto">
        <motion.h2 
          className="text-gray-900 text-3xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Our Objectives
        </motion.h2>
        <div className="overflow-x-auto hide-scrollbar">
          <div className="flex space-x-6">
            {objectives.map((objective, index) => (
              <motion.div
                key={index}
                className="bg-red-100 shadow-lg hover:shadow-xl p-6 rounded-lg transform transition-transform duration-300 min-w-[300px] h-auto flex flex-col justify-between"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-blue-900 text-white rounded-full h-4 w-4 flex items-center justify-center text-xl">
                    {"#"}
                  </div>
                  <p className="text-gray-700 text-base leading-relaxed">
                    {objective}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const TeamCard = ({ title, icon: Icon, description, delay }) => (
  <div className=" bg-gradient-to-b from-blue-600 to-red-900 team-card transition-all duration-300 ease-in-out" style={{ animationDelay: `${delay}s` }}>
    <div className="card-content p-4  rounded-lg shadow-lg hover:shadow-black hover:from-blue-200 hover:to-red-200">
      <div className="flex items-center gap-2 mb-4 text-black">
        <Icon className="w-6 h-6" />
        <h3 className="card-title font-bold">{title}</h3>
      </div>
      <p className="text-blue-100">{description}</p>
    </div>
  </div>
);

const Teams = ({ Info, setFalse, settingTeam }) => (
  <section id="teams" className="py-16 bg-gradient-to-b from-blue-900 to-blue-300">
    <div className="container mx-auto">
      <h2 className="text-gray-900 text-3xl font-bold text-center mb-8">Our Teams</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <a
          className="hover:text-blue-200"
          onClick={() => {
            settingTeam('Tech');
            setFalse(Info.setter);
          }}
        >
          <TeamCard
            title="Tech Team"
            icon={Code}
            description="Handles technical events and development projects"
            delay={0}
          />
        </a>
        <a
          className="hover:text-blue-200"
          onClick={() => {
            settingTeam('Photography');
            setFalse(Info.setter);
          }}
        >
          <TeamCard
            title="Photography"
            icon={Camera}
            description="Creates visual content and shoots the event."
            delay={0.2}
          />
        </a>
        <a
          className="hover:text-blue-200"
          onClick={() => {
            settingTeam('Media');
            setFalse(Info.setter);
          }}
        >
          <TeamCard
            title="Social Media"
            icon={Users}
            description="Manages club's online presence and engagement"
            delay={0.4}
          />
        </a>
        <a
          className="hover:text-blue-200"
          onClick={() => {
            settingTeam('Marketing');
            setFalse(Info.setter);
          }}
        >
          <TeamCard
            title="Marketing"
            icon={Globe}
            description="Manages connections and collaborations"
            delay={0.6}
          />
        </a>
        <a
          className="hover:text-blue-200"
          onClick={() => {
            settingTeam('Management');
            setFalse(Info.setter);
          }}
        >
          <TeamCard
            title="Management Team"
            icon={Magnet}
            description="Manages chaos at the event and leads to its success"
            delay={0.8}
          />
        </a>
        <a
          className="hover:text-blue-200"
          onClick={() => {
            settingTeam('Editorial');
            setFalse(Info.setter);
          }}
        >
          <TeamCard
            title="Editorial Team"
            icon={PenTool}
            description="Writes content and prepares reports and brochures"
            delay={1}
          />
        </a>
      </div>
    </div>
  </section>
);

const Avenues = () => {
  const [pic, setPics] = useState([]);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const res = await fetch('https://shrinik-project.onrender.com/api/getGallary');
        const data = await res.json();
        console.log('Fetched pictures:', data); // Log the fetched data
        if (Array.isArray(data)) {
          setPics(data);
        } else {
          console.error('Fetched data is not an array:', data);
        }
      } catch (error) {
        console.log('error fetching the pictures', error);
      }
    };
    fetchPhoto();
  }, []);

  const getImageForAvenue = (avenueName) => {
    const avenueImage = pic.find(image => image.ImageFor === avenueName);
    return avenueImage ? avenueImage.imageUrl : ''; // Assuming each image object has a `url` property
  };

  return (
    <section id="avenues" className="py-16 bg-gradient-to-b from-blue-300 to to-blue-500">
      <div className="container mx-auto">
        <h2 className="text-gray-900 text-3xl font-bold text-center mb-8">Our Avenues</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center hover:shadow-purple-700 transition-all bg-purple-200">
            <img src={getImageForAvenue('Art Avenue')} alt="Art Avenue" className="w-full h-48 object-cover" />
            <CardHeader>
              <Palette className="w-12 h-12 mx-auto text-purple-600" />
              <CardTitle>Art Avenue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-purple-950'>"Where creativity knows no bounds"</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-green-600 transition-all bg-green-200">
            <img src={getImageForAvenue('Gaming Avenue')} alt="Gaming Avenue" className="w-full h-48 object-cover" />
            <CardHeader>
              <Gamepad2 className="w-12 h-12 mx-auto text-green-600" />
              <CardTitle>Gaming Avenue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-green-900'>"Game on, level up!"</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-red-900 transition-all bg-red-200">
            <img src={getImageForAvenue('Dancing Avenue')} alt="Dancing Avenue" className="w-full h-48 object-cover" />
            <CardHeader>
              <Music className="w-12 h-12 mx-auto text-red-600" />
              <CardTitle>Dancing Avenue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-red-600'>"Move to your own rhythm"</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-blue-950 transition-all bg-blue-300">
            <img src={getImageForAvenue('Singing Avenue')} alt="Singing Avenue" className="w-full h-48 object-cover" />
            <CardHeader>
              <Music className="w-12 h-12 mx-auto text-blue-600" />
              <CardTitle>Singing Avenue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-blue-600'>"Let your voice soar"</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

const Events = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [previousEvents, setPreviousEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('https://shrinik-project.onrender.com/api/events/list');
        const data = await res.json();
        console.log('Fetched events:', data);
        if (Array.isArray(data)) {
          const now = new Date();
          const upcoming = data.filter(event => new Date(event.date) >= now);
          const previous = data.filter(event => new Date(event.date) < now);
          setUpcomingEvents(upcoming);
          setPreviousEvents(previous);
        } else {
          console.error('Fetched data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section id="events" className="py-16 bg-gradient-to-b from-yellow-600 to-orange-800">
      <div className="container mx-auto  bg-orange-300">
        <h2 className="text-gray-900 text-3xl font-bold text-center mb-8">Events</h2>
        <div className="flex flex-col  lg:flex-row lg:space-x-8">
          <div className="flex-1 mt-8 lg:mt-0">
            <h3 className="text-gray-900 text-2xl font-bold mb-4">Upcoming Events</h3>
            <div className="rounded-2xl p-2 bg-orange-200 flex flex-wrap -mx-2 overflow-x-auto space-x-4">
              {upcomingEvents.map(event => (
                <motion.div
                  key={event._id}
                  className=" rounded-2xl  min-w-[300px] p-11 border  shadow-sm hover:shadow-black transition duration-200 bg-yellow-50 mx-2"
                  whileHover={{ scale: 1.05 }}
                >
                  {event.imageUrl && <img src={event.imageUrl} alt={event.title} className="w-full h-40 object-cover mt-2 rounded-lg" />}
                  <h3 className=" text-black text-xl font-bold">{event.title}</h3>
                  <p className="text-gray-600">{event.description}</p>
                  <p className="font-semibold text-sm text-gray-500">
                    <Calendar className="inline mr-1" />
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p className="font-semibold text-sm text-gray-500">{event.venue}</p>
                  
                  <div className="mt-4">
                    <Link href={event.applicationLink}>
                      <button className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition duration-200 w-full">
                        PARTICIPATE
                      </button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="flex-1 mt-8 lg:mt-0">
            <h3 className="text-gray-900 text-2xl font-bold mb-4">Previous Events</h3>
            <div className="rounded-2xl p-2 bg-orange-200 flex flex-wrap -mx-2 overflow-x-auto space-x-4">
              {previousEvents.map(event => (
                <motion.div
                  key={event._id}
                  className="min-w-[300px] p-11 border rounded-2xl shadow-sm hover:shadow-lg transition duration-200 bg-white mx-2"
                  whileHover={{ scale: 1.05 }}
                >
                   {event.imageUrl && <img src={event.imageUrl} alt={event.title} className="w-full  h-40 object-cover mt-2 " />}
                  <h3 className=" text-black text-xl font-bold">{event.title}</h3>
                  <p className="text-gray-600">{event.description}</p>
                  <p className="font-semibold text-sm text-gray-500">
                    <Calendar className="inline mr-1" />
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p className="font-semibold text-sm text-gray-500">{event.venue}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => (
    <footer className="bg-gradient-to-r from-black via-gray-900 to-black text-white py-8 min-h-screen">
      <div className="container mx-auto text-center">
        <p className="text-sm mb-2">PLOT NO.2 , APJ ABDUL KALAM ROAD, KNOWLEDGE PARK 3, GREATER NOIDA, UTTAR PRADESH, INDIA, 201306</p>
        <p className="text-lg font-bold mb-4">HELPLINE NO. 8010-000-234</p>
        <div className="flex justify-center space-x-4 mb-6">
          <a href="https://facebook.com" className="text-white hover:text-gray-400">
            <FaFacebookF size={24} />
          </a>
          <a href="https://twitter.com" className="text-white hover:text-gray-400">
            <FaTwitter size={24} />
          </a>
          <a href="https://linkedin.com" className="text-white hover:text-gray-400">
            <FaLinkedinIn size={24} />
          </a>
          <a href="https://youtube.com" className="text-white hover:text-gray-400">
            <FaYoutube size={24} />
          </a>
          <a href="https://instagram.com" className="text-white hover:text-gray-400">
            <FaInstagram size={24} />
          </a>
          <a href="https://rss.com" className="text-white hover:text-gray-400">
            <FaRss size={24} />
          </a>
        </div>
        <div className="flex justify-center space-x-4 text-sm">
          <a href="#" className="text-white hover:text-blue-400">Purchase</a>
          <span>|</span>
          <a href="#" className="text-white hover:text-blue-400">Privacy Policy</a>
          <span>|</span>
          <a href="#" className="text-white hover:text-blue-400">Terms and Conditions</a>
          <span>|</span>
          <a href="#" className="text-white hover:text-blue-400">Site Map</a>
          <span>|</span>
          <span>© 2024 - All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  

);

const Guidelines = () => (
  <section className="py-16 bg-gray-50">
    <div className="container mx-auto">
      <h2 className="text-gray-900 text-3xl font-bold text-center mb-8">Club Guidelines</h2>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Book className="text-gray-900 w-6 h-6" />
            Important Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-blue-500 space-y-2">
            <li>• Regular attendance in club activities is mandatory for members</li>
            <li>• Maintain professional conduct during all club events</li>
            <li>• Active participation in organizing events is encouraged</li>
            <li>• Respect fellow members and follow club hierarchy</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  </section>
);

const ShrinikWebsite = () => {
  const [gallary,setGallary]=useState(true);
  const [about,setAbout]=useState(true);
  const [objective,setObjective]=useState(true);
  const [team,setTeam]=useState(true);
  const [avenues,setAvenues]=useState(true);
  const [events,setEvents]=useState(true);
  const [guidlines,setGuidlines]=useState(true);
  const [logindisplay,setLogindisplay]=useState(false);
  const [displayTeam,setDisplayTeam]=useState(false);
  const [hero,setHero]=useState(true);
  const [teamName,setTeamName]=useState('');
  const displayInfo = {
    gallary: { state: gallary, setter: setGallary },
    about: { state: about, setter: setAbout },
    objective: { state: objective, setter: setObjective },
    team: { state: team, setter: setTeam },
    avenues: { state: avenues, setter: setAvenues },
    events: { state: events, setter: setEvents },
    guidlines: { state: guidlines, setter: setGuidlines },
    login:{state:logindisplay,setter:setLogindisplay},
    displayTeam:{state:displayTeam,setter:setDisplayTeam},
    hero:{state:hero,setter:setHero},
  };

  const setFalse = useCallback((exceptSetter) => {
    // Set all sections to false
    Object.values(displayInfo).forEach((info) => info.setter(false)); 
    exceptSetter(true); // Set the excepted one to true
  }, []);

  return (
    <div className="min-h-screen bg-blue-100">
      <NavBar Info={displayInfo} setFalse={setFalse} />
      {displayInfo.hero.state&&<Hero />}
      {displayInfo.gallary.state && <Gallery />}
      {displayInfo.about.state && <About />}
      {displayInfo.objective.state && <Objectives />}
      {displayInfo.team.state && <Teams Info={displayInfo.displayTeam} setFalse={setFalse}  settingTeam={setTeamName}/>}
      {displayInfo.avenues.state && <Avenues />}
      {displayInfo.events.state && <Events />}
      {displayInfo.guidlines.state && <Guidelines />}
      {displayInfo.login.state && <LoginPage />}
      {displayInfo.displayTeam.state&&<TeamsPage   team={teamName}/>}
      <Check/>
      <Contact />
      
    </div>
  );
};
/** */
export default ShrinikWebsite;
