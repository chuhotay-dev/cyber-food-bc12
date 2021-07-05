export default class DanhSachMonAn {
    constructor() {
        this.mangMonAn = [];
    }

    themMonAn(monAn) {
        // this.mangMonAn.push(monAn);
        this.mangMonAn = [...this.mangMonAn, monAn];
    }
}