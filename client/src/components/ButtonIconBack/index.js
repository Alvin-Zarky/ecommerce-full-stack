import React from 'react';
import {Link} from "react-router-dom"
import * as Routes from "../../router"
import './button.scss'

export default function ButtonBack() {
  return (
    <>
      <div className='link-back'>
        <Link to={Routes.INDEX}>
          <span>Go back</span>
        </Link>
      </div>
    </>
  );
}
