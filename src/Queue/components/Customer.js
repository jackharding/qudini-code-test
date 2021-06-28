import React from 'react';

import CustomerCard from './CustomerCard';
import ProfilePicture from './ProfilePicture';
import Name from './Name';
import Content from './Content';

const Customer = ({ name, hashedEmail, expectedTime }) => {
    return(
        <CustomerCard data-testid="customer-card">
            <ProfilePicture>
                { hashedEmail && <img src={`https://www.gravatar.com/avatar/${hashedEmail}`} alt={`Avatar of ${name}`} /> }
            </ProfilePicture>
            <Content>
                <Name>{ name }</Name>
                <time>{ expectedTime }</time>
            </Content>
        </CustomerCard>
    );
}

export default Customer;
