import { Component } from "react";
import Durations from "./DatePickers";

class Education extends Component {
    render() {
        const { education, mode, onChange, onAdd, onRemove } = this.props;
        return (
            <section className="education">
                <h2>Education</h2>
                {/* {education.map((education) => {
                    return (
                        <EducationElement
                            key={education.id}
                            education={education}
                        />
                    );
                })} */}
                {mode.preview ? null : (
                    <button className="add-experience" onClick={onAdd}>
                        Add
                    </button>
                )}
            </section>
        );
    }
}

export default Education;

class EducationElement extends Component {
    render() {
        const { education } = this.props;
        return <Durations experience={education} />;
    }
}
