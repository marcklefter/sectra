const fetchUser = async (id, baseUrl = 'http://localhost:3000') => {
  const response = await fetch(`${baseUrl}/${id}`);
  if (!response.ok) {
    throw new Error(
      `An error occurred while fetching user ${id} - ${response.status} ${response.statusText}`
    );
  }

  return response.json();
};


const delayFetchUser = (id, baseUrl, ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(
      async () => {
        try {
          resolve(await fetchUser(id, baseUrl));
        } catch (error) {
          reject(error);
        }
      },
      ms
    );
  });
};

const race = promises => {
  return new Promise((resolve, reject) => {
    let resolved = false;
    promises.forEach(promise => {
      promise.then(
        (value) => {
          if (resolved) return;
          resolved = true;
          resolve(value);
        }
      )
    });
  });
}

const promisePool = async (promiseCreators, limit = 1) => {
  let index = 0;
  const results = [];

  const worker = async () => {
    while (index < promiseCreators.length) {
      const currentIndex = index++;

      results[currentIndex] = await promiseCreators[currentIndex]();
    }
  };

  const workers = [];
  for (let w = 0; w < limit; w++) {
    workers.push(worker());
  }

  await Promise.all(workers);
  return results;
}

// ...
 
export const App = async () => {
  document.getElementById('root').innerHTML =
    `
      <div id="loader">
        <img src="spinner.gif" height="32" />
      </div>
      <div id="output"></div>
    `;

  const output = document.getElementById('output');
  const loader = document.getElementById('loader');

  // ...

  const results = await Promise.allSettled([
    fetchUser(1),
    fetchUser(2)
  ]);

  // ...

  loader.remove();

  results.forEach(result => {
    if (result.status === 'fulfilled') {
      output.insertAdjacentHTML('beforeend', `<p>${result.value['name']}</p>`);
    }
  });
};

// export const App = async () => {
//   document.getElementById('root').innerHTML =
//     `
//       <div id="loader">
//         <img src="spinner.gif" height="32" />
//       </div>
//       <div id="output"></div>
//     `;

//   const output = document.getElementById('output');
//   const loader = document.getElementById('loader');

//   const user = await Promise.race([
//     fetchUser(1),
//     delayFetchUser(1, 'http://jsonplaceholder.typicode.com/users', 1000),
//   ]);

//   loader.remove();

//   output.insertAdjacentHTML('beforeend', user.primary ? 'Primary' : 'Secondary');
// }

// export const App = async () => {
//   document.getElementById('root').innerHTML =
//     `
//       <div id="loader">
//         <img src="spinner.gif" height="32" />
//       </div>
//       <div id="output"></div>
//     `;

//   const output = document.getElementById('output');
//   const loader = document.getElementById('loader');

//   const user = await race([
//     fetchUser(1),
//     delayFetchUser(1, 'http://jsonplaceholder.typicode.com/users', 1000),
//   ]);

//   loader.remove();

//   output.insertAdjacentHTML('beforeend', user.name);
// }

// export const App = async () => {
//   document.getElementById('root').innerHTML =
//     `
//       <div id="loader">
//         <img src="spinner.gif" height="32" />
//       </div>
//       <div id="output"></div>
//     `;

//   const output = document.getElementById('output');
//   const loader = document.getElementById('loader');

//   const users = await Promise.all([1, 2, 3, 4, 5].map(id => fetchUser(id)));

//   loader.remove();

//   users.forEach(user => output.insertAdjacentHTML('beforeend', user.name));
// }

// export const App = async () => {
//   document.getElementById('root').innerHTML =
//     `
//       <div id="loader">
//         <img src="spinner.gif" height="32" />
//       </div>
//       <div id="output"></div>
//     `;

//   const output = document.getElementById('output');
//   const loader = document.getElementById('loader');

//   const users = await promisePool([1, 2, 3, 4, 5].map(id => () => fetchUser(id)));

//   loader.remove();

//   users.forEach(user => output.insertAdjacentHTML('beforeend', user.name));
// }