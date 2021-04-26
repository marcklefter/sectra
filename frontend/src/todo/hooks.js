import {
  useState,
  useEffect,
  useMemo,
  useRef
} from 'react';

import _ from 'lodash';

import {
  mode
 } from "./mode";

// ...

export const useDocumentTitle = titleFn => {
  useEffect(() => {
    document.title = titleFn();
  }, [titleFn]);
}

// ...
// Custom hook for storing and using a value, until a certain condition is fulfilled, after which the value is updated.
//
// Use this hook inside useAsyncMode below to replace the ref variable.
const useValue = (newValue, valueChanged) => {
  const valueRef  = useRef();
  const changed   = valueChanged(valueRef.current ?? [], newValue);
  
  useEffect(() => {
    changed && (valueRef.current = newValue);
  });

  return changed ? newValue : valueRef.current;
}

// ...

export const useMode = stringArray => {
  const words = _.flatten(
    stringArray.reduce((words, word) => {
      return [...words, word.split(' ')];
    }, [])
  );

  return mode(words);
}

export const useMemoMode = stringArray => {
  return useMemo(
    () => {
      const words = _.flatten(
        stringArray.reduce((words, word) => {
          return [...words, word.split(' ')];
        }, [])
      );
    
      return mode(words);
    },
    [stringArray.length]
  );
}

export const useAsyncMode = stringArray => {
  const [mfw, setMfw] = useState(null);

  const ref = useRef();
  ref.current = stringArray;

  useEffect(() => {
    const words = _.flatten(
      ref.current.reduce((words, word) => {
        return [...words, word.split(' ')];
      }, [])
    );
  
    setMfw(mode(words));
  }, [stringArray.length]);

  // const strings = useValue(
  //   stringArray, 
  //   prevStringArray => prevStringArray.length !== stringArray.length
  // );

  // useEffect(() => {
  //   const words = _.flatten(
  //     strings.reduce((words, word) => {
  //       return [...words, word.split(' ')];
  //     }, [])
  //   );
  
  //   setMfw(mode(words));
  // }, [strings]);

  return mfw;
}