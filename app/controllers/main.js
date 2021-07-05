import DanhSachMonAn from '../models/DanhSachMonAn.js';
import MonAn from '../models/MonAn.js';

const danhSachMon = new DanhSachMonAn();

// const getEle = (id) => {
//     return document.getElementById(id);
// }

const getEle = id => document.getElementById(id);

getEle('btnThem').addEventListener('click', () => {
    getEle('btnCapNhat').style.display = 'none';
    getEle('btnThemMon').style.display = 'block';
});

/**
 * Hàm hiển thị danh sách món ăn
 */
const hienThiMonAn = danhSachMon => {
    let content = '';

    danhSachMon.forEach(mon => {
        const { maMon, hinhMon, tenMon, loaiMon, giaMon, khuyenMai, giaKM, tinhTrang } = mon;

        content += `
            <tr>
                <td>${maMon}</td>
                <td>
                    <img src="../../assets/img/${hinhMon}" />
                    <span>${tenMon}</span>
                </td>
                <td>${loaiMon === 'loai1' ? 'Chay' : 'Mặn'}</td>
                <td>${giaMon}</td>
                <td>${khuyenMai}</td>
                <td>${giaKM}</td>
                <td>${tinhTrang === '1' ? 'Còn' : 'Hết'}</td>
                <td>
                    <button class="btn btn-danger">Xoá</button>
                    <button class="btn btn-success">Sửa</button>
                </td>
            </tr>
        `;
    });
    getEle('tbodyFood').innerHTML = content;
}

const setLocalStorage = (danhSachMon) => {
    localStorage.setItem('danhSachMon', JSON.stringify(danhSachMon));
}

const getLocalStorage = () => {
    if (localStorage.getItem('danhSachMon')) {
        danhSachMon.mangMonAn = JSON.parse(localStorage.getItem('danhSachMon'));
        hienThiMonAn(danhSachMon.mangMonAn);
    }
}

getLocalStorage();

/**
 * Hàm thêm món ăn
 */
const themMonAn = () => {
    // Lấy thông tin từ form
    const ma = getEle('foodID').value;
    const ten = getEle('tenMon').value;
    const loai = getEle('loai').value;
    const gia = getEle('giaMon').value;
    const khuyenMai = getEle('khuyenMai').value;
    const tinhTrang = getEle('tinhTrang').value;
    const hinh = getEle('hinhMon').value;
    const moTa = getEle('moTa').value;

    // Khởi tạo đối tượng monAn từ lớp đối tượng MonAn
    // +: ép từ chuỗi thành số
    const monAn = new MonAn(ma, ten, loai, +gia, +khuyenMai, tinhTrang, hinh, moTa);
    monAn.tinhGiaKhuyenMai();
    danhSachMon.themMonAn(monAn);
    hienThiMonAn(danhSachMon.mangMonAn);
    setLocalStorage(danhSachMon.mangMonAn);
    
}

getEle('btnThemMon').addEventListener('click', themMonAn);