import React, { useState, useEffect } from "react";
import { Share2, User, Mail, MessageSquare, Send } from "lucide-react";
import SocialLinks from "../components/SocialLinks";
import Swal from "sweetalert2";
import AOS from "aos";
import emailjs from "@emailjs/browser";
import "aos/dist/aos.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({
      once: true,
      offset: 10,
      disable: window.innerWidth < 640, // Disable animations on mobile for performance
    });
    return () => AOS.refresh(); // Cleanup on unmount
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    Swal.fire({
      title: "Sending Message...",
      html: "Please wait while we send your message",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID || "service_t1wk7rj", // Use env variable
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "template_6v2khhs",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY || "vO-97Xyq71YmqKGd7"
      );

      Swal.fire({
        title: "Success!",
        text: "Your message has been sent successfully!",
        icon: "success",
        confirmButtonColor: "#6366f1",
        timer: 2000,
        timerProgressBar: true,
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again later.",
        icon: "error",
        confirmButtonColor: "#6366f1",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030014] overflow-hidden" id="Contact">
      <div className="text-center mt-8 sm:mt-12 mb-6 sm:mb-8 px-4 sm:px-6">
        <h2
          data-aos="fade-down"
          data-aos-duration="1000"
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
        >
          Contact Me
        </h2>
        <p
          data-aos="fade-up"
          data-aos-duration="1100"
          className="text-gray-400 max-w-md sm:max-w-2xl mx-auto text-sm sm:text-base md:text-lg mt-2"
        >
          Got a question? Send me a message, and I'll get back to you soon.
        </p>
      </div>

      <div className="max-w-7xl mx-auto py-8 sm:py-10 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-6 sm:gap-8 items-center md:items-start">
        <div
          className="w-full md:w-1/3"
          data-aos="fade-right"
          data-aos-duration="1200"
        >
          <SocialLinks />
        </div>

        <div
          data-aos="fade-left"
          data-aos-duration="1200"
          className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 transition-all duration-300 hover:shadow-[#6366f1]/10 w-full md:w-2/3"
        >
          <div className="flex justify-between items-start mb-4 sm:mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                Get in Touch
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm">
                Have something to discuss? Send me a message and let's talk.
              </p>
            </div>
            <Share2 className="w-6 h-6 sm:w-8 sm:h-8 text-[#6366f1] opacity-50" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div className="relative group">
              <User className="absolute left-3 sm:left-4 top-3 sm:top-4 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full p-2.5 sm:p-3 pl-10 sm:pl-12 bg-white/10 rounded-lg border border-white/20 placeholder-gray-500 text-white focus:outline-none text-sm sm:text-base"
                required
              />
            </div>

            <div className="relative group">
              <Mail className="absolute left-3 sm:left-4 top-3 sm:top-4 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full p-2.5 sm:p-3 pl-10 sm:pl-12 bg-white/10 rounded-lg border border-white/20 placeholder-gray-500 text-white focus:outline-none text-sm sm:text-base"
                required
              />
            </div>

            <div className="relative group">
              <MessageSquare className="absolute left-3 sm:left-4 top-3 sm:top-4 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full resize-none p-2.5 sm:p-3 pl-10 sm:pl-12 bg-white/10 rounded-lg border border-white/20 placeholder-gray-500 text-white focus:outline-none h-[6rem] sm:h-[8rem] text-sm sm:text-base"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center p-2.5 sm:p-3 bg-[#6366f1] rounded-lg text-white font-bold text-sm sm:text-lg transition hover:bg-[#5254c7]"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
              <Send className="ml-1.5 sm:ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;