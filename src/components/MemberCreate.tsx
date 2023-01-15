import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import React, { useState } from 'react'
import client from '../client'
import { useCartContext } from '../contexts/CartContextProvider'
import * as constants from '../service/constants'


function MemberCreate() {
  const [success, setSuccess] = useState<boolean>()
  const [name, setName] = useState<string>()
  const [lastName, setLastName] = useState<string>()
  const [mail, setMail] = useState<string>()

  const { setCustomer } = useCartContext()

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = {
      "type": "member",
      "readonly": false,
      "parents": [
        constants.MEMBER_PARENT
      ],
      "properties": {
        "Vorname": name,
        "Name": lastName,
        "E-Mail": mail
      }
    }

    client.post(`/member`, data).then((response) => {
      const responseData = response.data
      client.get(`/member/${responseData}`).then((memberResponse) => {
        const member = memberResponse.data
        setCustomer(member)
      }).then(() => {
        setSuccess(true)
      })

    }).catch(() => {
      setSuccess(false)
    })
  }

  return <div className='member-create'>
    <h3>Kunde erfassen:</h3>
    <form onSubmit={handleSubmit}>
      Vorname: <input type="text" required id="name" name="name" value={name} onChange={e => setName(e.target.value)} />
      Nachname: <input type="text" required id="last_name" name="last_name" value={lastName} onChange={e => setLastName(e.target.value)} />
      Email: <input type="text" required id="mail" name="mail" value={mail} onChange={e => setMail(e.target.value)} />
      <Button variant="contained" type="submit">Erfassen</Button>
    </form>

    {success === true ?
      <Alert severity="success">Speichern erfolgreich</Alert> : (success === false) ? 
      <Alert severity="error">Speichern fehlgeschlagen</Alert> : <></>
    }
  </div>
}
export default MemberCreate
