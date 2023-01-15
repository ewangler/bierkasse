import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import React, { useState } from 'react'
import client from '../client'
import { Member } from '../models'

type Props = {
  setPurchase: any
  memberIds: number[]
}

function MemberSearchResult(props: Props) {
  const [memberId, setMemberId] = useState<string>()
  const [memberArray, setMemberArray] = useState<Member[]>()
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(true)

  React.useEffect(() => {
    
  }, [])

  const memberElements = memberArray?.map((member) => {
    return <Grid item sm={5} md={5}>
      <div key={member.properties.ID} className="member-item col">
        {member.properties.Vorname} {member.properties.Name}
      </div>
    </Grid>
  })

  return <>
    <Modal
      open={modalIsOpen}
      onClose={() => setModalIsOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box>
        <div className='member-result'>
          {memberElements}
        </div>
      </Box>
    </Modal>
  </>
}
export default MemberSearchResult
