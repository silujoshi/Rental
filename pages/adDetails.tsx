import type { NextPage } from "next";
import CustomUploadZone from "../components/customUploadZone";
import styles from "../styles/adDetails.module.css";
import style from "../styles/uiComponents.module.css";
import React, { useState, useEffect, useRef } from "react";
import {
  CustomizableInputs,
  CustomizableInputButtonsWithSelect,
} from "../components/ui components/input/InputButtons";
import Layout from "../components/Layout";
import Head from "next/head";
import { useFormik } from "formik";
import { adDetailsSchema } from "../components/validationSchema";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { increment } from "../slices/progressBarSlice";
import { Icon } from "@iconify/react";
import {
  changeInfo,
  changepopUpBg,
  changeLoadingScreeen,
} from "../slices/payPopSlice";
import axios from "axios";
// import UploadZone from "../components/ui components/uploadZone";

const AdDetails: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const page = useSelector((state: RootState) => state.progressBar.value);
  const [info, setInfo] = useState("");
  const [images, setImages] = useState<FileList>();
  const [rollBack, setRollBack] = useState<any>({});

  // const imgFile=useRef();
  // const [persist,setPersist]=useState<any[]>([])
  // const [processedImages, setProcessedImages] = useState([]);
  const files = useSelector((state: RootState) => state.payPop.files);

  let i =
    typeof window !== "undefined" && (sessionStorage.getItem("image") as any);

  // console.log('filesfrom', dataURItoBlob(files[0]))
  // console.log('filesfrom str',files)
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      try {
        if (page == 1) {
          sessionStorage.clear();
          localStorage.removeItem("propertyToken");
          router.push("/basicDetails");
        }
      } catch {
        console.log("milena");
      }
      document.title = "Ad Details";
      dispatch(changeInfo("Upload Image"));
      setRollBack(details);

      if (sessionStorage.getItem("details")) {
        var details: any = JSON.parse(sessionStorage.getItem("details") ?? " ");
        if (details.title) {
          values.youtubeLink = details.youtubeLink;
          values.propertyTitle = details.title;
          values.propertyPrice = details.price;
          values.label = details.label;
          values.description = details.description;
        }
      }
    }
  });

  useEffect(() => {
    if (typeof images != "undefined" && images.length > 0) {
      values.image = images;
    }
    console.log("images", values.image);
    console.log("images main", images);
    console.log("images", images?.length);
  }, [images]);

  const submitData = async (data: BodyInit) => {
    const config = {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzg4NDc4YzY0ODI5YzhlMzg4ODYzOWUiLCJyb2xlIjoic3VwZXJhZG1pbiIsImlhdCI6MTY2OTk4MjAxOSwiZXhwIjoyMjc0NzgyMDE5fQ.K3ereptAn2D5QkNgDpyb5azImuXU9wxcwccjlfkwqiM`,
      },
    };
    try {
      const response: any = await axios.post(
        "https://basobaasnew.asterdio.xyz/api/properties/",
        data,
        config
      );
      console.log("post response", response);
      return response.data.property._id;
    } catch (e) {
      console.log("post error", e);
    }
  };

  const putData = async (data: BodyInit, propertyToken: string) => {
    const config = {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzg4NDc4YzY0ODI5YzhlMzg4ODYzOWUiLCJyb2xlIjoic3VwZXJhZG1pbiIsImlhdCI6MTY2OTk4MjAxOSwiZXhwIjoyMjc0NzgyMDE5fQ.K3ereptAn2D5QkNgDpyb5azImuXU9wxcwccjlfkwqiM`,
      },
    };
    try {
      const response: any = await axios.put(
        `https://basobaasnew.asterdio.xyz/api/properties/${propertyToken}`,
        data,
        config
      );
      console.log("post response", response);
      return response.data.property._id;
    } catch (e) {
      console.log("post error", e);
    }
  };

  const previous = (e: Event) => {
    e.preventDefault();
    router.push("/propertyDetails");
  };

  interface inintialValues {
    image: any;
    youtubeLink: string;
    propertyTitle: string;
    propertyPrice: string;
    label: string;
    description: string;
  }

  const initialValues: inintialValues = {
    image: [],
    youtubeLink: "",
    propertyTitle: "",
    propertyPrice: "",
    label: "",
    description: "",
  };

  const { values, errors, touched, handleSubmit, handleChange } = useFormik({
    initialValues: initialValues,
    validationSchema: adDetailsSchema,
    onSubmit: async (values, formikHelpers) => {
      if (page == 3) {
        dispatch(increment());
      }
      dispatch(changepopUpBg());
      dispatch(changeLoadingScreeen());
      sessionStorage.setItem("page", "4");
      var details: any = JSON.parse(
        sessionStorage.getItem("details") ?? ({} as any)
      );
      details.youtubeLink = values.youtubeLink;
      details.title = values.propertyTitle;
      details.price = values.propertyPrice;
      details.label = values.label;
      details.description = values.description;
      details.propertyImages = images;
      delete details.ownerId;
      const formData = new FormData();
      console.log(details.amenities);

      for (var key in details) {
        if (key == "amenities") {
          for (let j in details[key]) {
            formData.append(key, details[key][j]);
          }
        } else if (key == "propertyImages") {
          for (let j in details[key]) {
            formData.append(key, details[key][j]);
            console.log(key, details[key][j]);
          }
        } else {
          formData.append(key, details[key]);
        }
      }
      const propertyId = localStorage.getItem("propertyToken") ?? null;
      console.log("propertyId", propertyId);
      if (!propertyId) {
        // if(propertyId?.length==0){'

        //static banako
        // const propertyToken = await submitData(formData);
        // console.log("post")
        // if (propertyToken) {
        //   localStorage.setItem("propertyToken", propertyToken)

        // }
        sessionStorage.setItem("details", JSON.stringify(details));
        dispatch(changepopUpBg());
        dispatch(changeLoadingScreeen());
        router.push("/otherDetails");
        // else{
        //   alert("Total Area should be greater than Built area")
        //   dispatch(changepopUpBg())
        //   dispatch(changeLoadingScreeen())
        // }
      } else {
        console.log("put");
        // await putData(formData, propertyId)
        sessionStorage.setItem("details", JSON.stringify(details));
        dispatch(changepopUpBg());
        dispatch(changeLoadingScreeen());
        router.push("/otherDetails");
      }
    },
  });

  return (
    <>
      <Layout
        topic="Ad Details"
        onSubmit={handleSubmit}
        page="3"
        back=": Property Details"
        previous={previous}
        info={info}
        next=" : Owner Details"
      >
        <div className={styles.adDetailsMainWrapper}>
          <div className={styles.adDetailsUploads}>
            <label className={styles.topic}>
              Upload Images
              <a href="#" style={{ display: "flex" }}>
                <Icon
                  icon="humbleicons:info-circle"
                  width="16"
                  height="16"
                  className={styles.infoIcon}
                  onClick={() => {
                    dispatch(changeInfo("Upload Image"));
                  }}
                />
              </a>
            </label>

            <div className={styles.image}>
              <CustomUploadZone setImages={setImages} files={images} />
            </div>
            <div>
              <small id="emailHelp" className="form-text text-muted">
                *The first image is thumbnail for this listing
              </small>
            </div>
            {errors.image &&
            touched.image &&
            (!images || images?.length === 0) ? (
              <span className={styles.error}>Please enter image</span>
            ) : (
              errors.image &&
              touched.image &&
              (!images || images?.length > 10) && (
                <span className={styles.error}>
                  You can only enter 10 images
                </span>
              )
            )}
          </div>

          <div
            className={styles.adDetailsYoutube}
            onClick={() => {
              setInfo("Youtube Video Link");
            }}
          >
            <label className={styles.topic}>
              Youtube Video Link
              <a href="#" style={{ display: "flex" }}>
                <Icon
                  icon="humbleicons:info-circle"
                  width="16"
                  height="16"
                  className={styles.infoIcon}
                  onClick={() => {
                    dispatch(changeInfo("Youtube Video Link"));
                  }}
                />
              </a>
            </label>
            <div className={styles.inputWrapper}>
              <CustomizableInputs
                type={"text"}
                placeholder={"eg.www.youtube.com/asada"}
                id={""}
                name="youtubeLink"
                onChange={handleChange}
                value={values.youtubeLink}
              />
              {errors.youtubeLink && touched.youtubeLink && (
                <span className={styles.error}>{errors.youtubeLink}</span>
              )}
            </div>
          </div>

          <div className={styles.flexTwo}>
            <div
              className={styles.adDetailsTitle}
              onClick={() => {
                setInfo("Title");
              }}
            >
              <label className={styles.topic}>
                Title
                <a href="#" style={{ display: "flex" }}>
                  <Icon
                    icon="humbleicons:info-circle"
                    width="16"
                    height="16"
                    className={styles.infoIcon}
                    onClick={() => {
                      dispatch(changeInfo("Title"));
                    }}
                  />
                </a>
              </label>
              <CustomizableInputs
                type={"text"}
                placeholder={"Enter Property Title"}
                id={""}
                name="propertyTitle"
                onChange={handleChange}
                value={values.propertyTitle}
              />
              {errors.propertyTitle && touched.propertyTitle && (
                <span className={styles.error}>{errors.propertyTitle}</span>
              )}
            </div>

            <div
              className={styles.adDetailsPrice}
              onClick={() => {
                setInfo("Price");
              }}
            >
              <label className={styles.topic}>
                Price
                <a href="#" style={{ display: "flex" }}>
                  <Icon
                    icon="humbleicons:info-circle"
                    width="16"
                    height="16"
                    className={styles.infoIcon}
                    onClick={() => {
                      dispatch(changeInfo("Price"));
                    }}
                  />
                </a>
              </label>
              <div className={style.customizableInputButtonsWithSelect}>
                <input
                  className={style.customizableInputPartOnly}
                  type="text"
                  placeholder="Property Price"
                  name="propertyPrice"
                  onChange={handleChange}
                  value={values.propertyPrice}
                ></input>
                <div className={style.partationDiv}></div>
                <div className={style.customizableSelectPartOnly}>
                  <select
                    name="label"
                    onChange={handleChange}
                    value={values.label}
                  >
                    <option value="" selected disabled>
                      Label
                    </option>
                    <option value="per sqft">Per Sqft</option>
                    <option value="per month">Per Month</option>
                    <option value="per sqm">Per Sqm</option>
                    <option value="onwards">Onwards</option>
                  </select>
                </div>
              </div>
              {(errors.propertyPrice || errors.label) &&
                (touched.propertyPrice || touched.label) && (
                  <span className={styles.doubleError}>
                    <span className={styles.error}>{errors.propertyPrice}</span>
                    {errors.label && touched.label && (
                      <span className={styles.error}>{errors.label}</span>
                    )}
                  </span>
                )}
            </div>
          </div>

          <div
            className={styles.adDetailsFormDescription}
            onClick={() => {
              setInfo("Description");
            }}
          >
            <label className={styles.topic}>
              Description{" "}
              <a href="#" style={{ display: "flex" }}>
                <Icon
                  icon="humbleicons:info-circle"
                  width="16"
                  height="16"
                  className={styles.infoIcon}
                  onClick={() => {
                    dispatch(changeInfo("Description"));
                  }}
                />
              </a>
            </label>
            <div className={styles.descriptionDiv}>
              <textarea
                className={styles.textArea}
                id="adDetailsFormDescription"
                placeholder="Description about your property"
                name="description"
                onChange={handleChange}
                value={values.description}
              />
            </div>

            {errors.description && touched.description && (
              <span className={styles.error}>{errors.description}</span>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};
export default AdDetails;
