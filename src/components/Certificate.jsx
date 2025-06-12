import PropTypes from "prop-types";

const Certificate = ({ ImgSertif, credlyLink }) => {
  return (
    <div className="w-full max-w-[400px] h-[270px] bg-[#101628] rounded-lg shadow-lg overflow-hidden flex justify-center items-center transform transition-transform duration-300 hover:-translate-y-1">
      {credlyLink ? (
        <a
          href={credlyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-full"
        >
          <img
            src={ImgSertif}
            alt="Certificate"
            className="w-full h-full object-contain object-center"
            loading="lazy"
            onError={(e) => (e.target.src = "/certificates/fallback-certificate.png")}
          />
        </a>
      ) : (
        <img
          src={ImgSertif}
          alt="Certificate"
          className="w-full h-full object-contain object-center"
          loading="lazy"
          onError={(e) => (e.target.src = "/certificates/fallback-certificate.png")}
        />
      )}
    </div>
  );
};

Certificate.propTypes = {
  ImgSertif: PropTypes.string.isRequired,
  credlyLink: PropTypes.string,
};

export default Certificate;