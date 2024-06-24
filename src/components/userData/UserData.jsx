import React, { useEffect, useState } from 'react'
import Reset from '../../assets/Reset.png'
import UserDetails from '../userDetails/UserDetails'
import { useDispatch } from 'react-redux'
import { addAllowance, addBasicSalary, addDeductions } from '../../store/reducers/userDataSlice'

const UserData = () => {
  const[salary,setSalary] = useState('')
  const dispatch = useDispatch('')

  useEffect(() => {
    dispatch(addBasicSalary(salary));
  }, [salary, dispatch]);

  const handleReset = () =>{
    setSalary('');
    dispatch(addBasicSalary(''));
    dispatch(addAllowance([]));
    dispatch(addDeductions([]));
  }

  return (
    <div className='user-data-main'>

        <div className='employ-header-div'>
              <p className='employ-header'>Calculate Your Salary</p>
              <div className='reset-div' onClick={handleReset}>
                   <img src={Reset} alt='reset-image'/>
              </div>
          </div> 

          <div className='basic-salary'>
            <p className='basic-salary-text'>Basic Salary</p>
            <input className='basic-salary-input' type='text' value={salary} onChange={(e)=>setSalary(e.target.value)}/>
          </div>

          <UserDetails
            allowanceName="Earnings"
            allowanceText="Allowance, Fixed Allowance, Bonus and etc."
            allowanceType="Allowance"
          />

         <UserDetails
            allowanceName="Deductions"
            allowanceText="Salary Advances, Loan Deductions and all"
            allowanceType="Deductions"
          />
      
    </div>
  )
}

export default UserData
