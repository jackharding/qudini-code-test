import styled from 'styled-components';

export default styled.div`
  position: relative;
  height: 290px;
  width: 290px;
  background-color: grey;
  border-top-left-radius: 0.2em;
  border-top-right-radius: 0.2em;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
