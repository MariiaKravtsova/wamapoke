import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'
import DogPicture from '../components/DogPicture'
import Button from 'material-ui/Button'
import Radio, { RadioGroup } from 'material-ui/Radio'
import { FormLabel, FormControl, FormControlLabel, FormHelperText } from 'material-ui/Form'
import Stepper, { Step, StepLabel } from 'material-ui/Stepper'
import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'

export default class Survey extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      spirit: '',
      score: 7,
      breed: '',
      activeStep: 0
    }
  }

  updateSpirit = (event, value) => this.setState({ spirit: value, score: this.state.score - 1 })

  updateBreed = breed => this.setState({ breed })

  updateName = name => this.setState({ name })

  updateScore = () => this.setState({ score: this.state.score - 1 })

  handleNext = () => this.setState({ activeStep: this.state.activeStep + 1 })

  handleBack = () => this.setState({ activeStep: this.state.activeStep - 1 })

  handleReset = () => this.setState({ activeStep: 0 })

  getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <TextField fullWidth id="name" label="What is your name?" onChange={this.updateName} margin="normal" />          
        )
      case 1:
        return (
          <FormControl component="fieldset" required>
          <FormLabel component="legend">Are you a dog or a cat?</FormLabel>
          <RadioGroup aria-label="spirit" name="spirit" value={this.state.spirit} onChange={this.updateSpirit}>
            <FormControlLabel value="cat" control={<Radio />} label="Cat" />
            <FormControlLabel value="dog" control={<Radio />} label="Dog" />
          </RadioGroup>
          {this.state.spirit === 'dog' ? (
            <DogPicture updateBreed={this.updateBreed} updateScore={this.updateScore} />
          ) : null}
        </FormControl>
        )
      case 2:
        return 'Some questions about food'
      default:
        return 'Thanks for submitting the survey, we will be in touch.'
    }
  }

  render() {
    console.log(this.state.breed)
    const steps = ['General information', 'Assign your spirit animal', 'Food Preference']
    return (
      <div style={styles.wrapper}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper style={styles.paper}>
              {/* <h4>{this.state.score} questions left to answer.</h4> */}
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
                {steps.map((label) => {
                  return (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  )
                })}
              </Stepper>
                {this.getStepContent(this.state.activeStep)}
              <div>
              </div>
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
