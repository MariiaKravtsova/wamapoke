import React from 'react'

const DogPicture = ({url}) => {
  return (
    <div style={styles.wrapper}>
      <img src={url} />
    </div>
  )
}

const styles = {
  wrapper: {
    margin: 8
  }
}

export default DogPicture