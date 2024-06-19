import style from "../../styles/esewaPaymentPop.module.css"
import { Icon } from "@iconify/react"
import Image from "next/image"
import eSewa from "../../Images/eSewa.svg"
import { useDispatch, useSelector } from "react-redux"
import { change, changePaymentStatus, changepopUpBg, changePopUpPage } from "../../slices/payPopSlice"
import { RootState } from "../../store"
import axios from "axios"
import { Interface } from "readline/promises"
import { useEffect, useRef } from "react"

const EsewaPaymantPop = () => {


    const dispatch = useDispatch()
    const packageInfo = useSelector((state: RootState) => state.payPop.packageInfo)

    const createUNiqueId = async (data: any) => {
        const config = {
            headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzg4NDc4YzY0ODI5YzhlMzg4ODYzOWUiLCJyb2xlIjoic3VwZXJhZG1pbiIsImlhdCI6MTY2OTk4MjAxOSwiZXhwIjoyMjc0NzgyMDE5fQ.K3ereptAn2D5QkNgDpyb5azImuXU9wxcwccjlfkwqiM` }
        };
        try {
            const uniqId = await axios.post("https://basobaasnew.asterdio.xyz/api/payment", data, config)
            console.log("esewa id sc : ", uniqId.data.payment.paymentId);
            return (uniqId);
        } catch (e) {
            console.log("esewa id : ", e)
        }
    }

    // const ref = useRef(true)
    useEffect(() => {
    //     if (ref) {
    //         ref.current = false;
            console.log("packageINfo", packageInfo)
    //         const propertyToken: string = sessionStorage.getItem("propertyToken")??""
    //         const data: { amount: any; plan: string; property: string } = {
    //             amount: packageInfo.price,
    //             plan: packageInfo.plan,
    //             property: propertyToken
    //         }
    //         const token:any=createUNiqueId(data)
    //         console.log("token",token)
            

    //     }
    })
    const confirm = async () => {

        try {
            const propertyToken: string = localStorage.getItem("propertyToken")??""
            const data: { amount: any; plan: string; property: string } = {
                amount: packageInfo.price,
                plan: packageInfo.plan,
                property: propertyToken
            }
            console.log(data)

            //getting new token form backend
            // const token:any= await createUNiqueId(data)

            localStorage.setItem("packageInfo",packageInfo.plan)
            
            // setTimeout(() => {  console.log(token.data.payment.paymentId)  ; }, 5000);
            // console.log("token:",token.data.payment.paymentId)

            var path = "https://uat.esewa.com.np/epay/main";
            var params: any = {
                amt: packageInfo.price,
                psc: 0,
                pdc: 0,
                txAmt: 0,
                tAmt: packageInfo.price,
                // pid: token.data.payment.paymentId,
                pid:"new_payment_token",
                scd: "EPAYTEST",
                su: "https://basobaasnew.asterdio.xyz/api/payment/payment-verification?q=su",
                fu: "https://basobaasnew.asterdio.xyz/api/payment/payment-verification?q=fu"
            }

            var form = document.createElement("form");
            form.setAttribute("method", "POST");
            form.setAttribute("action", path);

            for (var key in params) {
                var hiddenField = document.createElement("input");
                hiddenField.setAttribute("type", "hidden");
                hiddenField.setAttribute("name", key);
                hiddenField.setAttribute("value", params[key]);
                form.appendChild(hiddenField);
            }

            document.body.appendChild(form);
            form.submit();
            console.log("trigerred")
        } catch (error) {
            console.log(error, "error aayo sir")
        }
        finally {
            console.log("posted")
        }
        // dispatch(changePopUpPage(3))
        // dispatch(changePaymentStatus(true))
    }

    return (
        <div className={style.popContainer}>
            <Icon icon="radix-icons:cross-2" width="24" height="24" className={style.crossButton} onClick={() => { dispatch(change()); dispatch(changePopUpPage(1)) }} />

            <div className={style.topDiv}>
                <Icon icon="ph:caret-left-bold" width="24" height="24" inline={true} className={style.backIcon} onClick={() => { dispatch(changePopUpPage(1)) }} />
                <div className={style.topic}>Billing Summary</div>
            </div>
            <div className={style.midDiv}>
                <div className={style.selectPlanDiv}>
                    <label className={style.labels}>Selected Plan</label>
                    <div className={style.packageDetailsDiv}>
                        <p className={style.packageDetails}>{packageInfo.name} <b className={style.anotherPlan}>(Choose another plan)</b></p>
                        <p className={style.packagePrice}>Rs. {packageInfo.price2}</p>
                    </div>
                </div>
                <div className={style.paymentDiv}>
                    <label className={style.labels}>Payment</label>
                    <div className={style.paymentOption}>
                        <div className={style.imageDiv}>
                            <Image src={eSewa} alt="image not found" />
                        </div>
                    </div>
                </div>
            </div>

            <div className={style.totalPayDiv}>
                <p className={style.totalPay}>Total Pay</p>
                <p className={style.totalPayAmount}>Rs. {packageInfo.price2}</p>
            </div>

            <button className={style.confirmButton} onClick={confirm} >Confirm</button>

        </div>
    )
}

export default EsewaPaymantPop