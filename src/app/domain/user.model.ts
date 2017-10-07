
/**
 * 2017.10.08 修改 用户 的数据模型 -- Carlsiry
 *      - 增加字段：项目IDs projectIds
 */
export interface User {
    id?: string;
    email: string;
    password: string;
    name: string;
    avatar: string;
    projectIds: string[]; // 一个用户参与的多个项目列表的 ID 列表
}
