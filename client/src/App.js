import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import './App.css'
import Header from './components/Header'
import WeatherCard from './components/Weather/WeatherCard'
import Footer from './components/Footer'
import Main from './components/Weather/Main'

const theme = createMuiTheme({
  palette: {
    type: 'dark', // Switching the dark mode on is a single property value change.
  },
})

class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <Header />
          <Main />
          <WeatherCard />
          <Footer />
        </MuiThemeProvider>
      </div>
    )
  }
}

export default App
