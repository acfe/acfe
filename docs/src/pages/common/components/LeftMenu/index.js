import React, {Component} from 'react';
import "./less/index.less";

class LeftMenu extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="LeftMenu">
                <ul>
                    <li className="title">Frontend</li>
                    <li><a href="">Animation -- 动画</a></li>
                    <li className="checked"><a href="">ScrollArea -- 滚动区域</a></li>
                    <li><a href="">Calendar -- 日历</a></li>
                    <li><a href="">Picker -- 选择器</a></li>
                </ul>
                <ul>
                    <li className="title">Backend</li>
                    <li><a href="">Animation -- 动画</a></li>
                    <li className="checked"><a href="">ScrollArea -- 滚动区域</a></li>
                    <li><a href="">Calendar -- 日历</a></li>
                    <li><a href="">Picker -- 选择器</a></li>
                </ul>
            </div>
        );
    }

}

export default LeftMenu;
