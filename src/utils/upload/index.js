import ajax from "../ajax";

class Uploader {

    constructor() {
        this.init();
    }

    init() {
        this.config = {
            sign_url: config_data.api.imageSign,
            channel: 2 // 1-金山 2-七牛
        }
    }

    upload(param) {
        this.file = param.file;
        this.success = param.success;
        this.onprogress = param.onprogress;
        this.error = param.error;
        this.getSign();
    }

    getSign() {
        const file = this.file;
        if (!file || !file.files[0] || !file.files[0].name) {
            return;
        }
        const postData = {
            file_list: [file.files[0].name],
            //channel: this.config.channel
        };
        ajax.postJson({
            url: this.config.sign_url,
            data: postData
        }).then((backData) => {
            const data = JSON.parse(backData);
            if (data.data.channel == 1) {
                this.JinShanup(data.data);
            } else if (data.data.channel == 2) {
                this.QiNiuup(data.data);
            }
        }).catch((e) => {
            console.log(e)
        });
    }

    JinShanup(data) {
        const file = this.file;
        const signs = data.signs[0];
        const KSSAccessKeyId = signs.KSSAccessKeyId;
        const Policy = signs.Policy;
        const Signature = signs.Signature;
        const acl = signs.acl;
        const key = signs.key;

        const formDataUp = new FormData();
        formDataUp.append('KSSAccessKeyId', KSSAccessKeyId);
        formDataUp.append('Policy', Policy);
        formDataUp.append('Signature', Signature);
        formDataUp.append('acl', acl);
        formDataUp.append('key', key);
        formDataUp.append('file', file.files[0]);

        const upUrl = data.upload_source_url;
        const download_domain = data.download_domain;
        ajax.upload({
            url: upUrl,
            data: formDataUp,
            success: (data) => {
                this.success(download_domain + key);
            },
            error: (e) => {
                this.error(e);
            }
        });
    }

    QiNiuup(data) {
        const file = this.file;
        const signs = data.signs[0];
        const token = signs.token;
        const key = signs.key;

        const formDataUp = new FormData();
        formDataUp.append('token', token);
        formDataUp.append('key', key);
        formDataUp.append('file', file.files[0]);

        const upUrl = data.upload_source_url;
        const download_domain = data.download_domain;
        ajax.upload({
            url: upUrl,
            data: formDataUp,
            success: (data) => {
                this.success(download_domain + key);
            },
            error: (e) => {
                this.error(e);
            }
        });
    }

}

export default new Uploader();
