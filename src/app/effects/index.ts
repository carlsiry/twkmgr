
/**
 * 2017.10.12 使用 Effects 模块
 *  - 加入 QuoteEffects， AuthEffects
 * 2017.10.13 - 加入 ProjectEffects
 */
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { QuoteEffects } from './quote.effects';
import { AuthEffects } from './auth.effects';
import { ProjectEffects } from './project.effects';

@NgModule({
    imports: [
        EffectsModule.run(QuoteEffects),
        EffectsModule.run(AuthEffects),
        EffectsModule.run(ProjectEffects),
    ],
})
export class AppEffectsModule {}
