import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import weatherwatch from '../../assets/weatherwatch.jpg'
import GeoLocator from './GeoLocator'

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
  input: {
    width: '20em',
  },
  heroImg: {
    width: '100%',
    height: '28em',
  },
})

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <img
          alt="hero"
          className={classes.heroImg}
          src={`${weatherwatch}`}
        />
        <GeoLocator />
      </div>
    )
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Main)
