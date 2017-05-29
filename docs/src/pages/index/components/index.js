import React, {Component} from 'react';

class Index extends Component {

    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        const { pageData, setData } = this.props;
        console.log(pageData);
        setData({
            key: 'pageLoaded',
            data: true
        });
    }

    render() {
        const { pageData } = this.props;
        if (!pageData.pageLoaded) {
            return (
                <div className="wrapper">
                    <div className="loadingImg"></div>
                </div>
            );
        }

        return (
            <div id="wrapper" className="wrapper">
                hello redux acfe
            </div>
        );
    }

}

export default Index;
