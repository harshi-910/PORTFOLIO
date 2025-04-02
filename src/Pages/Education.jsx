import React, { memo } from "react";

const EducationCard = memo(({ degree, institution, year, description, animation, image }) => (
  <div data-aos={animation} data-aos-duration="1200" className="relative group w-full max-w-[900px]">
    <div className="relative z-10 bg-gray-900/50 backdrop-blur-lg rounded-3xl p-5 border border-white/10 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full flex flex-col justify-between">
      <div className="absolute -z-10 inset-0 bg-gradient-to-br from-[#6366f1] to-[#a855f7] opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>

      <div className="flex items-center gap-4 mb-6">
        {/* Replacing Icon with Image */}
        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/10 overflow-hidden">
          <img src={image} alt="Education Logo" className="w-full h-full object-cover rounded-full" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">{degree}</h3>
          <p className="text-gray-300 text-sm">{institution}</p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-400">{description}</p>
        <span className="text-lg font-semibold text-white">{year}</span>
      </div>
    </div>
  </div>
));

const EducationSection = () => {
  const educationData = [
    {
      degree: "Bachelor of Technology",
      institution: "KL University, India",
      year: "2026",
      description: "Specializing in Data Science & Backend Development.",
      animation: "fade-right",
      image: "KLU.jpg", 
    },
    {
      degree: "Higher Secondary Education",
      institution: "Narayana Junior College, India",
      year: "2022",
      description: "Specialized in Mathematics & Theoretical Sciences.",
      animation: "fade-left",
      image: "College.png",
    },
    {
      degree: "Secondary School Education",
      institution: "Vijaya Bharathi EM High School",
      year: "2020",
      description: "STEM-Focused Secondary Education.",
      animation: "fade-up",
      image: "School.jpg",
    }
  ];

  return (
    <div className="mt-[-70px] w-full mb-[70px] max-w-7xl mx-auto" id="Education">
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]" data-aos="zoom-in-up" data-aos-duration="600">
          Education
        </h2>
      </div>

      <div className="flex gap-6 justify-start">
        {educationData.map((edu, index) => (
          <EducationCard key={index} {...edu} />
        ))}
      </div>
    </div>
  );
};

export default EducationSection;
