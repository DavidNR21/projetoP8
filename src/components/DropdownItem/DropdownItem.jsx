/* eslint-disable react/prop-types */

import "./stylesDropdownItem.css";

const DropdownItem = ({ children, onClick }) => {
    
  return (
    <div className="dropdown-item" onClick={onClick}>
      {children}
    </div>
  );
};


export default DropdownItem;