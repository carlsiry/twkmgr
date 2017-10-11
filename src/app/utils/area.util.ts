
/**
 * 2017.10.11 创建城市区域工具函数
 *  - 得到省份、市、县
 */

import { city_data } from './area.data';

// 返回中国所有省份名字的数组
export const getProvinces = (): string[] => {
    const provinces = [];
    // tslint:disable-next-line:forin
    for (const p in city_data) {
        provinces.push(p);
    }
    return provinces;
}
// 放回指定省份的所有市的名字数组
export const getCitiesByProvince = (province: string): string[] => {
    if (!province || city_data[province]) {
        return [];
    }
    const cities = [];
    // tslint:disable-next-line:forin
    for (const c in city_data[province]) {
        cities.push(c);
    }
    return cities;
}
// 返回指定省份的指定市的所有县市区的名字数组
export const getAreaByCity = (province: string, city: string): string[] => {
    if (!province || !city || city_data[province][city]) {
        return null;
    }
    return city_data[province][city];
}
