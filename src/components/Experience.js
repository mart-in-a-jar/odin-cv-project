import { Component } from "react";
import { Month, Year } from "./DatePickers";

class Experiences extends Component {
    render() {
        const { experience, onChange, onAdd, onRemove } = this.props;

        return (
            // Map all experiences
            <section className="experiences">
                <h2>Experience</h2>
                {experience.map((experience) => {
                    return (
                        <Experience
                            key={experience.id}
                            experience={experience}
                            onChange={onChange}
                            onRemove={onRemove}
                        />
                    );
                })}
                <button className="add-experience" onClick={onAdd}>
                    Add
                </button>
            </section>
        );
    }
}

export default Experiences;

class Experience extends Component {
    render() {
        const { experience, onChange, onRemove } = this.props;
        return (
            <div className="inputs experience">
                <div className="text-inputs">
                    From
                    <Month
                        id={`from-month-experience-${experience.id}`}
                        name="fromMonth"
                        label="Month"
                        value={experience.from.month}
                        onChange={(e) => {
                            onChange(e, experience.id);
                        }}
                    />
                    <Year
                        id={`from-year-experience-${experience.id}`}
                        name="fromYear"
                        label="Year"
                        value={experience.from.year}
                        onChange={(e) => {
                            onChange(e, experience.id);
                        }}
                    />
                </div>
                <span
                    className="delete"
                    onClick={(e) => {
                        onRemove(e, experience.id);
                    }}
                >
                    &times;
                </span>
            </div>
        );
    }
}
