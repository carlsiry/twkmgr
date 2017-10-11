
/**
 * 2017.10.08 修改 用户 的数据模型 -- Carlsiry
 *      - 增加字段：项目IDs projectIds
 * 2017.10.10 逸夫楼 -- Carlsiry
 *      - 修改用户模型：增加 地址、证件、出生日期 字段
 *      - 新增 证件类型、证件、地址 等几个数据模型
 */
export interface User {
    id?: string;
    email: string;
    password: string;
    name: string;
    avatar: string;
    projectIds: string[]; // 一个用户参与的多个项目列表的 ID 列表
    address?: Address,
    identity?: Identity,
    dateOfBirth?: string
}

// 地址模型
export interface Address {
    province: string;
    city: string;
    district: string;
    street?: string
}

// 证件类型
export enum IdentityType {
    IdCard = 0,
    Insurance,
    Passport,
    Military,
    Other
}
// 证件
export interface Identity {
    identityNo: string;
    identityType: IdentityType;
}
