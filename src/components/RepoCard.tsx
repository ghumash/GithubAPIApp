import { IRepo } from '../models/models'
import React, { useState } from 'react'
import { useActions } from '../hooks/actions'
import { useAppSelector } from '../hooks/redux'

type Props = {
  repo: IRepo
}

const RepoCard = (props: Props) => {
  const { repo } = props

  const { addFavourite, removeFavourite } = useActions()
  const { favourites } = useAppSelector((state) => state.weather)
  const [isFav, setIsFav] = useState(favourites.includes(repo.html_url))

  const handleAddFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    addFavourite(repo.html_url)
    setIsFav(true)
  }

  const handleRemoveFavourite = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()
    removeFavourite(repo.html_url)
    setIsFav(false)
  }

  return (
    <a href={repo.html_url} target={'_blank'}>
      <div
        className={
          'border py-3 px-5 rounded md-2 hover:shadow-md hover:bg-gray-100 transition-all'
        }
      >
        <h2 className={'text-lg font-bold'}>{repo.full_name}</h2>
        <p className={'text-sm'}>
          Forks: <span className={'font-bold mr-2'}>{repo.forks}</span>
          Watchers: <span className={'font-bold'}>{repo.watchers}</span>
        </p>
        <p className={'text-sm font-thin'}>{repo?.description}</p>
        {!isFav && (
          <button
            className={
              'py-2 px-4 mr-2 mt-4 bg-yellow-400 rounded hover:shadow-md transition-all'
            }
            onClick={handleAddFavourite}
          >
            Add
          </button>
        )}
        {isFav && (
          <button
            className={
              'py-2 px-4 mr-2 mt-4  bg-red-400 rounded hover:shadow-md transition-all'
            }
            onClick={handleRemoveFavourite}
          >
            Remove
          </button>
        )}
      </div>
    </a>
  )
}

export default RepoCard
