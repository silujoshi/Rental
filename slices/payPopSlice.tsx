import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface PopUpState {
  value: boolean,
  information:string,
  popUpBg:boolean,
  popUpPage:number,
  packageInfo:{name:string,price:any,price2:any,plan:string},
  paymentStatus:boolean,
  registrationStatus:boolean,
  files:any,
  loadingScreen:boolean
}

const initialState: PopUpState = {
  value: false,
  information:"",
  popUpBg:false,
  popUpPage:1,
  packageInfo:{name:"",price:0,price2:"",plan:""},
  paymentStatus:false,
  registrationStatus:false,
  files:[],
  loadingScreen:false
}

export const payPopSlice = createSlice({
  name: 'payPop',
  initialState,
  reducers: {
    change: (state) => {
      state.value=!state.value
      state.popUpBg=!state.popUpBg
    },
    changeInfo:(state, action: PayloadAction<string>)=>{
      state.information=action.payload
    },
    changepopUpBg:(state)=>{
      state.popUpBg=!state.popUpBg
    },
    changePopUpPage:(state, action: PayloadAction<number>)=>{
      state.popUpPage=action.payload
    },
    changePackageInfo:(state, action: PayloadAction<{name:string,price:any,price2:any,plan:string}>)=>{
      state.packageInfo=action.payload
    },
    changeRegistrationStatus:(state,action: PayloadAction<boolean>)=>{
      state.registrationStatus=action.payload
    },
    changePaymentStatus:(state,action: PayloadAction<boolean>)=>{
      state.paymentStatus=action.payload
    },
    saveFiles:(state,action)=>{
      console.log('files',action.payload)
      state.files=action.payload
    },
    changeLoadingScreeen:(state)=>{
      state.loadingScreen=!state.loadingScreen
    }
  },
})

// Action creators are generated for each case reducer function
export const {change,changeInfo,changepopUpBg,changePopUpPage,changePackageInfo,changeRegistrationStatus,changePaymentStatus,saveFiles,changeLoadingScreeen} =payPopSlice.actions

export default payPopSlice.reducer