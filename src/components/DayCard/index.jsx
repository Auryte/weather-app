import React, { Component } from 'react';
import styles from './styles.module.css';

export default class DayCard extends Component {

    render() {
        const { temp, cloudPercentage, weekDay, sunrise, sunset, windDeg, windSpeed } = this.props.data;

        //   const iconUrl = `https://openweathermap.org/img/w/${icon}.png`;
        return (

            <div className={styles.Card}>
                <h2>{weekDay}</h2>
                <h1 className={styles.Temp}>{Math.round(temp)} °C</h1>
                <span className={styles.Icon}>
                    {cloudPercentage <= 15 &&
                        //    <div className={styles.Sun}> </div>
                        <i className="fas fa-sun" ></i>
                        // <img src="../../utils/images/sun.png" alt="img" />
                    }
                    {cloudPercentage <= 65 && cloudPercentage > 15 &&
                        <i className="fas fa-cloud-sun"></i>
                    }
                    {cloudPercentage > 65 &&
                        <i className="fas fa-cloud"></i>
                    }
                </span>
                {/* <WeatherIcon src={iconUrl} /> */}
                <div className={styles.SunMotionDiv}>
                    <h4 className={styles.SunRiseSet}>Sunrise: {sunrise}</h4>
                    <h4 className={styles.SunRiseSet}>Sunset: {sunset} </h4>
                </div>
                <h4>Wind Degree</h4>
                <span className={styles.Arrow45}>
                    {windDeg < 90 &&
                        <i className="fas fa-long-arrow-alt-up"></i>
                    }
                </span>
                <span className={styles.Arrow135}>
                    {windDeg >= 90 && windDeg < 180 &&
                        <i className="fas fa-long-arrow-alt-up"></i>
                    }
                </span>
                <span className={styles.Arrow225}>
                    {windDeg >= 180 && windDeg < 270 &&
                        <i className="fas fa-long-arrow-alt-up" ></i>
                    }
                </span>
                <span className={styles.Arrow315}>
                    {windDeg > 270 &&
                        <i className="fas fa-long-arrow-alt-up" ></i>
                    }
                </span>
                <h4>Wind Speed: {windSpeed} m/s</h4>
            </div>
        )
    }
}
