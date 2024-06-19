import { IoOptions } from "react-icons/io5";
import style from "../../../styles/uiComponents.module.css";
import { createRef } from "react";
const ref=createRef<HTMLSelectElement>()

export const CustomizableInputs = (props: any) => {
  return (
    <>
      <input
        type={props.type}
        className={style.customizableInputButtons}
        placeholder={props.placeholder}
        id={props.id}
        // value={props.value}
        name={props.name}
        onChange={props.onChange}
        value={props.value}
      />
    </>
  );
};

export const CustomizableSelect = (props: any) => {
  return <></>;
};

export const CustomizableInputButtonsWithSelect = (props: any) => {
  const { text, placeholder, name, id, value0, value1, value2 } = props;
  return (
    <>
      <div className={style.customizableInputButtonsWithSelect}>
        <input
          className={style.customizableInputPartOnly}
          type={text}
          placeholder={placeholder}
          name={props.name1}
          onChange={props.onChange}
        ></input>
        <div className={style.partationDiv}></div>
        <div className={style.customizableSelectPartOnly}>
          <select
          ref={ref}
            id={id}
            
            name={props.name2}
            onChange={props.onChange}
          >
            
            <option value={value0} selected disabled>
              {value0}
            </option>

            <option value={value1}>{value1}</option>

            <option value={value2}>{value2}</option>
          </select>
        </div>
      </div>
    </>
  );
};
