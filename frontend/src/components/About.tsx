import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiArrowUpRight,
  FiCode,
  FiCompass,
  FiDatabase,
  FiHeart,
  FiLayers,
  FiTarget,
} from "react-icons/fi";

import API_URL from "../config/api";

type WhatIBringItem = {
  title: string;
  description: string;
  icon: string;
};

type AboutData = {
  sectionLabel: string;
  title: string;
  mainHeading: string;
  paragraphs: string[];
  journeyTitle?: string;
  journey?: string;
  interestsTitle?: string;
  interests?: string[];
  hobbiesTitle?: string;
  hobbies?: string[];
  techStackLabel: string;
  techStack: string[];
  ctaText: string;
  ctaLink: string;
  whatIBringTitle: string;
  whatIBringSubtitle: string;
  whatIBring: WhatIBringItem[];
};

type ProfileData = {
  location: string;
  available: boolean;
};

type EducationData = {
  degree: string;
  field: string;
};

const About = () => {
  const [about, setAbout] = useState<AboutData | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [education, setEducation] =
    useState<EducationData | null>(null);
  const [projectCount, setProjectCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          aboutResponse,
          profileResponse,
          educationResponse,
          projectResponse,
        ] = await Promise.all([
          fetch(`${API_URL}/about`),
          fetch(`${API_URL}/profile`),
          fetch(`${API_URL}/education`),
          fetch(`${API_URL}/projects/count`),
        ]);

        if (!aboutResponse.ok) {
          throw new Error("Failed to load About content");
        }

        if (!profileResponse.ok) {
          throw new Error("Failed to load Profile content");
        }

        if (!educationResponse.ok) {
          throw new Error("Failed to load Education content");
        }

        if (!projectResponse.ok) {
          throw new Error("Failed to load Project count");
        }

        const aboutData = await aboutResponse.json();
        const profileData = await profileResponse.json();
        const educationData = await educationResponse.json();
        const projectData = await projectResponse.json();

        setAbout(aboutData);
        setProfile(profileData);
        setEducation(educationData);
        setProjectCount(projectData.count);
      } catch (error) {
        console.error(
          "Failed to load About/Profile/Education/Projects content:",
          error,
        );
      }
    };

    fetchData();
  }, []);

  if (!about || !profile || !education) {
    return null;
  }

  const getIcon = (icon: string) => {
    if (icon === "FiLayers") {
      return <FiLayers />;
    }

    if (icon === "FiDatabase") {
      return <FiDatabase />;
    }

    return <FiCode />;
  };

  return (
    <section
      id="about"
      className="relative overflow-hidden py-24"
    >
      <div className="pointer-events-none absolute right-0 top-1/4 h-80 w-80 rounded-full bg-violet-500/10 blur-[140px]" />

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.3em] text-cyan-400/80">
            {about.sectionLabel}
          </p>

          <h2 className="gradient-text text-4xl font-black tracking-tight sm:text-5xl">
            {about.title}
          </h2>
        </motion.div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="max-w-2xl text-2xl font-bold leading-tight sm:text-3xl">
              {about.mainHeading}
            </h3>

            <div className="mt-5 max-w-2xl space-y-3 text-sm leading-7 text-gray-400">
              {about.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Programming Journey */}
            {about.journey && (
              <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-950/20 via-black/40 to-white/[0.02] p-5 backdrop-blur-sm">
                <div className="mb-2 flex items-center gap-2 text-cyan-400">
                  <FiCompass className="h-4 w-4" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                    {about.journeyTitle || "Programming Journey"}
                  </h4>
                </div>
                <p className="text-sm leading-relaxed text-gray-300 whitespace-pre-line">
                  {about.journey}
                </p>
              </div>
            )}

            <div className="mt-6">
              <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-gray-600">
                {about.techStackLabel}
              </p>

              <div className="flex flex-wrap gap-2">
                {about.techStack.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-gray-400 transition duration-300 hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </div>

            <a
              href={about.ctaLink}
              className="group mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition duration-300 hover:bg-[#b2effa] hover:scale-105"
            >
              {about.ctaText}

              <FiArrowUpRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg border border-white/10 bg-white/5 p-2.5 text-gray-300">
                  <FiCode />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    {about.whatIBringTitle}
                  </p>

                  <p className="text-[11px] text-gray-600">
                    {about.whatIBringSubtitle}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {about.whatIBring.map((item, index) => (
                  <div
                    key={`${item.title}-${index}`}
                    className="flex gap-3"
                  >
                    <span className="mt-1 shrink-0 text-gray-500">
                      {getIcon(item.icon)}
                    </span>

                    <div>
                      <p className="text-sm font-medium text-gray-300">
                        {item.title}
                      </p>

                      <p className="mt-0.5 text-xs leading-5 text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-gray-600">
                    Location
                  </p>

                  <p className="mt-1 text-xs text-gray-300">
                    {profile.location}
                  </p>
                </div>

                <div>
                  <p className="text-[9px] uppercase tracking-widest text-gray-600">
                    Education
                  </p>

                  <p className="mt-1 text-xs text-gray-300">
                    {education.degree} {education.field}
                  </p>
                </div>

                <div>
                  <p className="text-[9px] uppercase tracking-widest text-gray-600">
                    Projects
                  </p>

                  <p className="mt-1 text-xs text-gray-300">
                    {projectCount}+
                  </p>
                </div>

                <div>
                  <p className="text-[9px] uppercase tracking-widest text-gray-600">
                    Availability
                  </p>

                  <div className="mt-1 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400" />

                    <span className="text-xs text-gray-300">
                      {profile.available
                        ? "Available"
                        : "Unavailable"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Interests */}
            {about.interests && about.interests.length > 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                <div className="mb-3 flex items-center gap-2">
                  <FiTarget className="text-cyan-400" size={13} />
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-cyan-400/90">
                    {about.interestsTitle || "Professional Interests"}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {about.interests.map((interest, idx) => (
                    <span
                      key={idx}
                      className="rounded-lg border border-cyan-400/20 bg-cyan-400/5 px-3 py-1 text-xs text-cyan-200 transition hover:bg-cyan-400/10"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Hobbies & Personal Interests */}
            {about.hobbies && about.hobbies.length > 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                <div className="mb-3 flex items-center gap-2">
                  <FiHeart className="text-violet-400" size={13} />
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-violet-400/90">
                    {about.hobbiesTitle || "Hobbies & Personal Interests"}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {about.hobbies.map((hobby, idx) => (
                    <span
                      key={idx}
                      className="rounded-lg border border-violet-400/20 bg-violet-400/5 px-3 py-1 text-xs text-violet-200 transition hover:bg-violet-400/10"
                    >
                      {hobby}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
