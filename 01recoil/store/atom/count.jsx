import { atom, atomFamily, selector, selectorFamily } from 'recoil';


export const countAtom = atom({
    key: 'countAtom', //name of the atom
    default: 0  //default value of the atom
})


//? selector depends on the another atom or selectors


export const evenSelector = selector({
    key: "evenSelector",
    get: (props) => {
        const count = props.get(countAtom);
        return count % 2 == 0
    }
});


// Asynchrousous dataqueries.
// atom - synhcornoous data , to added or perform asych we need to use secelctor

const fetachApi = selector({
    name: 'fetchapi',
    get: async () => {
        const res = await axios.get('');
        return res.data
    }
});

// If we need to a default value:

const userData = atom({
    name: 'userDataAtom',
    default: fetachApi
})

// Advance:

// atomFamily
// need  a sepfic atom based on the params passed?

// Dynamic creating a atom based on the params passed 

export const todosAtomFamily = atomFamily({
    key: "todosAtom",
    default: (id) => {
        return [].find(x => x.id == id)
    }
});


//  if we need to get the dynamic selector means api hit new selector we need to use selecto family.

const fetachApiFamily = selectorFamily({
    name: 'fetchapi',
    get: (id) => async () => {
        const res = await axios.get(`ww.githab/${id}`);
        return res.data
    }
});

//userRecoilStateLoadble -

// The Loadable object has three possible states:

// - loading: The data is still being fetched.
// - hasValue: The data has been successfully   fetched.
// - hasError: There was an error fetching the data.