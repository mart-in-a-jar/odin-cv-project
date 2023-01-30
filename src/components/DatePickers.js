import { Component } from "react";

class Durations extends Component {
    render() {
        const { experience, onChange, mode, type, presentOption } = this.props;
        let to = (
            <div className="to">
                {mode.preview ? null : <div className="label">To</div>}
                <div className="inner">
                    <div className="inner-inner">
                        <Month
                            id={`to-month-${type}-${experience.id}`}
                            name="toMonth"
                            label="Month"
                            value={experience.to.month}
                            onChange={(e) => {
                                onChange(e, experience.id);
                            }}
                            disabled={experience.currentPosition}
                            mode={mode}
                        />
                        <Year
                            id={`to-year-${type}-${experience.id}`}
                            name="toYear"
                            label="Year"
                            value={experience.to.year}
                            onChange={(e) => {
                                onChange(e, experience.id);
                            }}
                            disabled={experience.currentPosition}
                            mode={mode}
                        />
                    </div>
                    {presentOption ? (
                        mode.preview ? null : (
                            <CurrentPositionToggle
                                id={experience.id}
                                currentPos={experience.currentPosition}
                                onChange={onChange}
                            />
                        )
                    ) : null}
                </div>
            </div>
        );
        if (experience.currentPosition && mode.preview) {
            to = (
                <div className="to">
                    <p className="present">present</p>
                </div>
            );
        }
        return (
            <div className={mode.preview ? "durations preview" : "durations"}>
                <div className="from">
                    {mode.preview ? "" : <div className="label">From</div>}
                    <Month
                        id={`from-month-${type}-${experience.id}`}
                        name="fromMonth"
                        label="Month"
                        value={experience.from.month}
                        onChange={(e) => {
                            onChange(e, experience.id);
                        }}
                        mode={mode}
                    />
                    <Year
                        id={`from-year-${type}-${experience.id}`}
                        name="fromYear"
                        label="Year"
                        value={experience.from.year}
                        onChange={(e) => {
                            onChange(e, experience.id);
                        }}
                        mode={mode}
                    />
                </div>
                {mode.preview ? <p>-</p> : ""}
                {to}
            </div>
        );
    }
}

class Month extends Component {
    render() {
        const { id, name, mode, label, value, onChange, disabled } = this.props;
        const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        let element;
        if (mode.preview) {
            let month = new Intl.DateTimeFormat("en-uS", {
                month: "long",
            }).format(new Date(null, value - 1));
            element = (
                <div className={name + " month"}>
                    <p>{month}</p>
                </div>
            );
        } else {
            element = (
                <div className={name + " month"}>
                    <label htmlFor={id}>{label}</label>
                    <select
                        className={name + " month"}
                        name={name}
                        id={id}
                        defaultValue={value}
                        onChange={onChange}
                        data-type="number"
                        disabled={disabled}
                    >
                        {months.map((month) => {
                            return (
                                <option key={month} value={month}>
                                    {month}
                                </option>
                            );
                        })}
                    </select>
                </div>
            );
        }
        return element;
    }
}

class Year extends Component {
    render() {
        const { id, name, mode, label, value, onChange, disabled } = this.props;
        const thisYear = new Date().getFullYear();
        const years = [];
        for (let i = 0; i < 100; i++) {
            years.push(thisYear - i);
        }
        let element;
        if (mode.preview) {
            let year = new Date(value, null).getFullYear();
            element = (
                <div className={name + " year"}>
                    <p>{year}</p>
                </div>
            );
        } else {
            element = (
                <div className={name + " year"}>
                    <label htmlFor={id}>{label}</label>
                    <select
                        className={name + " year"}
                        name={name}
                        id={id}
                        defaultValue={value}
                        onChange={onChange}
                        data-type="number"
                        disabled={disabled}
                    >
                        {years.map((year) => {
                            return (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            );
                        })}
                    </select>
                </div>
            );
        }
        return element;
    }
}

class CurrentPositionToggle extends Component {
    render() {
        const { id, currentPos, onChange } = this.props;
        return (
            <div className="current-pos">
                <input
                    type="checkbox"
                    name="currentPosition"
                    id={`currentPosition-${id}`}
                    checked={currentPos}
                    onChange={(e) => {
                        onChange(e, id);
                    }}
                />
                <label htmlFor={`currentPosition-${id}`}>Still work here</label>
            </div>
        );
    }
}

export default Durations;
