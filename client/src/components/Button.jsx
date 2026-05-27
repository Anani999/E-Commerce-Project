function Button(props) {
 return (
  <button className=' bg-gray-500  hover:bg-gray-700 text-white p-2 rounded cursor-pointer' onClick={props.function}> {props.text} </button>
 )
}


export default Button;
