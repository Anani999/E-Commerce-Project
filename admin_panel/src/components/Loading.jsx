import loadingImg from '../assets/images/loading.gif'

function Loading({ message='Loading ...' }){
 return(
 <div className='w-[150px] h-[150px] flex items-center justify-center gap-1  border flex-col p-1 rounded'>
  <img className='w-[100px] h-[200px]' src={loadingImg} />
  <p> {message} </p>
 </div>
);
}


export default Loading;
