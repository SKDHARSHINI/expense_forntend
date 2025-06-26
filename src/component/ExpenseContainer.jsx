import React, { useEffect, useState } from 'react'
import Expenceform from './ExpenseForm.jsx'
import History from './History.jsx'
import BalanceContainer from './BalanceContainer.jsx';
/*import Modelform from './Modelform.jsx';*/

import {v4 as uid} from "uuid";
function ExpenseContainer(){
  
const [expense,setExpense]=useState([])

const fetchExpense = async()=>{
  try{
    const response =await fetch('https://expense-backend-1-s6cv.onrender.com');
    const data=await response.json();
    setExpense(data);
  }
  catch(err){
    console.log('failed to fetch',err);

  }
}
useEffect(()=>{
  console.log("useeffect called");
  fetchExpense();
},[])

const addExpense=async(title,amount)=>{
  try{
    const response=await fetch('https://expense-backend-1-s6cv.onrender.com/Expense',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({title,amount}),
    });
    if(response.ok){
      const newItem=await response.json();
      setExpense((prev)=>[...prev,newItem])
    }
    else{
      console.error('failed to fetch')
    }
  }
  catch(error){
    console.error('Failed to add expense',error);

  }
}






const deleteExpense=async(id)=>{
        setExpense((prev) => prev.filter((item) => item.id !== id));
   }
console.log(expense[0])
  return (
    <div className='expense-container'>
      <BalanceContainer expense={expense}/>
      <h1>Expense Tracker</h1>
        <History expense={expense} deleteExpense={deleteExpense}/>
        <Expenceform addExpense={addExpense}/>
    </div>
  )

}
export default ExpenseContainer