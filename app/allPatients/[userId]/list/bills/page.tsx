import { getUser } from '@/lib/actions/patient.actions'
import React from 'react'

const page = async ({ params: { userId } }: SearchParamProps ) => {
  
  const user = await getUser(userId);

  return (
    <div>
      {userId}
      <p>Bills</p>
    </div>
  )
}

export default page
