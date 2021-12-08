import React, { useState } from 'react'

import FileUpload2 from './FileUpload2';

const MyComponent = () => {
  const [displayed, setDisplayed] = useState()

  return (
    <div>
      { displayed && <FileUpload2 /> }
      <Button type="button" outline onClick={() => setDisplayed(true)}>
        Upload
      </Button>
    </div>
  )
}

export default MyComponent