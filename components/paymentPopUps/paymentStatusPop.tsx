import { Icon } from "@iconify/react"
import style from "../../styles/paymentStatusPop.module.css"
import Image from "next/image"
import PaymentSuccessBg from "../../Images/paymentSuccessBg.svg"
import PaymentFaildBg from "../../Images/paymentFaildBg.svg"
import whiteTickMark from "../../Images/whiteTickMark.svg"
import { useDispatch, useSelector } from "react-redux"
import { change, changepopUpBg, changePopUpPage, changeRegistrationStatus } from "../../slices/payPopSlice"
import { RootState } from "../../store"
import axios from "axios"
import {useEffect,useRef} from "react"


const PaymentStatusPop=()=> {

  const addPropertyPlan=async()=>{
    try{
      const config = {
        headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzg4NDc4YzY0ODI5YzhlMzg4ODYzOWUiLCJyb2xlIjoic3VwZXJhZG1pbiIsImlhdCI6MTY2OTk4MjAxOSwiZXhwIjoyMjc0NzgyMDE5fQ.K3ereptAn2D5QkNgDpyb5azImuXU9wxcwccjlfkwqiM` }
    };
    const propertyToken=localStorage.getItem("propertyToken")
    const packageInfo=localStorage.getItem("packageInfo")
    const data={property:propertyToken,plan:packageInfo}
      const response = await axios.post("https://basobaasnew.asterdio.xyz/api/user-plans/",data,config)
      console.log(response)
    }
    catch(e){
      console.log(e)
    } 
  }

  const ref=useRef(true)
  useEffect(()=>{
    if (payment&&ref){
      ref.current=false
      addPropertyPlan();      
    }
  })

  const dispatch=useDispatch()
  const status=useSelector((state:RootState)=>state.payPop.value)
  const payment=useSelector((state:RootState)=>state.payPop.paymentStatus)

  const done=async()=>{
    dispatch(change());
    dispatch(changePopUpPage(1))
    dispatch(changepopUpBg())
    dispatch(changeRegistrationStatus(true))
    
  }
  return (
    <>
    {
      (payment)?
      <div className={style.mainWrapper} style={{display:status?"flex":"none"}} >
        <Icon icon="radix-icons:cross-2" width="20" height="20" className={style.crossButton} onClick={() => { done()}} />
        <div className={style.iconDiv}>
            <Image src={PaymentSuccessBg} alt="no image" />
            <div className={style.tickMark}><Image src={whiteTickMark} alt="no image" /></div>
        </div>
        <div className={style.botDiv}>
            <div className={style.bigFont}>Payment Sucessfull</div>
            <div className={style.smallFont}>Your payment has been completed</div>
        </div>
    </div>
    :
    <div className={style.mainWrapper} style={{display:status?"flex":"none"}} >
        <Icon icon="radix-icons:cross-2" width="20" height="20" className={style.crossButton} onClick={() => { done()}} />      
        <div className={style.iconDiv}>
        <Image src={PaymentFaildBg} alt="no image" />
        <Icon icon="ic:round-close" color="white" width="50" height="50" className={style.crossMark} />
        </div>

        <div className={style.botDiv}>
            <div className={style.bigFont}>Payment Failed</div>
            <div className={style.smallFont}>Your payment was unsucessful</div>
        </div>
    </div>
    }
    </>
    
  )
}

export default PaymentStatusPop