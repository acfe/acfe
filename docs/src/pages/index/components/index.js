import React, {Component} from 'react';
import Header from "../../common/components/Header";
import Footer from "../../common/components/Footer";
import LeftMenu from "../../common/components/LeftMenu";

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
                <Header/>
                <div className="mainContent clearFix">
                    <LeftMenu/>
                    <div className="rightContent">
                        rightContent
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }

}

export default Index;
