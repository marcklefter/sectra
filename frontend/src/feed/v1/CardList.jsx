import {
  Card
} from './Card';

export const CardList = ({ items }) => {
  return items.map((item, index) => (
    <Card
      key={index}

      {...item}
      size="large"
    />
  ))
}