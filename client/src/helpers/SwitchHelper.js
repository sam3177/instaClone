import { useState } from 'react';

function useToggle (term = true) {
   let [ value, setValue ] = useState(term);
   const toggle= ()=>{
      setValue(!value)
   }
   return [value, toggle]
}

export default useToggle;