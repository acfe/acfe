import React, {Component} from 'react';
import GitIcon from "../GitIcon";
import "./less/index.less";

class Header extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="Header">
                <GitIcon></GitIcon>
                <a className="gitIcon" href="https://acfe.github.io">
                    <div className="logo"></div>
                </a>
            </div>
        );
    }

}

export default Header;
