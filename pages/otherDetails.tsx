import { useFormik } from "formik"
import { GetServerSideProps, NextPage } from "next"
import Head from "next/head"
import style from "../styles/otherDetails.module.css"
import Layout from "../components/Layout"
import SmallRadio from "../components/ui components/radio/smallRadio"
import { otherDetailsSchema } from "../components/validationSchema"
import { useRouter } from "next/router"
import { useState, useEffect, useRef } from "react"
import PaymentPop from '../components/paymentPopUps/paymentPop'
import PropertyRegisteredPopUp from "../components/PopUps/propertyRegisteredPopUp"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store"
import { change, changeInfo, changePaymentStatus, changepopUpBg, changeRegistrationStatus } from "../slices/payPopSlice"
import { Icon } from "@iconify/react"
import axios from "axios"





const OtherDetails: NextPage = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [rollBack, setRollBack] = useState<any>({})
    const [info, setInfo] = useState("");
    // const [pay, setPay] = useState(false);
    const page = useSelector((state: RootState) => state.progressBar.value)
    const pay = useSelector((state: RootState) => state.payPop.paymentStatus);
    const id = router.query
    // console.log(id) 

    const firstRender = useRef(true)
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false
            // dispatch(change())
            try {
                if (page == 1) {
                    sessionStorage.clear()
                    localStorage.removeItem("propertyToken")
                    router.push('/basicDetails')
                }
            }
            catch {
                console.log("milena")
            }
            document.title = "Other Details"
            dispatch(changeInfo("Owner Info"))
            setRollBack(details)
            if (sessionStorage.getItem("details")) {
                if (sessionStorage.getItem("page") == "4") {
                    var details: any = JSON.parse(sessionStorage.getItem("details") ?? ' ')
                    if (details.name) {
                        values.name = details.name,
                            values.email = details.email,
                            values.phoneNumber = details.phone
                    }
                    if (sessionStorage.getItem("owner")) {
                        var owner: any = JSON.parse(sessionStorage.getItem("owner") ?? ' ')
                        values.adPricingtype = owner.adPricingtype
                        values.ownerType = owner.ownerType
                    }
                }
            }
        }
    })


    const previous = (e: Event) => {
        e.preventDefault()
        router.push('/adDetails')
    }

    const initialValues = {
        ownerType: "",
        name: "",
        email: "",
        phoneNumber: null,
        adPricingtype: ""
    }
    const { values, errors, touched, handleSubmit, handleChange } = useFormik({
        initialValues: initialValues,
        validationSchema: otherDetailsSchema,
        onSubmit: async (values, formikHelpers) => {
            const details = {
                name: values.name,
                email: values.email,
                phone: values.phoneNumber
            }
            try {
                const config = {
                    headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzg4NDc4YzY0ODI5YzhlMzg4ODYzOWUiLCJyb2xlIjoic3VwZXJhZG1pbiIsImlhdCI6MTY2OTk4MjAxOSwiZXhwIjoyMjc0NzgyMDE5fQ.K3ereptAn2D5QkNgDpyb5azImuXU9wxcwccjlfkwqiM` }
                };
                const ashim: any = {
                    for: "rent",
                    type: "agricultural",
                    category: "land",
                    coordinates: "41.40338,2.17403",
                    wardNumber: "12",
                    streetName: "asterdio road",
                    city: "6375e1d9a771ab4368586e55",
                    locality: "Sankhamul",
                    areaMetric: "bigha",
                    totalArea: "10-2-1-1",
                    buildUpArea: "9-1-1-1",
                    facing: "east",
                    unit: "feet",
                    access: '8',
                    roadType: 'gravelled',
                    buildYear: '2020',
                    totalFloors: '7',
                    furnishing: 'unfurnished',
                    amenities: ['6364c9050910364b36d1644d', '6364c9870910364b36d16458'],
                    view360Link: 'https://www.youtube.com/watch?v=H2lRuOsfUlU',
                    youtubeLink: 'https://www.youtube.com/watch?v=H2lRuOsfUlU',
                    title: 'Basobaas',
                    description: 'Build your dream building  here',
                    price: '1000000000000',
                    deal: 'negotiable',
                    label: 'onwards',
                    ownerId: "22626asas",
                    name: 'Niru Mishr',
                    phone: '981186as5755',
                    email: 'ashrestha@asterdio.com',
                    country: 'USA',
                    kitchen: "2",
                    bedroom: "2",
                    bathroom: "2",
                    parking: "2",
                    livingRoom: "2",
                }

                const propertyToken = localStorage.getItem("propertyToken")
                console.log(propertyToken)
                // const response: any = await axios.put(`https://basobaasnew.asterdio.xyz/api/properties/${propertyToken}`,
                //     details, config)
                // console.log("response : ", response)
                var session: any = JSON.parse(sessionStorage.getItem("details") ?? {} as any)
                session = { ...session, ...details }
                sessionStorage.setItem("details", JSON.stringify(session))
                var owner = { ownerType: values.ownerType, adPricingtype: values.adPricingtype }
                sessionStorage.setItem("owner", JSON.stringify(owner))
                if (values.adPricingtype == "Paid Listing") {
                    if (pay) {
                        dispatch(changepopUpBg())
                        dispatch(changeRegistrationStatus(true))
                    }
                    else {
                        dispatch(change())
                    }
                }
                else {
                    dispatch(changepopUpBg())
                    dispatch(changeRegistrationStatus(true))
                    localStorage.removeItem("propertyToken")
                }
            } catch (err) {
                console.log(err)
            }

        }
    })

    return (
        <>
            <PropertyRegisteredPopUp />
            <PaymentPop />
            <Layout topic="Other Details" onSubmit={handleSubmit} page="4" back=": Ad Detail" previous={previous} info={info} next=": Save & Continue">
                <div className={style.otherDetailsContainer}>
                    <div className={style.ownerInfo} >
                        <p className={style.title}>Owner Info
                            <Icon icon="humbleicons:info-circle" width="20" height="20" className={style.infoIcon} onClick={() => { dispatch(changeInfo("Owner Info")) }} />
                        </p>
                        <div className={style.ownerRadioDivWrapper}>
                            <div className={style.ownerRadioDiv}>
                                <SmallRadio name="ownerType" value="Use my info" onChange={handleChange} otherValue={values.ownerType} />
                                <SmallRadio name="ownerType" value="Use Different Owner" onChange={handleChange} otherValue={values.ownerType} />
                            </div>
                            {errors.ownerType && touched.ownerType && <span className={style.error}>{errors.ownerType}</span>}
                        </div>
                        <div className={style.ownerInfoDiv}>
                            <div className={style.inputFeildRow}>
                                <div className={style.inputFeildDiv}>
                                    <input
                                        className={style.inputFeild}
                                        placeholder="Full Name"
                                        type="text"
                                        name="name"
                                        onChange={handleChange}
                                        value={values.name}
                                    />
                                    {errors.name && touched.name && <span className={style.error}>{errors.name}</span>}
                                </div>
                                <div className={style.inputFeildDiv}>
                                    <input
                                        className={style.inputFeild}
                                        placeholder="Email"
                                        type="text"
                                        name="email"
                                        onChange={handleChange}
                                        value={values.email}
                                    />
                                    {errors.email && touched.email && <span className={style.error}>{errors.email}</span>}
                                </div>
                            </div>
                            <div className={style.inputFeildDiv}>
                                <input
                                    className={style.inputFeild}
                                    placeholder="Phone Number"
                                    type="text"
                                    name="phoneNumber"
                                    onChange={handleChange}
                                    value={values.phoneNumber ?? ""}
                                />
                                {errors.phoneNumber && touched.phoneNumber && <span className={style.error}>{errors.phoneNumber}</span>}
                            </div>
                        </div>
                    </div>

                    <div className={style.adPricingDiv} >
                        <p className={style.title}>Ad Pricing Plan
                            <Icon icon="humbleicons:info-circle" width="20" height="20" className={style.infoIcon} onClick={() => { dispatch(changeInfo("Ad Pricing Plan")) }} />
                        </p>
                        <div className={style.adPricingRadioDiv}>
                            <SmallRadio name="adPricingtype" value="Free Listing" onChange={handleChange} otherValue={values.adPricingtype} />
                            <SmallRadio name="adPricingtype" value="Paid Listing" onChange={handleChange} otherValue={values.adPricingtype} />
                        </div>
                        {errors.adPricingtype && touched.adPricingtype && <span style={{ marginTop: "-15px" }} className={style.error}>{errors.adPricingtype}</span>}
                    </div>
                    {/* <img src={sessionStorage.getItem("propertyImage")??""} alt="no image"/> */}
                </div>
            </Layout>
        </>
    )
}

export default OtherDetails