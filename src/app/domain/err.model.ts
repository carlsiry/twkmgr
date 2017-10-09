
/**
 * 2017.10.09 下午 逸夫楼 -- Carlsiry
 *      创建 认证错误 数据模型
 */
export interface Err {
    timestamp?: Date;  // 时间戳
    status?: string;  // 状态
    error?: string;  // 错误
    exception?: string;  // 异常
    message?: string;  // 消息
    path?: string;  // 路由
}
