import React from "react";
import './App.css';
import Header from "./components/Header";
import Week from "./components/Week";
import axios from "axios";

const key = "837705b1ff42a8546e87dcecda4b48e5";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: {},
      precipitation: {
        "50d": <svg
            data-v-3e6e9f12=""
            width="50px"
            height="50px"
            viewBox="0 0 148 148"
            className="owm-weather-icon"
        >
          <path d="M86.077 62.383h-45.29a1.879 1.879 0 01-1.878-1.881c0-1.039.84-1.88 1.878-1.88h45.29a1.88 1.88 0 110 3.76M81.477 53.014H58.83a1.878 1.878 0 01-1.879-1.88c0-1.04.839-1.88 1.879-1.88h22.646a1.88 1.88 0 110 3.76M111.825 71.75H57.1a1.88 1.88 0 110-3.76h54.724a1.881 1.881 0 110 3.76M90.9 98.747H57.098a1.882 1.882 0 010-3.761h33.8a1.88 1.88 0 110 3.76M90.9 80.748H36.172a1.877 1.877 0 01-1.879-1.88c0-1.04.837-1.882 1.88-1.882h54.725a1.881 1.881 0 110 3.762M103.06 89.748H48.336a1.88 1.88 0 110-3.761h54.724a1.88 1.88 0 110 3.76"
                fill="#3b3c40"
          ></path>
        </svg>
      },
      weekData: [], // Add an array to store week forecast data
    };
  }

  componentDidMount() {
    // Fetch weather data for the user's current location when the component mounts
    this.fetchWeatherData();
  }

  // Function to fetch weather data based on the user's current location
  fetchWeatherData = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${key}`;
      const weekApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${key}`;

      axios.all([axios.get(apiUrl), axios.get(weekApiUrl)])
          .then(axios.spread((weatherRes, weekRes) => {
            this.setState({
              weather: weatherRes.data,
              weekData: this.parseWeekData(weekRes.data.list),
            });
          }))
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
    });
  };

  // Function to parse week data
  parseWeekData(data) {
    const filteredData = data.filter((item, index, array) => {
      return array.findIndex((entry) => this.isSameDay(entry.dt_txt, item.dt_txt)) === index;
    });

    return filteredData.map((item) => ({
      day: item.dt_txt,
      temp: item.main.temp,
      precipitation: item.weather[0].main,
    }));
  }

  // Function to check if two date strings represent the same day
  isSameDay(dateString1, dateString2) {
    const date1 = new Date(dateString1);
    const date2 = new Date(dateString2);
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
  }

  // Function to update weather data based on user input (city change)
  handleCityChange = (newCity) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=${key}`;
    const weekApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${newCity}&appid=${key}`;

    axios.all([axios.get(apiUrl), axios.get(weekApiUrl)])
        .then(axios.spread((weatherRes, weekRes) => {
          this.setState({
            weather: weatherRes.data,
            weekData: this.parseWeekData(weekRes.data.list),
          });
        }))
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
  };

  render() {
    return (
        <div className="base">
          <Header place={this.state.weather.name} onCityChange={this.handleCityChange} />
          <main>
            <Week
                weekData={this.state.weekData}
                currentDay={this.state.weather}
            />
          </main>
        </div>
    );
  }
}

export default App;
