import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'
import DogPicture from '../components/DogPicture'
import Button from 'material-ui/Button'
import Radio, { RadioGroup } from 'material-ui/Radio'
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form'
import Stepper, { Step, StepLabel } from 'material-ui/Stepper'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'

export default class Survey extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      spirit: '',
      score: 7,
      breed: '',
      activeStep: 0,
      breakfast: false,
      breakfastAnswer: '',
      breakfastChoice: '',
      isTurkey: '',
      visited: ''
    }
  }

  updateSpirit = (event, value) => this.setState({ spirit: value, score: this.state.score - 1 })

  updateVisited = (event, value) => this.setState({ visited: value })

  updateBreakfastChoice = (event, value) => this.setState({ breakfastChoice: value })

  updateIsTurkey = (event, value) => this.setState({ isTurkey: value })

  updateBreed = breed => this.setState({ breed })

  updateBreakfast = (event, value) => {
    if (value === 'yes') {
      this.setState({ breakfast: true })
    }
    this.setState({ breakfastAnswer: value })
  }

  updateName = name => this.setState({ name })

  updateScore = () => this.setState({ score: this.state.score - 1 })

  handleNext = () => this.setState({ activeStep: this.state.activeStep + 1 })

  handleBack = () => this.setState({ activeStep: this.state.activeStep - 1 })

  handleReset = () => this.setState({ activeStep: 0 })

  handleChoice = () => {
    if (this.state.breakfastChoice === 'bacon') {
      return (
        <div style={styles.question}>
          <FormLabel component="legend">Do you eat turkey bacon?</FormLabel>
          <RadioGroup name="eatWaffles" value={this.state.isTurkey} onChange={this.updateIsTurkey}>
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </div>
      )
    } else if (this.state.breakfastChoice === 'waffles') {
      return (
        <div style={styles.question}>
          <FormLabel component="legend">How much whip cream would you like with that?</FormLabel>
          <RadioGroup name="eatWaffles" value={this.state.isTurkey} onChange={this.updateIsTurkey}>
            <FormControlLabel value="all" control={<Radio />} label="All of it" />
            <FormControlLabel value="none" control={<Radio />} label="None" />
            <FormControlLabel value="enough" control={<Radio />} label="There is never enough whip cream" />
          </RadioGroup>
        </div>
      )
    } else {
      return null
    }
  }

  getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <FormControl component="fieldset">
            <TextField fullWidth id="name" label="What is your name?" onChange={this.updateName} margin="normal" />
            <div>
              <FormLabel component="legend">Are you a dog or a cat?</FormLabel>
              <RadioGroup name="spirit" value={this.state.spirit} onChange={this.updateSpirit}>
                <FormControlLabel value="cat" control={<Radio />} label="Cat" />
                <FormControlLabel value="dog" control={<Radio />} label="Dog" />
              </RadioGroup>
            </div>
            {this.state.spirit === 'dog' ? (
              <DogPicture updateBreed={this.updateBreed} updateScore={this.updateScore} />
            ) : null}
          </FormControl>
        )
      case 1:
        return (
          <FormControl component="fieldset">
            <div style={styles.question}>
              <FormLabel component="legend">Do you think breakfast food should be served for every meal?</FormLabel>
              <RadioGroup name="breakfast" value={this.state.breakfastAnswer} onChange={this.updateBreakfast}>
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </div>
            <div style={styles.question}>
              <FormLabel component="legend">Have you visited JJ's diner?</FormLabel>
              <RadioGroup name="eatWaffles" value={this.state.visited} onChange={this.updateVisited}>
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </div>
            {this.state.breakfast ? (
              <div style={styles.question}>
                <FormLabel component="legend">What would you rather eat: bacon, pancakes or waffles?</FormLabel>
                <RadioGroup name="eatWaffles" value={this.state.breakfastChoice} onChange={this.updateBreakfastChoice}>
                  <FormControlLabel value="waffles" control={<Radio />} label="Waffles" />
                  <FormControlLabel value="pancakes" control={<Radio />} label="Pancakes" />
                  <FormControlLabel value="bacon" control={<Radio />} label="Bacon" />
                </RadioGroup>
              </div>
            ) : null}
            {this.handleChoice()}
          </FormControl>
        )
      case 2:
        return (
          <div>
            <Typography>Hi, {this.state.name}!</Typography>
            <Typography>Your spirit animal is a {this.state.spirit}.</Typography>
            {this.state.breed.length > 0 ? <Typography>Your dog breed is {this.state.breed}.</Typography> : null}
            {this.state.breakfast ? <Typography>You would like eating breakfast for every meal.</Typography> : null}
            {this.state.visited === 'yes' ? <Typography>You have visited JJ's.</Typography> : <Typography>You should really go to JJ's.</Typography>}
            {this.state.breakfastChoice.length > 0 ? <Typography>You enjoy {this.state.breakfastChoice}.</Typography> : null}
          </div>
        )
      default:
        return 'Thanks for submitting the survey, we will be in touch.'
    }
  }

  render() {
    const steps = ['Assign your spirit animal', 'Food preferences', 'Review']
    return (
      <div style={styles.wrapper}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper style={styles.paper}>
              {this.state.activeStep === steps.length ? (
                <Button onClick={this.handleReset}>Reset</Button>
              ) : (
                <div>
                  <div>
                    <Button disabled={this.state.activeStep === 0} onClick={this.handleBack}>
                      Back
                    </Button>
                    <Button raised color="primary" onClick={this.handleNext}>
                      {this.state.activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                    </Button>
                  </div>
                </div>
              )}
              <Stepper activeStep={this.state.activeStep}>
                {steps.map(label => {
                  return (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  )
                })}
              </Stepper>
              {this.getStepContent(this.state.activeStep)}
              <div />
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
  },
  question: {
    display: 'table',
    margin: 8
  }
}
