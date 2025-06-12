import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import Certificate from "../components/Certificate";
import { Code, Award, Boxes } from "lucide-react";

// Static Data
const projects = [
  {
    id: "1",
    Img: "/aws-certified-cloud-practitioner.png",
    Title: "E-Commerce Platform",
    Description: "A fully responsive e-commerce website with secure payment integration.",
    Link: "https://example.com/ecommerce",
    TechStack: ["React", "Tailwind", "Firebase"],
  },
  {
    id: "2",
    Img: "/2200030411_MAHADASU HARSHITHA_page-0001.jpg",
    Title: "Task Management App",
    Description: "A task management tool with real-time collaboration features.",
    Link: "https://example.com/taskapp",
    TechStack: ["React", "MongoDB", "Node.js"],
  },
  {
    id: "3",
    Img: "/APSSDC B2 PD 1-2521-1234_page-0001.jpg",
    Title: "Portfolio Website",
    Description: "A personal portfolio to showcase projects and skills.",
    Link: "https://example.com/portfolio",
    TechStack: ["React", "Tailwind", "Vercel"],
  },
  {
    id: "4",
    Img: "/2023.png",
    Title: "Blog Platform",
    Description: "A blogging platform with user authentication and content management.",
    Link: "https://example.com/blog",
    TechStack: ["React", "Firebase", "Bootstrap"],
  },
  {
    id: "5",
    Img: "/project5.png",
    Title: "Weather App",
    Description: "A weather forecasting app with real-time data.",
    Link: "https://example.com/weather",
    TechStack: ["React", "JavaScript", "API"],
  },
  {
    id: "6",
    Img: "/project6.png",
    Title: "Chat Application",
    Description: "A real-time chat application with group chat features.",
    Link: "https://example.com/project",
    TechStack: ["React", "Firebase", "JavaScript"],
  },
  {
    id: "7",
    Img: "/project7.png",
    Title: "Inventory System",
    Description: "An inventory management system for small businesses.",
    Link: "https://example.com/inventory",
    TechStack: ["React", "MongoDB"],
  },
];

const certificates = [
  {
    id: "1",
    Img: "/2200030411_MAHADASU HARSHITHA_page-0001.jpg",
    credlyLink: "https://www.credly.com/badges/cert1",
  },
  {
    id: "2",
    Img: "/aws-certified-cloud-practitioner.png",
    credlyLink: "https://www.credly.com/badges/cert2",
  },
  {
    id: "3",
    Img: "/APSSDC B2 PD 1-2521-1234_page-0001.jpg",
    credlyLink: "https://www.credly.com/badges/cert3",
  },
  {
    id: "4",
    Img: "/MAHADASU  HARSHITHA 691438_page-0001.jpg",
    credlyLink: "https://www.credly.com/badges/cert4",
  },
  {
    id: "5",
    Img: "/certificate5.png",
    credlyLink: "https://www.credly.com/badges/cert5",
  },
  {
    id: "6",
    Img: "/certificate6.png",
    credlyLink: "https://www.credly.com/badges/cert6",
  },
];

const techStacks = [
  { icon: "java.png", language: "Java" },
  { icon: "html.svg", language: "HTML" },
  { icon: "SQL.png", language: "SQL" },
  { icon: "js.png", language: "JavaScript" },
  { icon: "React.png", language: "ReactJS" },
  { icon: "Tailwind.png", language: "Tailwind" },
  { icon: "Git.png", language: "Git" },
  { icon: "Python.png", language: "Python" },
  { icon: "CSS.png", language: "CSS" },
  { icon: "MongoDB.png", language: "MongoDB" },
  { icon: "Vercel.png", language: "Vercel" },
  { icon: "Bootstrap.png", language: "Bootstrap" },
  { icon: "Firebase.png", language: "Firebase" },
];

// ToggleButton Component
const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-3 py-1.5 text-slate-300 hover:text-white text-sm font-semibold
      transition-all duration-300 ease-in-out flex items-center gap-2
      bg-white/10 hover:bg-white/20 rounded-md border border-white/10
      hover:border-white/20 backdrop-blur-md group relative"
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        className={`
          transition-transform duration-300
          ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:-translate-y-0.5"}
        `}
      >
        <path
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          d={isShowingMore ? "M18 15 L12 6 L6 15" : "M6 9 L12 18 L18 9"}
        />
      </svg>
    </span>
  </button>
);

// TabPanel Component
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, md: 3 } }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleShowMore = useCallback((type) => {
    if (type === "projects") {
      setShowAllProjects((prev) => !prev);
    } else {
      setShowAllCertificates((prev) => !prev);
    }
  }, []);

  const displayedProjects = showAllProjects
    ? projects
    : projects.slice(0, initialItems);
  const displayedCertificates = showAllCertificates
    ? certificates
    : certificates.slice(0, initialItems);

  return (
    <div
      className="md:px-[10%] px-[5%] w-full sm:mt-0 bg-[#030014] overflow-hidden"
      id="Portofolio"
    >
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          Portfolio Showcase
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Explore my journey through projects, certifications, and technical expertise.
          Each section represents a milestone in my continuous learning path.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)",
              backdropFilter: "blur(10px)",
              zIndex: 0,
            },
          }}
          className="md:px-4"
        >
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              minHeight: "70px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: "600",
                color: "#94a3b8",
                textTransform: "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                padding: "20px 0",
                zIndex: 1,
                margin: "8px",
                borderRadius: "12px",
                "&:hover": {
                  color: "#ffffff",
                  backgroundColor: "rgba(139, 92, 246, 0.1)",
                  transform: "translateY(-2px)",
                  "& .lucide": { transform: "scale(1.1) rotate(5deg)" },
                },
                "&.Mui-selected": {
                  color: "#fff",
                  background:
                    "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))",
                  boxShadow: "0 4px 15px -3px rgba(139, 92, 246, 0.2)",
                  "& .lucide": { color: "#a78bfa" },
                },
              },
              "& .MuiTabs-indicator": { height: 0 },
              "& .MuiTabs-flexContainer": { gap: "8px" },
            }}
          >
            <Tab
              icon={<Code className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Projects"
              {...a11yProps(0)}
            />
            <Tab
              icon={<Award className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Achievements"
              {...a11yProps(1)}
            />
            <Tab
              icon={<Boxes className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Tech Stack"
              {...a11yProps(2)}
            />
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={setValue}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 place-items-center">
                {displayedProjects.map((project, index) => (
                  <div
                    key={project.id || index}
                    data-aos={
                      index % 3 === 0
                        ? "fade-up-right"
                        : index % 3 === 1
                        ? "fade-up"
                        : "fade-up-left"
                    }
                    data-aos-duration={
                      index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"
                    }
                    className="w-full max-w-[400px]"
                  >
                    <CardProject
                      Img={project.Img}
                      Title={project.Title}
                      Description={project.Description}
                      Link={project.Link}
                      id={project.id}
                    />
                  </div>
                ))}
              </div>
            </div>
            {projects.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore("projects")}
                  isShowingMore={showAllProjects}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 place-items-center">
                {displayedCertificates.map((certificate, index) => (
                  <div
                    key={index}
                    className="w-full max-w-[400px] h-[270px] flex justify-center items-center"
                    data-aos={
                      index % 3 === 0
                        ? "fade-up-right"
                        : index % 3 === 1
                        ? "fade-up"
                        : "fade-up-left"
                    }
                    data-aos-duration={
                      index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"
                    }
                  >
                    <Certificate
                      ImgSertif={certificate.Img}
                      credlyLink={certificate.credlyLink}
                    />
                  </div>
                ))}
              </div>
            </div>
            {certificates.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore("certificates")}
                  isShowingMore={showAllCertificates}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={2} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 place-items-center">
                {techStacks.map((stack, index) => (
                  <div
                    key={index}
                    data-aos={
                      index % 3 === 0
                        ? "fade-up-right"
                        : index % 3 === 1
                        ? "fade-up"
                        : "fade-up-left"
                    }
                    data-aos-duration={
                      index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"
                    }
                  >
                    <TechStackIcon
                      TechStackIcon={stack.icon}
                      Language={stack.language}
                    />
                  </div>
                ))}
              </div>
            </div>
          </TabPanel>
        </SwipeableViews>
      </Box>
    </div>
  );
}