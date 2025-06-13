import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink, ArrowRight } from "lucide-react";
import PropTypes from "prop-types";

const CardProject = ({ Img, Title, Subject, Description, Link: projectLink, id }) => {
  const handleLiveDemo = (e) => {
    if (!projectLink) {
      e.preventDefault();
      alert("Live demo link is not available");
    }
  };

  const handleDetails = (e) => {
    if (!id) {
      e.preventDefault();
      alert("Project details are not available");
    }
  };

  return (
    <div
      className="group relative w-full max-w-[350px] sm:max-w-[400px] h-[380px] sm:h-[400px] bg-[#101628] rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:-translate-y-1"
      role="article"
      aria-labelledby={`project-${id || Title}`}
    >
      <div className="relative h-full flex flex-col">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>

        <div className="relative p-4 sm:p-5 z-10 flex flex-col h-full">
          {/* Image Container */}
          <div className="relative w-full h-[240px] sm:h-[250px] flex justify-center items-center">
            <img
              src={Img || "/projects/fallback-project.png"}
              alt={Title || "Project Image"}
              className="w-full h-full object-contain object-center rounded-md"
              loading="lazy"
              onError={(e) => (e.target.src = "/projects/fallback-project.png")}
            />
          </div>

          {/* Title & Subject */}
          <div className="mt-3 sm:mt-4 space-y-1 sm:space-y-2 flex-1">
            <h3
              id={`project-${id || Title}`}
              className="text-base sm:text-xl font-semibold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent line-clamp-1"
            >
              {Title || "Untitled Project"}
            </h3>
            <p className="text-gray-300/80 text-xs sm:text-sm leading-relaxed line-clamp-2">
              {Subject || "No subject available."}
            </p>
          </div>

          {/* Buttons */}
          <div className="pt-3 sm:pt-4 flex items-center justify-between">
            {projectLink ? (
              <a
                href={projectLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLiveDemo}
                className="inline-flex items-center space-x-1.5 sm:space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-200 text-xs sm:text-sm"
                aria-label="View live demo"
              >
                <span className="font-medium">Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
            ) : (
              <span className="text-gray-500 text-xs sm:text-sm"></span>
            )}

            {id ? (
              <Link
                to={`/project/${id}`}
                onClick={handleDetails}
                className="inline-flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/90 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-xs sm:text-sm"
                aria-label="View project details"
              >
                <span className="font-medium">Details</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Link>
            ) : (
              <span className="text-gray-500 text-xs sm:text-sm">Details Not Available</span>
            )}
          </div>

          <div className="absolute inset-0 border border-white/0 group-hover:border-purple-500/50 rounded-lg transition-colors duration-300 -z-50"></div>
        </div>
      </div>
    </div>
  );
};

CardProject.propTypes = {
  Img: PropTypes.string,
  Title: PropTypes.string,
  Subject: PropTypes.string,
  Description: PropTypes.string,
  Link: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default CardProject;