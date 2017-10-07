
/**
 * 2017.10.08 建立 项目 的数据模型
 *      一个项目有多个任务列表，和 多个成员
 *        项目： ID、名字、描述、项目卡片、任务列表ID的列表、项目成员的ID列表
 */
export interface Project {
    id?: string;
    name: string;
    desc?: string;
    coverImg: string;  // 项目卡片 地址
    taskLists?: string[]; // 项目的任务列表id 列表
    members?: string[]; // 项目成员的ID 列表
}
