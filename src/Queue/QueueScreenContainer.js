import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchCustomers } from '../actions/customers';
import QueueScreen from './QueueScreen';

export class QueueScreenContainer extends Component {
    constructor(props) {
        super(props);

        this.customerFetcher = null;

        this.state = {
            customers: []
        };
    }

    componentDidMount() {
        this.props.fetchCustomers();
        // Fetch the customers every 30 seconds
        // Allow the interval to be controlled via a prop for testing
        this.customerFetcher = setInterval(() => this.props.fetchCustomers(true), this.props.fetchCustomersInterval || 30000);
    }

    componentWillUnmount() {
        clearInterval(this.customerFetcher);
    }

    render() {
        return(
            <QueueScreen
                customers={this.props.customers}
                isLoading={this.props.isLoading}
                error={this.props.error}
            />
        )
    }
}

const mapStateToProps = (state) => ({ 
    customers: state.queue.customers,
    error: state.queue.error,
    isLoading: state.queue.isLoading,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchCustomers
}, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(QueueScreenContainer);