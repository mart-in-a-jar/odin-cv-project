import { Component } from "react";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Personalia from "./components/Personalia";
import "./styles/App.css";
import avatar from "./img/avatar.png";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cv: {
                personalia: {
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    photo: avatar,
                },
                experience: [
                    {
                        from: "",
                        to: "",
                        role: "",
                        company: "",
                        description: "",
                    },
                ],
                education: [
                    {
                        from: "",
                        to: "",
                        degree: "",
                        school: "",
                    },
                ],
            },
            mode: {
                preview: false,
            },
        };
    }

    togglePreview = () => {
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
                    <Experience />
                    <Education />
                </form>
                <button
                    onClick={() => {
                        console.log(this.state.cv);
                    }}
                >
                    DEMO
                </button>
                <button type="submit" onClick={this.togglePreview}>
                    {mode.preview ? "Edit" : "Preview"}
                </button>
            </div>
        );
    }
}

export default App;
