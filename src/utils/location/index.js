
class Location {

    constructor() {
        this.init();
    }

    init () {
        this.search = window.location.search;
        this.queryParams = this.getQueryParams(this.search);
    }

    getQueryString (name, urlSearch) {
        if (!urlSearch) {
            return false;
        }
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = urlSearch.substr(1).match(reg);
        return r ? r[2] : false;
    }

    getQueryParams (urlSearch) {
        if (!urlSearch) {
            return false;
        }
        var urlSearch = urlSearch.substr(1);
        var arr = urlSearch.split('&');
        if (arr && arr.length) {
            var param = {};
            for (var i in arr) {
                var paramArr = arr[i].split('=');
                if (paramArr && paramArr[0] && paramArr[1]) {
                    param[paramArr[0]] = paramArr[1];
                }
            }
            return param;
        }
        return false;
    }

}

export default new Location();