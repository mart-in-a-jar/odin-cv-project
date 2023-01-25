import { Component } from "react";

class Personalia extends Component {
    render() {
        const { mode, personalia, onChange } = this.props;

        return (
            <section className="personalia">
                <h2>Personal info</h2>
                <div className="inputs">
                    <div className="text-inputs">
                        <FirstName
                            mode={mode}
                            value={personalia.firstName}
                            onChange={onChange}
                        />
                        <LastName
                            mode={mode}
                            value={personalia.lastName}
                            onChange={onChange}
                        />
                        <Email
                            mode={mode}
                            value={personalia.email}
                            onChange={onChange}
                        />
                        <PhoneNumber
                            mode={mode}
                            value={personalia.phone}
                            onChange={onChange}
                        />
                    </div>
                    <PhotoInput
                        mode={mode}
                        onChange={onChange}
                        value={personalia.photo}
                    />
                </div>
            </section>
        );
    }
}

export default Personalia;

const componentGenerator = (type, id, label) => {
    const Component = (props) => {
        const { mode, value, onChange } = props;

        let element = (
            <input
                type={type}
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                required
            />
        );

        if (mode.preview) {
            element = <div className="preview" id={id}>{value}</div>;
        }

        return (
            <div className={id}>
                <label htmlFor={id}>{label}</label>
                {element}
            </div>
        );
    };

    return Component;
};

class PhotoInput extends Component {
    render() {
        const { mode, value, onChange } = this.props;
        return (
            <div className="photo">
                <label htmlFor="photo-input">
                    <img className="userPhoto" src={value} alt="userphoto" />
                    {mode.preview ? null : (
                        <figcaption>Upload photo</figcaption>
                    )}
                </label>
                <input
                    type="file"
                    name="photo"
                    id="photo-input"
                    accept="image/*"
                    onChange={onChange}
                />
            </div>
        );
    }
}

const FirstName = componentGenerator("text", "firstName", "First name");
const LastName = componentGenerator("text", "lastName", "Last name");
const Email = componentGenerator("email", "email", "E-mail");
const PhoneNumber = componentGenerator("tel", "phone", "Phone number");
