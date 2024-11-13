/* eslint-disable react/prop-types */

import { forwardRef } from "react";
import "./stylesDropdownButton.css";


const DropdownButton = forwardRef((props, ref) => {
  const { children, toggle, open } = props;


  return (
    <div
      onClick={toggle}
      className={`dropdown-btn ${open ? "button-open" : null}`}
      ref={ref}
    >
      {children}
      <span className="toggle-icon">
        {open ? <i id="dropIcon" className='bx bx-chevron-up'></i> : <i id="dropIcon" className='bx bx-chevron-down'></i>}
      </span>
    </div>
  );
});

DropdownButton.displayName = 'DropdownButton'

export default DropdownButton
