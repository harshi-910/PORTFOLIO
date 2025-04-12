import React from "react";
import { Box, Typography } from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";

const Certificate = ({ ImgSertif, credlyLink }) => {
  const handleRedirect = () => {
    window.open(credlyLink, "_blank");
  };

  if (!ImgSertif) {
    return <Typography>Error: Certificate image not found</Typography>;
  }

  return (
    <Box
      component="div"
      sx={{
        width: "500px",
        marginTop: "1000px",
        marginRight: "20px",
        marginBottom: "900px",
      }}
    >
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 2,
          boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
            "& .overlay": { opacity: 1 },
            "& .hover-content": { transform: "translate(-50%, -50%)", opacity: 1 },
            "& .certificate-image": { filter: "contrast(1.05) brightness(1) saturate(1.1)" },
          },
        }}
      >
        <Box
          sx={{
            width: "400px",
            height: "270px",
            position: "relative",
            overflow: "hidden",
            border: "2px solid #ccc", // Visible border for container
            boxSizing: "border-box", // Ensure border doesn’t increase size
          }}
        >
          <img
            className="certificate-image"
            src={ImgSertif}
            alt="Certificate"
            loading="lazy"
            style={{
              width: "400px",
              height: "270px",
              display: "block",
              objectFit: "contain", // Ensures image fits without distortion
              filter: "contrast(1.10) brightness(0.9) saturate(1.1)",
              transition: "filter 0.3s ease",
              cursor: "pointer",
            }}
            onClick={handleRedirect}
          />
        </Box>

        <Box
          className="overlay"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "400px", // Match container width
            height: "270px", // Match container height
            opacity: 0,
            transition: "all 0.3s ease",
            cursor: "pointer",
            zIndex: 2,
          }}
          onClick={handleRedirect}
        >
          <Box
            className="hover-content"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -60%)",
              opacity: 0,
              transition: "all 0.4s ease",
              textAlign: "center",
              width: "100%",
              color: "white",
            }}
          >
            <FullscreenIcon sx={{ fontSize: 40, mb: 1, filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" }} />
            <Typography variant="h6" sx={{ fontWeight: 600, textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>
              View Certificate
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Certificate;