import style from '../../../styles/component/smallRadio.module.css'

const SmallRadio = (props:any) => {
  return (
    <>
        <label className={style.radioDivSpan} >
            <label className={style.customRadio} onTouchStart={props.onTouchStart}>
              {
                (props.value==props.otherValue)?
                <input type="radio" name={props.name} 
                id={props.value}
                value={props.value} 
                className={style.radio}
                onChange={props.onChange} checked />
                :
                <input type="radio" name={props.name} 
                id={props.value}
                value={props.value} 
                className={style.radio}
                onChange={props.onChange} />
              }
                
                {/* <span></span> */}
                <span className={style.checkmark}></span> 
            </label>
            <p style={{fontSize:"14px"}}>{props.value}</p>
        </label>
    </>
  )
}

export default SmallRadio