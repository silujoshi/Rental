import style from "../../styles/selectPackagePop.module.css"
import Image from "next/image"
import tickMark from "../../Images/tickMark.svg"
import blueArrow from "../../Images/blueArrow.svg"
import { change, changepopUpBg } from "../../slices/payPopSlice"
import { Icon } from "@iconify/react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
// import {useState} from "react"
import SelectPackagePop from "./selectPackagePop"
import EsewaPaymantPop from "./esewaPaymantPop"
import PaymentStatusPop from "./paymentStatusPop"





const PaymentPop = (props:any) => {

  // const [pop,setPop]=useState(1);
  const dispatch=useDispatch();
  const status=useSelector((state:RootState)=>state.payPop.value)
  const page=useSelector((state:RootState)=>state.payPop.popUpPage)
  const list = ["30 Days Validation", "Number of Listing:1", "Mobile number of all response", "High position in"]

  return (
    <div style={{display:status?"flex":"none"}}>
      {
        (page==1)?<SelectPackagePop />:
          (page==2)?<EsewaPaymantPop/>:
              <PaymentStatusPop/>
      }
    </div>
  )
}

export default PaymentPop