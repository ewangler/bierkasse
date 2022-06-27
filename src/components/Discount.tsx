import Button from '@mui/material/Button'
import React, { useState } from 'react'
import { Purchase } from '../App'

type Props = {
  setPurchase: any
  purchase: Purchase
}

function Discount(props: Props) {
  const [discount, setDiscount] = useState<number>(0)

  const handleSubmit = (e: any) => {
    e.preventDefault();

    props.setPurchase({ ...props.purchase, discount: discount })
  }

  return <div className='member-search'>
    <form onSubmit={handleSubmit}>
      <input type="number" id="discount" name="discount" value={discount} onChange={e => setDiscount(Number(e.target.value))} />
      <Button variant="outlined" type="submit">speichern</Button>
    </form>
  </div>
}
export default Discount
