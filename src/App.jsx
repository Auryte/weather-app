import React, { Component } from 'react';
import './App.css';
import DayCard from './components/DayCard';
import { getDailyWeatherByCityCountry } from './api';
import SearchBar from './components/SearchBar';
import Error from './components/Error';

export class App extends Component {
  state = {
    days: [],
    city: '',
    country: '',
    errorMsg: null,
    cityHeader: '',
    countryHeader: ''
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
  
  handleSubmit = (e) => {
    e.preventDefault();
    getDailyWeatherByCityCountry(
      {
        city: this.state.city,
        country: this.state.country
      },
      (dailyWeather) => this.setState({ days: dailyWeather }),
      this.showError
    )
    this.setState({
      errMsg: null,
      cityHeader: "Weather in " + this.state.city.charAt(0).toUpperCase() + this.state.city.slice(1),
      countryHeader:",  " + this.state.country.charAt(0).toUpperCase() + this.state.country.slice(1),
      city: '',
      country: '',
    })
  }

  showError = (error) => {
    this.setState({
      errMsg: error.message,
      city: '',
      country: '',
      days: [],
      cityHeader: '',
      countryHeader: ''
    });
  }

  componentDidMount() {
    this.getWeatherDays()
  }

  render() {
    const weatherCards = this.state.days.map((day) => <DayCard data={day} key={day.sunrise} />)
   
    return (

      <div className="AppBackground">

        <h1 className="AppHeader">WEATHER FORECAST </h1>
        <div className="locationHeaderContainer">
          <h3 className="locationHeader">{this.state.cityHeader} {this.state.countryHeader}</h3>
        </div>
        <div className="SearchContainer">
          <form onSubmit={this.handleSubmit} className="styles.SearchForm">

            <SearchBar
              placeholder=" Enter City "
              type="text"
              Name="city"
              setValue={value => this.setState({ city: value })}
              value={this.state.city}
            />
            <SearchBar
              placeholder="Enter Country"
              type="text"
              Name="country"
              setValue={value => this.setState({ country: value })}
              value={this.state.country}
            />
            <button className="SearchButton">Search</button>

          </form>
        </div>
        {
          this.state.errMsg
            ? <div >
              <Error />
            </div>
            : null
        }

        <div className="AppGrid">
          {weatherCards}
        </div>

      </div>
    );
  }
}

export default App;
