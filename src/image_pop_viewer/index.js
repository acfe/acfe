import React, {Component} from 'react';
import './less/index.less';

class ImagePopViewer extends Component {

    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        this.popInfo = {};
        this.pic = this.refs.pic;
        const pop = this.refs.pop;
        Object.assign(this.popInfo, {
            width: pop.clientWidth,
            height: pop.clientHeight
        });
        this.toolHeight = 40;
        this.picInfo = {};
        this.picStyle = {};
        this.param = {};
        this.init();
        this.eventInit();
    }

    eventInit() {
        const toolBar = this.refs.toolBar;
        toolBar.removeEventListener('click', this.toolBarEvent.bind(this));
        toolBar.addEventListener('click', this.toolBarEvent.bind(this));
        const pop = this.refs.pop;
        pop.onmousewheel = (e) => {
            const zoom = e.wheelDelta > 0 ? 1.1 : 0.9;
            this.zoom(zoom);
        }
        this.pic.addEventListener('mousedown', this.touchStart.bind(this));
        this.pic.addEventListener('mousemove', this.touchMove.bind(this));
        this.pic.addEventListener('mouseup', this.touchEnd.bind(this));
        this.pic.addEventListener('mouseout', this.touchEnd.bind(this));
        window.onresize = () => {
            const pop = this.refs.pop;
            Object.assign(this.popInfo, {
                width: pop.clientWidth,
                height: pop.clientHeight
            });
        }
    }

    touchStart (event) {
        event.preventDefault();
        var param = this.param;
        param.moveLock = true;
        param.sX = event.pageX || event.x;
        param.sY = event.pageY || event.y;
        var top = this.pic.style.top;
        var left = this.pic.style.left;
        if (top) {
            param.sT = parseInt(top);
            param.sL = parseInt(left);
        } else {
            param.sT = this.popInfo.height/2;
            param.sL = this.popInfo.width/2;
        }
    }

    touchMove (event) {
        var param = this.param;
        if (!param.moveLock) {
            return;
        }
        param.mX = event.pageX || event.x;
        param.mY = event.pageY || event.y;
        var changeX = param.mX - param.sX;
        var changeY = param.mY - param.sY;
        this.pic.style.left = param.sL + changeX + 'px';
        this.pic.style.top = param.sT + changeY + 'px';
    }

    touchEnd () {
        var param = this.param;
        param.moveLock = false;
    }

    toolBarEvent(e) {
        const target = e.target.getAttribute('data-name');
        if (target) {
            e.target.style.opacity = .5;
            setTimeout(() => {
                e.target.style.opacity = 1;
            }, 200);
            switch (target) {
                case 'zoomOut':
                    this.zoom(1.1);
                    break;
                case 'zoomIn':
                    this.zoom(0.9);
                    break;
                case 'resize':
                    this.resize();
                    break;
                case 'refresh':
                    this.setDefaultSize();
                    break;
                case 'rotateZl':
                    this.rotateZ(-90);
                    break;
                case 'rotateZ':
                    this.rotateZ(90);
                    break;
                case 'rotateX':
                    this.rotateX(180);
                    break;
                case 'rotateY':
                    this.rotateY(180);
                    break;
            }
        }
    }

    rotateZ(deg) {
        let rotateZ = this.picInfo.rotateZ || 0;
        rotateZ += deg;
        this.picInfo.rotateZ = rotateZ;
        this.setTransform();
    }

    rotateY(deg) {
        let rotateY = this.picInfo.rotateY || 0;
        rotateY += deg;
        if (rotateY >= 360) {
            rotateY = 0;
        }
        this.picInfo.rotateY = rotateY;
        this.setTransform();
    }

    rotateX(deg) {
        let rotateX = this.picInfo.rotateX || 0;
        rotateX += deg;
        if (rotateX >= 360) {
            rotateX = 0;
        }
        this.picInfo.rotateX = rotateX;
        this.setTransform();
    }

    setTransform() {
        let rotateZ = this.picInfo.rotateZ || 0;
        let rotateY = this.picInfo.rotateY || 0;
        let rotateX = this.picInfo.rotateX || 0;
        Object.assign(this.pic.style, {
            transform: 'rotateZ(' + rotateZ + 'deg) rotateY(' + rotateY + 'deg) rotateX(' + rotateX + 'deg)',
            WebkitTransform: 'rotateZ(' + rotateZ + 'deg) rotateY(' + rotateY + 'deg) rotateX(' + rotateX + 'deg)',
            OTransform: 'rotateZ(' + rotateZ + 'deg) rotateY(' + rotateY + 'deg) rotateX(' + rotateX + 'deg)',
            MozTransform: 'rotateZ(' + rotateZ + 'deg) rotateY(' + rotateY + 'deg) rotateX(' + rotateX + 'deg)',
            MsTransform: 'rotateZ(' + rotateZ + 'deg) rotateY(' + rotateY + 'deg) rotateX(' + rotateX + 'deg)'
        });
    }

    zoom(percent) {
        this.percent = parseInt(this.percent * percent);
        this.percent = this.percent > 1000 ? 1000 : this.percent;
        this.percent = this.percent < 10 ? 10 : this.percent;
        if (this.percent > 95 && this.percent < 105) {
            this.percent = 100;
        }
        const width = parseInt(this.picInfo.width * this.percent/100);
        const height = parseInt(this.picInfo.height * this.percent/100);
        Object.assign(this.pic.style, {
            width: width + 'px',
            height: height + 'px',
            marginLeft: -width/2 + 'px',
            marginTop: -height/2 + 'px'
        });
        this.refresh();
    }

    resize() {
        this.picInfo.rotateZ = 0;
        this.picInfo.rotateY = 0;
        this.picInfo.rotateX = 0;
        this.percent = 100;
        Object.assign(this.pic.style, {
            width: this.picInfo.width + 'px',
            height: this.picInfo.height + 'px',
            marginLeft: -this.picInfo.width/2 + 'px',
            marginTop: -this.picInfo.height/2 + 'px',
            left: this.popInfo.width/2 + 'px',
            top: this.popInfo.height/2 + 'px'
        });
        this.setTransform();
        this.refresh();
    }

    init() {
        this.loading = true;
        this.refresh();
        const img = this.refs.img;
        const sourceImg = this.refs.sourceImg;
        sourceImg.onload = () => {
            Object.assign(this.picInfo, {
                width: sourceImg.clientWidth,
                height: sourceImg.clientHeight
            });
            Object.assign(img.style, {
                width: '100%',
                height: '100%'
            });
            this.loading = false;
            this.setDefaultSize();
        }
    }

    setDefaultSize() {
        this.picInfo.rotateZ = 0;
        this.picInfo.rotateY = 0;
        this.picInfo.rotateX = 0;
        const defaultWidth = parseInt(this.popInfo.width * (7/10));
        const defaultHeight = parseInt(defaultWidth * (this.picInfo.height/this.picInfo.width));
        Object.assign(this.pic.style, {
            width: defaultWidth + 'px',
            height: defaultHeight + 'px',
            marginLeft: -(defaultWidth/2) + 'px',
            marginTop: -(defaultHeight/2 + this.toolHeight/2) + 'px',
            left: this.popInfo.width/2 + 'px',
            top: this.popInfo.height/2 + 'px'
        });
        this.percent = parseInt(defaultWidth/this.picInfo.width * 100);
        this.setTransform();
        this.refresh();
    }

    close() {
        this.needReset = true;
        if (this.props.close) {
            this.props.close();
        }
    }

    refresh() {
        this.setState({});
    }

    renderLoading() {
        if (this.loading) {
            return <div className="loadingImg"></div>;
        }
    }

    checkReset() {
        if (this.needReset) {
            this.needReset = false;
            setTimeout(() => {
                this.setDefaultSize();
            });
        }
    }

    render() {
        const popStyle = {
            top: 0
        };
        if (!this.props.show) {
            popStyle.top = '100%';
        }
        const imgProps = {
            src: this.props.url
        };
        const picStyle = this.picStyle || {};
        this.checkReset();
        return (
            <div ref="pop" className="ImagePopViewer" style={popStyle}>
                <div className="mask"></div>
                <img ref="sourceImg" className="sourceImg" {...imgProps}/>
                <div className="closeTag" onClick={() => this.close()}></div>
                <div className="percentTag">{this.percent || 0}%</div>
                {this.renderLoading()}
                <div ref="pic" className="pic" style={picStyle}>
                    <img ref="img" {...imgProps}/>
                </div>
                <div ref="toolBar" className="toolBar">
                    <span data-name="refresh" className="refresh"></span>
                    <span data-name="resize" className="resize"></span>
                    <span data-name="zoomOut" className="zoomOut"></span>
                    <span data-name="zoomIn" className="zoomIn"></span>
                    <span data-name="rotateZl" className="rotateZl"></span>
                    <span data-name="rotateZ" className="rotateZ"></span>
                    <span data-name="rotateY" className="rotateY"></span>
                    <span data-name="rotateX" className="rotateX"></span>
                </div>
            </div>
        );
    }

}

export default ImagePopViewer;
