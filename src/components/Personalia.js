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
                        <input type="text" />
                    </div>
                    <img className="userPhoto" src="" alt="userphoto" />
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
            />
        );

        if (mode.preview) {
            element = <div id={id}>{value}</div>;
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

const Email = componentGenerator("email", "email", "E-mail");
const FirstName = componentGenerator("text", "firstName", "First name")
const LastName = componentGenerator("text", "lastName", "Last name")