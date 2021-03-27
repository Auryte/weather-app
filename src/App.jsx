import React, { Component } from 'react';
import './App.css';
import DayCard from './components/DayCard';
import { getDailyWeatherByCityCountry } from './api';
import SearchBar from './components/SearchBar'

export class App extends Component {
  state = {
    days: [],
    city: '',
    country: ''
  }

  getWeatherDays = () => {
    getDailyWeatherByCityCountry(
      {
        city: this.state.city,
        country: this.state.country
      },
      (dailyWeather) => this.setState({ days: dailyWeather }),
      console.error
    )
  }
  //   inputHandler = (event) => {
  //     setGetState(event.target.value);
  //   };

  handleSubmit = (e) => {
    e.preventDefault();
    getDailyWeatherByCityCountry(
      {
        city: this.state.city,
        country: this.state.country
      },
      (dailyWeather) => this.setState({ days: dailyWeather }),
      console.error
    )
    // this.setState({
    //   city: '',
    //   country: '',
    // })
  }
  componentDidMount() {
    this.getWeatherDays()
  }

  
  render() {
    const weatherCards = this.state.days.map((day) => <DayCard data={day} key={day.sunrise} />)
    const { city, country } = this.state;
    return (

      <div className="AppBackground">

        <h1 className="AppHeader">WEATHER FORECAST</h1>
        <h3 className="locationHeader">{city} {country}</h3>

        <div className="SearchContainer">
          <form onSubmit={this.handleSubmit} className="styles.SearchForm">
            <SearchBar
              placeholder="Enter City"
              type="text"
              setValue={value => this.setState({ city: value })}
              value={this.state.city}
            />
            <SearchBar
              placeholder="Enter Country"
              type="text"
              setValue={value => this.setState({ country: value })}
              value={this.state.country}
            />
            <button className="SearchButton">Search</button>
            {/* //onClick={() => handleSubmit(e.target.value)} */}
          </form>
        </div>

        <div className="AppGrid">
          {weatherCards}
        </div>
      </div>
      // </div>
    );
  }
}

export default App;
