import style from "../.../../../styles/customCheckbox.module.css"

const AmenitiesCheckbox=(props:any)=> {
  return (
    <>   
        <label className={style.amenitiesLabel}>
          {
            // const arr:[]=
          (props.otherValue.includes(props.value))?
          <input type="checkbox" name="amenities" value={props.value} className={style.aminitiesCheckbox} onChange={props.onChange} checked />
            :
            <input type="checkbox" name="amenities" value={props.value} className={style.aminitiesCheckbox} onChange={props.onChange} />
          }
            <div>
                <p>{props.holder}</p>
            </div>
        </label>
    </>
  )
}

export default AmenitiesCheckbox