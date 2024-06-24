import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allowanceData:[],
    deductionsData:[],
    basicSalary:'',

}

const userDataSlice = createSlice({
     name:'userData',
     initialState,
     reducers:{
        addAllowance: (state, action) => {
            state.allowanceData = action.payload;
        },

        addDeductions: (state, action) => {
            state.deductionsData=action.payload;
        },

        addBasicSalary:(state,action) =>{
            state.basicSalary=action.payload;
        }

     }
})

export const { addAllowance,addDeductions,addBasicSalary } = userDataSlice.actions;
export default userDataSlice.reducer