import React from 'react';

import CustomerCard from './CustomerCard';
import ProfilePicture from './ProfilePicture';
import Name from './Name';
import Content from './Content';

const Customer = ({ name, picture, expectedTime }) => {
    return(
        <CustomerCard data-testid="customer-card">
            <ProfilePicture>
                <img src={picture} alt={`Avatar of ${name}`} />
            </ProfilePicture>
            <Content>
                <Name>{ name }</Name>
                <time>{ expectedTime }</time>
            </Content>
        </CustomerCard>
    );
}

export default Customer;
