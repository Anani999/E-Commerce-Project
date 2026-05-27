import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from 'recharts'

function Chart () {

 const data = [
   { name: "Geeksforgeeks", students: 400 },
        { name: "Technical scripter", students: 700 },
        { name: "Geek-i-knack", students: 200 },
        { name: "Geek-o-mania", students: 1000 },
 ];

 return(
<>
 <h1> Chart </h1>
 <BarChart width={600} height={600} data={data} >
  <Bar dataKey='students' fill="green"/>
  <CartesianGrid stroke='#ccc' />
  <XAxis dataKey='name' />
  <YAxis />
 </BarChart>
</>
)

}

export default Chart;
