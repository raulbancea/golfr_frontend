import useSWR from 'swr'
import { getToken } from './userAuth'

export const GOLFERS_URL = id => `${process.env.NEXT_PUBLIC_API_URL}/golfers/${id}`

const useScoresOfGolfer = id => {
  const fetcher = async url => {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })

    if (!res.ok) {
      const error = new Error('An error occurred while fetching the data.')
      error.info = await res.json()
      error.status = res.status
      throw error
    }
    return res.json().then(data => data.scores)
  }

  const { data, error } = useSWR(GOLFERS_URL(id), fetcher)

  return {
    scores: data,
    error: error && error.message,
  }
}

export default useScoresOfGolfer
