import React, { useEffect, useRef } from 'react';
import PaperPlane from '../../assets/Paper Plane.png';
import {
      FaPhone,
    FaEnvelope,
    FaClock,
} from 'react-icons/fa';
import { BsGeoAlt } from "react-icons/bs";
import API_URL from "../../api";

const Contact = () => {
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    const sections = sectionRefs.current;

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);
   const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        await fetch(`${API_URL}/contact`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    });
    e.target.reset();
    };
  return (
    <div  className='min-h-screen bg-white'>
      <div
        ref={(el) => (sectionRefs.current[0] = el)}
        className='reveal bg-blue-50 px-5 md:px-10 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center'>
        <div>
          <h1 className='text-3xl font-bold text-black-900'>
            Get In Touch With Us
          </h1>
          <p className='mt-5 text-gray-700'>
            We would love to hear from you. Reach out to us
          <br className='hidden md:block'/> 
            For any inquries or assistance.
          </p>
        </div>
        <div>
          <img className='w-70 md:w-50 h-64 md:h-72 object-cover rounded-2xl' src={PaperPlane} alt='/' />
        </div>
      </div>
      <div
        ref={(el) => (sectionRefs.current[1] = el)}
        className='reveal px-5 md:px-10 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
          <div className='md:col-span-2'>
            <h2 className='text-2xl font-bold text-slate-900 mb-6'>
              Send Us A Message
            </h2>
            <form onSubmit={handleSubmit} className='space-y-5'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <input type='text' name='firstName' placeholder='FirstName' className='w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500'/>
                <input type='text' name='lastName' placeholder='LastName' className='w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500'/>
                <input type='email' name='Email' placeholder='Email' className='w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500'/>
                <input type='tel' name='Telephone' placeholder='Telephone' className='w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500'/>
              </div>
                <textarea name='message' row='6' placeholder='Your Message' className='w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500'></textarea>
                <button type='submit' className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md'>
                  Send Message
                </button>
            </form>
          </div>
          <div className='mb-6'>
            <h2 className='text-2xl font-bold text-slate-900 mb-6'>
              Contact Information
            </h2>
            <div className='space-y-6'>
              <div className='flex items-start gap-4'>
                <BsGeoAlt size={20} />
                <div>
                <h3 className='font-bold'>
                  Our Location
                </h3>
                <p>
                   6 Toyin Street Ikeja, Lagos, Nigeria.
                </p>
                </div>
              </div>
              <div className='flex items-start gap-4'>
                <FaPhone size={20} />
                <div>
                <h3 className='font-bold'>
                  Phone Number
                </h3>
                <p>
                  +(234) 808 217 4766
                </p>
                </div>
              </div>
              <div className='flex items-start gap-4'>
                <FaEnvelope size={20} />
                <div>
                <h3 className='font-bold'>
                  Email Address
                </h3>
                <p>
                  sales@flyinterguide.net
                  <br />
                </p>
                </div>
              </div>
              <div className='flex items-start gap-4'>
                <FaClock size={20} />
                <div>
                <h3 className='font-bold'>
                  Working Hours
                </h3>
                <p>
                  Sun-Sat: 24/7
                </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        ref={(el) => (sectionRefs.current[2] = el)}
        className='reveal px-5 md:px-10 pb-12'>
        <div className='w-full h-64 md:h-80 rounded-lg overflow-hidden'>
          <iframe
            title='InterGuide Air Location'
            src='https://www.google.com/maps?q=6+Toyin+Street,+Ikeja,+Lagos,+Nigeria&output=embed'
            className='w-full h-full border-0'
            loading='lazy'
            allowFullScreen>              
          </iframe>
        </div>
      </div>
    </div>
    );
};

export default Contact;
