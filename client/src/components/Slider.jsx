import { useState } from 'react'

function Slider() {;
 const urls = [
  'https://images-eu.ssl-images-amazon.com/images/G/31/rabhinak/pc_gw/unrec/GW-Hero-Pc-Version-Revised-bank-Strip._CB783938528_.jpg',
  'https://images-eu.ssl-images-amazon.com/images/G/31/Img26/Sports/February/GW/BAU/Legacy/Unrec/5298_Sports_-_BAU_PC_creatives_3000X1200_02._CB787728092_.jpg',
  'https://images-eu.ssl-images-amazon.com/images/G/31/rabhinak/pc_gw/unrec/GW-Hero-Pc-Version-Revised-bank-Strip._CB783938528_.jpg'
  ]
 const [url, setUrl] = useState(urls[0])

 return(
  <div className='w-full h-100 flex justify-between items-center bg-gray-500'>
    <span className='flex w-15 h-full items-center justify-center'> L  </span>
    <img className='w-[90%] bg-black h-[100%]' alt='This is image' src={url} />
    <span className='flex w-15 h-full items-center justify-center cursor-pointer' onClick={() => setUrl(urls[1])} > R </span>
  </div>
 );
}


export default Slider;
