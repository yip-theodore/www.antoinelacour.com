import { useEffect } from 'react'
import { navigate } from 'gatsby'

export default function NotFound () {
  useEffect(() => {
    navigate('/')
  }, [])

  return null
}
