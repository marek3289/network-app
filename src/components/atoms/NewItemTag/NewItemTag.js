import styled from 'styled-components';

const NewItemTag = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: white;
  line-height: 16px;
  background-color: hsl(89, 71%, 36%);
  width: 65px;
  height: 16px;
  padding: 0 15px;
  margin: 0 -15px;
  position: relative;

  ::after {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    background-color: white;
    right: -9px;
    top: 0;
    transform: rotate(45deg);
  }
`;

export default NewItemTag;
