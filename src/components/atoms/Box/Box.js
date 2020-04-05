import styled from 'styled-components';

const Box = styled.div`
  background-color: white;
  width: 100%;
  min-height: 100px;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 1px 1px 2px -2px black;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
  text-decoration: none;
  word-break: break-word;
`;

export default Box;
