import React, { useEffect, memo, useMemo } from "react";
import { FileText, Code, Award, Globe, ArrowUpRight, Sparkles } from "lucide-react";
import AOS from 'aos';
import 'aos/dist/aos.css';
//import "../styles/about.css"; // Import custom animations

// Memoized Components
const Header = memo(() => (
  <div className="text-center mb-4 sm:mb-8 px-4 sm:px-0">
    <div className="inline-block relative group">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]" data-aos="zoom-in-up" data-aos-duration="600">
        About Me
      </h2>
    </div>
    <p className="mt-2 text-gray-400 max-w-md sm:max-w-2xl mx-auto text-sm sm:text-base md:text-lg flex items-center justify-center gap-1 sm:gap-2" data-aos="zoom-in-up" data-aos-duration="800">
      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
      Transforming ideas into digital experiences
      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
    </p>
  </div>
));

const ProfileImage = memo(() => (
  <div className="flex justify-center sm:justify-end items-center p-4 sm:p-8 sm:py-0">
    <div className="relative group" data-aos="fade-up" data-aos-duration="1000">
      <div className="absolute -inset-4 sm:-inset-6 opacity-[25%] z-0 hidden sm:block">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-600 rounded-full blur-2xl animate-spin-slower" />
        <div className="absolute inset-0 bg-gradient-to-l from-fuchsia-500 via-rose-500 to-pink-600 rounded-full blur-2xl animate-pulse-slow opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600 via-cyan-500 to-teal-400 rounded-full blur-2xl animate-float opacity-50" />
      </div>
      <div className="relative">
        <div className="w-60 h-60 sm:w-72 md:w-80 sm:h-72 md:h-80 rounded-full overflow-hidden shadow-[0_0_40px_rgba(120,119,198,0.3)] transform transition-all duration-700 group-hover:scale-105">
          <div className="absolute inset-0 border-4 border-white/20 rounded-full z-20 transition-all duration-700 group-hover:border-white/40 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-10 transition-opacity duration-700 group-hover:opacity-0 hidden sm:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 via-transparent to-blue-500/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 hidden sm:block" />
          <img
            src="/Photo.jpg"
            alt="Profile"
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
            loading="lazy"
          />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 z-20 hidden sm:block">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/10 to-transparent transform translate-y-full group-hover:-translate-y-full transition-transform duration-1000 delay-100" />
            <div className="absolute inset-0 rounded-full border-8 border-white/10 scale-0 group-hover:scale-100 transition-transform duration-700 animate-pulse-slow" />
          </div>
        </div>
      </div>
    </div>
  </div>
));

const StatCard = memo(({ icon: Icon, color, value, label, description, animation }) => (
  <div data-aos={animation} data-aos-duration="1300" className="relative group">
    <div className="relative z-10 bg-gray-900/50 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/10 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full flex flex-col justify-between">
      <div className={`absolute -z-10 inset-0 bg-gradient-to-br ${color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-white/10 transition-transform group-hover:rotate-6">
          <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </div>
        <span className="text-3xl sm:text-4xl font-bold text-white" data-aos="fade-up-left" data-aos-duration="1500" data-aos-anchor-placement="top-bottom">
          {value}
        </span>
      </div>
      <div>
        <p className="text-xs sm:text-sm uppercase tracking-wider text-gray-300 mb-1 sm:mb-2" data-aos="fade-up" data-aos-duration="800" data-aos-anchor-placement="top-bottom">
          {label}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-[0.65rem] sm:text-xs text-gray-400" data-aos="fade-up" data-aos-duration="1000" data-aos-anchor-placement="top-bottom">
            {description}
          </p>
          <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 text-white/50 group-hover:text-white transition-colors" />
        </div>
      </div>
    </div>
  </div>
));

const AboutPage = () => {
  const { totalProjects, totalCertificates, YearExperience } = useMemo(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
    const storedCertificates = JSON.parse(localStorage.getItem("certificates") || "[]");
    const startDate = new Date("2025-03-27");
    const today = new Date();
    const experience = today.getFullYear() - startDate.getFullYear() -
      (today < new Date(today.getFullYear(), startDate.getMonth(), startDate.getDate()) ? 1 : 0);
    return {
      totalProjects: storedProjects.length,
      totalCertificates: storedCertificates.length,
      YearExperience: experience
    };
  }, []);

  useEffect(() => {
    AOS.init({
      once: true,
      offset: 10,
      disable: window.innerWidth < 640 // Disable animations on mobile for performance
    });
    window.addEventListener('resize', () => AOS.refresh());
    return () => window.removeEventListener('resize', () => AOS.refresh());
  }, []);

  const statsData = useMemo(() => [
    {
      icon: Code,
      color: "from-[#6366f1] to-[#a855f7]",
      value: totalProjects || 4,
      label: "Total Projects",
      description: "Innovative web solutions crafted",
      animation: "fade-right",
    },
    {
      icon: Award,
      color: "from-[#a855f7] to-[#6366f1]",
      value: totalCertificates || 9,
      label: "Achievements",
      description: "Professional skills validated",
      animation: "fade-up",
    },
    {
      icon: Globe,
      color: "from-[#6366f1] to-[#a855f7]",
      value: YearExperience || 0,
      label: "Years of Experience",
      description: "Continuous learning journey",
      animation: "fade-left",
    },
  ], [totalProjects, totalCertificates, YearExperience]);

  return (
    <div className="min-h-screen pb-[5%] sm:pb-[10%] text-white overflow-hidden px-4 sm:px-6 lg:px-10" id="About">
      <Header />
      <div className="max-w-7xl mx-auto pt-6 sm:pt-12 relative">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-10 lg:gap-16 items-center">
          <div className="w-full lg:w-1/2 space-y-4 sm:space-y-6 text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold" data-aos="fade-right" data-aos-duration="1000">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                Hello, I'm
              </span>
              <span className="block mt-1 sm:mt-2 text-gray-200" data-aos="fade-right" data-aos-duration="1300">
                Harshitha
              </span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed text-justify" data-aos="fade-right" data-aos-duration="1500">
              Passionate Computer Science student specializing in Data Science & Backend Development. AWS & Red Hat Certified, skilled in Java, C, and scalable solutions. Enthusiastic about data analytics and emerging technologies. 🚀
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full">
              <a href="https://drive.google.com/file/d/1_FXBCM6HoCU8ehVGY-v9uwTTt4i4GW6r/view?usp=drive_link" className="w-full sm:w-auto">
                <button data-aos="fade-up" data-aos-duration="800" className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-1 sm:gap-2 shadow-lg hover:shadow-xl animate-bounce-slow">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5" /> Download Resume
                </button>
              </a>
              <a href="#Portofolio" className="w-full sm:w-auto">
                <button data-aos="fade-up" data-aos-duration="1000" className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 rounded-lg border border-[#a855f7]/50 text-[#a855f7] font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-1 sm:gap-2 hover:bg-[#a855f7]/10 animate-bounce-slow delay-200">
                  <Code className="w-4 h-4 sm:w-5 sm:h-5" /> View Projects
                </button>
              </a>
            </div>
          </div>
          <ProfileImage />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-16">
          {statsData.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(AboutPage);