import Durations from "./DatePickers";
import { TextInput } from "./Experience";

const Education = ({ education, mode, onChange, onAdd, onRemove }) => {
    return (
        <section className="education">
            <h1>Education</h1>
            {education.map((education) => {
                return (
                    <EducationElement
                        key={education.id}
                        education={education}
                        onChange={onChange}
                        mode={mode}
                        onRemove={onRemove}
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

export default Education;

const EducationElement = ({ education, onChange, mode, onRemove }) => {
    return (
        <div className="inputs education">
            <Durations
                experience={education}
                onChange={onChange}
                mode={mode}
                type="education"
            />
            <TextInput
                name="degree"
                label="Degree"
                value={education.degree}
                onChange={onChange}
                mode={mode}
                id={education.id}
            />
            <TextInput
                name="school"
                label="School"
                value={education.school}
                onChange={onChange}
                mode={mode}
                id={education.id}
            />
            {mode.preview ? null : (
                <span
                    className="delete"
                    onClick={(e) => {
                        onRemove(e, education.id);
                    }}
                >
                    &times;
                </span>
            )}
        </div>
    );
};
