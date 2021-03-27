import React, { Component } from 'react';
import styles from './styles.module.css';

// import sun from '../../utils/images/sun.png';
// import cloud from '../../utils/images/cloud.png';
// import cloudsun from '../../utils/images/cloudsun.png';

export default class DayCard extends Component {

    render() {
        const { temp, cloudPercentage, weekDay, sunrise, sunset, windDeg, windSpeed } = this.props.data;

        return (
            <div className={styles.Card}>
                <h2>{weekDay}</h2>
                <h1 className={styles.Temp}>{Math.round(temp)} °C</h1>
                <span className={styles.Icon}>
                    {cloudPercentage <= 15 &&
                        <i className="fas fa-sun" ></i>
                        // <img className={styles.Sun} src={sun} alt="" />
                    }
                    {cloudPercentage <= 65 && cloudPercentage > 15 &&
                        <i className="fas fa-cloud-sun"></i>
                        // <img className={styles.CloudSun} src={cloudsun} alt="cloud" />
                    }
                    {cloudPercentage > 65 &&
                        <i className="fas fa-cloud"></i>
                        // <img className={styles.Cloud} src={cloud} alt="cloud" />
                    }
                </span>
                {/* <WeatherIcon src={iconUrl} /> */}
                <div className={styles.SunMotionDiv}>
                    <h4 className={styles.SunRiseSet}>Sunrise: {sunrise}</h4>
                    <h4 className={styles.SunRiseSet}>Sunset: {sunset} </h4>
                </div>
                <h4>Wind Degree</h4>
                {(() => {
                    if (windDeg < 90) {
                        return (
                            <div className={styles.Arrow45}><i className="fas fa-long-arrow-alt-up"></i></div>
                        )
                    } else if (windDeg >= 90 && windDeg < 180) {
                        return (
                            <div className={styles.Arrow135}><i className="fas fa-long-arrow-alt-up"></i></div>
                        )
                    } else if (windDeg >= 180 && windDeg < 270) {
                        return (
                            <div className={styles.Arrow225}><i className="fas fa-long-arrow-alt-up"></i></div>
                        )
                    } else {
                        return (
                            <div className={styles.Arrow315} ><i className="fas fa-long-arrow-alt-up"></i></div>
                        )
                    }
                })()}
                <h4>Wind Speed: {windSpeed} m/s</h4>
            </div>
        )
    }
}
