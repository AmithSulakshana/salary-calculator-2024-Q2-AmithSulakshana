import React, { useEffect, useState } from 'react';
import cancel from '../../assets/cancel.png';
import { FaPlus } from "react-icons/fa";
import AllowanceCard from '../allowanceCard/AllowanceCard';
import { useDispatch } from 'react-redux';
import { addAllowance, addDeductions } from '../../store/reducers/userDataSlice';

const UserDetails = ({ allowanceName, allowanceText, allowanceType }) => {
    const [display, setDisplay] = useState(false);
    const [displayEdit, setDisplayEdit] = useState(false);
    const [isDarkBackground, setIsDarkBackground] = useState(false);
    const [earningName, setEarningName] = useState('');
    const [earningAmount, setEarningAmount] = useState('');
    const [earningNameEdit, setEarningNameEdit] = useState('');
    const [earningAmountEdit, setEarningAmountEdit] = useState('');
    const [earningData, setEarningData] = useState([]);
    const [isEpfChecked, setIsEpfChecked] = useState(false);
    const [isEpfCheckedEdit, setIsEpfCheckedEdit] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [errors, setErrors] = useState({});
    const [editErrors, setEditErrors] = useState({});

    const dispatch = useDispatch();

    useEffect(() => {
        if (allowanceName === "Earnings") {
            dispatch(addAllowance(earningData));
        } else {
            dispatch(addDeductions(earningData));
        }
    }, [earningData]);

    const toggleAllowanceDisplay = () => {
        setDisplay(true);
        setIsDarkBackground(true);
    };

    const handleEarningCancel = () => {
        setDisplay(false);
        setDisplayEdit(false);
        setIsDarkBackground(false);
        setErrors({});
        setEditErrors({});
    };

    const validateInputs = () => {
        const newErrors = {};

        if (!/^[A-Za-z\s]+$/.test(earningName)) {
            newErrors.earningName = "Earning name must be a string.";
        }

        if (isNaN(parseFloat(earningAmount)) || parseFloat(earningAmount) <= 0) {
            newErrors.earningAmount = "Amount must be a positive number.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddEarning = () => {
        if (!validateInputs()) {
            return;
        }

        const newEarning = { earningName, earningAmount, isEpfChecked };
        setEarningData(prevEarningData => [...prevEarningData, newEarning]);
        setEarningName('');
        setEarningAmount('');
        setIsEpfChecked(false);
        handleEarningCancel();
    };

    const handleEarningEdit = (val, index) => {
        setDisplayEdit(true);
        setIsDarkBackground(true);
        setEarningNameEdit(val.earningName);
        setEarningAmountEdit(val.earningAmount);
        setIsEpfCheckedEdit(val.isEpfChecked);
        setEditIndex(index);
    };

    const validateEditInputs = () => {
        const newErrors = {};

        if (!/^[A-Za-z\s]+$/.test(earningNameEdit)) {
            newErrors.earningNameEdit = "Earning name must be a string.";
        }

        if (isNaN(parseFloat(earningAmountEdit)) || parseFloat(earningAmountEdit) <= 0) {
            newErrors.earningAmountEdit = "Amount must be a positive number.";
        }

        setEditErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleEditEarning = () => {
        if (!validateEditInputs()) {
            return;
        }

        const updatedEarningData = earningData.map((item, index) => {
            if (index === editIndex) {
                return { earningName: earningNameEdit, earningAmount: earningAmountEdit, isEpfChecked: isEpfCheckedEdit };
            }
            return item;
        });
        setEarningData(updatedEarningData);
        handleEarningCancel();
    };

    const handleEarningClose = (index) => {
        const warn = window.confirm("Are You Sure delete")
        if(warn){
            setEarningData(prevEarningData => prevEarningData.filter((_, i) => i !== index));
        }
    };

    return (
        <div className={`employ-details ${isDarkBackground ? 'dark-background' : ''}`}>
            {
                display &&
                <div className='earning-topup'>
                    <div className='add-new-earning-div'>
                        <p className='earning-header-text'>Add New {allowanceName}</p>
                        <img onClick={handleEarningCancel} style={{ cursor: "pointer" }} src={cancel} alt='cancel-icon' />
                    </div>
                    <hr />
                    <div className='earning-name-div'>
                        <p className='earning-name-text'>{allowanceName} Name</p>
                        <input type='text' value={earningName} onChange={(e) => setEarningName(e.target.value)} className='add-earning-input' placeholder='Eg: Travel' />
                        {errors.earningName && <p className='error-text'>{errors.earningName}</p>}
                    </div>
                    <div className='earning-name-div'>
                        <p className='earning-name-text'>Amount</p>
                        <input type='text' value={earningAmount} onChange={(e) => setEarningAmount(e.target.value)} className='add-earning-input' placeholder='Eg: 10,000' />
                        {errors.earningAmount && <p className='error-text'>{errors.earningAmount}</p>}
                    </div>
                    <div className='epf-div'>
                        <input type='checkbox'
                            checked={isEpfChecked}
                            onChange={() => setIsEpfChecked(!isEpfChecked)}
                            className='epf-checkbox'
                        />
                        <p className='epf-text'>EPF/ETF</p>
                    </div>
                    <div className='cancel-add-div'>
                        <button className='cancel-btn' onClick={handleEarningCancel}>Cancel</button>
                        <button className='add-btn' onClick={handleAddEarning}>Add</button>
                    </div>
                </div>
            }

            {
                displayEdit &&
                <div className='earning-topup'>
                    <div className='add-new-earning-div'>
                        <p className='earning-header-text'>Edit Earnings</p>
                        <img onClick={handleEarningCancel} style={{ cursor: "pointer" }} src={cancel} alt='cancel-icon' />
                    </div>
                    <hr />
                    <div className='earning-name-div'>
                        <p className='earning-name-text'>Earnings Name</p>
                        <input type='text' value={earningNameEdit} onChange={(e) => setEarningNameEdit(e.target.value)} className='add-earning-input' placeholder='Eg: Travel' />
                        {editErrors.earningNameEdit && <p className='error-text'>{editErrors.earningNameEdit}</p>}
                    </div>
                    <div className='earning-name-div'>
                        <p className='earning-name-text'>Amount</p>
                        <input type='text' value={earningAmountEdit} onChange={(e) => setEarningAmountEdit(e.target.value)} className='add-earning-input' placeholder='Eg: 10,000' />
                        {editErrors.earningAmountEdit && <p className='error-text'>{editErrors.earningAmountEdit}</p>}
                    </div>
                    <div className='epf-div'>
                        <input type='checkbox'
                            checked={isEpfCheckedEdit}
                            onChange={() => setIsEpfCheckedEdit(!isEpfCheckedEdit)}
                            className='epf-checkbox'
                        />
                        <p className='epf-text'>EPF/ETF</p>
                    </div>
                    <div className='cancel-add-div'>
                        <button className='cancel-btn' onClick={handleEarningCancel}>Cancel</button>
                        <button className='add-btn' onClick={handleEditEarning}>Edit</button>
                    </div>
                </div>
            }

            <div className='earnings-div'>
                <p className='earnings-text'>{allowanceName}</p>
                <p className='earnings-details'>{allowanceText}</p>
                <div>
                    {
                        earningData?.map((val, index) => (
                            <AllowanceCard
                                key={index}
                                name={val.earningName}
                                amount={val.earningAmount}
                                check={val.isEpfChecked}
                                cancel={() => handleEarningClose(index)}
                                edit={() => handleEarningEdit(val, index)}
                            />
                        ))
                    }
                </div>
                <div className='add-allowance' onClick={toggleAllowanceDisplay}>
                    <FaPlus style={{ color: "#00318C" }} />
                    <p className='add-allowance-text'>Add New {allowanceType}</p>
                </div>
                <hr style={{ color: "#E0E0E0", backgroundColor: "#E0E0E0" }} />
            </div>
        </div>
    );
}

export default UserDetails;
