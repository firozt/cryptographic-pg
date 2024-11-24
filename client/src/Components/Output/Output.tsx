import { Textarea } from '@rewind-ui/core'
import React from 'react'

type Props = {
	ciphertext: string
}

const Output = ({ciphertext}: Props) => {
  return (
    <div className='container'>
			<h2 className="text-xl m-1 text-center">Result</h2>
			<Textarea disabled style={{resize:'none'}} value={ciphertext}/>
		</div>
  )
}

export default Output