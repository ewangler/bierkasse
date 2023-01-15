import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import React from 'react'
import { useCartContext } from '../contexts/CartContextProvider'

function Discount() {
  const { discount, setDiscount}  = useCartContext()

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // props.setPurchase({ ...props.purchase, discount: discount })
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
