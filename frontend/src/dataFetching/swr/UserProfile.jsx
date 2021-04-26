import useSWR from 'swr';

import {
  fetchResource,
  fetchImage
} from './util';

import {
  Followers,
  Repos,
} from './components';

import {
  BASE_URL
} from './constants';

// ...

export const UserProfile = ({ user }) => {
  const {
    data: details
  } = useSWR(`${BASE_URL}/${user}`, fetchResource);

  const {
    data: image
  } = useSWR(details?.avatar_url, fetchImage);

  if (!details || !image) {
    return <p>Loading {user}...</p>
  }

  return (
    <>
      <div className="row" style={{ flexDirection: 'column' }}>
        <div>
          <img className="image" src={details.avatar_url} alt="" />
        </div>
        <h1>{details.name}</h1>
      </div>
      <div className="row">
        <div className="column">
          <Repos endpoint={`${BASE_URL}/${user}/repos`} />
        </div>
        <div className="column">
          <Followers endpoint={`${BASE_URL}/${user}/followers`} />
        </div>
      </div>
    </>
  )
}