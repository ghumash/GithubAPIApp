import { FC, useEffect, useState } from 'react'
import {
  useLazyGetUserReposQuery,
  useSearchUsersQuery,
} from '../store/weather/weather.api'
import { useDebounce } from '../hooks/debounce'
import RepoCard from '../components/RepoCard'

const HomePage: FC = () => {
  const [search, setSearch] = useState<string>('ghumash')
  const [dropdown, setDropdown] = useState<boolean>(false)
  const debounced = useDebounce(search)
  const [fetchRepos, { isLoading: areReposLoading, data: repos }] =
    useLazyGetUserReposQuery()

  const { data, isLoading, isError } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
  })

  useEffect(() => {
    setDropdown(data?.items?.length! > 0 && debounced.length >= 3)
  }, [debounced, data])

  const handleClick = (username: string) => {
    fetchRepos(username)
    setDropdown(false)
  }

  return (
    <div className={'flex justify-center pt-10 mx-auto w-screen'}>
      {isError && (
        <p className={'text-center text-red-600'}>Something went wrong!</p>
      )}

      <div className={'relative w-[560px]'}>
        <input
          type="text"
          className={'border py-2 px-4 w-full h-[40px] mb-2'}
          placeholder={'Search for username...'}
          value={search}
          onChange={(e) => setSearch(e.target?.value)}
        />
        {dropdown && (
          <ul
            className={
              'absolute top-[42px] left-0 right-0 max-h-[200px] overflow-y-scroll shadow-md bg-white'
            }
          >
            {isLoading && <p className={'text-center'}>Loading...</p>}
            {data?.items?.map((user) => (
              <li
                className={
                  'py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer'
                }
                onClick={() => handleClick(user.login)}
                key={user.id}
              >
                {user.login}
              </li>
            ))}
          </ul>
        )}
        <div className={'container'}>
          {areReposLoading && (
            <p className={'text-center'}>Repos are loading...</p>
          )}
          {repos?.map((repo) => <RepoCard repo={repo} key={repo.id} />)}
        </div>
      </div>
    </div>
  )
}

export default HomePage
