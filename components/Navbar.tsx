import style from "../styles/Navbar.module.css";
import Image from "next/image";
import BasobasLogo from "../Images/BasobasLogo.svg";
import buldingLogo from "../Images/buldingLogo.svg";
import search from "../Images/search.svg";
import navPerson from "../Images/navPerson.svg";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { incrementByAmount } from "../slices/progressBarSlice";
import { useDispatch, useSelector } from "react-redux";

const Navbar: NextPage = () => {
  const links: any = [
    { placeholder: "Buy", link: "https://basobaas.com/properties/for-sale" },
    { placeholder: "Rent", link: "https://basobaas.com/properties/for-rent" },
    {
      placeholder: "Home Loans",
      link: "https://basobaas.com/homeloan",
    },
    { placeholder: "Blogs", link: "https://basobaas.com/blog/" },
    {
      placeholder: "Agencies",
      link: "https://basobaas.com/agencies",
    },
    {
      placeholder: "Unit Converter",
      link: "https://basobaas.com/unit-converter",
    },
  ];
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <>
      <div className={style.nav}>
        <div className={style.leftDiv}>
          <div
            className={style.logo}
            onClick={() => {
              dispatch(incrementByAmount(1));
              router.push("/basicDetails");
            }}
          >
            <Image src={BasobasLogo} alt="no image" />
          </div>
          <div className={style.linkDiv}>
            {links.map((data: any) => (
                <a key={data.placeholder} href={data.link} className={style.links} target="_blank">
                  <span className={style.linksData}>{data.placeholder}</span>
                </a>
            ))}
          </div>
        </div>

        <div className={style.rightDiv}>
          <div className={style.searchIcon}>
            <Image src={search} alt="no image" />
          </div>
          <div className={style.buttonDiv}>
            <button className={style.blueButton}>
              <span>
                <Image src={buldingLogo} alt="no image" />
              </span>
              <p>List Your Property</p>
            </button>
            <div className={style.userDiv}>
              <div className={style.imageDiv}>
                <Image src={navPerson} alt="no image" />
              </div>
              <p className={style.name}> Ram Bahadur</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
