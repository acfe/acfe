import React, {Component} from 'react';
import GitIcon from "../../common/components/GitIcon";

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
                <GitIcon/>
            </div>
        );
    }

}

export default Index;
