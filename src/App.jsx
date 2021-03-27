import React, { Component } from 'react';
import './App.css';
import DayCard from './components/DayCard';
import {getDailyWeatherByCityCountry} from './api';

export class App extends Component {
  state = {
    days: [],
    city: 'Kaunas',
    country: 'Lithuania'
  }

  getWeatherDays = () => {
    getDailyWeatherByCityCountry(
      {
        city: this.state.city,
        country: this.state.country
      },
      (dailyWeather) => this.setState({days: dailyWeather }),
      console.error
    )
  }

  componentDidMount() {
    this.getWeatherDays()
  }

  render() {
    const weatherCards= this.state.days.map((day) => <DayCard data={day} key={day.sunrise} />)
   
    return (
      <div className="AppBackground">
        <h1  className="AppHeader">WEATHER FORECAST</h1>
      <div className="AppGrid">
        {weatherCards}
      </div>
      </div>
    );
  }
}

export default App;
