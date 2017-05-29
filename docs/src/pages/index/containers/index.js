import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// actions
import * as commonActions from '../../common/redux/actions';
import * as actions from '../actions';
// components
import Index from '../components';

const mapStateToProps = (state) => ({
    pageData: state.pageData
});

const mapDispatchToProps = (dispatch) => (
    Object.assign(
        {},
        bindActionCreators(commonActions, dispatch),
        bindActionCreators(actions, dispatch)
    )
);

export default connect(mapStateToProps, mapDispatchToProps)(Index);
