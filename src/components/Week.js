// src/components/Week.js
import React from "react";
import Current from "./Current"; // Import the Current component
import cloudsImage from "../assets/img/clouds.png";
import cloundlyImage from "../assets/img/cloundly.png";
import lightRainImage from "../assets/img/light-rain.png";
import rainImage from "../assets/img/rain.png";
import snowImage from "../assets/img/snow.png";
import clearImage from "../assets/img/clear.png";

class Week extends React.Component {
    // Define a mapping between weather conditions and image filenames
    weatherImageMap = {
        Clouds: cloudsImage,
        Cloundly: cloundlyImage,
        'Light Rain': lightRainImage,
        Rain: rainImage,
        'Snow': snowImage,
        'Clear': clearImage,
    };

    render() {
        return (
            <div className="week-container">
                {/* Display weather forecast for the full week here */}
                {/* You can use a loop to iterate over the days and display the forecast */}
                {/* Example: */}
                {this.props.weekData.map((day, index) => (
                    <div key={index}
                         className={`day-forecast ${
                             this.isCurrentDay(day.day) ? 'current-day' : ''
                         }`}
                    >
                        {this.isCurrentDay(day.day) ? (
                            <Current
                                temp={Math.round(
                                    this.props.currentDay.main.temp - 273.15
                                ) + '°C'}
                                precipitation={this.props.currentDay.weather[0].main}
                            />
                        ) : (
                            <>
                                <p className={"day-of-the-week"}>{this.formatDay(day.day)}</p>
                                {/* Display the corresponding image based on the weather condition */}
                                <img
                                    src={this.weatherImageMap[day.precipitation]}
                                    alt={day.precipitation}
                                />
                                <p className="day-forecast-text">{day.precipitation}</p>
                                <p className="day-forecast-degrees">
                                    {Math.round(day.temp - 273.15)}°C
                                </p>
                                {/* Add other relevant information */}
                            </>
                        )}
                    </div>
                ))}
            </div>
        );
    }

    // Helper function to format the day
    formatDay(dateTime) {
        const date = new Date(dateTime);
        return date.toLocaleDateString('en-US', { weekday: 'long' });
    }

    // Helper function to check if a given date string is the current day
    isCurrentDay(dateString) {
        const currentDate = new Date();
        const date = new Date(dateString);
        return (
            date.getFullYear() === currentDate.getFullYear() &&
            date.getMonth() === currentDate.getMonth() &&
            date.getDate() === currentDate.getDate()
        );
    }
}

export default Week;
