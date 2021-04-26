import useSWR from 'swr';

import {
  fetchResource
} from '../util';

export const Followers = ({ endpoint }) => {
  const {
    data: followers
  } = useSWR(endpoint, fetchResource);
  
  if (!followers) {
    return 'Loading followers...';
  }

  return (
    <>
      <h2>Followers</h2>
      {followers.map((follower, i) => <p key={i}>{follower.login}</p>)}
    </>
  );
}