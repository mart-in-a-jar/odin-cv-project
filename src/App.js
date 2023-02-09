import { Component } from "react";
import Education from "./components/Education";
import Experiences from "./components/Experience";
import Personalia from "./components/Personalia";
import "./styles/App.css";
import emptyCV from "./utils/emptyCV";
import { v4 as uuid } from "uuid";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = JSON.parse(localStorage.getItem("state")) || {
            cv: emptyCV,
            mode: {
                preview: false,
            },
        };
    }

    // Add dummy image, because we are not storing image in localstorage
    componentDidMount() {
        this.setState((prevState) => {
            return {
                cv: {
                    ...prevState.cv,
                    personalia: {
                        ...prevState.cv.personalia,
                        photo: emptyCV.personalia.photo,
                    },
                },
            };
        });
    }

    componentDidUpdate() {
        localStorage.setItem("state", JSON.stringify(this.state));
    }

    togglePreview = () => {
        this.sortExperienceAndEducation();
        this.setState((prevState) => {
            return {
                mode: {
                    preview: !prevState.mode.preview,
                },
            };
        });
    };

    changePersonalia = (e) => {
        if (e.target.type === "file") {
            const file = e.target.files[0];
            const filePath = URL.createObjectURL(file);
            this.setState((prevState) => {
                return {
                    cv: {
                        ...prevState.cv,
                        personalia: {
                            ...prevState.cv.personalia,
                            photo: filePath,
                        },
                    },
                };
            });
            return;
        }
        this.setState((prevState) => {
            return {
                cv: {
                    ...prevState.cv,
                    personalia: {
                        ...prevState.cv.personalia,
                        [e.target.name]: e.target.value,
                    },
                },
            };
        });
    };

    changeExperience = (e, id) => {
        this.setState((prevState) => {
            let newExperience;
            const exceptions = ["fromMonth", "fromYear", "toMonth", "toYear"];
            if (exceptions.includes(e.target.name)) {
                newExperience = prevState.cv.experience.map((experience) => {
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
                newExperience = prevState.cv.experience.map((experience) => {
                    if (experience.id === id) {
                        experience = {
                            ...experience,
                            [e.target.name]: e.target.checked,
                        };
                    }
                    return experience;
                });
            } else {
                newExperience = prevState.cv.experience.map((experience) => {
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
                cv: {
                    ...prevState.cv,
                    experience: newExperience,
                },
            };
        });
    };

    addExperience = (e) => {
        e.preventDefault();
        const thisYear = new Date().getFullYear();

        this.setState((prevState) => {
            return {
                cv: {
                    ...prevState.cv,
                    experience: [
                        ...prevState.cv.experience,
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
                },
            };
        });
    };

    removeExperience = (e, id) => {
        this.setState((prevState) => {
            const newExperience = prevState.cv.experience.filter(
                (experience) => {
                    return experience.id !== id;
                }
            );
            return {
                cv: {
                    ...prevState.cv,
                    experience: newExperience,
                },
            };
        });
    };

    changeEducation = (e, id) => {
        this.setState((prevState) => {
            let newEducation;
            const exceptions = ["fromMonth", "fromYear", "toMonth", "toYear"];
            if (exceptions.includes(e.target.name)) {
                newEducation = prevState.cv.education.map((education) => {
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
                newEducation = prevState.cv.education.map((education) => {
                    if (education.id === id) {
                        education = {
                            ...education,
                            [e.target.name]: e.target.checked,
                        };
                    }
                    return education;
                });
            } else {
                newEducation = prevState.cv.education.map((education) => {
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
                cv: {
                    ...prevState.cv,
                    education: newEducation,
                },
            };
        });
    };

    addEducation = (e) => {
        e.preventDefault();
        const thisYear = new Date().getFullYear();

        this.setState((prevState) => {
            return {
                cv: {
                    ...prevState.cv,
                    education: [
                        ...prevState.cv.education,
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
                },
            };
        });
    };

    removeEducation = (e, id) => {
        this.setState((prevState) => {
            const newEducation = prevState.cv.education.filter((education) => {
                return education.id !== id;
            });
            return {
                cv: {
                    ...prevState.cv,
                    education: newEducation,
                },
            };
        });
    };

    sortExperienceAndEducation() {
        this.setState((prevState) => {
            const sortedExperience = prevState.cv.experience.sort(
                (current, last) => {
                    return +last.from.year - +current.from.year;
                }
            );
            const sortedEducation = prevState.cv.education.sort(
                (current, last) => {
                    return +last.from.year - +current.from.year;
                }
            );
            return {
                cv: {
                    ...prevState.cv,
                    experience: sortedExperience,
                    education: sortedEducation,
                },
            };
        });
    }

    clearCV = () => {
        this.setState({ cv: emptyCV });
    };

    render() {
        const { cv, mode } = this.state;
        return (
            <div className="cv">
                <form>
                    <Personalia
                        personalia={cv.personalia}
                        mode={mode}
                        onChange={this.changePersonalia}
                    />
                    <Experiences
                        experience={cv.experience}
                        onChange={this.changeExperience}
                        onAdd={this.addExperience}
                        onRemove={this.removeExperience}
                        mode={mode}
                    />
                    <Education
                        education={cv.education}
                        mode={mode}
                        onChange={this.changeEducation}
                        onAdd={this.addEducation}
                        onRemove={this.removeEducation}
                    />
                </form>
                <button className={mode.preview ? "edit" : ""} type="submit" onClick={this.togglePreview}>
                    {mode.preview ? "Edit" : "Preview"}
                </button>
                {mode.preview ? null : (
                    <button className="clear-cv" onClick={this.clearCV}>
                        Reset
                    </button>
                )}
            </div>
        );
    }
}

export default App;
