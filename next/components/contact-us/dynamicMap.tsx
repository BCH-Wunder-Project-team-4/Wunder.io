
import dynamic from 'next/dynamic';


const DynamicMap = dynamic(() => import('./Map'), {
  ssr: false
});



export function LocationMap ({markers}) {
  
  return (
      <DynamicMap markers = {markers}/>
  )
}