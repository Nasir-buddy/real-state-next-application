import { useGetAuthUserQuery } from '@/state/api'
import React from 'react'

const TenantSettings = () => {
    const { data: authUser } = useGetAuthUserQuery();

    
  return (
    <div>TenantSettings</div>
  )
}

export default TenantSettings