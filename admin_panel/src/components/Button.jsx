function Button(props){
 return(
<button onClick={props.function} className='p-2  text-white font-bold cursor-pointer bg-blue-800 border rounded' > {props.text} </button>
);
}

export default Button;
