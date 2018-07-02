import React from 'react'
import { geolocated } from 'react-geolocated'
import WeatherCard from './WeatherCard.jsx'


class GeoLocator extends React.Component {
  render() {
    return !this.props.isGeolocationAvailable
      ? <div>Your browser does not support Geolocation</div>
      : !this.props.isGeolocationEnabled
        ? <div>Geolocation is not enabled</div>
        : this.props.coords
          ?
          <div>
            <WeatherCard
              latitude={this.props.coords.latitude}
              longitude={this.props.coords.longitude}
              />
          </div>
          : <h1>Accessing current location</h1>
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(GeoLocator)
