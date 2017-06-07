
class Storage {

    constructor() {
        this.init();
    }

    init () {
        this.getCookieParam();
    }

    getCookieParam () {
        var cookie, arr, reg = new RegExp("(^| ).*=([^;]*)(;|$)", 'g');
        cookie = document.cookie.match(reg);
        if (!cookie || !cookie.length) {
            return;
        }
        arr = cookie[0].split(';');
        if (arr && arr.length) {
            var cookies = {};
            for (var i in arr) {
                arr[i] = arr[i].replace(/\s/g, '');
                var vArr = arr[i].split('=');
                cookies[vArr[0]] = vArr[1];
            }
        }
        this.cookies = cookies;
    }

    getCookie (name) {
        var arr, reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) {
            return arr[2];
        } else {
            return false;
        }
    }

    delCookie (name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = this.getCookie(name);
        if(cval) {
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/";
        }
    }

    setCookie (name, value, time) {
        var time = time || (1 * 24 * 60 * 60 * 1000);
        var exp = new Date();
        exp.setTime(exp.getTime() + time);
        document.cookie = name + "=" + value + ";expires=" + exp.toGMTString() + ";path=/";
    }

}

export default new Storage();
