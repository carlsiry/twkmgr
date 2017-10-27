
/**
 * 2017.10.08 创建 任务的数据模型 -- Carlsiry
 *      一个任务属于一个任务列表，有多个参与者，只有一个执行完成者
 *      任务有描述、是否完成、最后完成时间、提醒时间、备注、创建时间、执行者、参与者梦、所属任务列表
 * 2017.10.27 修复任务执行者字段的命名错误
 */
export interface Task {
    id?: string;
    desc: string;  // 任务描述
    completed: boolean; // 任务是否完成
    priority: number; // 任务的优先级（重要性）
    dueDate?: Date;  // 任务最后完成时间
    reminder?: Date; // 任务的提醒时间
    remark?: string;  // 任务备注
    createDate: Date; // 任务创建时间
    ownerId?: string; // 任务的执行者
    participantIds: string[]; // 任务的参与者ID 列表
    taskListId: string; // 任务所属的任务列表
}
