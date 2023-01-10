import React from "react";
import styled from "styled-components";
import ReactSlider from "react-slider";

const StyledSlider = styled(ReactSlider)`
  width: 100%;
  height: 20px;
`;

const StyledThumb = styled.div`  
  height: 22px;
  line-height: 25px;
  width: 3.4rem;;
  text-align: center;
  background-color: #371bed;
  color: #fff;
  border-radius: 10px 10px 0 0;
  cursor: grab;
  transform: translateY(-10px);
`;

const Thumb = (props, state) => (
  <StyledThumb {...props}>{state.valueNow}</StyledThumb>
);

const StyledTrack = styled.div`
  height:12px;
  top: 0;
  bottom: 0;
  background: ${props =>
    props.index === 2 ? "#CCC" : props.index === 1 ? "#a504f7" : "#CCC"};
  border-radius: 999px;
`;

const Track = (props, state) => <StyledTrack {...props} index={state.index} />;

export default ({ min, max,commit, ...delegated }) => {
  return (
    <StyledSlider
      min={min}
      max={max}
      onAfterChange={()=>{if(commit)commit()}}
      defaultValue={[min, max]}
      renderTrack={Track}
      renderThumb={Thumb}
      {...delegated}
    />
  );
};
