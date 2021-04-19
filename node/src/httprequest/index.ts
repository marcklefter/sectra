import http from 'http';

// ...
// Callback.

type Callback<T> = (err: Error | null, result?: T) => void;

const getUser = (id: number, uc: Callback<unknown>) => {
  http.request(
    {
      hostname: 'jsonplaceholder.typicode.com',
      path: `/users/${id}`
    },
    res => {
      if (res.statusCode !== 200) {
        return uc(Error(`${res.statusCode} ${res.statusMessage}`));
      }

      let body = '';
  
      res.on('data', data => {
        body += data;
      });
  
      res.on('end', () => {
        uc(null, JSON.parse(body));
      });
    }
  ).end();
}

getUser(100, (err, user) => {
  if (err) return console.error(`ERROR: ${err.message}`);

  console.log(user);
});

// ...
// Promise.

// const getUser = (id: number): Promise<unknown> => {
//   return new Promise((resolve, reject) => {
//     http.request(
//       {
//         hostname: 'jsonplaceholder.typicode.com',
//         path: `/users/${id}`
//       },
//       res => {
//         if (res.statusCode !== 200) {
//           return reject(Error(`${res.statusCode} ${res.statusMessage}`));
//       }

//         let body = '';
    
//         res.on('data', data => {
//           body += data;
//         });
    
//         res.on('end', () => {
//           resolve(JSON.parse(body));
//         });
//       }
//     ).end();
//   });
// }

// getUser(1)
//   .then((user: unknown) => console.log(user))
//   .catch(err => console.error(`ERROR: ${err.message}`));

// (async () => {
//   try {
//     const user = await getUser(1);
//     console.log(user);
//   } catch (err) {
//     console.error(`ERROR: ${err.message}`)
//   }
// })();