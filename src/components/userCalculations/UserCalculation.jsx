import React from 'react'
import { useSelector } from 'react-redux'
import TaxCalculation from './TaxCalculation';

const UserCalculation = () => {
    
    const basicSalary = parseFloat(useSelector(store => store.userDataSlice.basicSalary)) || 0;
    const userAllowanceData = useSelector(store => store.userDataSlice.allowanceData)
    const userDeductionsData = useSelector(store => store.userDataSlice.deductionsData)

    const totalAllowance = userAllowanceData.reduce((total, allowance) => total + parseFloat(allowance?.earningAmount), 0);
    const epfAllowance = userAllowanceData.reduce((total, allowance) => allowance.isEpfChecked ? total + parseFloat(allowance.earningAmount) : total, 0);
    const grossDeduction = userDeductionsData.reduce((total, deduction) => total + parseFloat(deduction?.earningAmount), 0);

    const totalEarnings = basicSalary + totalAllowance;
    const totalEarningsForEPF = basicSalary + epfAllowance;
    const grossEarnings = totalEarnings - grossDeduction;
    const grossSalaryForEPF = totalEarningsForEPF - grossDeduction;

    const employeeEPF = grossSalaryForEPF * 0.08;
    const employerEPF = grossSalaryForEPF * 0.12;
    const employerETF = grossSalaryForEPF * 0.03;

    const APIT = TaxCalculation(grossEarnings);
    const netSalary = grossEarnings - employeeEPF - APIT;

    const costToCompany = grossEarnings + employerEPF + employerETF;

    const calDetails = [{label:"Basic Salary",amount:basicSalary},
                        {label:"Gross Earning",amount:grossEarnings},
                        {label:"Gross Deduction",amount:`-${grossDeduction}`},
                        {label:"Employee EPF (8%)",amount:`-${employeeEPF}`},
                        {label:"APIT",amount:APIT},
                      ]

    return (
        <div className='user-calculation-main'>
            <p className='salary-header'>Your salary</p>
            <div className='calculation-div1'>
                <p>Items</p>
                <p>Amount</p>
            </div>
            {
                calDetails.map((val,index)=>(
                <div key={index} className='calculation-div2'>
                    <p className='calculation-para'>{val.label}</p>
                    <p className='calculation-para'>{val.amount}</p>
                </div>
                ))    
            }

            <div className='calculation-div3'>
                <p>Net Salary (Take Home)</p>
                <p>{netSalary}</p>
            </div>

            <p className='contribution-para'>Contribution from the Employer</p>

            <div className='calculation-div2'>
                    <p className='calculation-para'>Employeer EPF (12%)</p>
                    <p className='calculation-para'>{employerEPF}</p>
            </div>

            <div className='calculation-div2'>
                    <p className='calculation-para'>Employeer ETF (3%)</p>
                    <p className='calculation-para'>{employerETF}</p>
            </div>

            <div className='calculation-div4'>
                    <p className='calculation-para'>CTC (Cost to Company)</p>
                    <p className='calculation-para'>{costToCompany}</p>
            </div>
           
        </div>
    )
}

export default UserCalculation
