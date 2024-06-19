import React, { createRef, useRef, useState } from 'react'
import style from "../styles/component/customUploadZone.module.css"
import Image from 'next/image'
import AddImage from "../Images/AddImage.svg"
import { Icon } from '@iconify/react'
import deleteButton from "../Images/deleteButton.svg"

const CustomUploadZone = ({setImages,files}:{setImages:any,files:any}) => {
  const [picture, setPicture] = useState<any>([])
  const image: any = useRef()
  // console.log(picture)
  
  function sliceIntoChunks(arr:[], chunkSize:number) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
}

function deleteImage(index:number){
  // console.log("index",index)
  setPicture([...picture.slice(0, index),...picture.slice(index + 1)])
  setImages([...picture.slice(0, index),...picture.slice(index + 1)])
}
  
  function makeChange(file: any) {
    if (picture.length==0)
    {
      setPicture([...file])
      setImages([...file])
    }
    else{
      setPicture([...picture,...file])
      setImages([...files,...file])
    }
  }

  if (picture.length==0){
    return(
      <label className={style.wrapper}>
        <label className={style.emptyIcon}>
          <div className={style.imageDiv}>
            <Image src={AddImage} alt="No Image" style={{display:"none"}} />
          </div>
          <div className={style.imageDivMobile}>
            <Image src={AddImage} height={20} width={20} alt="No Image" style={{display:"none"}} />
          </div>
          <label className={style.imageBlueButton}>
            <input multiple={true} type="file" ref={image} onChange={(e) =>makeChange(e.target.files)} />
            {/* <pre className={style.dropZone}></pre> */}
            Upload Image

          </label>
          <div className={style.textDiv}>
            <div className={style.texts1}>or drag photos here</div>
            <div className={style.texts2}>(up to 10 Photos)</div>
          </div>
          

        </label>
      </label>
    )
  }
  else 
  return(
    <div className={style.fullWrapper}>
        <div className={style.imageRow}>
          {
            sliceIntoChunks(picture,5)[0]?.map((files: any, index: number) => {
              return <div className={style.addedImageDiv} key={index}>
                <div className={style.deleteButton} onClick={()=>{deleteImage(index)}}>
                  <Image src={deleteButton} alt="noImage" />
                </div>
                <Image width={130} height={110} src={URL.createObjectURL(files)} alt="no image" />
              </div>
            })
          }
          <label className={style.addImage} style={{display:(picture.length>4)?"none":"flex"}}>
            <div className={style.contentDiv}>
              <Icon icon="ph:plus-duotone" color="#595959" width="30" height="30" />
              <div className={style.addPicDiv}>Add Image</div>
            </div>
            <input multiple={true} type="file" ref={image} onChange={e =>makeChange(e.target.files)} />
          </label>
        </div>

        {
        (picture.length>4)&&
          <div className={style.imageRow} >
          {
            sliceIntoChunks(picture,5)[1]?.map((files: any, index: number) => {
              return <div className={style.addedImageDiv} key={index}>
                <div className={style.deleteButton} onClick={()=>{deleteImage(index+5)}}>
                  <Image src={deleteButton} alt="noImage" />
                </div>
                <Image width={130} height={110} src={URL.createObjectURL(files)} alt="no image" />
              </div>
            })
          }
          <label className={style.addImage} style={{display:(picture.length>4&&picture.length<10)?"flex":"none"}}>
            <div className={style.contentDiv}>
              <Icon icon="ph:plus-duotone" color="#595959" width="30" height="30" />
              <div className={style.addPicDiv}>Add Image</div>
            </div>
            <input multiple={true} type="file" ref={image} onChange={e =>makeChange(e.target.files)} />
          </label>
        </div>
        }
      </div>
  )

}

export default CustomUploadZone