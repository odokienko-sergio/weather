// src/components/Header.js
import React from "react";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newCity: "", // State to store the user-input city
        };
    }

    // Handler for input field change
    handleInputChange = (event) => {
        this.setState({ newCity: event.target.value });
    };

    // Handler for form submission
    handleSubmit = (event) => {
        event.preventDefault();
        // Pass the new city to the parent component (App.js) for weather update
        this.props.onCityChange(this.state.newCity);
    };

    // Handler for clearing the input
    handleClearInput = () => {
        this.setState({ newCity: "" });
    };

    render() {
        return (
            <header className="header">
                <h3 className={"header-title"}>foxmind<span>ed</span></h3>
                {/* Form for user input */}
                <form onSubmit={this.handleSubmit}>
                    <input
                        className={"input-text"}
                        type="text"
                        value={this.state.newCity}
                        onChange={this.handleInputChange}
                    />
                    
                    {/* Button to clear the input */}
                    {this.state.newCity && (
                        <button type="button" onClick={this.handleClearInput}>
                            Clear
                        </button>
                    )}
                </form>
                <p className={"header-text"}>Selected: {this.props.place}</p>
            </header>
        );
    }
}

export default Header;
