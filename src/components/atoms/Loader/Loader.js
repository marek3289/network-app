import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledSVG = styled.svg`
  width: 80px;
  height: 80px;
  animation: rotate 0.75s linear infinite;
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const StyledCircle = styled.circle`
  r: 16;
  fill: transparent;
  cx: 40;
  cy: 40;
  stroke: ${({ theme }) => theme.purple};
  stroke-width: 5;
`;

const StyledLightCircle = styled(StyledCircle)`
  stroke: hsl(203, 87%, 91%);
  stroke-dasharray: 80;
`;

const Loader = () => (
  <StyledWrapper>
    <StyledSVG>
      <StyledCircle />
      <StyledLightCircle />
    </StyledSVG>
  </StyledWrapper>
);

export default Loader;
