import fetch, {
  Response
} from 'node-fetch';

import _ from 'lodash';

// ...

type Resource = Record<string, unknown>;

const findResource = async (resourcePath: string) => {
  const response: Response = await fetch(`http://jsonplaceholder.typicode.com/${resourcePath}`);
  if (!response.ok) {
    throw new Error(
      `An error occurred while fetching resource ${resourcePath} - ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

export const findUser = async (id: number): Promise<Resource> => {
  const user = await findResource(`users/${id}`);

  return _.pick(user, ['name', 'email']);
}

export const findTodos = async (id: number): Promise<string[]> => {
  const todos = await findResource(`todos?userId=${id}`);

  return todos.map((todo: Resource) => todo.title);
}