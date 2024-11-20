import React from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { countAtom } from './store/atom/count'

const App = () => {
  // const [count, setCount] = useRecoilState(countAtom)
  const countRead = useRecoilValue(countAtom)
  const setReacd = useSetRecoilState(countAtom)
  return (
    <div>
      App + {countRead}
      <button onClick={() => setReacd(countRead + 1)}>plus</button>
    </div>
  )
}

export default App