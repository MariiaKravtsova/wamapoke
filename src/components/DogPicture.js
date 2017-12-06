import React, { Component } from 'react'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'

export default class DogPicture extends Component {
  constructor(props) {
    super(props)

    this.state = {
      imageUrl: '',
      breed: ''
    }
  }

  getImageUrl = () => {
    fetch(`https://dog.ceo/api/breed/${this.state.breed}/images/random`)
    .then(response => response.json())
    .then(data => this.setState({ imageUrl: data.message }))
    this.props.updateBreed(this.state.breed)
    this.props.updateScore()
  }

  handleChange = event => {
    this.setState({ breed: event.target.value })
  }

  render() {
    return (
      <div>
        <TextField fullWidth id="breed" label="What breed do you think you are?" onChange={this.handleChange} margin="normal" />
        <Button onClick={this.getImageUrl} raised color="primary">
          Show This Breed
        </Button>
        <div style={styles.wrapper}>
          {this.state.breed.length > 0 ? <img alt='' src={this.state.imageUrl} /> : null}
        </div>
      </div>
    )
  }
}

const styles = {
  wrapper: {
    margin: 8
  }
}
