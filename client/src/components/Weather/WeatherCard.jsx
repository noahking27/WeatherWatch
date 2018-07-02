import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import classnames from 'classnames'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import red from '@material-ui/core/colors/red'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Skycons from 'react-skycons'


const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
  input: {
    width: '20em',
  },
  icon: {
    width: '5em',
  },
  heroImg: {
    width: '100%',
    height: '28em',
  },
  card: {
    maxWidth: 300,
    margin: '4em',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
})

class WeatherCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      response: [],
      expanded: false,
    }
  }

  componentDidMount() {
    this.callApi()
      .then((res) => {
        this.setState({ response: [res] })
        console.log(res.currently.icon)
      },
      )
      .catch(err => console.log(err))
  }

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded })
  }

  callApi = async () => {
    const { latitude, longitude } = this.props

    const response = await fetch(`/weatherdata?latitude=${latitude}&longitude=${longitude}`)
    const body = await response.json()

    if (response.status !== 200) throw Error(body.message)

    return body
  }

  generateWeatherCard = () => {
    const { response } = this.state
    const { classes } = this.props

    const weatherCard = response.map((res, index) => {
        console.log('RES MAP')
        console.log(res)
        console.log('INDEX ', index)
        return (
          <Card key={index} className={classes.card}>
            <CardHeader
              avatar={
                <Skycons
                  color="white"
                  icon={res.currently.icon.toUpperCase()}
                  autoplay
                  style={{ width: '5em' }}
                />
              }
              action={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
              title="City Name"
              subheader="Date: September 14, 2016"
            />
            <CardMedia
              className={classes.media}
              image="http://www.noaa.gov/sites/default/files/styles/scale_crop_1440x597/public/thumbnails/image/weather1_0.jpg?itok=5th0HCuN"
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography component="p">
                Summary: {res.currently.summary}, Temperature: {res.currently.temperature} <span>&#8457;</span>
              </Typography>
            </CardContent>
            <CardActions className={classes.actions} disableActionSpacing>
              <IconButton aria-label="Add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="Share">
                <ShareIcon />
              </IconButton>
              <IconButton
                className={classnames(classes.expand, {
                  [classes.expandOpen]: this.state.expanded,
                })}
                onClick={this.handleExpandClick}
                aria-expanded={this.state.expanded}
                aria-label="Show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph variant="body2">
                  Method:
                </Typography>
                <Typography paragraph>
                  More weather data
                </Typography>
                <Typography paragraph>
                  Even more weather data
                </Typography>
                <Typography paragraph>
                  Even more more weather data
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
      )
    })
    return weatherCard
  }

render() {
  const { response } = this.state
  console.log('props')
  console.log(this.props)
  console.log('state')
  console.log(this.state)
    return (
      this.generateWeatherCard()
    )
  }
}

WeatherCard.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(WeatherCard)
