import { Component } from "react";
import Durations from "./DatePickers";

class Experiences extends Component {
    render() {
        const { experience, onChange, onAdd, onRemove, mode } = this.props;

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
                            mode={mode}
                        />
                    );
                })}
                {mode.preview ? null : (
                    <button className="add-experience" onClick={onAdd}>
                        Add
                    </button>
                )}
            </section>
        );
    }
}

export default Experiences;

class Experience extends Component {
    render() {
        const { experience, onChange, onRemove, mode } = this.props;
        return (
            <div className="inputs experience">
                <Durations
                    experience={experience}
                    onChange={onChange}
                    mode={mode}
                />
                {/* create components for these */}
                {/* <label htmlFor="">Role</label>
                <input type="text" />
                <label htmlFor="">Company</label>
                <input type="text" />
                <label htmlFor="">Description</label>
                <textarea name="" id="" cols="30" rows="4"></textarea> */}
                {mode.preview ? null : (
                    <span
                        className="delete"
                        onClick={(e) => {
                            onRemove(e, experience.id);
                        }}
                    >
                        &times;
                    </span>
                )}
            </div>
        );
    }
}
