import { User } from './user.model';
import { Err } from 'app/domain/err.model';

/**
 * 2017.10.09 下午 逸夫楼 -- Carlisry
 *      创建 认证 数据模型
 */
export interface Auth {
    user?: User; // 取回来时
    userId?: string; // 数据库存取时方便
    token?: string;
    err?: Err;
}
