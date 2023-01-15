import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import React, { useState } from 'react'
import { Purchase } from '../App'
import client from '../client'
import MemberSearchResult from './MemberSearchResult'

type Props = {
  setPurchase: any
  purchase: Purchase
}

export type Member = {
  properties: {
    ID: string
    Vorname: string
    Name: string
  }
}

function MemberSearch(props: Props) {
  const [memberId, setMemberId] = useState<string>()
  const [memberArray, setMemberArray] = useState<Member[]>([])
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)

  const deleteMember = (e: any) => {
    e.preventDefault();
    props.setPurchase({ ...props.purchase, customer: undefined, customerId: undefined })
  }

  const loadMembers = (memberIds: number[]) => {
    setMemberArray([])

    memberIds.map((id: number) => {
      return client.get(`/member/${id}`).then((response) => {
        const member = response.data
        // @ts-ignore
        setMemberArray(existing => [...existing, member]);
      })
    })
  }

  const selectMember = (member: Member) => {
    props.setPurchase({ ...props.purchase, customer: member, customerId: null })
    setModalIsOpen(false)
  }

  const memberElements = memberArray?.map((member) => {
    return <Grid item sm={5} md={5}>
      <div key={member.properties.Vorname} className="member-item col">
        {member.properties.Vorname} {member.properties.Name} <Button onClick={() => selectMember(member)}>auswählen</Button>
      </div>
    </Grid>
  })

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };
  

  const handleSubmit = (e: any) => {
    e.preventDefault();

    client.get(`/member?filter=\`ID\`="${memberId}" OR \`Name\`="${memberId}"`).then((response) => {
      const memberArray = response.data.objects

      if (memberArray.length === 1) {
        client.get(`/member/${memberArray[0]}`).then((memberResponse) => {
          const member = memberResponse.data
          props.setPurchase({ ...props.purchase, customer: member, customerId: memberArray[0] })
        })
      } else if(memberArray.length > 1) {
        loadMembers(memberArray)
        setModalIsOpen(true)
      } else {
        alert('Keine Resultate gefunden')
      }
    })
  }

  const member = props.purchase.customer
  return <>
    <div className='member-search'>
      {member ?
        <>
          {member?.properties.Vorname} {member?.properties.Name} ({member?.properties.Bierkredit} CHF)
          <Button onClick={deleteMember}>X</Button>
        </>
        :
        <form onSubmit={handleSubmit}>
          <TextField size="small" type="text" id="memberId" name="memberId" value={memberId}
            onChange={e => setMemberId(e.target.value)} placeholder="ID / Nachname"/>
          <Button variant="outlined" type="submit">Suchen</Button>
        </form>
      }
    </div>

    <Modal
      open={modalIsOpen}
      onClose={() => setModalIsOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className='member-result'>
          <h1>Resultate</h1>
          {memberElements}
        </div>
      </Box>
    </Modal>
  </>
}
export default MemberSearch
