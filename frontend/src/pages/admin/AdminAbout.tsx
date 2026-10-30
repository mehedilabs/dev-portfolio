import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import API_URL from "../../config/api";

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
  journeyTitle: string;
  journey: string;
  interestsTitle: string;
  interests: string[];
  hobbiesTitle: string;
  hobbies: string[];
  techStackLabel: string;
  techStack: string[];
  ctaText: string;
  ctaLink: string;
  whatIBringTitle: string;
  whatIBringSubtitle: string;
  whatIBring: WhatIBringItem[];
};

const emptyAbout: AboutData = {
  sectionLabel: "",
  title: "",
  mainHeading: "",
  paragraphs: ["", "", ""],
  journeyTitle: "Programming Journey",
  journey: "",
  interestsTitle: "Professional Interests",
  interests: [],
  hobbiesTitle: "Hobbies & Personal Interests",
  hobbies: [],
  techStackLabel: "",
  techStack: [],
  ctaText: "",
  ctaLink: "",
  whatIBringTitle: "",
  whatIBringSubtitle: "",
  whatIBring: [],
};

const AdminAbout = () => {
  const [about, setAbout] = useState<AboutData>(emptyAbout);
  const [newTechnology, setNewTechnology] = useState("");
  const [newInterest, setNewInterest] = useState("");
  const [newHobby, setNewHobby] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await fetch(`${API_URL}/about`);

        if (!response.ok) {
          if (response.status === 401) {
            window.location.href = "/admin";
            return;
          }

          throw new Error("Failed to load about content");
        }

        const data = await response.json();

        setAbout({
          sectionLabel: data.sectionLabel || "",
          title: data.title || "",
          mainHeading: data.mainHeading || "",
          paragraphs: data.paragraphs || ["", "", ""],
          journeyTitle: data.journeyTitle || "Programming Journey",
          journey: data.journey || "",
          interestsTitle: data.interestsTitle || "Professional Interests",
          interests: data.interests || [],
          hobbiesTitle: data.hobbiesTitle || "Hobbies & Personal Interests",
          hobbies: data.hobbies || [],
          techStackLabel: data.techStackLabel || "",
          techStack: data.techStack || [],
          ctaText: data.ctaText || "",
          ctaLink: data.ctaLink || "",
          whatIBringTitle: data.whatIBringTitle || "",
          whatIBringSubtitle: data.whatIBringSubtitle || "",
          whatIBring: data.whatIBring || [],
        });
      } catch (error) {
        console.error(error);
        toast.error("Failed to load About content");
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  const updateField = (
    field: keyof AboutData,
    value: string,
  ) => {
    setAbout((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const updateParagraph = (
    index: number,
    value: string,
  ) => {
    setAbout((current) => {
      const nextParagraphs = [...current.paragraphs];
      nextParagraphs[index] = value;

      return {
        ...current,
        paragraphs: nextParagraphs,
      };
    });
  };

  const handleAddTechnology = () => {
    const trimmed = newTechnology.trim();

    if (!trimmed) {
      return;
    }

    if (about.techStack.includes(trimmed)) {
      toast.error("Technology already added");
      return;
    }

    setAbout((current) => ({
      ...current,
      techStack: [...current.techStack, trimmed],
    }));

    setNewTechnology("");
  };

  const handleRemoveTechnology = (technologyToRemove: string) => {
    setAbout((current) => ({
      ...current,
      techStack: current.techStack.filter(
        (technology) => technology !== technologyToRemove,
      ),
    }));
  };

  const handleAddInterest = () => {
    const trimmed = newInterest.trim();
    if (!trimmed) return;
    if (about.interests.includes(trimmed)) {
      toast.error("Interest already added");
      return;
    }
    setAbout((current) => ({
      ...current,
      interests: [...current.interests, trimmed],
    }));
    setNewInterest("");
  };

  const handleRemoveInterest = (itemToRemove: string) => {
    setAbout((current) => ({
      ...current,
      interests: current.interests.filter((item) => item !== itemToRemove),
    }));
  };

  const handleAddHobby = () => {
    const trimmed = newHobby.trim();
    if (!trimmed) return;
    if (about.hobbies.includes(trimmed)) {
      toast.error("Hobby already added");
      return;
    }
    setAbout((current) => ({
      ...current,
      hobbies: [...current.hobbies, trimmed],
    }));
    setNewHobby("");
  };

  const handleRemoveHobby = (itemToRemove: string) => {
    setAbout((current) => ({
      ...current,
      hobbies: current.hobbies.filter((item) => item !== itemToRemove),
    }));
  };

  const handleAddWhatIBring = () => {
    setAbout((current) => ({
      ...current,
      whatIBring: [
        ...current.whatIBring,
        {
          title: "",
          description: "",
          icon: "FiCode",
        },
      ],
    }));
  };

  const handleRemoveWhatIBring = (indexToRemove: number) => {
    setAbout((current) => ({
      ...current,
      whatIBring: current.whatIBring.filter(
        (_, index) => index !== indexToRemove,
      ),
    }));
  };

  const updateWhatIBring = (
    index: number,
    field: keyof WhatIBringItem,
    value: string,
  ) => {
    setAbout((current) => {
      const nextItems = [...current.whatIBring];

      nextItems[index] = {
        ...nextItems[index],
        [field]: value,
      };

      return {
        ...current,
        whatIBring: nextItems,
      };
    });
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const response = await fetch(`${API_URL}/about`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(about),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          window.location.href = "/admin";
          return;
        }

        throw new Error(
          data.message || "Failed to update About content",
        );
      }

      setAbout(data.about);

      toast.success("About content updated successfully!");
    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update About content",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080808] text-gray-400">
        Loading About content...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <a
            href="/admin/dashboard"
            className="mb-4 inline-block text-sm text-gray-500 transition hover:text-white"
          >
            ← Back to Dashboard
          </a>

          <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
            Admin Panel
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Manage About
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Update the content displayed in your public About section.
          </p>
        </div>

        <div className="space-y-6">
          {/* Main About */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
            <h2 className="text-lg font-semibold">
              Main About Content
            </h2>

            <div className="mt-5 space-y-5">
              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Section Label
                </label>

                <input
                  value={about.sectionLabel}
                  onChange={(event) =>
                    updateField(
                      "sectionLabel",
                      event.target.value,
                    )
                  }
                  className="admin-input"
                  placeholder="About me"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Section Title
                </label>

                <input
                  value={about.title}
                  onChange={(event) =>
                    updateField(
                      "title",
                      event.target.value,
                    )
                  }
                  className="admin-input"
                  placeholder="More than just code."
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Main Heading
                </label>

                <textarea
                  value={about.mainHeading}
                  onChange={(event) =>
                    updateField(
                      "mainHeading",
                      event.target.value,
                    )
                  }
                  rows={3}
                  className="admin-input resize-none"
                  placeholder="I build modern web experiences..."
                />
              </div>

              {/* Paragraphs */}
              <div>
                <label className="mb-3 block text-sm text-gray-400">
                  About Paragraphs
                </label>

                <div className="space-y-3">
                  {about.paragraphs.map(
                    (paragraph, index) => (
                      <textarea
                        key={index}
                        value={paragraph}
                        onChange={(event) =>
                          updateParagraph(
                            index,
                            event.target.value,
                          )
                        }
                        rows={4}
                        className="admin-input resize-none"
                        placeholder={`Paragraph ${index + 1}`}
                      />
                    ),
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Programming Journey */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
            <h2 className="text-lg font-semibold">
              Programming Journey
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              Share how you got into coding, your milestones, and your evolution as a developer.
            </p>

            <div className="mt-5 space-y-4">
              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Journey Section Title
                </label>
                <input
                  value={about.journeyTitle}
                  onChange={(event) =>
                    updateField("journeyTitle", event.target.value)
                  }
                  className="admin-input"
                  placeholder="Programming Journey"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Journey Story / Description
                </label>
                <textarea
                  value={about.journey}
                  onChange={(event) =>
                    updateField("journey", event.target.value)
                  }
                  rows={6}
                  className="admin-input resize-none"
                  placeholder="Describe how you started coding, key challenges overcome, and where you are today..."
                />
              </div>
            </div>
          </section>

          {/* Professional Interests & Hobbies */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
            <h2 className="text-lg font-semibold">
              Professional Interests & Hobbies
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              Showcase technical domains you're excited about and what you enjoy in your spare time.
            </p>

            <div className="mt-5 space-y-6">
              {/* Professional Interests */}
              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Interests Section Title
                </label>
                <input
                  value={about.interestsTitle}
                  onChange={(event) =>
                    updateField("interestsTitle", event.target.value)
                  }
                  className="admin-input"
                  placeholder="Professional Interests"
                />

                <div className="mt-3 flex gap-2">
                  <input
                    value={newInterest}
                    onChange={(event) => setNewInterest(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        handleAddInterest();
                      }
                    }}
                    placeholder="e.g. Distributed Systems, UI/UX Architecture, Open Source"
                    className="admin-input flex-1"
                  />
                  <button
                    type="button"
                    onClick={handleAddInterest}
                    className="rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-400/20"
                  >
                    Add Interest
                  </button>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {about.interests.map((interest) => (
                    <span
                      key={interest}
                      className="inline-flex items-center gap-2 rounded-lg border border-cyan-400/20 bg-cyan-400/5 px-3 py-1.5 text-xs text-cyan-200"
                    >
                      {interest}
                      <button
                        type="button"
                        onClick={() => handleRemoveInterest(interest)}
                        className="text-gray-400 hover:text-red-400"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {about.interests.length === 0 && (
                    <span className="text-xs text-gray-500">No professional interests added yet.</span>
                  )}
                </div>
              </div>

              {/* Hobbies */}
              <div className="border-t border-white/5 pt-4">
                <label className="mb-2 block text-sm text-gray-400">
                  Hobbies Section Title
                </label>
                <input
                  value={about.hobbiesTitle}
                  onChange={(event) =>
                    updateField("hobbiesTitle", event.target.value)
                  }
                  className="admin-input"
                  placeholder="Hobbies & Personal Interests"
                />

                <div className="mt-3 flex gap-2">
                  <input
                    value={newHobby}
                    onChange={(event) => setNewHobby(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        handleAddHobby();
                      }
                    }}
                    placeholder="e.g. Photography, Reading Philosophy, Chess"
                    className="admin-input flex-1"
                  />
                  <button
                    type="button"
                    onClick={handleAddHobby}
                    className="rounded-xl border border-violet-400/30 bg-violet-400/10 px-4 py-2 text-xs font-semibold text-violet-300 transition hover:bg-violet-400/20"
                  >
                    Add Hobby
                  </button>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {about.hobbies.map((hobby) => (
                    <span
                      key={hobby}
                      className="inline-flex items-center gap-2 rounded-lg border border-violet-400/20 bg-violet-400/5 px-3 py-1.5 text-xs text-violet-200"
                    >
                      {hobby}
                      <button
                        type="button"
                        onClick={() => handleRemoveHobby(hobby)}
                        className="text-gray-400 hover:text-red-400"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {about.hobbies.length === 0 && (
                    <span className="text-xs text-gray-500">No hobbies added yet.</span>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Technology Stack */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
            <h2 className="text-lg font-semibold">
              Technology Stack
            </h2>

            <div className="mt-5">
              <label className="mb-2 block text-sm text-gray-400">
                Stack Label
              </label>

              <input
                value={about.techStackLabel}
                onChange={(event) =>
                  updateField(
                    "techStackLabel",
                    event.target.value,
                  )
                }
                className="admin-input"
                placeholder="Technologies I work with"
              />
            </div>

            <div className="mt-4 flex gap-2">
              <input
                value={newTechnology}
                onChange={(event) =>
                  setNewTechnology(event.target.value)
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    handleAddTechnology();
                  }
                }}
                className="admin-input flex-1"
                placeholder="Add technology (e.g. React, Node.js)"
              />

              <button
                type="button"
                onClick={handleAddTechnology}
                className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-gray-200"
              >
                Add
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {about.techStack.map((technology) => (
                <span
                  key={technology}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300"
                >
                  {technology}

                  <button
                    type="button"
                    onClick={() =>
                      handleRemoveTechnology(technology)
                    }
                    className="text-gray-500 transition hover:text-red-400"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
            <h2 className="text-lg font-semibold">
              Call to Action
            </h2>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  CTA Text
                </label>

                <input
                  value={about.ctaText}
                  onChange={(event) =>
                    updateField(
                      "ctaText",
                      event.target.value,
                    )
                  }
                  className="admin-input"
                  placeholder="Get in touch"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  CTA Link
                </label>

                <input
                  value={about.ctaLink}
                  onChange={(event) =>
                    updateField(
                      "ctaLink",
                      event.target.value,
                    )
                  }
                  className="admin-input"
                  placeholder="#contact"
                />
              </div>
            </div>
          </section>

          {/* What I Bring */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                What I Bring
              </h2>

              <button
                type="button"
                onClick={handleAddWhatIBring}
                className="text-xs text-cyan-400 transition hover:underline"
              >
                + Add Item
              </button>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Card Title
                </label>

                <input
                  value={about.whatIBringTitle}
                  onChange={(event) =>
                    updateField(
                      "whatIBringTitle",
                      event.target.value,
                    )
                  }
                  className="admin-input"
                  placeholder="What I Bring"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Card Subtitle
                </label>

                <input
                  value={about.whatIBringSubtitle}
                  onChange={(event) =>
                    updateField(
                      "whatIBringSubtitle",
                      event.target.value,
                    )
                  }
                  className="admin-input"
                  placeholder="Capabilities & mindset"
                />
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {about.whatIBring.map((item, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-4"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-xs font-semibold text-gray-400">
                      Item #{index + 1}
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveWhatIBring(index)
                      }
                      className="text-xs text-gray-500 transition hover:text-red-400"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-xs text-gray-500">
                        Title
                      </label>

                      <input
                        value={item.title}
                        onChange={(event) =>
                          updateWhatIBring(
                            index,
                            "title",
                            event.target.value,
                          )
                        }
                        className="admin-input"
                        placeholder="Modern Frontend"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs text-gray-500">
                        Description
                      </label>

                      <textarea
                        value={item.description}
                        onChange={(event) =>
                          updateWhatIBring(
                            index,
                            "description",
                            event.target.value,
                          )
                        }
                        rows={3}
                        className="admin-input resize-none"
                        placeholder="Responsive interfaces with React..."
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs text-gray-500">
                        Icon
                      </label>

                      <select
                        value={item.icon}
                        onChange={(event) =>
                          updateWhatIBring(
                            index,
                            "icon",
                            event.target.value,
                          )
                        }
                        className="admin-input"
                      >
                        <option value="FiCode">
                          Code
                        </option>

                        <option value="FiLayers">
                          Layers
                        </option>

                        <option value="FiDatabase">
                          Database
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Save */}
          <div className="flex justify-end pb-10">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" theme="dark" />
    </div>
  );
};

export default AdminAbout;
