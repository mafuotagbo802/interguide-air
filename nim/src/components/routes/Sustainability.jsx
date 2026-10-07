import React, { useEffect, useRef } from "react";
import Sustainability1 from "../../assets/Sustainability1.jpg";
import Sustainability2 from "../../assets/Sustainability2.jpg";
import Sabre from "../../assets/Sabre.png";
import Golfview from "../../assets/Golfview.png";
import UnitedAir from "../../assets/UnitedAir.png";
import {
  FaPlane,
  FaCoins,
  FaUsers,
  FaLeaf,
  FaBuilding,
  FaUserTie,
  FaHandshake,
  FaShieldAlt,
  FaStar,
  FaBriefcase,
  FaChartLine,
  FaComments,
  FaClipboardList,
} from "react-icons/fa";

const Sustainability = () => {
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

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <div
        ref={(el) => (sectionRefs.current[0] = el)}
        className="reveal relative h-[430px] md:h-[500px] overflow-hidden">
        {/* Background Image */}
        <img src={Sustainability1} alt="InterGuide Air Sustainability" className="absolute inset-0 w-full h-full object-cover" />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/55"></div>
        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 h-full flex items-center">
          <div className="max-w-2xl text-white">
          <div className="w-14 h-1 bg-yellow-400 rounded-full mb-5"></div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              SUSTAINABILITY
            </h1>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-yellow-400 mb-5">
              Building Excellence That Lasts
            </h2>
            <p className="text-base md:text-lg leading-8 text-gray-100">
              Our Sustainability pillars are the foundation of what has kept
              us strengthened for years without lowering our standards of
              excellence.
            </p>
          </div>
        </div>
      </div>


      {/* INTRODUCTION + FIVE PILLARS */}
      <div
        ref={(el) => (sectionRefs.current[1] = el)}
        className="reveal bg-white py-14 md:py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="w-14 h-1 bg-yellow-400 rounded-full mx-auto mb-5"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#123b70]">
              Our Sustainability
            </h2>
            <h3 className="text-xl md:text-2xl font-bold text-[#123b70] mt-2">
              The Foundation Behind Our Excellence
            </h3>
            <p className="text-gray-600 text-base md:text-lg leading-8 mt-5">
              Our Sustainability pillars are the foundation of what has kept
              us strengthened for years without lowering our standards of
              excellence.
            </p>
          </div>

          {/* FIVE PILLARS */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
            {/* Operations */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center">
                <FaPlane className="text-3xl text-[#123b70]" />
              </div>
              <h3 className="text-sm md:text-base font-bold text-[#123b70] mt-4">
                Operations
                <br />
                Sustainability
              </h3>
            </div>
            {/* Financial */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-yellow-50 border border-yellow-200 flex items-center justify-center">
                <FaCoins className="text-3xl text-yellow-500" />
              </div>
              <h3 className="text-sm md:text-base font-bold text-[#123b70] mt-4">
                Financial
                <br />
                Sustainability
              </h3>
            </div>
            {/* Cultural */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center">
                <FaUsers className="text-3xl text-[#123b70]" />
              </div>
              <h3 className="text-sm md:text-base font-bold text-[#123b70] mt-4">
                Cultural
                <br />
                Sustainability
              </h3>
            </div>
            {/* Social */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-green-50 border border-green-100 flex items-center justify-center">
                <FaLeaf className="text-3xl text-green-600" />
              </div>
              <h3 className="text-sm md:text-base font-bold text-[#123b70] mt-4">
                Social
                <br />
                Sustainability
              </h3>
            </div>
            {/* Institutional */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center">
                <FaBuilding className="text-3xl text-[#123b70]" />
              </div>
              <h3 className="text-sm md:text-base font-bold text-[#123b70] mt-4">
                Institutional
                <br />
                Sustainability
              </h3>
            </div>
          </div>
        </div>
      </div>


      {/* OPERATIONS + FINANCIAL */}
      <div
        ref={(el) => (sectionRefs.current[2] = el)}
        className="reveal bg-[#eef9ff] py-14 md:py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
            {/* OPERATIONS */}
            <div className="bg-white rounded-xl border border-blue-100 p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-[#123b70] flex items-center justify-center">
                  <FaPlane className="text-white text-xl" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-[#123b70]">
                    Operations
                  </h2>
                  <h3 className="text-lg font-bold text-[#123b70]">
                    Sustainability Pillar
                  </h3>
                  <div className="w-12 h-1 bg-yellow-400 rounded-full mt-2"></div>
                </div>
              </div>
              <ul className="space-y-4 text-gray-600 leading-7">
                <li className="flex gap-3">
                  <span className="text-yellow-500 font-bold">✓</span>
                  <span>
                    We work as a <strong>TEAM</strong> at all times.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-yellow-500 font-bold">✓</span>
                  <span>
                    We embrace <strong>CHANGE</strong> as a constant factor
                    in the survival of our company.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-yellow-500 font-bold">✓</span>
                  <span>
                    We operate from a <strong>MORAL</strong> platform at all
                    times.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-yellow-500 font-bold">✓</span>
                  <span>
                    We are guided by the{" "}
                    <strong>TOTAL EXCELLENT MANAGEMENT</strong> concept.
                  </span>
                </li>
              </ul>
            </div>
            {/* FINANCIAL */}
            <div className="bg-white rounded-xl border border-blue-100 p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center">
                  <FaCoins className="text-white text-xl" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-[#123b70]">
                    Financial
                  </h2>
                  <h3 className="text-lg font-bold text-[#123b70]">
                    Sustainability Pillar
                  </h3>
                  <div className="w-12 h-1 bg-yellow-400 rounded-full mt-2"></div>
                </div>
              </div>
              <p className="text-gray-600 text-base leading-7">
                Our Financial Sustainability focuses on remarkable and
                sustainable financial rewards to clients, partners, business
                and shareholders of business through our solid business
                structures, excellent customer services, timely delivery,
                affordable prices to all clients on time and all the time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CULTURAL SUSTAINABILITY */}
      <div
        ref={(el) => (sectionRefs.current[3] = el)}
        className="reveal bg-white py-14 md:py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="bg-[#eef9ff] rounded-xl p-7 md:p-10">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* ICON */}
              <div className="shrink-0">
                <div className="w-20 h-20 rounded-full bg-[#123b70] flex items-center justify-center">
                  <FaUsers className="text-white text-3xl" />
                </div>
              </div>
              {/* CONTENT */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#123b70]">
                  Cultural Sustainability
                </h2>
                <div className="w-12 h-1 bg-yellow-400 rounded-full my-4"></div>
                <p className="text-gray-600 text-base md:text-lg leading-8">
                  Our Cultural Sustainability is a bedrock to our
                  organizational ethics hence ensuring we build on this firm
                  corporate culture. We do not waiver on these values as it
                  carries for us professionalism, brand loyalty, honesty,
                  respect across boards, team work, hardwork and excellence
                  which is rewarded to ensure this is the landmark for all
                  operational activities in our organization across every
                  hierarchy of staff.
                </p>
                <p className="text-[#123b70] font-bold text-lg mt-5">
                  Our People are our most cherished asset in our Organization.
                </p>
              </div>
            </div>
            {/* VALUES */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 mt-10">
              {[
                { icon: FaUserTie, name: "Professionalism" },
                { icon: FaShieldAlt, name: "Brand Loyalty" },
                { icon: FaHandshake, name: "Honesty" },
                { icon: FaUsers, name: "Respect" },
                { icon: FaUsers, name: "Teamwork" },
                { icon: FaBriefcase, name: "Hardwork" },
                { icon: FaStar, name: "Excellence" },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-4 text-center border border-blue-100">
                    <Icon className="text-2xl text-[#123b70] mx-auto mb-2" />
                    <p className="text-xs md:text-sm font-semibold text-[#123b70]">
                      {item.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>


      {/* SOCIAL SUSTAINABILITY */}
      <div
        ref={(el) => (sectionRefs.current[4] = el)}
        className="reveal bg-[#eef9ff] py-14 md:py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            {/* LEFT VISUAL */}
            <div className="lg:col-span-2">
              <div className="relative h-[300px] md:h-[380px] rounded-xl overflow-hidden">
                {/* Social Sustainability Image */}
                <img src={Sustainability2} alt="Social Sustainability" className="absolute inset-0 w-full h-full object-cover" />                
              </div>
            </div>
            {/* RIGHT CONTENT */}
            <div className="lg:col-span-3">
              <div className="flex items-center gap-4">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#123b70]">
                    Social Sustainability
                  </h2>
                  <div className="w-12 h-1 bg-yellow-400 rounded-full mt-2"></div>
                </div>
              </div>
              <p className="text-gray-600 text-base md:text-lg leading-8 mt-5">
                As people are our most cherished assets at InterGuide, we
                ensure that we are able to manage effectively relation with
                all stakeholders and community at large by giving back in
                terms of our corporate social responsibility to communities
                through our foundation.
              </p>
              <p className="text-gray-600 text-base md:text-lg leading-8 mt-4">
                We educate the general populace through sponsoring local
                entrepreneur development and even direct and indirect
                employment of these skills while encouraging local businesses
                and contractors with sale.
              </p>
              <p className="text-gray-600 text-base md:text-lg leading-8 mt-4">
                Our foundations and Business Development units are tasked with
                identifying places or persons who need the support we can aid
                them with.
              </p>
              {/* SOCIAL IMPACT CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-7">
                {[
                  "Community Support",
                  "Entrepreneurship Development",
                  "Employment Opportunities",
                  "Local Businesses",
                  "Community Development",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-white border border-green-100 rounded-lg p-3">
                    <FaLeaf className="text-green-600" />
                    <span className="text-sm font-semibold text-[#123b70]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* INSTITUTIONAL SUSTAINABILITY */}
      <div
        ref={(el) => (sectionRefs.current[5] = el)}
        className="reveal bg-white py-14 md:py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* CONTENT */}
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-full bg-[#123b70] flex items-center justify-center">
                  <FaBuilding className="text-white text-xl" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#123b70]">
                    Institutional Sustainability
                  </h2>
                  <div className="w-12 h-1 bg-yellow-400 rounded-full mt-2"></div>
                </div>
              </div>
              <p className="text-gray-600 text-base md:text-lg leading-8">
                At InterGuide, we ensure that all partners and stakeholders'
                interest, concerns and recommendations are well received and
                taken priority and are implemented in our business relations
                and decisions.
              </p>
              <p className="text-gray-600 text-base md:text-lg leading-8 mt-4">
                We have a well organized system to get this feedback from our
                direct clients, affiliates, corporate clients or even airlines
                in order to identify issues, address issues and keep mutual
                business relationship in synchronization.
              </p>
              <p className="text-gray-600 text-base md:text-lg leading-8 mt-4">
                This is why we have one of the largest database of affiliates
                who are very loyal to our business as we use the most effective
                and suitable strategy to address their concerns.
              </p>
            </div>
            {/* FEEDBACK CHANNELS */}
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-[#123b70] mb-5">
                How We Listen To Our Stakeholders
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#eef9ff] rounded-xl p-5 text-center">
                  <FaUsers className="text-3xl text-[#123b70] mx-auto mb-3" />
                  <p className="font-semibold text-[#123b70]">
                    Staff Meetings
                  </p>
                </div>
                <div className="bg-[#eef9ff] rounded-xl p-5 text-center">
                  <FaComments className="text-3xl text-[#123b70] mx-auto mb-3" />
                  <p className="font-semibold text-[#123b70]">
                    Customer Feedback
                  </p>
                </div>
                <div className="bg-[#eef9ff] rounded-xl p-5 text-center">
                  <FaClipboardList className="text-3xl text-[#123b70] mx-auto mb-3" />
                  <p className="font-semibold text-[#123b70]">
                    Surveys & AGMs
                  </p>
                </div>
                <div className="bg-[#eef9ff] rounded-xl p-5 text-center">
                  <FaHandshake className="text-3xl text-[#123b70] mx-auto mb-3" />
                  <p className="font-semibold text-[#123b70]">
                    Partner Engagements
                  </p>
                </div>
                <div className="bg-[#eef9ff] rounded-xl p-5 text-center col-span-2">
                  <FaChartLine className="text-3xl text-[#123b70] mx-auto mb-3" />
                  <p className="font-semibold text-[#123b70]">
                    Market Activation
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* PARTNERSHIP AWARDS */}
          <div className="mt-14">
            <div className="text-center mb-8">
              <div className="w-14 h-1 bg-yellow-400 rounded-full mx-auto mb-4"></div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#123b70]">
                Our Institutional Achievements
              </h2>
              <p className="text-gray-600 mt-3">
                Some of our institutional sustainability efforts have yielded
                rewards with partners.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* SABRE 2022 */}
              <div className="bg-[#eef9ff] rounded-xl border border-blue-100 p-7 text-center">
                <div className="h-16 flex items-center justify-center mb-4">
                  <img src={Sabre} alt="Sabre" className="max-h-14 max-w-[150px] object-contain" />
                </div>
                <h3 className="font-bold text-[#123b70]">
                  Best Partner Travel Agency
                </h3>
                <p className="text-gray-500 text-sm mt-2">
                  2022
                </p>
              </div>
              {/* GOLFVIEW */}
              <div className="bg-[#eef9ff] rounded-xl border border-blue-100 p-7 text-center">
                <div className="h-16 flex items-center justify-center mb-4">
                  <img src={Golfview} alt="Golfview" className="max-h-14 max-w-[150px] object-contain" />
                </div>
                <h3 className="font-bold text-[#123b70]">
                  Certificate of Preferred Partner
                </h3>
                <p className="text-gray-500 text-sm mt-2">
                  2022
                </p>
              </div>
              {/* SABRE 2021 */}
              <div className="bg-[#eef9ff] rounded-xl border border-blue-100 p-7 text-center">
                <div className="h-16 flex items-center justify-center mb-4">
                  <img src={Sabre} alt="Sabre" className="max-h-14 max-w-[150px] object-contain" />
                </div>
                <h3 className="font-bold text-[#123b70]">
                  Best Partner Travel Agency
                </h3>
                <p className="text-gray-500 text-sm mt-2">
                  2021
                </p>
              </div>
              {/* UNITED AIR */}
              <div className="bg-[#eef9ff] rounded-xl border border-blue-100 p-7 text-center">
                <div className="h-16 flex items-center justify-center mb-4">
                  <img src={UnitedAir} alt="United Air" className="max-h-14 max-w-[150px] object-contain" />
                </div>
                <h3 className="font-bold text-[#123b70]">
                  Certificate of Preferred Partner
                </h3>
                <p className="text-gray-500 text-sm mt-2">
                  2015
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sustainability;