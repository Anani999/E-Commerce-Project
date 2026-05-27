function Sidebar () {
 return(
<div className='text-white w-[250px] h-[100vh]  flex items-center justify-center bg-blue-900'>
 <div className='flex flex-col gap-3 w-[100%] '>
  <div className='w-[100%] p-3 bg-blue-500 hover:bg-blue-300 cursor-pointer'> Dashboard </div>
  <div className='w-[100%] p-3 hover:bg-blue-300 cursor-pointer'> Manage Products </div>
  <div className='w-[100%] p-3 hover:bg-blue-300 cursor-pointer '> Settings </div>
 </div>
</div>
)
}

export default Sidebar;
