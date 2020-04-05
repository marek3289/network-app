import styled from 'styled-components';

const Textarea = styled.textarea`
  width: 95%;
  margin: 0 10px;
  height: ${({ modal }) => (modal ? '180px' : '35px')};
  border-radius: ${({ theme }) => theme.borderRadius};
  outline: none;
  border: 1px solid ${({ theme }) => theme.gray100};
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: ${({ theme }) => theme.light};
  padding: 7.5px 15px;
  resize: none;

  ::placeholder {
    color: ${({ theme }) => theme.gray200};
  }
`;

export default Textarea;
