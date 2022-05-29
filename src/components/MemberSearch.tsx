import React, { useState } from 'react'
import client from '../client'

type Props = {
}

export type Member = {
  properties: {
    Vorname: string
    Name: string
  }
}

function MemberSearch(props: Props) {
  const [member, setMember] = useState<Member>()
  const [memberId, setMemberId] = useState<string>()

  const deleteMember = (e: any) => {
    e.preventDefault();
    setMember(undefined)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();

    client.get(`/member?filter=\`ID\`="${memberId}"`).then((response) => {
      const memberArray = response.data.objects

      if (memberArray.length > 0) {
        client.get(`/member/${memberArray[0]}`).then((memberResponse) => {
          const member = memberResponse.data
          console.log(member)
          setMember(member)
        })
      }
    })
  }

  return <div className='member-search'>
    {member ?
      <>
      member: {member?.properties.Vorname} {member?.properties.Name}
      <button onClick={deleteMember}>X</button>
      </>
      :
      <form onSubmit={handleSubmit}>
        <input type="text" id="memberId" name="memberId" value={memberId} onChange={e => setMemberId(e.target.value)} />
        <button type="submit">Suchen</button>
      </form>
    }
  </div>
}
export default MemberSearch
