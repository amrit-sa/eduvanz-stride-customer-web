import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  padding: 5px;
  border-radius:10px;
  background-color: white;
  border: 2px solid #fff;

  user-select: none;
  transform: translate(-50%, -50%);
  cursor: ${(props) => (props.onClick ? 'pointer' : 'default')};
  &:hover {
    z-index: 1;
  }
  color:black;
  font-size:1em;
  display:flex;
  justify-content:center;
  align-items:center;
`;

const Marker = ({price, text, onClick }) => (
  <>
   
    <Wrapper
      alt={text}
      onClick={onClick}
    >
      <i className="fa fa-rupee"> </i>{price}
      </Wrapper>
  </>
);



Marker.defaultProps = {
    onClick: null
};

Marker.propTypes = {
    onClick: PropTypes.func,
    text: PropTypes.string.isRequired,
    key: PropTypes.number
};

export default Marker;