import {
  CardList
} from './CardList';

// ...

const items = [
  {
    title: 'first item',
    image: 'http://via.placeholder.com/350x150', 
  },
  {
    title: 'second item',
    image: 'http://via.placeholder.com/350x150'
  }
];

// ...

export const App = () => {
  return <CardList items={items} />
}