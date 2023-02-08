import Durations from "./DatePickers";
import { useId } from "react";

const Experiences = ({ experience, onChange, onAdd, onRemove, mode }) => {
    return (
        <section className="experiences">
            <h1>Experience</h1>
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
};

export default Experiences;

const Experience = ({ experience, onChange, onRemove, mode }) => {
    return (
        <div className="inputs experience">
            <Durations
                experience={experience}
                onChange={onChange}
                mode={mode}
                type="experience"
                presentJobOption
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
};

const TextInput = ({ value, onChange, mode, name, label, id }) => {
    const elementId = useId();
    return (
        <div className={name}>
            <label htmlFor={elementId}>{label}</label>
            {mode.preview ? (
                <div id={elementId} className="preview">
                    {value}
                </div>
            ) : (
                <input
                    id={elementId}
                    name={name}
                    type="text"
                    value={value}
                    onChange={(e) => {
                        onChange(e, id);
                    }}
                    maxLength={100}
                />
            )}
        </div>
    );
};

const TextArea = ({ value, onChange, mode, name, label, id }) => {
    const elementId = useId();
    return (
        <div className={name}>
            <label htmlFor={elementId}>{label}</label>
            {mode.preview ? (
                <div id={elementId} className="preview">
                    {value}
                </div>
            ) : (
                <textarea
                    name={name}
                    id={elementId}
                    value={value}
                    onChange={(e) => {
                        onChange(e, id);
                    }}
                />
            )}
        </div>
    );
};

export { TextInput };
