import { FC } from 'react'
import { useAppSelector } from '../hooks/redux'

const FavouritesPage: FC = () => {
  const { favourites } = useAppSelector((state) => state.weather)

  if (favourites.length === 0) return <p className={'text-center'}>No items.</p>

  return (
    <div className={'flex justify-center pt-10 mx-auto w-screen'}>
      <ul className={'list-none'}>
        {favourites.map((f) => (
          <li key={f}>
            <a href={f} target={'_blank'}>
              {f}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FavouritesPage
