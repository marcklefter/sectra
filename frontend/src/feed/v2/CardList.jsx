import {
  ErrorBoundary
} from './ErrorBoundary';

import {
  Card
} from './Card';

export const CardList = ({ items }) => {
  return items.map((item, index) => (
    <ErrorBoundary key={index}>
      {error => error
        ? (
          <Card
            title="Oops, an error occurred"
            image="https://cdn.dribbble.com/users/1078347/screenshots/2799566/oops.png"
            size="large"
          />
        )
        : (
          <Card
            {...item}
            size="large"
          />
        )}
    </ErrorBoundary>

  ))
}