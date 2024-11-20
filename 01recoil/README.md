# Recoil Basic Best Practice

Concept of atom  - store the state , it can be defined outside the component.

- Can `teleported` to any component 

###  Atom in recoil
```
import {atom} from 'recoil';

export const countAtom = atom({
    key:'countAtom', 
    default:0  
}) 
```

In store dir to maintain the state management

## how to use the or get the state mangement value.

### Basic

Recoil Root - Wrap the main component with recoil root to get the access .

atom - maintain the state in seprate dir

useRecoilState - same as the useState [value, function]

useRecoilValue - Return only the value.

useSetRecoilValue - only for update the value

```
import React from 'react'
import { useRecoilState } from 'recoil'
import { countAtom } from './store/atom/count'

const App = () => {
  const [count, setCount] = useRecoilState(countAtom)
  return (
    <div>
      App + {count}
      <button onClick={() => setCount(count + 1)}>plus</button>
    </div>
  )
}

export default App

```
## selector - devrived state

Kind of method where it perform certain operation and return the value - derived state

```
export const evenSelectro = selector({
    key: "evenSelector",
    get: (props) => {
        const count = props.get(countAtom);
        return count % 2 == 0 
    }
})
```
Selector on depending on another atoms and also it can depend on anothe `selector`


## Async data Queries using recoil.

```
const fetachApi = selector({
    name: 'fetchapi',
    get: async () => {
        const res = await axios.get('');
        return res.data
    }
});
```
Performing a asyhc api fetch.

### Default initial fetch no need of useEffect
```
const userData = atom({
    name: 'userDataAtom',
    default: fetachApi
})
```
Use suspence for fallback screen. 

# Advance

### atomfamily

Sometimes we need more than one atom family.

- need  a sepfic atom based on the params passed?

```

export const todosAtomFamily = atomFamily({
   key:"todosAtom",
   default :(id)=>{
    return Array.find(x=>x.id == id)
   }
})
```
Dynamic creating a atom based on the params passed .

if we need to get the dynamic selector means api hit new selector we need to use selecto family.

```
const fetachApiFamily = selectorFamily({
    name: 'fetchapi',
    get:(id)=> async () => {
        const res = await axios.get(`ww.githab/${id}`);
        return res.data
    }
});
```

*Atom and selector family when we need to pass a params and reuturn singluar atom and family we can use this*

## useRecoilStateLoadable - 

It is similar to useRecoilState but is specifically used to handle asynchronous states, like data that is being fetched from an API.

The Loadable object has three possible states:

- loading: The data is still being fetched.
- hasValue: The data has been successfully   fetched.
- hasError: There was an error fetching the data.

```

import React from 'react';
import { useRecoilStateLoadable } from 'recoil';
import { allBlogsSelector } from './selectors';

function AllBlogs() {
  const loadable = useRecoilStateLoadable(allBlogsSelector);

  if (loadable.state === 'loading') {
    return <div>Loading blogs...</div>;
  }

  if (loadable.state === 'hasError') {
    return <div>Error: {loadable.contents.message}</div>; // Or handle error appropriately
  }

  if (loadable.state === 'hasValue') {
    const blogs = loadable.contents; // This will be the fetched data

    return (
      <div>
        <h2>All Blogs</h2>
        <ul>
          {blogs.map((blog) => (
            <li key={blog.id}>
              <a href={`/blog/${blog.id}`}>{blog.title}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return null; // Fallback, although this line should not be needed.
}

export default AllBlogs;
```