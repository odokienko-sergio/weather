// Current.js
import React from "react";
import cloudsImage from "../assets/img/clouds.png"; // Import the image

class Current extends React.Component {
    render() {
        return (
            <div className="current">
                <p className={"degrees"}>{this.props.temp}</p>
                <p className={"current-text"}>{this.props.precipitation}</p>
                {/* Add the image */}
                <img className={"current-img"} src={cloudsImage} alt="Clouds" />
            </div>
        );
    }
}

export default Current;