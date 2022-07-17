import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import React, { useState } from 'react'
import { Purchase } from '../App'
import client from '../client'

type Props = {
  setPurchase: any
  purchase: Purchase
}

export type Member = {
  properties: {
    Vorname: string
    Name: string
  }
}

function MemberSearch(props: Props) {
  const [memberId, setMemberId] = useState<string>()

  const deleteMember = (e: any) => {
    e.preventDefault();
    props.setPurchase({ ...props.purchase, customer: undefined, customerId: undefined })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();

    client.get(`/member?filter=\`ID\`="${memberId}"`).then((response) => {
      const memberArray = response.data.objects

      if (memberArray.length > 0) {
        console.log(props.purchase.customerId)
        client.get(`/member/${memberArray[0]}`).then((memberResponse) => {
          const member = memberResponse.data
          props.setPurchase({ ...props.purchase, customer: member, customerId: memberArray[0] })
        })
      }
    })
  }

  const member = props.purchase.customer

  console.log(props.purchase.customerId)
  return <div className='member-search'>
    {member ?
      <>
      {member?.properties.Vorname} {member?.properties.Name}
      <Button onClick={deleteMember}>X</Button>
      </>
      :
      <form onSubmit={handleSubmit}>
        <TextField size="small" type="text" id="memberId" name="memberId" value={memberId}
         onChange={e => setMemberId(e.target.value)} />
        <Button variant="outlined" type="submit">Suchen</Button>
      </form>
    }
  </div>
}
export default MemberSearch
