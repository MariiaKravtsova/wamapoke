import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'
import DogPicture from '../components/DogPicture'
import Button from 'material-ui/Button'

export default class Survey extends Component {
  constructor(props) {
    super(props)

    this.state = {
      imageUrl: ''
    }
  }

  getImageUrl = () => {
    fetch('https://dog.ceo/api/breeds/image/random')
      .then(response => response.json())
      .then(data => this.setState({ imageUrl: data.message }))
  }

  componentDidMount() {
    this.getImageUrl()
  }

  render() {
    console.log(this.state.imageUrl)
    return (
      <div style={styles.wrapper}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper style={styles.paper}>
              <Button onClick={this.getImageUrl} raised color="primary">
                Show Another Dog
              </Button>
              <DogPicture url={this.state.imageUrl} />
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

const styles = {
  wrapper: {
    margin: 20
  },
  paper: {
    padding: 16,
    textAlign: 'center'
  }
}
