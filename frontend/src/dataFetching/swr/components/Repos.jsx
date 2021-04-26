import useSWR from 'swr';

import {
  fetchResource
} from '../util';

export const Repos = ({ endpoint }) => {
  const {
    data: repos
  } = useSWR(endpoint, fetchResource);

  if (!repos) {
    return 'Loading repos...';
  }
  
  return (
    <>
      <h2>Repositories</h2>
      {repos.map((repo, i) => <p key={i}>{repo.name}</p>)}
    </>
  );
}