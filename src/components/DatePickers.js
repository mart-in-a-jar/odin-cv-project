import { Component } from "react";

class Month extends Component {
    render() {
        const { id, name, mode, label, value, onChange } = this.props;
        const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        return (
            <div className={name + " month"}>
                <label htmlFor={id}>{label}</label>
                <select
                    className={name + " month"}
                    name={name}
                    id={id}
                    defaultValue={value}
                    onChange={onChange}
                    data-type="number"
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
}

class Year extends Component {
    render() {
        const { id, name, mode, label, value, onChange } = this.props;
        const thisYear = new Date().getFullYear();
        const years = [];
        for (let i = 0; i < 100; i++) {
            years.push(thisYear - i);
        }
        if (name.includes("to")) {
            years.unshift("Present");
        }

        return (
            <div className={name + " year"}>
                <label htmlFor={id}>{label}</label>
                <select
                    className={name + " year"}
                    name={name}
                    id={id}
                    defaultValue={value}
                    onChange={onChange}
                    data-type="number"
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
}

export { Month, Year };
