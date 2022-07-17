import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import React, { useState } from 'react'
import { Purchase } from '../App'

type Props = {
  setPurchase: any
  purchase: Purchase
}

function Discount(props: Props) {
  const [discount, setDiscount] = useState<number>()

  const handleSubmit = (e: any) => {
    e.preventDefault();

    props.setPurchase({ ...props.purchase, discount: discount })
  }

  return <div className='member-search'>
    <form onSubmit={handleSubmit}>
      <TextField size="small" type="number" id="discount" name="discount" value={discount}
        onChange={e => setDiscount(Number(e.target.value))}
      />
      <Button variant="outlined" type="submit">speichern</Button>
    </form>
  </div>
}
export default Discount
