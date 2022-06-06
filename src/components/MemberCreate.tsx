import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import React, { useState } from 'react'
import client from '../client'

type Props = {
  setMember: any
}

function MemberCreate(props: Props) {
  const [success, setSuccess] = useState<boolean>()
  const [name, setName] = useState<string>()
  const [lastName, setLastName] = useState<string>()
  const [mail, setMail] = useState<string>()

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = {
      "type": "member",
      "readonly": false,
      "parents": [
        // 171
      ],
      "properties": {
        "Vorname": name,
        "Name": lastName,
        "E-Mail": mail
      }
    }

    client.post(`/member`, data).then((response) => {
      const responseData = response.data
      props.setMember(responseData)
      setSuccess(true)
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
