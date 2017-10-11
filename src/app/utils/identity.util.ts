
/**
 * 2017.10.11 创建身份证好获取地区的工具函数 -- Carlsiry
 */

import { GB2260 } from './identity.data';

// 从身份证号中获取 地区编码 和 生日编码
export const extractInfo = (idNo: string) => {
    const addrPart = idNo.substring(0, 6);
    const birthPart = idNo.substring(6, 14);
    return {
        addrCode: addrPart,
        dateOfBirth: birthPart
    };
}

// 验证地区是否合法
export const isValidAddr = (addr: string) => {
    return GB2260[addr] !== undefined;
}

// 获取地址信息： 省、市、县
export const getAddrByCode = (code: string) => {
    // 省：前两位加上 四个零 为 省份
    const province = GB2260[code.substring(0, 2) + '0000'];
    // 市：前四位
    const city = GB2260[code.substring(0, 4) + '00'].replace(province, '');
    const district = GB2260[code].replace(province + city, '');
    return { province, city, district };
}
