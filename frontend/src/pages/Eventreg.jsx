import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Eventreg = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contactNumber: "",
        occupation: "",
        institute: "",
        referralSource: "",
        referralOther: ""
    });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (!formData.name.trim()) return "Please enter your name.";
        if (!formData.email.trim()) return "Please enter your email address.";
        if (!formData.contactNumber.trim()) return "Please enter your contact number.";
        if (!formData.occupation.trim()) return "Please tell us your occupation.";
        if (!formData.institute.trim()) return "Please enter your institute or organisation.";
        if (!formData.referralSource.trim()) return "Please tell us how you heard about the Art Law Communion.";
        if (formData.referralSource === "Other" && !formData.referralOther.trim()) return "Please specify how you heard about us.";
        return "";
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            setSubmitted(false);
            return;
        }
        setError("");
        setSubmitted(true);
        console.log("Event registration submitted", formData);
    };

    return (
        <div className="relative min-h-screen overflow-hidden text-white bg-black">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url('/ship.jpeg')`,
                    filter: "brightness(0.42) saturate(1.05)"
                }}
            />
            <div className="absolute inset-0 bg-black/65" />

            <Navbar />

            <main className="relative z-10 flex min-h-[calc(100vh-104px)] items-start justify-center px-4 pb-16 pt-28 sm:px-6 lg:px-8">
                <div className="w-full max-w-3xl">
                    <section className="rounded-[2rem] bg-slate-950/90 p-8 shadow-2xl ring-1 ring-white/10 backdrop-blur-xl border border-white/10">
                          <div className="mb-8">   
                            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                             Register now
                            </h1>
                          </div>
                       {/* <div className="mb-8">
                            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                                Art Law Communion : In Conversation with Dr. Arshiya Sethi
                            </h1>
                            <p className="mt-4 text-base leading-8 text-gray-200 sm:text-lg">
                                Join this interactive session hosted by the Art Law Communion and NUJS Weekend Lecture Series. Fill in your details to secure the Google Meet link for the event.
                            </p>

                            <div className="mt-8 grid gap-4 sm:grid-cols-3">
                                <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
                                    <p className="text-sm uppercase tracking-[0.24em] text-gray-300">Date</p>
                                    <p className="mt-3 text-xl font-semibold text-white">20th February</p>
                                </div>
                                <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
                                    <p className="text-sm uppercase tracking-[0.24em] text-gray-300">Time</p>
                                    <p className="mt-3 text-xl font-semibold text-white">7:30 PM</p>
                                </div>
                                <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
                                    <p className="text-sm uppercase tracking-[0.24em] text-gray-300">Format</p>
                                    <p className="mt-3 text-xl font-semibold text-white">Google Meet</p>
                                </div>
                            </div>
                        </div> */}

                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name" className="text-sm font-medium text-gray-200">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Your full name"
                                    className="mt-2 w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 outline-none ring-1 ring-transparent transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="text-sm font-medium text-gray-200">
                                    Email ID
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    type="email"
                                    placeholder="you@example.com"
                                    className="mt-2 w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 outline-none ring-1 ring-transparent transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
                                />
                            </div>

                            <div>
                                <label htmlFor="contactNumber" className="text-sm font-medium text-gray-200">
                                    Contact Number
                                </label>
                                <input
                                    id="contactNumber"
                                    name="contactNumber"
                                    value={formData.contactNumber}
                                    onChange={handleChange}
                                    type="tel"
                                    inputMode="tel"
                                    placeholder="+91 98765 43210"
                                    className="mt-2 w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 outline-none ring-1 ring-transparent transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
                                />
                            </div>

                            <div>
                                <label htmlFor="occupation" className="text-sm font-medium text-gray-200">
                                    Occupation
                                </label>
                                <input
                                    id="occupation"
                                    name="occupation"
                                    value={formData.occupation}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Student / Legal Professional"
                                    className="mt-2 w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 outline-none ring-1 ring-transparent transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
                                />
                            </div>

                            <div>
                                <label htmlFor="institute" className="text-sm font-medium text-gray-200">
                                    Institute / Organisation
                                </label>
                                <input
                                    id="institute"
                                    name="institute"
                                    value={formData.institute}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="University, studio, or organisation"
                                    className="mt-2 w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 outline-none ring-1 ring-transparent transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
                                />
                            </div>

                            <fieldset className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-5">
                                <legend className="text-sm font-medium text-gray-200">
                                    How did you get to know about the Art Law Communion?
                                </legend>

                                {[
                                    "Social Media",
                                    "Friends/ Colleagues",
                                    "University/ Institute/ Organisation",
                                    "Other"
                                ].map((option) => (
                                    <label key={option} className="flex items-center gap-3 text-gray-200">
                                        <input
                                            type="radio"
                                            name="referralSource"
                                            value={option}
                                            checked={formData.referralSource === option}
                                            onChange={handleChange}
                                            className="h-4 w-4 accent-cyan-400"
                                        />
                                        <span>{option}</span>
                                    </label>
                                ))}

                                {formData.referralSource === "Other" && (
                                    <input
                                        id="referralOther"
                                        name="referralOther"
                                        value={formData.referralOther}
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="Please specify"
                                        className="mt-3 w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 outline-none ring-1 ring-transparent transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
                                    />
                                )}
                            </fieldset>

                            {error && (
                                <div className="rounded-3xl bg-red-600/20 px-4 py-3 text-sm text-red-100 ring-1 ring-red-400/20">
                                    {error}
                                </div>
                            )}

                            {submitted ? (
                                <div className="rounded-3xl border border-cyan-400/30 bg-cyan-500/10 p-5 text-sm text-cyan-100">
                                    Thank you for registering! We will share the Google Meet details by email shortly.
                                </div>
                            ) : null}

                            <button
                                type="submit"
                                className="w-full rounded-3xl bg-cyan-500 px-6 py-3 text-base font-semibold text-slate-950 transition hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-300/70"
                            >
                                Submit Registration
                            </button>
                        </form>

                        <div className="mt-8 text-sm text-gray-400">
                            <p>* Indicates required question.</p>
                            <p className="mt-2">
                                By submitting, you agree to receive event updates and the Google Meet invite at the email address provided.
                            </p>
                        </div>

                        <div className="mt-6 flex items-center justify-between text-sm text-gray-400">
                            <Link to="/events" className="font-semibold text-cyan-300 hover:text-white">
                                Back to events
                            </Link>
                            <span className="text-gray-500">Never submit passwords through forms.</span>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default Eventreg;
