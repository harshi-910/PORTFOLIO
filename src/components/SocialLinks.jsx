import React from "react";
import {
  Linkedin,
  Github,
  Instagram,
  Youtube,
  Mail,
  ExternalLink
} from "lucide-react";
import { Twitter } from "@mui/icons-material";

const socialLinks = [
  {
    name: "LinkedIn",
    displayName: "Let's Connect",
    subText: "on LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/harshitha910/",
    color: "#0A66C2",
    gradient: "from-[#0A66C2] to-[#0077B5]",
    isPrimary: true
  },
  {
    name: "Twitter",
    displayName: "Twitter",
    subText: "@arshiii_910",
    icon: Twitter,
    url: "https://x.com/arshiii_910",
    color: "#E4405F",
    gradient: "from-[#833AB4] via-[#E4405F] to-[#FCAF45]"
  },

  {
    name: "GitHub",
    displayName: "Github",
    subText: "@harshi-910",
    icon: Github,
    url: "https://github.com/harshi-910",
    color: "#ffffff",
    gradient: "from-[#333] to-[#24292e]"
  },
  {
    name: "Gmail",
    displayName: "Gmail",
    subText: "2200030411cseh@gmail.com",
    icon: Mail, // Using 'Mail' icon instead of 'Gmail'
    url: "mailto:2200030411cseh@gmail.com",
    color: "#D44638",
    gradient: "from-[#D44638] to-[#B23121]"
  }
];

const SocialLinks = () => {
  const linkedIn = socialLinks.find(link => link.isPrimary);
  const otherLinks = socialLinks.filter(link => !link.isPrimary);

  return (
    <div className="w-full bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 py-8 backdrop-blur-xl">
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <span className="inline-block w-8 h-1 bg-indigo-500 rounded-full"></span>
        Connect With Me
      </h3>

      <div className="flex flex-wrap gap-4">
        {/* Render LinkedIn separately */}
        <a
          href={linkedIn.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-between p-4 rounded-lg 
                     bg-white/5 border border-white/10 overflow-hidden
                     hover:border-white/20 transition-all duration-500 w-[210px] h-[110px]"
        >
          <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r ${linkedIn.gradient}`} />
          
          <div className="relative flex items-center gap-3">
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 opacity-20 rounded-md transition-all duration-500 group-hover:scale-110 group-hover:opacity-30" style={{ backgroundColor: linkedIn.color }} />
              <div className="relative p-2 rounded-md">
                {React.createElement(linkedIn.icon, { className: "w-6 h-6 transition-all duration-500 group-hover:scale-105", style: { color: linkedIn.color } })}
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-200 group-hover:text-white transition-colors duration-300">
                {linkedIn.displayName}
              </span>
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                {linkedIn.subText}
              </span>
            </div>
          </div>

          <ExternalLink className="relative w-5 h-5 text-gray-500 group-hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 -translate-x-1" />
        </a>

        {/* Render Other Social Links */}
        {otherLinks.map(link => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-3 p-4 rounded-lg 
                       bg-white/5 border border-white/10 overflow-hidden
                       hover:border-white/20 transition-all duration-500 w-[210px] h-[110px]"
          >
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r ${link.gradient}`} />
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 opacity-20 rounded-lg transition-all duration-500 group-hover:scale-125 group-hover:opacity-30" style={{ backgroundColor: link.color }} />
              <div className="relative p-2 rounded-lg">
                {React.createElement(link.icon, { className: "w-5 h-5 transition-all duration-500 group-hover:scale-110", style: { color: link.color } })}
              </div>
            </div>

            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-gray-200 group-hover:text-white transition-colors duration-300">
                {link.displayName}
              </span>
              <span className="text-xs text-gray-400 truncate group-hover:text-gray-300 transition-colors duration-300">
                {link.subText}
              </span>
            </div>

            <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-white ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 -translate-x-2" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialLinks;
