import type { NextPage } from "next";
import style from "../styles/propertyDetails.module.css";
// import DigitalPaymentPop from '../components/digitalPaymantPop'
import AmenitiesCheckbox from "../components/ui components/customCheckbox";
import Layout from "../components/Layout";
import { FormikValues, useFormik } from "formik";
import { propertyDetailsSchema } from "../components/validationSchema";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { increment } from "../slices/progressBarSlice";
import { useState, useEffect, useRef } from "react";
import { changeInfo } from "../slices/payPopSlice";
import { Icon } from "@iconify/react";
import axios from "axios";

const PropertyDetails: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const page = useSelector((state: RootState) => state.progressBar.value);
  const [info, setInfo] = useState("");
  const [list, setList] = useState<[]>([]);
  const [city, setCity] = useState([
    { name: "Kathmandu", _id: "111111" },
    { name: "Birathnagar", _id: "2222222" },
    { name: "Hetauda", _id: "33333333" },
  ]);
  const [rollBack, setRollBack] = useState<FormikValues>({});
  // var list:[]=[]

  const getData = async () => {
    try {
      const response = await axios.get(
        "https://basobaasnew.asterdio.xyz/api/property-amenities/"
      );
      setList(response.data.amenities);
      // console.log(response)
      // console.log("list ho la", list)
      const cityRes = await axios.get(
        "https://basobaasnew.asterdio.xyz/api/city"
      );
      await setCity(cityRes.data.city);
      console.log("cityRes:", city);
    } catch (e) {
      alert(e);
    }
  };

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

      document.title = "Property Details";
      dispatch(changeInfo("Location"));
      getData();
      // values.wardNumber="ashim"
      if (sessionStorage.getItem("details")) {
        var details: any = JSON.parse(sessionStorage.getItem("details") ?? " ");
        setRollBack(details);
        console.log(details, rollBack);
        if (details.wardNumber) {
          values.wardNumber = details.wardNumber;
          // details.wardNumber = values.wardNumber;
          // details.city = "6375e1d9a771ab4368586e55";
          values.city = details.city;
          values.propertyArea = details.locality;
          values.areaMetric = details.areaMetric;
          values.totalArea = details.totalArea;
          // details.areaMetric=values.totalAreaUnit
          values.builtUpArea = details.buildUpArea;
          // details.areaMetric=values.builtUpAreaUnit
          values.propertyFace = details.facing;
          values.roadAreaMetric = details.unit;
          values.roadAccess = details.access;
          values.roadType = details.roadType;
          values.builtYear = details.buildYear;
          values.totalFloors = details.totalFloors;
          values.furnishing = details.furnishing;
          values.numberOFUnits = details.multipleUnit;
          values.noOfBedroom = details.bedroom;
          values.noOfBathroom = details.bathroom;
          values.noOfKitchen = details.kitchen;
          values.noOfLivingroom = details.livingRoom;
          values.amenities = details.amenities;
        }
      }
    }
  });

  const previous = (e: Event) => {
    e.preventDefault();
    router.push("/basicDetails");
  };

  const amenities = [
    "Lawn",
    "Drainage",
    "Jacuzzi",
    "Garage",
    "Parking",
    "Air Condition",
    "Balcony",
    "Deck",
    "Fencing",
    "Garden",
    "CCTV",
    "Gym",
    "Microwave",
    "Modular Kitchen",
    "Swimming Pool",
    "TV Cable",
    "Electricity Backup",
    "Intercom",
    "Internet",
    "Kids Playground",
    "Lift",
    "Maintainance",
    "Security Staff",
    "Store Room",
  ];

  const initialValues = {
    wardNumber: "",
    city: "",
    propertyArea: "",
    areaMetric: "",
    totalArea: "",
    // totalAreaUnit: "",
    builtUpArea: "",
    // builtUpAreaUnit: "",
    propertyFace: "",
    roadAreaMetric: "",
    roadAccess: "",
    roadType: "",
    builtYear: "",
    totalFloors: "",
    furnishing: "",
    numberOFUnits: "",
    noOfBedroom: "",
    noOfBathroom: "",
    noOfKitchen: "",
    noOfLivingroom: "",
    amenities: [],
  };

  const { values, errors, touched, handleSubmit, handleChange } = useFormik({
    initialValues: initialValues,
    validationSchema: propertyDetailsSchema,

    onSubmit: async (values, formikHelpers) => {
      console.log(values);
      if (page == 2) {
        dispatch(increment());
      }
      var details: any = JSON.parse(sessionStorage.getItem("details") ?? " ");
      console.log(details);
      details.wardNumber = values.wardNumber;
      details.city = values.city;
      details.locality = values.propertyArea;
      details.areaMetric = values.areaMetric;
      details.totalArea = values.totalArea;
      // details.areaMetric=values.totalAreaUnit
      details.buildUpArea = values.builtUpArea;
      // details.areaMetric=values.builtUpAreaUnit
      details.facing = values.propertyFace;
      details.unit = values.roadAreaMetric;
      details.access = values.roadAccess;
      details.roadType = values.roadType;
      details.buildYear = values.builtYear;
      details.totalFloors = values.totalFloors;
      details.furnishing = values.furnishing;
      details.multipleUnit = values.numberOFUnits;
      details.bedroom = values.noOfBedroom;
      details.bathroom = values.noOfBathroom;
      details.kitchen = values.noOfKitchen;
      details.livingRoom = values.noOfLivingroom;
      details.amenities = values.amenities;

      sessionStorage.setItem("page", "3");
      sessionStorage.setItem("details", JSON.stringify(details));

      router.push("/adDetails");
    },
  });

  return (
    <>
      {/* <DigitalPaymentPop /> */}
      <Layout
        onSubmit={handleSubmit}
        topic="Property Details"
        page="2"
        back=": Basic Details"
        previous={previous}
        info={info}
        next=" : Ad Details"
      >
        <div className={style.propertydetails_container}>
          <div className={style.locationComponent}>
            <label>
              Location
              <a
                href="#"
                style={{ display: "flex" }}
                onClick={() => {
                  dispatch(changeInfo("Location"));
                }}
              >
                <Icon
                  icon="humbleicons:info-circle"
                  width="20"
                  height="20"
                  className={style.infoIcon}
                />
              </a>
            </label>

            <div className={style.all_input_fields}>
              <div className={style.inputFeildRow}>
                <div className={style.feildDiv}>
                  <input
                    className={style.input_only}
                    type="text"
                    placeholder="Ward Number"
                    name="wardNumber"
                    onChange={handleChange}
                    value={values.wardNumber}
                  />
                  {errors.wardNumber && touched.wardNumber && (
                    <span className={style.error}>{errors.wardNumber}</span>
                  )}
                </div>

                <div className={style.dropdown_only}>
                  <select
                    name="city"
                    onChange={handleChange}
                    value={values.city}
                  >
                    <option value="" selected disabled>
                      Property City
                    </option>
                    {city.map(
                      (
                        cities: { _id: string; name: string },
                        index: number
                      ) => (
                        <option value={cities._id} key="index">
                          {cities.name}
                        </option>
                      )
                    )}
                  </select>
                  {errors.city && touched.city && (
                    <span className={style.error}>{errors.city}</span>
                  )}
                </div>
              </div>
              <div className={style.feildDiv}>
                <input
                  className={style.input_only}
                  type="text"
                  placeholder="Property Area"
                  name="propertyArea"
                  onChange={handleChange}
                  value={values.propertyArea}
                />
                {errors.propertyArea && touched.propertyArea && (
                  <span className={style.error}>{errors.propertyArea}</span>
                )}
              </div>
            </div>
          </div>

          <div className={style.areaComponent}>
            <label>
              Area
              <a href="#" style={{ display: "flex" }}>
                <Icon
                  icon="humbleicons:info-circle"
                  width="20"
                  height="20"
                  className={style.infoIcon}
                  onClick={() => {
                    dispatch(changeInfo("Area Location"));
                  }}
                />
              </a>
            </label>
            <div className={style.areaLocation}>
              <div className={style.inputFeildRow}>
                <div className={style.dropdown_only}>
                  <select
                    value={values.areaMetric}
                    name="areaMetric"
                    onChange={handleChange}
                    placeholder="Select Area Metric"
                  >
                    <option value="" disabled>
                      Select Area Metric
                    </option>
                    <option value="aana">Aana</option>
                    <option value="dhur">Dhur</option>
                  </select>
                  {errors.areaMetric && touched.areaMetric && (
                    <span className={style.error}>{errors.areaMetric}</span>
                  )}
                </div>

                <div className={style.input_dropdown}>
                  <div>
                    <input
                      className={style.input_with_dropdown}
                      name="totalArea"
                      // value={values.totalArea}
                      type="text"
                      placeholder=" Total Area(e.g. 0-1-2-4)"
                      onChange={handleChange}
                      value={values.totalArea}
                    />

                    <hr className={style.gapBtw} />
                    <div className={style.dropdown_with_input}>
                      {values.areaMetric ? values.areaMetric : "Unit"}
                    </div>
                  </div>
                  {errors.totalArea && touched.totalArea && (
                    <span className={style.error}>{errors.totalArea}</span>
                  )}
                </div>
              </div>

              <div className={style.inputFeildRow}>
                <div
                  className={style.input_dropdown}
                  style={{
                    display: rollBack.category == "land" ? "none" : "block",
                  }}
                >
                  <div>
                    <input
                      className={style.input_with_dropdown}
                      type="text"
                      placeholder="Built Up Area(e.g. 0-1-2-4)"
                      name="builtUpArea"
                      onChange={handleChange}
                      value={values.builtUpArea}
                    />
                    <hr className={style.gapBtw} />
                    <div className={style.dropdown_with_input}>
                      {values.areaMetric ? values.areaMetric : "Unit"}
                    </div>
                  </div>
                  {errors.builtUpArea && touched.builtUpArea && (
                    <span className={style.error}>{errors.builtUpArea}</span>
                  )}
                </div>
                <div className={style.feildDiv}>
                  <input
                    className={style.input_only}
                    type="text"
                    placeholder="Property Face"
                    name="propertyFace"
                    onChange={handleChange}
                    value={values.propertyFace}
                  />
                  {errors.propertyFace && touched.propertyFace && (
                    <span className={style.error}>{errors.propertyFace}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className={style.roadComponent}>
            <label>
              Road
              <a href="#" style={{ display: "flex" }}>
                <Icon
                  icon="humbleicons:info-circle"
                  width="20"
                  height="20"
                  className={style.infoIcon}
                  onClick={() => {
                    dispatch(changeInfo("Road"));
                  }}
                />
              </a>
            </label>
            <div className={style.all_input_fields}>
              <div className={style.inputFeildRow}>
                <div className={style.dropdown_only}>
                  <select
                    name="roadAreaMetric"
                    onChange={handleChange}
                    value={values.roadAreaMetric}
                  >
                    <option value="" selected disabled>
                      Select Area Metric
                    </option>
                    <option value="feet">Feet</option>
                    <option value="meter">Meter</option>
                  </select>
                  {errors.roadAreaMetric && touched.roadAreaMetric && (
                    <span className={style.error}>{errors.roadAreaMetric}</span>
                  )}
                </div>

                <div className={style.feildDiv}>
                  <input
                    className={style.input_only}
                    type="text"
                    placeholder="Road Acess(e.g. 14)"
                    name="roadAccess"
                    onChange={handleChange}
                    value={values.roadAccess}
                  />
                  {errors.roadAccess && touched.roadAccess && (
                    <span className={style.error}>{errors.roadAccess}</span>
                  )}
                </div>
              </div>
              <div className={style.dropdown_only}>
                <select
                  name="roadType"
                  onChange={handleChange}
                  value={values.roadType}
                >
                  <option value="" selected disabled>
                    Road Type
                  </option>
                  <option value="soil stabilized">Soil Stabilized</option>
                  <option value="gravelled">Gravelled</option>
                  <option value="paved">Paved</option>
                  <option value="black topped">Black topped</option>
                </select>
                {errors.roadType && touched.roadType && (
                  <span className={style.error}>{errors.roadType}</span>
                )}
              </div>
            </div>
          </div>

          <div
            className={style.buldingDetailsComponent}
            style={{ display: rollBack.category == "land" ? "none" : "block" }}
          >
            <label>
              Building Details
              <a href="#" style={{ display: "flex" }}>
                <Icon
                  icon="humbleicons:info-circle"
                  width="20"
                  height="20"
                  className={style.infoIcon}
                  onClick={() => {
                    dispatch(changeInfo("Bulding Details"));
                  }}
                />
              </a>
            </label>
            <div className={style.all_input_fields}>
              <div className={style.inputFeildRow}>
                <div className={style.dropdown_only}>
                  <select
                    name="builtYear"
                    onChange={handleChange}
                    value={values.builtYear}
                  >
                    <option value="" selected disabled>
                      Built Year
                    </option>
                    <option value="2000">2000</option>
                    <option value="2001">2001</option>
                  </select>
                  {errors.builtYear && touched.builtYear && (
                    <span className={style.error}>{errors.builtYear}</span>
                  )}
                </div>
                <div className={style.dropdown_only}>
                  <select
                    name="totalFloors"
                    onChange={handleChange}
                    value={values.totalFloors}
                  >
                    <option value="" selected disabled>
                      Total Floors
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                  {errors.totalFloors && touched.totalFloors && (
                    <span className={style.error}>{errors.totalFloors}</span>
                  )}
                </div>
              </div>
              <div className={style.dropdown_only}>
                <select
                  name="furnishing"
                  onChange={handleChange}
                  value={values.furnishing}
                >
                  <option value="" selected disabled>
                    Furnishing
                  </option>
                  <option value="fully furnished">Fully Furnished</option>
                  <option value="unfurnished">Unfurnished</option>
                  <option value="semi furnished">Semi Furnished</option>
                </select>
                {errors.furnishing && touched.furnishing && (
                  <span className={style.error}>{errors.furnishing}</span>
                )}
              </div>
            </div>
          </div>

          <div
            className={style.multipleUnitsComponent}
            style={{ display: rollBack.category == "land" ? "none" : "block" }}
          >
            <label>
              Muntiple Units
              <a href="#" style={{ display: "flex" }}>
                <Icon
                  icon="humbleicons:info-circle"
                  width="20"
                  height="20"
                  className={style.infoIcon}
                  onClick={() => {
                    dispatch(changeInfo("Multiple Unit"));
                  }}
                />
              </a>
            </label>
            <div className={style.multipleUnits}>
              <div className={style.dropdown_only}>
                <select
                  name="numberOFUnits"
                  onChange={handleChange}
                  value={values.numberOFUnits}
                >
                  <option value="" selected disabled>
                    Number Of Units
                  </option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                  {/* <option value="3">3</option> */}
                </select>
                {errors.numberOFUnits && touched.numberOFUnits && (
                  <span className={style.error}>{errors.numberOFUnits}</span>
                )}
              </div>
            </div>
          </div>

          <div
            className={style.totalRoomsComponent}
            style={{ display: rollBack.category == "land" ? "none" : "block" }}
          >
            <label>
              Total Rooms
              <a href="#" style={{ display: "flex" }}>
                <Icon
                  icon="humbleicons:info-circle"
                  width="20"
                  height="20"
                  className={style.infoIcon}
                  onClick={() => {
                    dispatch(changeInfo("Total Rooms"));
                  }}
                />
              </a>
            </label>
            <div className={style.all_input_fields}>
              <div className={style.inputFeildRow}>
                <div className={style.feildDiv}>
                  <input
                    className={style.input_only}
                    type="text"
                    placeholder="Total Bed Room"
                    name="noOfBedroom"
                    onChange={handleChange}
                    value={values.noOfBedroom}
                  />
                  {errors.noOfBedroom && touched.noOfBedroom && (
                    <span className={style.error}>{errors.noOfBedroom}</span>
                  )}
                </div>
                <div className={style.feildDiv}>
                  <input
                    className={style.input_only}
                    type="text"
                    placeholder="Total Bathroom"
                    name="noOfBathroom"
                    onChange={handleChange}
                    value={values.noOfBathroom}
                  />
                  {errors.noOfBathroom && touched.noOfBathroom && (
                    <span className={style.error}>{errors.noOfBathroom}</span>
                  )}
                </div>
              </div>

              <div className={style.inputFeildRow}>
                <div className={style.feildDiv}>
                  <input
                    className={style.input_only}
                    type="text"
                    placeholder="Total Kitchen"
                    name="noOfKitchen"
                    onChange={handleChange}
                    value={values.noOfKitchen}
                  />
                  {errors.noOfKitchen && touched.noOfKitchen && (
                    <span className={style.error}>{errors.noOfKitchen}</span>
                  )}
                </div>
                <div className={style.feildDiv}>
                  <input
                    className={style.input_only}
                    type="text"
                    placeholder="Total Living Room"
                    name="noOfLivingroom"
                    onChange={handleChange}
                    value={values.noOfLivingroom}
                  />
                  {errors.noOfLivingroom && touched.noOfLivingroom && (
                    <span className={style.error} style={{ zIndex: "5" }}>
                      {errors.noOfLivingroom}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className={style.amenitiesComponent}>
            <label className={style.label} htmlFor="">
              Amenities
              <a href="#" style={{ display: "flex" }}>
                <Icon
                  icon="humbleicons:info-circle"
                  width="20"
                  height="20"
                  className={style.infoIcon}
                  onClick={() => {
                    dispatch(changeInfo("Amenities"));
                  }}
                />
              </a>
            </label>
            <div className={style.aminitiesDiv}>
              {/* <AminitiesCheckbox value="Aminities" /> */}
              {amenities?.map((value: any, key) => (
                <AmenitiesCheckbox
                  value={value}
                  otherValue={values.amenities}
                  onChange={handleChange}
                  key={key}
                  holder={value}
                />
              ))}
            </div>
            {errors.amenities && touched.amenities && (
              <span className={style.error}>{errors.amenities}</span>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};
export default PropertyDetails;
