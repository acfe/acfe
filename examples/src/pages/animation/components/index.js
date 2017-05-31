import React, {Component} from 'react';
import Animation from "acfe/utils/animation";

class Index extends Component {

    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        var animation = new Animation();
        animation.play({
            aEnd: 100,
            handle: (num) => {
                console.log(num)
            },
            finish: () => {
                console.log('finish')
            }
        });
    }

    render() {
        return (
            <div id="wrapper" className="wrapper">
                animation
            </div>
        );
    }

}

export default Index;
