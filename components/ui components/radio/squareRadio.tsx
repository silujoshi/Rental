import style from '../../../styles/basicDetail.module.css'

function SquareRadio(props: any) {
  return (
    <label className={style.propertyCategoryCard} onTouchStart={props.onTouchStart}>
      {
        (props.value==props.otherValue)?
        <input type="radio" name="propertyCategory" value={props.value} className={style.categoryRadio} onChange={props.onChange} checked />
        :
        <input type="radio" name="propertyCategory" value={props.value} className={style.categoryRadio} onChange={props.onChange} />

      }
      <div className={style.div}>
        <span>{props.icon}</span>
        <p>{props.value}</p>
      </div>
    </label>
  )
}

export default SquareRadio