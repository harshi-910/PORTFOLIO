import React, { useState, useEffect } from "react";
import { Share2, User, Mail, MessageSquare, Send } from "lucide-react";
import SocialLinks from "../components/SocialLinks";
import Swal from "sweetalert2";
import AOS from "aos";
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
      once: false,
    });
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
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating async action

      Swal.fire({
        title: "Success!",
        text: "Your message has been sent successfully!",
        icon: "success",
        confirmButtonColor: "#6366f1",
        timer: 2000,
        timerProgressBar: true,
      });

      setFormData({
        name: "",
        email: "",
        message: "",
      });
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
    <>
      <div className="text-center lg:mt-[5%] mt-10 mb-2 sm:px-0 px-[5%]">
        <h2
          data-aos="fade-down"
          data-aos-duration="1000"
          className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
        >
          Contact Me
        </h2>
        <p
          data-aos="fade-up"
          data-aos-duration="1100"
          className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2"
        >
          Got a question? Send me a message, and I'll get back to you soon.
        </p>
      </div>

      <div
        className="h-auto py-10 flex items-center ml-[150px] justify-center px-[5%] md:px-0"
        id="Contact"
      >
        <div className="container flex flex-wrap md:flex-nowrap gap-8 items-start">
          {/* Let's Connect Box (Left) */}
          <div
            className="w-full md:w-1/3"
            data-aos="fade-right"
            data-aos-duration="1200"
          >
            <SocialLinks />
          </div>

          {/* Get in Touch Box (Right) */}
          <div
            data-aos="fade-left"
            data-aos-duration="1200"
            className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-xl p-5 sm:p-8 transition-all duration-300 hover:shadow-[#6366f1]/10 w-full md:w-2/4"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                  Get in Touch
                </h2>
                <p className="text-gray-400 text-sm">
                  Have something to discuss? Send me a message and let's talk.
                </p>
              </div>
              <Share2 className="w-8 h-8 text-[#6366f1] opacity-50" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative group">
                <User className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full p-3 pl-12 bg-white/10 rounded-lg border border-white/20 placeholder-gray-500 text-white focus:outline-none"
                  required
                />
              </div>

              <div className="relative group">
                <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full p-3 pl-12 bg-white/10 rounded-lg border border-white/20 placeholder-gray-500 text-white focus:outline-none"
                  required
                />
              </div>

              <div className="relative group">
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full resize-none p-3 pl-12 bg-white/10 rounded-lg border border-white/20 placeholder-gray-500 text-white focus:outline-none h-[8rem]"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center p-3 bg-[#6366f1] rounded-lg text-white font-bold text-lg transition hover:bg-[#5254c7]"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send className="ml-2 w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;