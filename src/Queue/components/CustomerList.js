import styled from 'styled-components';

const CustomerList = styled.ul`
	padding: 0;
	margin: 0;
	list-style: none;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	grid-gap: 1.25rem;
	grid-row-gap: 2rem;
	place-items: center;
`;

export default CustomerList;