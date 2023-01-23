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
                            name={personalia.firstName}
                            onChange={onChange}
                        />
                        <LastName
                            mode={mode}
                            name={personalia.lastName}
                            onChange={onChange}
                        />
                        <input type="text" />
                        <input type="text" />
                    </div>
                    <img className="userPhoto" src="" alt="userphoto" />
                </div>
            </section>
        );
    }
}

export default Personalia;

const FirstName = (props) => {
    const { mode, name, onChange } = props;

    let element = (
        <input
            type="text"
            id="first-name"
            name="firstName"
            value={name}
            onChange={onChange}
            required
        />
    );

    if (mode.preview) {
        element = <div id="first-name">{name}</div>;
    }

    return (
        <div className="first-name">
            <label htmlFor="first-name">First name</label>
            {element}
        </div>
    );
};

const LastName = (props) => {
    const { mode, name, onChange } = props;

    let element = (
        <input
            type="text"
            id="last-name"
            name="lastName"
            value={name}
            onChange={onChange}
        />
    );

    if (mode.preview) {
        element = <div id="last-name">{name}</div>;
    }

    return (
        <div className="last-name">
            <label htmlFor="last-name">Last name</label>
            {element}
        </div>
    );
};