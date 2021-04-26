import axios from 'axios';

import {
  mutate
} from 'swr';

const delay = (resolveWith, ms) => {
  return new Promise(resolve => {
    setTimeout(
      () => resolve(resolveWith),
      ms
    )
  });
}

export const fetchResource = async (uri, delayMs) => {
  const result = await axios(uri, {
    headers: {
      Authorization: 'Bearer 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'
    }
  });

  return delayMs ? delay(result.data, delayMs) : result.data;
}

export const fetchImage = src => {
  return new Promise(resolve => {
    const img = document.createElement('img');
    img.src = src;
    img.onload = () => {
      resolve(src)
    }
  });
}

// ...

export const preFetch = url => {
  mutate(url, fetchResource(url), false);
}