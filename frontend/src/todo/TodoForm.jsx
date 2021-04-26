import {
  useState
} from 'react';

const style = {
  width: '100%',
  backgroundColor: '#FFF',
  padding: 16,
  fontSize: 24,
  fontStyle: 'italic',
  fontWeight: 300,
  border: 'none'
};

export const TodoForm = ({ createTodo }) => {
  const [title, setTitle] = useState('');

  const handleChange = event => {
    setTitle(event.target.value);
  }

  const handleSubmit = event => {
    event.preventDefault();

    const titleToSet = title.trimStart();
    if (titleToSet) {
      createTodo(titleToSet);

      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        style={style}
        value={title}
        placeholder="What do you need to do?"
        onChange={handleChange}
      />
    </form>
  );
}