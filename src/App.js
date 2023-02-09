import { useState, useEffect } from "react";
import Education from "./components/Education";
import Experiences from "./components/Experience";
import Personalia from "./components/Personalia";
import "./styles/App.css";
import emptyCV from "./utils/emptyCV";
import { v4 as uuid } from "uuid";

const App = () => {
    const [cv, setCv] = useState(
        JSON.parse(localStorage.getItem("cv")) || emptyCV
    );

    const [mode, setMode] = useState(
        JSON.parse(localStorage.getItem("mode")) || { preview: false }
    );

    // Add dummy image, because we are not storing image in localstorage
    useEffect(() => {
        setCv((prevState) => {
            return {
                ...prevState,
                personalia: {
                    ...prevState.personalia,
                    photo: emptyCV.personalia.photo,
                },
            };
        });
    }, []);

    // write to localStorage
    useEffect(() => {
        localStorage.setItem("cv", JSON.stringify(cv));
    }, [cv]);

    useEffect(() => {
        localStorage.setItem("mode", JSON.stringify(mode));
    }, [mode]);

    const togglePreview = () => {
        sortExperienceAndEducation();
        setMode({ preview: !mode.preview });
    };

    const changePersonalia = (e) => {
        if (e.target.type === "file") {
            const file = e.target.files[0];
            const filePath = URL.createObjectURL(file);
            setCv((prevState) => {
                return {
                    ...prevState,
                    personalia: {
                        ...prevState.personalia,
                        photo: filePath,
                    },
                };
            });
            return;
        }

        setCv((prevState) => {
            return {
                ...prevState,
                personalia: {
                    ...prevState.personalia,
                    [e.target.name]: e.target.value,
                },
            };
        });
    };

    const changeExperience = (e, id) => {
        setCv((prevState) => {
            let newExperience;
            const exceptions = ["fromMonth", "fromYear", "toMonth", "toYear"];
            if (exceptions.includes(e.target.name)) {
                newExperience = prevState.experience.map((experience) => {
                    if (experience.id === id) {
                        if (e.target.name.startsWith("from")) {
                            let from = {
                                ...experience.from,
                                [e.target.name === "fromMonth"
                                    ? "month"
                                    : "year"]: +e.target.value,
                            };
                            experience = {
                                ...experience,
                                from: from,
                            };
                        } else if (e.target.name.startsWith("to")) {
                            let to = {
                                ...experience.to,
                                [e.target.name === "toMonth"
                                    ? "month"
                                    : "year"]: +e.target.value,
                            };
                            experience = {
                                ...experience,
                                to: to,
                            };
                        }
                    }
                    return experience;
                });
            } else if (e.target.type === "checkbox") {
                newExperience = prevState.experience.map((experience) => {
                    if (experience.id === id) {
                        experience = {
                            ...experience,
                            [e.target.name]: e.target.checked,
                        };
                    }
                    return experience;
                });
            } else {
                newExperience = prevState.experience.map((experience) => {
                    if (experience.id === id) {
                        experience = {
                            ...experience,
                            [e.target.name]:
                                e.target.dataset.type === "number"
                                    ? +e.target.value
                                    : e.target.value,
                        };
                    }
                    return experience;
                });
            }
            return {
                ...prevState,
                experience: newExperience,
            };
        });
    };

    const addExperience = (e) => {
        e.preventDefault();
        const thisYear = new Date().getFullYear();

        setCv((prevState) => {
            return {
                ...prevState,
                experience: [
                    ...prevState.experience,
                    {
                        id: uuid(),
                        from: {
                            month: 1,
                            year: thisYear,
                        },
                        to: {
                            month: 1,
                            year: thisYear,
                        },
                        role: "",
                        company: "",
                        description: "",
                        currentPosition: false,
                    },
                ],
            };
        });
    };

    const removeExperience = (e, id) => {
        setCv((prevState) => {
            const newExperience = prevState.experience.filter((experience) => {
                return experience.id !== id;
            });
            return {
                ...prevState,
                experience: newExperience,
            };
        });
    };

    const changeEducation = (e, id) => {
        setCv((prevState) => {
            let newEducation;
            const exceptions = ["fromMonth", "fromYear", "toMonth", "toYear"];
            if (exceptions.includes(e.target.name)) {
                newEducation = prevState.education.map((education) => {
                    if (education.id === id) {
                        if (e.target.name.startsWith("from")) {
                            let from = {
                                ...education.from,
                                [e.target.name === "fromMonth"
                                    ? "month"
                                    : "year"]: +e.target.value,
                            };
                            education = {
                                ...education,
                                from: from,
                            };
                        } else if (e.target.name.startsWith("to")) {
                            let to = {
                                ...education.to,
                                [e.target.name === "toMonth"
                                    ? "month"
                                    : "year"]: +e.target.value,
                            };
                            education = {
                                ...education,
                                to: to,
                            };
                        }
                    }
                    return education;
                });
            } else if (e.target.type === "checkbox") {
                newEducation = prevState.education.map((education) => {
                    if (education.id === id) {
                        education = {
                            ...education,
                            [e.target.name]: e.target.checked,
                        };
                    }
                    return education;
                });
            } else {
                newEducation = prevState.education.map((education) => {
                    if (education.id === id) {
                        education = {
                            ...education,
                            [e.target.name]:
                                e.target.dataset.type === "number"
                                    ? +e.target.value
                                    : e.target.value,
                        };
                    }
                    return education;
                });
            }
            return {
                ...prevState,
                education: newEducation,
            };
        });
    };

    const addEducation = (e) => {
        e.preventDefault();
        const thisYear = new Date().getFullYear();

        setCv((prevState) => {
            return {
                ...prevState,
                education: [
                    ...prevState.education,
                    {
                        id: uuid(),
                        from: {
                            month: 1,
                            year: thisYear,
                        },
                        to: {
                            month: 1,
                            year: thisYear,
                        },
                        degree: "",
                        school: "",
                    },
                ],
            };
        });
    };

    const removeEducation = (e, id) => {
        setCv((prevState) => {
            const newEducation = prevState.education.filter((education) => {
                return education.id !== id;
            });
            return {
                ...prevState,
                education: newEducation,
            };
        });
    };

    const sortExperienceAndEducation = () => {
        setCv((prevState) => {
            const sortedExperience = prevState.experience.sort(
                (current, last) => {
                    return +current.from.year - +last.from.year;
                }
            );
            const sortedEducation = prevState.education.sort(
                (current, last) => {
                    return +current.from.year - +last.from.year;
                }
            );
            return {
                ...prevState,
                experience: sortedExperience,
                education: sortedEducation,
            };
        });
    };

    const clearCV = () => {
        setCv(emptyCV);
    };

    return (
        <div className="cv">
            <form>
                <Personalia
                    personalia={cv.personalia}
                    mode={mode}
                    onChange={changePersonalia}
                />
                <Experiences
                    experience={cv.experience}
                    onChange={changeExperience}
                    onAdd={addExperience}
                    onRemove={removeExperience}
                    mode={mode}
                />
                <Education
                    education={cv.education}
                    mode={mode}
                    onChange={changeEducation}
                    onAdd={addEducation}
                    onRemove={removeEducation}
                />
            </form>
            <button
                className={mode.preview ? "edit" : ""}
                type="submit"
                onClick={togglePreview}
            >
                {mode.preview ? "Edit" : "Preview"}
            </button>
            {mode.preview ? null : (
                <button className="clear-cv" onClick={clearCV}>
                    Reset
                </button>
            )}
        </div>
    );
};

export default App;
