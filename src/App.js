import { Component } from "react";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Personalia from "./components/Personalia";
import "./styles/App.css";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <>
                <Personalia placeHolder="Personalia" />
                <Experience placeHolder="Experience" />
                <Education placeHolder="Education" />
            </>
        );
    }
}

export default App;
