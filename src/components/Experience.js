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
                    type="experience"
                    presentOption
                />
                <TextInput
                    name="role"
                    label="Role"
                    value={experience.role}
                    onChange={onChange}
                    mode={mode}
                    id={experience.id}
                />
                <TextInput
                    name="company"
                    label="Company"
                    value={experience.company}
                    onChange={onChange}
                    mode={mode}
                    id={experience.id}
                />
                <TextArea
                    name="description"
                    label="Description"
                    value={experience.description}
                    onChange={onChange}
                    mode={mode}
                    id={experience.id}
                />
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

class TextInput extends Component {
    render() {
        const { value, onChange, mode, name, label } = this.props;
        const id = `${name}-${this.props.id}`;
        return (
            <div className={name}>
                <label htmlFor={id}>{label}</label>
                {mode.preview ? (
                    <div id={id} className="preview">
                        {value}
                    </div>
                ) : (
                    <input
                        id={id}
                        name={name}
                        type="text"
                        value={value}
                        onChange={(e) => {
                            onChange(e, this.props.id);
                        }}
                        maxLength={100}
                    />
                )}
            </div>
        );
    }
}

class TextArea extends Component {
    render() {
        const { value, onChange, mode, name, label } = this.props;
        const id = `${name}-${this.props.id}`;
        return (
            <div className={name}>
                <label htmlFor={id}>{label}</label>
                {mode.preview ? (
                    <div id={id} className="preview">
                        {value}
                    </div>
                ) : (
                    <textarea
                        name={name}
                        id={id}
                        value={value}
                        onChange={(e) => {
                            onChange(e, this.props.id);
                        }}
                    />
                )}
            </div>
        );
    }
}
