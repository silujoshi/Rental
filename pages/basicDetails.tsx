import type { NextPage } from 'next'
import { useState, useEffect, useRef } from "react"
import Head from 'next/head'
import style from '../styles/basicDetail.module.css'
import SmallRadio from '../components/ui components/radio/smallRadio'
import RectangleRadio from '../components/ui components/radio/rectangleRadio'
import SquareRadio from '../components/ui components/radio/squareRadio'
import Layout from '../components/Layout'
import { useFormik } from 'formik'
import { basicDetailsSchema } from '../components/validationSchema'
import { increment } from '../slices/progressBarSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { useRouter } from "next/router"
import { Icon } from '@iconify/react';
import { changeInfo } from '../slices/payPopSlice'


const BasicDetail: NextPage = () => {
  const dispatch = useDispatch();
  const page = useSelector((state: RootState) => state.progressBar.value);
  const router = useRouter();
  const [info, setInfo] = useState("");
  const [rollBack, setRollBack] = useState({})


  const initialValues = {
    adCategory: "",
    propertyType: "",
    propertyCategory: ""
  }

  const details: any = {
    for: "",
    type: "",
    category: "",
    coordinates: "41.40338,2.17403",
    // wardNumber: "",
    streetName: "asterdio road",
    // city: "6375e1d9a771ab4368586e55",
    // locality: "",
    // areaMetric: "",
    // totalArea: "",
    // buildUpArea: "",
    // facing: "",
    // unit: "",
    // access: '',
    // roadType: '',
    // buildYear: '',
    // totalFloors: '',
    // furnishing: '',
    // amenities: [],
    view360Link: 'https://www.youtube.com/watch?v=H2lRuOsfUlU',
    youtubeLink: 'https://www.youtube.com/watch?v=H2lRuOsfUlU',
    // title: '',
    // description: '',
    // price: '',
    deal: 'negotiable',
    // label: '',
    ownerId: "22626asas",
    // name: 'Niru Mishr',
    // phone: '981186as5755',
    // email: 'ashrestha@asterdio.com',
    country: 'Nepal',
    // availability:'available',
    //status:active,
    // kitchen: "",
    // bedroom: "",
    // bathroom: "",
    // parking: "2",
    // livingRoom: "",
    // propertyImage:[]
  }

  const firstRender = useRef(true)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      document.title = "Basic Details";
      dispatch(changeInfo("Ad Category"))
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
      if (sessionStorage.getItem("details")) {
        var details: any = JSON.parse(sessionStorage.getItem("details") ?? ' ')
        // console.log("yei ho maal pani",details)
        setRollBack(details)
        values.adCategory = details.for;
        values.propertyType = details.type;
        values.propertyCategory = details.category;
        console.log(values)

      }
      else {
        console.log("mall xaina")
      }

      // sessionStorage.setItem("details",JSON.stringify(details))
      if (!sessionStorage.getItem("page")) {
        sessionStorage.setItem("page", "1")
      }
      // (document.getElementById("sale")!=null)&&document.getElementById("sale")?.checked=true
    }
  })

  const { values, errors, touched, handleSubmit, handleChange } = useFormik({
    initialValues: initialValues,
    validationSchema: basicDetailsSchema,
    onSubmit: (values, formikHelpers) => {
      sessionStorage.setItem("page", "2")
      console.log("basic Details")
      console.log(values)
      if (page == 1) {
        dispatch(increment())
      }
      details.for = values.adCategory;
      details.type = values.propertyType;
      details.category = values.propertyCategory;
      console.log(details)
      if (sessionStorage.getItem("details")) {
        var temp: any = JSON.parse(sessionStorage.getItem("details") ?? ' ')
        var temp2 = { ...temp, ...details }
        sessionStorage.setItem("details", JSON.stringify(temp2))
      }
      else {
        sessionStorage.setItem("details", JSON.stringify(details))
      }

      router.push('/propertyDetails');
    }
  })




  return (
    <>
      <Layout onSubmit={handleSubmit} topic="Basic Details" page="1" back="none" previous="none" info={info} next=" : Property Detail">
        <div className={style.basicDetailWrapper}>
          <div className={style.adCategoryDiv} >
            <p className={style.topic}>Ad Category
              <a style={{ display: "flex" }} href='#' onClick={() => { dispatch(changeInfo("Ad Category")) }}>
                <Icon icon="humbleicons:info-circle" width="16" height="16" className={style.infoIcon} />
              </a>
            </p>
            <div className={style.radioDiv}>
              <SmallRadio value="sale" name="adCategory" onChange={handleChange} otherValue={values.adCategory} />
              <SmallRadio value="rent" name="adCategory" onChange={handleChange} otherValue={values.adCategory} />
              {/* <SmallRadio value="Lease" name="adCategory" onChange={handleChange} /> */}
            </div>
            {errors.adCategory && touched.adCategory && <span className={style.error}>{errors.adCategory}</span>}
          </div>

          <div className={style.propertyTypeDiv} >
            <p className={style.topic}>
              Property Type
              <a style={{ display: "flex" }} href='#' onClick={() => { dispatch(changeInfo("Property Type")) }} >
                <Icon icon="humbleicons:info-circle" width="16" height="16" className={style.infoIcon} />
              </a>
            </p>

            <div className={style.propertyTypeDivRow}>
              <RectangleRadio icon={<Icon icon="bx:home" width="16" height="16" inline={true} />}
                value="residential" onChange={handleChange} otherValue={values.propertyType} />
              <RectangleRadio icon={<Icon icon="icon-park-outline:building-two" width="16" height="16" inline={true} />}
                value="commercial" onChange={handleChange} otherValue={values.propertyType} />
              <RectangleRadio icon={<Icon icon="icon-park-outline:landscape" width="16" height="18" inline={true} />}
                value="agricultural" onChange={handleChange} otherValue={values.propertyType} />
            </div>
            {errors.propertyType && touched.propertyType && <span className={style.error}>{errors.propertyType}</span>}
          </div>

          <div className={style.propertyCategoryDiv} >
            <p className={style.topic}>Property Category
              <a style={{ display: "flex" }} href='#' onClick={() => { dispatch(changeInfo("Property Category")) }}>
                <Icon icon="humbleicons:info-circle" width="16" height="16" className={style.infoIcon} />
              </a>
            </p>
            <div className={style.propertyCategoryRow} >
              <SquareRadio value="house" icon={<Icon icon="bx:home" width="18" height="18" inline={true} />} onChange={handleChange} otherValue={values.propertyCategory} />
              <SquareRadio value="land" icon={<Icon icon="bx:home" width="18" height="18" inline={true} />} onChange={handleChange} otherValue={values.propertyCategory} />
              {/* <SquareRadio value="flat" icon={<Icon icon="bx:home" width="18" height="18" inline={true} />} onChange={handleChange} /> */}
              {
                (values.propertyType!="agricultural")&&<SquareRadio value="apartment" icon={<Icon icon="bx:home" width="18" height="18" inline={true} />} onChange={handleChange} otherValue={values.propertyCategory} />

              }
              {/* <SquareRadio value="business" icon={<Icon icon="bx:home" width="18" height="18" inline={true} />} onChange={handleChange} /> */}
              {/* <SquareRadio value="office" icon={<Icon icon="bx:home" width="18" height="18" inline={true} />} onChange={handleChange} /> */}
            </div>
            {errors.propertyCategory && touched.propertyCategory && <span className={style.error}>{errors.propertyCategory}</span>}
          </div>
        </div>
      </Layout>
    </>
  )
}

export default BasicDetail