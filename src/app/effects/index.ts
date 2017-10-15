
/**
 * 2017.10.12 使用 Effects 模块
 *  - 加入 QuoteEffects， AuthEffects
 * 2017.10.13 - 加入 ProjectEffects
 *      10.14 - 加入 TaskLIstEffects
 *      10.15 - 加入 TaskEffects
 *            - 加入 UserEffects
 */
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { QuoteEffects } from './quote.effects';
import { AuthEffects } from './auth.effects';
import { ProjectEffects } from './project.effects';
import { TaskListEffects } from './task-list.effects';
import { UserEffects } from './user.effects';
import { TaskEffects } from './task.effects';

@NgModule({
    imports: [
        EffectsModule.run(QuoteEffects),
        EffectsModule.run(AuthEffects),
        EffectsModule.run(ProjectEffects),
        EffectsModule.run(TaskListEffects),
        EffectsModule.run(UserEffects),
        EffectsModule.run(TaskEffects),
    ],
})
export class AppEffectsModule {}
