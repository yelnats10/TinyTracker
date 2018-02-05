import React from "react";
import PropTypes from 'prop-types';
import "./Dropdown.css";

class Dropdown extends React.Component {
  
  render () {
    return (
      <div className="form-group">
        <select className="form-control">
            <option value="0">Select Location</option>
            <option value="1">Basement</option>
            <option value="2">Garage</option>
            <option value="3">Second Floor</option>
            <option value="3">All Locations</option>
        </select>
      </div>
    );
  }
}

Dropdown.props = {
  children:PropTypes.node
}

export default Dropdown;
