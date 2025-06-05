import { useParams, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import ConstitutionalIndex from './index'

export default function ConstitutionalOffice() {
  const { office } = useParams()
  
  // This component simply redirects to the index component
  // The index component will handle displaying the correct office based on the URL parameter
  return <ConstitutionalIndex />
}
