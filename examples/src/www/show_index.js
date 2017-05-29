
var index = function () {
    this.init();
}

index.prototype =  {

    init: function () {
        this.getProjectData();
    },

    getProjectData: function () {
        var show = this.getQueryString('show', location.search);
        show = show || 'index';
        try {
            var loadArr = [];
            // loadArr.push('./' + 'config_data/' + show + '.js');
            loadArr.push('./' + show + '.js');
            require(loadArr);
        } catch (e) {
            console.log(e);
        }
    },

    getQueryString: function (name, urlSearch) {
        if (!urlSearch) {
            return false;
        }
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = urlSearch.substr(1).match(reg);
        return r ? r[2] : false;
    }

};

new index();