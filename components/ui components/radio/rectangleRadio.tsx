import style from '../../../styles/basicDetail.module.css'

const RectangleRadio = (props: any) => {
  return (
    <label className={style.propertyTypeCard} onTouchStart={props.onTouchStart}>
      {(props.value==props.otherValue)?
      <input type="radio" name="propertyType" value={props.value} className={style.categoryRadio} onChange={props.onChange} checked />
      :
      <input type="radio" name="propertyType" value={props.value} className={style.categoryRadio} onChange={props.onChange} />}
      <div>
        {props.icon} {props.value}
      </div>
    </label>
  )
}

export default RectangleRadio