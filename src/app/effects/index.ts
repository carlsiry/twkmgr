
/**
 * 2017.10.12 使用 Effects 模块
 */
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { QuoteEffects } from './quote.effects';

@NgModule({
    imports: [
        EffectsModule.run(QuoteEffects),
    ],
})
export class AppEffectsModule {}
