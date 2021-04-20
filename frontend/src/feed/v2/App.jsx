import {
  CardList
} from './CardList';

import {
  ErrorBoundary
} from './ErrorBoundary';

// ...

const items = [
  {
    title: 'first item',
    image: 'http://via.placeholder.com/350x150'
  },
  {
    title: Math.random() > 0.5 ? 'second item' : undefined,
    // title: 'second item',

    image: 'http://via.placeholder.com/350x150'
  }
];

function getItems() {
  return Math.random() > 0.5 ? items : null;
}

// ...

export function App() {
  return (
    <ErrorBoundary>
      {(error, retry) => error
        ? (
          <button onClick={retry}>
            Retry
          </button>
        )
        : <CardList items={getItems()} />
      }
    </ErrorBoundary>
  )
}
