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
            const newExperience = prevState.cv.experience.map((experience) => {
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
                            fromMonth: 1,
                            fromYear: thisYear,
                            toMonth: 1,
                            toYear: thisYear,
                            role: "",
                            company: "",
                            description: "",
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

    sortExperienceAndEducation() {
        this.setState((prevState) => {
            const sortedExperience = prevState.cv.experience.sort(
                (current, last) => {
                    return +current.from > +last.from;
                }
            );
            const sortedEducation = prevState.cv.education.sort(
                (current, last) => {
                    return +current.from > +last.from;
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
                    />
                    <Education />
                </form>
                <button
                    onClick={() => {
                        console.log(this.state.cv);
                    }}
                >
                    PRINT
                </button>
                <button type="submit" onClick={this.togglePreview}>
                    {mode.preview ? "Edit" : "Preview"}
                </button>
                <button className="clear-cv" onClick={this.clearCV}>
                    Reset
                </button>
            </div>
        );
    }
}

export default App;
