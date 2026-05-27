import loadingGif from '../assets/images/loading.gif'

function Loading({message, pop}) {

 return(
<div className={`flex flex-col items-center justify-center ${pop ? 'left-0 bg-white w-[100%] h-[100vh] fixed top-1  ' : ''}`}>
 <img src={loadingGif} className='w-20 h-20' />
 <p> {message ? message : 'One momement ...' } </p> 
</div>
);
}

export default Loading;
