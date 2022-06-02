import React from 'react';
import {Helmet} from "react-helmet"
import './meta.scss'

export default function MetaHelmet({title, des, keyword}) {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={des} />
        <meta name="keywords" content={keyword} />
      </Helmet>
    </>
  );
}

MetaHelmet.defaultProps={
  title: `WebShop Pro~Development`,
  des: `Lunch Pre-Website with the latest technology as what we called as MERN stack`,
  keyword: `Web Development, Mobile Development, Desktop App Development, Game Development, Interior Design UX/UI, Animation Video, Music DJ Spectrum`
}
