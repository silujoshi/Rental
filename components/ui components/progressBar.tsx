import style from "../../styles/progressBar.module.css"
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

const ProgressBar = (props:any) => {

    const page=useSelector((state:RootState)=>state.progressBar.value)

    const styleLine1={
        backgroundColor:page==1?" #012367":"#1CB35D",
        borderRight: page==1?"solid 1px #012367":"solid 1px #1CB35D",
        borderLeft: page==1?"solid 1px #012367":"solid 1px #1CB35D",
        opacity:"1"
    }

    const styleLine2={
        backgroundColor:page==2&&props.page==2?" #012367":page>2?"#1CB35D":"#DCDCDC",
        borderRight: page==2&&props.page==2?" solid 1px #012367":page>2?"solid 1px #1CB35D":"solid 1px #DCDCDC",
        borderLeft: page==2&&props.page==2?" solid 1px #012367":page>2?"solid 1px #1CB35D":"solid 1px #DCDCDC",
        opacity:"1"
    }

    const styleLine3={
        backgroundColor:page==3&&props.page==3?" #012367":page>3?"#1CB35D":"#DCDCDC",
        borderRight: page==3&&props.page==3?" solid 1px #012367":page>3?"solid 1px #1CB35D":"solid 1px #DCDCDC",
        borderLeft: page==3&&props.page==3?" solid 1px #012367":page>3?"solid 1px #1CB35D":"solid 1px #DCDCDC",
        opacity:"1"
    }

    const styleLine4={
        backgroundColor:page==4&&props.page==4?" #012367":page>4?"#1CB35D":"#DCDCDC",
        borderRight: page==4&&props.page==4?" solid 1px #012367":page>4?"solid 1px #1CB35D":"solid 1px #DCDCDC",
        borderLeft: page==4&&props.page==4?" solid 1px #012367":page>4?"solid 1px #1CB35D":"solid 1px #DCDCDC",
        opacity:"1"
    }

    const styleCircle1={
        border:props.page!=1?"solid rgba(225,225,225,0)":props.page==1&&page==1?"solid 2px #012367":"solid 2px #1CB35D",
        backgroundColor: props.page==1?"white":"rgba(225,225,225,0)",
    }

    const styleCircle2={
        border:props.page!=2?"solid rgba(225,225,225,0)":props.page==2&&page==2?"solid 2px #012367":"solid 2px #1CB35D",
        backgroundColor: props.page==2?"white":"rgba(225,225,225,0)",
    }

    const styleCircle3={
        border:props.page!=3?"solid rgba(225,225,225,0)":props.page==3&&page==3?"solid 2px #012367":"solid 2px #1CB35D",
        backgroundColor: props.page==3?"white":"rgba(225,225,225,0)",
    }

    const styleCircle4={
        border:props.page!=4?"solid rgba(225,225,225,0)":props.page==4&&page==4?"solid 2px #012367":"solid 2px #1CB35D",
        backgroundColor: props.page==4?"white":"rgba(225,225,225,0)",
    }

    const inCircle1={
        backgroundColor:page==1?" #012367":"#1CB35D"
    }

    const inCircle2={
        backgroundColor:page==2&&props.page==2?" #012367":page>2?"#1CB35D":"#DCDCDC",
        color:page<2?"#444444":"#FFFFFF"
    }

    const inCircle3={
        backgroundColor:page==3&&props.page==3?" #012367":page>3?"#1CB35D":"#DCDCDC",
        color:page<3?"#444444":"#FFFFFF"
    }

    const inCircle4={
        backgroundColor:page==4&&props.page==4?" #012367":page>4?"#1CB35D":"#DCDCDC",
        color:page<4?"#444444":"#FFFFFF"
    }

  return (
    <>
        <div className={style.progressSteps}>
            <div className={style.firstCircleDiv} >
                <div className={style.outerCircle} style={styleCircle1}>
                    <div className={style.innerCircle} style={inCircle1}>
                        1
                    </div>
                </div>
                <hr className={style.firstProgressLine} style={styleLine1} />
            </div>
            <div className={style.descriptionDiv} style={{fontWeight:props.page==1?"700":"400"}}>Basic Details</div>
        </div>

        <div className={style.progressSteps}>
            <div className={style.circleDiv} >
                <hr className={style.progressLine} style={styleLine2} />
                <div className={style.outerCircle} style={styleCircle2} >
                    <div className={style.innerCircle} style={inCircle2}>
                        2
                    </div>
                </div>
            </div>
            <div className={style.descriptionDiv} style={{fontWeight:props.page==2?"700":"400"}}>Property Details</div>
        </div>

        <div className={style.progressSteps}>
            <div className={style.circleDiv}>
                <hr className={style.progressLine} style={styleLine3} />
                <div className={style.outerCircle} style={styleCircle3} >
                    <div className={style.innerCircle} style={inCircle3}>
                        3
                    </div>
                </div>
            </div>
            <div className={style.descriptionDiv} style={{fontWeight:props.page==3?"700":"400"}}>Ad Details</div>
        </div>

        <div className={style.progressSteps}>
            <div className={style.finalCircleDiv}>
                <hr className={style.firstProgressLine} style={styleLine4} />
                <div className={style.outerCircle}  style={styleCircle4}>
                    <div className={style.innerCircle} style={inCircle4}>
                        4
                    </div>
                </div>
                
            </div>
            <div className={style.descriptionDiv} style={{fontWeight:props.page==4?"700":"400"}}>Other Details</div>
        </div>
    </>
  )
}

export default ProgressBar