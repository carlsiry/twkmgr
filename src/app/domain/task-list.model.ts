/**
 * 2017.10.08 建立 任务列表的数据模型 -- Carlsiry
 *      一个任务列表有多个任务、属于一个项目
 *          任务列表：ID、名字、序号、多个任务的ID、所属项目的ID
 */
export interface TaskList {
    id?: string;
    name: string;
    oreder: number; // 任务列表的序列
    taskIds: string[]; // 任务id 列表
    projectId: string; // 任务列表所属的项目ID
}
