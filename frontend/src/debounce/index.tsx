import {
  useState,
  useEffect
} from 'react';

import _ from 'lodash';

// ...
// Styles.
const baseStyle: React.CSSProperties = {
  textAlign: 'center'
};

const inputStyle: React.CSSProperties = {
  ...baseStyle,
  marginBottom: 20
};

// ... Helpers.

const apiFetch = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('An occur occurred while fetching user data.');
  }

  return response.json();
}

const getUserResourceUrl = (userId: number) => `http://jsonplaceholder.typicode.com/users/${userId}`;

// debounced function that is called with an updater function; the updater will update the component state tracking
// the current user resource URL.
const updateUserResource = _.debounce(
  updater => updater(),
  1000
);

// ...

export const App = () => {
  const [
    userId, 
    setUserId
  ] = useState(1);
  
  const [
    resource,
    setResource
  ] = useState(getUserResourceUrl(userId));

  const [
    userData, 
    setUserData
  ] = useState<{ name: string } | null>(null);

  const [
    error,
    setError
  ] = useState<Error | null>(null);

  const [
    loading,
    setLoading
  ] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setUserData(null);
      setError(null);

      try {
        const userData = await apiFetch(resource);
        setUserData(userData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [resource]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userId = +event.target.value;

    setUserId(userId);

    // debounce updating the resource (URL) state.
    updateUserResource(() => setResource(getUserResourceUrl(userId)));
  };

  // ...

  return (
    <>
      <div style={inputStyle}>
        <input
          type="number"
          value={userId}
          onChange={handleChange}
        />
      </div>

      <div style={baseStyle}>
        {loading && 'Loading...'}
        {userData?.name}
        {error?.message}
      </div>
    </>
  )
};