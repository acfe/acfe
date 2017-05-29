/*
 * 2017-05-18
 * @author ChengXiaoJia https://github.com/vvvui
 */

if (!Function.prototype.bindEvent) {
    Function.prototype.bindEvent = function() {
        var self = this;
        var args = [].slice.call(arguments, typeof arguments[0] == 'object' ? 1 : 0);
        var context = typeof arguments[0] == 'object' ? arguments[0] : null;
        return function () {
            const innerArgs = [].slice.call(arguments);
            [].push.apply(innerArgs, args);
            return self.apply(context, innerArgs);
        }
    }
}

const injectEvent = (eventFunctions, events, dom) => {
    var events = events || ['click'];
    var root = dom || document.body;
    events.map((item) => {
        const handle = (e) => {
            const funcName = e.target.getAttribute('data-' + item);
            if (funcName && eventFunctions[funcName]) {
                eventFunctions[funcName](e);
            }
        };
        root.removeEventListener(item, handle);
        root.addEventListener(item, handle);
    });
}

export default injectEvent;