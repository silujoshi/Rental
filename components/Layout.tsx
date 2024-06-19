import { useState } from "react"
import Navbar from "./Navbar"
import style from '../styles/layout.module.css'
import { ReactElement } from "react"
import ProgressBar from "./ui components/progressBar"
import Link from "next/link"
import { IoInformationCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from "../store"
import { Icon } from "@iconify/react"
import { changeInfo } from "../slices/payPopSlice"
import cn from "classnames"
import { Display } from "@icon-park/react"
import { incrementByAmount } from "../slices/progressBarSlice";
import LoadingScreen from './PopUps/loadingScreen';



import { useRouter } from "next/router"

// const page = useSelector((state: RootState) => state.progressBar.value)
const Layout = ({ children, topic, onSubmit, page, previous, info, next, back }:
  { children: any; topic: string; onSubmit: any; page: any; previous: any; info: any; next: string; back: string }) => {

  const dispatch = useDispatch();
  const router = useRouter()
  const information = useSelector((state: RootState) => state.payPop.information)
  const popUpBg = useSelector((state: RootState) => state.payPop.popUpBg)
  const list: any = {
    "Ad Category": [["Sale", "Select this option if you want to post your property for selling purpose."],
    ["Rent", "Select this option if you want to post your property for rental/leasing purpose."]],
    "Property Type": [["Residential", "Select this option if your property is for personal use only."],
    ["Commercial", "Select this option if your property is for official, trading purpose or in the commercial market"],
    ["Agricultural", "Select this option if your property of for agricultural purpose (farming)"]],
    "Property Category": [["House", "Select this option if your property is a structural building built on a piece of land"],
    ["Land", "Select this option if your property is an open space."],
    ["Flat", "Select this option if your property is a defined sq ft with defined number of rooms."]],
    "Location": [["Location", "Providing accurate location helps both the seller and the buyer for easy access of the property. Enter the Ward No, City and Area of the property."]],
    "Area Location": [["Area", "Here Area defines the space acquired by the property. First choose the metric (aana, ropani, etc), then enter the total area your property is standing in. if the property has sq ft, do enter those where applicable. Then enter the property face."]],
    "Road": [["Road", "Provide information about the road that is around your property including road access the property has and the type of road. "]],
    "Bulding Details": [["Building Details", "Here you provide the details of when the property was built with number of total floors and if the property is furnished, non-furnished or semi-furnished."]],
    "Multiple Unit": [["Multiple Units", "This applies in the case of housings and colonies where there are multiple units or houses."]],
    "Total Rooms": [["Total Rooms", "Provide information about the rooms in your property, from bedroom, bathroom, kitchen and living room."]],
    "Amenities": [["Amenities", "Select all applicable amenities that are available and included in your property."]],
    "Upload Image": [["Upload Image", "Please upload high quality images of your property including all the rooms, terrace, balcony, road and surroundings."]],
    "Youtube Video Link": [["Youtube Video Link", "If the video of your property is available in YouTube, please copy and paste the video link here."]],
    "Title": [["Title", "Write the Title of your property. This is how your property will be displayed."]],
    "Price": [["Price", "Enter the price of your property."]],
    "Description": [["Description", "Include all the necessary information that a buyer will need to know about your property. "]],
    "Owner Info": [["Use My Info", "This is where your own info will be displayed."],
    ["Use Different Owner", "This is where you can add any other owner who is responsible for the property."]],
    "Ad Pricing Plan": [["Ad Pricing Plan", "Basobaas.com gives you the ability to either free list your property or choose paid listing for certain amount of fee. "]]
  }
  const a = "Ad Pricing Plan"


  return (
    <>
      <div className={style.alignmentContainer}>
        <LoadingScreen/>
        <div className={cn({ [style.popUpBg]: popUpBg, [style.popUpBgInv]: !popUpBg })} >
        </div>
        <div className={cn({ [style.popUpMobileBg]: information != "", [style.popUpMobileBgInv]: information == '', })} >
        </div>
        <div className={style.navBlend}>
          <div className={style.nav}>
            <Navbar />
          </div>
        </div>
        <div className={style.coverUpDiv}></div>
        <div className={style.containerDiv}>
        <div className={style.coverUpDiv2}></div>

          <div className={style.contentDiv}>
            {/* <div className={style.innerCoverUpDiv}></div> */}
            <div className={style.sideProgress}>
              <div className={style.topDiv}>
                <a href="#" className={style.backToDash} onClick={()=>{
                  dispatch(incrementByAmount(1))
                  router.push("/basicDetails")
                }} >
                  <Icon icon="ic:round-chevron-left" width="24" height="24" />
                  Back to Dashboard
                </a>
                <a href="#" className={style.topDraft}>Save as Draft</a>
              </div>

              <div className={style.midDiv}>
                <p className={style.midDetails}>{topic}</p>
                <div className={style.progressBarDiv}>
                  <ProgressBar page={page} />
                </div>
              </div>
            </div>

            <div className={style.mainDiv}>
              <div className={style.postProperty}>
                <p>Post Property For Free</p>
              </div>

              <div className={style.mainBotDiv}>

                <div className={style.botLeftDiv}>
                  <div className={style.topicDiv}>
                    <h1>{topic}</h1>
                  </div>
                  <form className={style.mainContentDiv}>

                    <div className={style.mainContentBody}>
                      {children}
                    </div>

                    <div className={style.footer}>
                      <div className={style.buttonDiv}>
                        <div className={style.submitDiv}>
                          <span className={style.savetoDraft}>Save as draft</span>
                          <button className={style.next} type="submit" onClick={onSubmit} >Next<span className={style.buttonValue}>{next}</span></button>
                        </div>
                        <button className={style.previous} style={{ display: (back == "none") ? "none" : "flex" }} onClick={previous}>
                          <span className={style.buttonValueMobile}>Previous</span>
                          <span className={style.buttonValue}>Back {back}</span>
                        </button>
                      </div>
                    </div>
                  </form>

                </div>

                <div className={cn({ [style.botRightDiv]: information != "", [style.botRightDivInv]: information == '', })}>
                  <div className={style.infoInnerDiv}>
                    <div className={style.infoTopic}>
                      <p><Icon icon="humbleicons:info-circle" width="20" height="20" />INFORMATION</p>
                      <Icon icon="radix-icons:cross-2" width="20" height="20" className={style.crossButton}
                        onClick={() => { dispatch(changeInfo("")) }} />
                    </div>
                    <div className={style.infoContentDiv}>
                      <h3>
                        {information}
                      </h3>
                      <div className={style.infoContent}>
                        {/* Information about stuff */}
                        <div className={style.aboutInfo}>
                          {(!!information) && "Here you have to select one option where these options indicate following information"}
                        </div>
                        <div className={style.infoTable}>
                          {
                            (!!information) ?
                              // list.forEach(element => {

                              // });
                              list[`${information}`].map((value: any, index: number) =>
                                <div className={style.infoTableRow} key={index}>
                                  <div className={style.infoTableTopic}>{value[0]}</div>
                                  <div className={style.infoTableContent}>{value[1]}</div>
                                </div>)
                              : ""
                          }

                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout