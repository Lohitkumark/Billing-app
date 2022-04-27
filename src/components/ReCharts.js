import React,{useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const ReCharts = props => {

    const bills = useSelector((state)=>{
        return state.bills
      })

    const [data, setData] = useState([])

    useEffect(() => {
        const result = bills.data.map((ele)=>{
           return {date:ele.date.slice(0,10), total:ele.total}
        })
        setData(result)

    },[bills])
    
        // console.log('in', data);
            const output = data.reduce((accumulator, cur) => {
                let date = cur.date;
                let found = accumulator.find(elem => elem.date == date)
                if (found) found.total += cur.total;
                else accumulator.push(cur);
                return accumulator;
              }, []);
              
              console.log("out",output)
        
    // const data1 = {
        //     date:date
        // }
        
        // console.log(data);
    
   
  return (
    <BarChart
        width={500}
        height={300}
        data={output.slice(-7).reverse()}
        margin={{
          top: 30, right: 30, left: 20, bottom: 5,
        }}
      >
        <XAxis dataKey="date" angle={-30} position='start' />
        <YAxis />
        <Tooltip />
        <Legend />
        {/* <Cell/> */}
        <Bar dataKey="total" barSize={20} fill="#8884d8" />
      </BarChart>
  )
}


export default ReCharts