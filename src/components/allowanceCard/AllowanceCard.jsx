import React, { useState } from 'react';
import Editicon from '../../assets/editicon.png'
import Deleteicon from '../../assets/cancelicon.png'
import ETFicon from '../../assets/ETFicon.png';

const AllowanceCard = ({name,amount,check,cancel,edit}) => {
    
  return (
    <div className='allowance-card-main'>
       <p className='allowance-name'>{name}: {amount}</p>
       {check && <div><img src={ETFicon} alt='Etf-icon'/></div>}
       <img style={{cursor:'pointer'}} onClick={edit} src={Editicon} alt='edit'/>
       <img style={{cursor:'pointer'}} onClick={cancel} src={Deleteicon} alt='delete'/>
    </div>
  )
}

export default AllowanceCard
