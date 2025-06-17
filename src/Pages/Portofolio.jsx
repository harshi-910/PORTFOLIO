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
    Img: "/Projects/Portfolio.png",
    Title: "Portfolio Website",
    Subject: "A personal portfolio to showcase projects and skills.",
    Description: "A personal portfolio to showcase projects and skills.",
    Link: "https://harshii.vercel.app/",
    TechStack: ["React", "Tailwind", "Vercel"],
  },
  {
    id: "2",
    Img: "/Projects/PrimeHomes.png",
    Title: "Prime Homes",
    Subject: "Add value to Indian middle-class residential properties",
    Description:
      "A full-stack web application designed to increase residential property value through personalized AI-driven design suggestions.",
    TechStack: ["Spring Boot", "JSP", "MySQL"],
  },
  {
    id: "3",
    Img: "/Projects/Car.png",
    Title: "Dreem Wheels",
    Subject: "Car Showroom Management System",
    Description:
      "A web-based application to automate vehicle inventory and streamline customer transactions.",
    TechStack: ["JSF", "JPA", "MySQL", "Hibernate"],
  },
  {
    id: "4",
    Img: "/2023.png",
    Title: "Pet Adoption",
    Subject: "Pet Adoption and Accessories Management System",
    Description:
      "A Django-based platform that increased pet adoption through secure authentication and AI-powered pet recommendations, enhancing user engagement and match efficiency.",
    TechStack: ["Django", "HTML", "PostgreSQL"],
  },
];

const certificates = [
  {
    id: "1",
    Img: "/certificates/AWS_CP.png",
    credlyLink:
      "https://www.credly.com/badges/8f51ae73-6f09-4dc3-ace2-8f652282bf9f/public_url",
  },
  {
    id: "2",
    Img: "/certificates/REDHAT.png",
    credlyLink:
      "https://www.credly.com/badges/c8d0a075-8b28-4488-914d-7b9ea39331d1/public_url",
  },
  {
    id: "3",
    Img: "/certificates/SALESFORCE.png",
    credlyLink:
      "https://trailhead.salesforce.com/en/credentials/certification-detail-print/?searchString=1HoaMVZRozSylUkPFo45LzKzo02KeT9UthUVripZz97CnrGO+GcCwUO78IwRqtZt",
  },
  {
    id: "4",
    Img: "/certificates/AWS_DE.png",
    credlyLink:
      "https://www.credly.com/badges/8580d21d-d8af-498a-9dfd-b65103cf4d94/public_url",
  },
  {
    id: "5",
    Img: "/certificates/AWS_CA.png",
    credlyLink:
      "https://www.credly.com/badges/b1a9242d-2d87-43af-807f-7f7a7c2590e0/public_url",
  },
  {
    id: "6",
    Img: "/certificates/SAS.png",
    credlyLink:
      "https://www.credly.com/badges/b1d70dc4-7363-487f-9946-b63ff7fe1e0f/public_url",
  },
  {
    id: "7",
    Img: "/certificates/DataEngineering.jpg",
    credlyLink: "",
  },
  {
    id: "8",
    Img: "/certificates/AIML.jpg",
    credlyLink: "",
  },
  {
    id: "9",
    Img: "/certificates/CLOUD_VI.jpg",
    credlyLink: "",
  },
  {
    id: "10",
    Img: "/certificates/RestAPI.png",
    credlyLink: "https://www.hackerrank.com/certificates/8ae6379a481e",
  },
  {
    id: "11",
    Img: "/certificates/Java.png",
    credlyLink: "https://www.hackerrank.com/certificates/c7d06ccd81b9",
  },
  {
    id: "12",
    Img: "/certificates/SQL.png",
    credlyLink: "https://www.hackerrank.com/certificates/2b5910344362",
  },
  {
    id: "13",
    Img: "/certificates/CodeChefBadge.png",
  },
];

const techStacks = [
  { icon: "techstack/java.png", language: "Java" },
  { icon: "techstack/html.svg", language: "HTML" },
  { icon: "techstack/SQL.png", language: "SQL" },
  { icon: "techstack/REACT.jpg", language: "ReactJS" },
  { icon: "techstack/Tailwind.png", language: "Tailwind" },
  { icon: "techstack/Git.png", language: "Git" },
  { icon: "techstack/Python.jpg", language: "Python" },
  { icon: "techstack/CSS.jpg", language: "CSS" },
  { icon: "techstack/MongoDB.png", language: "MongoDB" },
  { icon: "techstack/Vercel.svg", language: "Vercel" },
  { icon: "techstack/Bootstrap.png", language: "Bootstrap" },
  { icon: "techstack/Firebase.png", language: "Firebase" },
];

// ToggleButton Component
const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="px-3 py-1.5 text-slate-300 hover:text-white text-xs sm:text-sm font-semibold transition-all duration-300 ease-in-out flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-md border border-white/10 hover:border-white/20 backdrop-blur-md group relative"
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        className={`transition-transform duration-300 ${
          isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:-translate-y-0.5"
        }`}
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
        <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
          <Typography component="div">{children}</Typography>
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
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 2 : 6; // Reduced for mobile

  useEffect(() => {
    AOS.init({
      once: true,
      offset: 10,
      disable: window.innerWidth < 640, // Disable animations on mobile
    });
    return () => AOS.refresh();
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
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 bg-[#030014] overflow-hidden"
      id="Portofolio"
    >
      <div
        className="text-center mb-6 sm:mb-8"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          Portfolio Showcase
        </h2>
        <p className="text-gray-400 max-w-md sm:max-w-2xl mx-auto text-sm sm:text-base md:text-lg mt-2 sm:mt-3">
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
            borderRadius: "12px",
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
          className="px-2 sm:px-4"
        >
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              minHeight: "60px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                fontWeight: "600",
                color: "#94a3b8",
                textTransform: "none",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                padding: "15px 0",
                zIndex: 1,
                margin: "6px",
                borderRadius: "8px",
                "&:hover": {
                  color: "#ffffff",
                  backgroundColor: "rgba(139, 92, 246, 0.1)",
                  transform: "translateY(-1px)",
                  "& .lucide": { transform: "scale(1.05) rotate(3deg)" },
                },
                "&.Mui-selected": {
                  color: "#fff",
                  background:
                    "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))",
                  boxShadow: "0 3px 10px -2px rgba(139, 92, 246, 0.2)",
                  "& .lucide": { color: "#a78bfa" },
                },
              },
              "& .MuiTabs-indicator": { height: 0 },
              "& .MuiTabs-flexContainer": { gap: "6px" },
            }}
          >
            <Tab
              icon={<Code className="mb-1 w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300" />}
              label="Projects"
              {...a11yProps(0)}
            />
            <Tab
              icon={<Award className="mb-1 w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300" />}
              label="Achievements"
              {...a11yProps(1)}
            />
            <Tab
              icon={<Boxes className="mb-1 w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300" />}
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
            <div className="flex justify-center items-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 place-items-center">
                {displayedProjects.map((project, index) => (
                  <div
                    key={project.id}
                    data-aos={
                      index % 3 === 0
                        ? "fade-up-right"
                        : index % 3 === 1
                        ? "fade-up"
                        : "fade-up-left"
                    }
                    data-aos-duration="1000"
                    className="w-full max-w-[350px] sm:max-w-[400px]"
                  >
                    <CardProject
                      Img={project.Img}
                      Title={project.Title}
                      Subject={project.Subject}
                      Description={project.Description}
                      Link={project.Link}
                      id={project.id}
                    />
                  </div>
                ))}
              </div>
            </div>
            {projects.length > initialItems && (
              <div className="mt-4 sm:mt-6 w-full flex justify-center sm:justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore("projects")}
                  isShowingMore={showAllProjects}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="flex justify-center items-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 place-items-center">
                {displayedCertificates.map((certificate, index) => (
                  <div
                    key={certificate.id}
                    className="w-full max-w-[350px] sm:max-w-[400px] h-[250px] sm:h-[270px] flex justify-center items-center"
                    data-aos={
                      index % 3 === 0
                        ? "fade-up-right"
                        : index % 3 === 1
                        ? "fade-up"
                        : "fade-up-left"
                    }
                    data-aos-duration="1000"
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
              <div className="mt-4 sm:mt-6 w-full flex justify-center sm:justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore("certificates")}
                  isShowingMore={showAllCertificates}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={2} dir={theme.direction}>
            <div className="flex justify-center items-center pb-6 sm:pb-10">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 place-items-center">
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
                    data-aos-duration="1000"
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