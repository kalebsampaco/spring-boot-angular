import { NgModule } from '@angular/core';
import { LayoutComponent } from 'app/layout/layout.component';
import { EmptyLayoutModule } from 'app/layout/layouts/empty/empty.module';
import { ClassyInLayoutModule } from 'app/layout/layouts/vertical-in/classy/classy-in.module';
import { ClassyOutLayoutModule } from 'app/layout/layouts/vertical-out/classy/classy-out.module';
import { SharedModule } from 'app/shared/shared.module';
import { DenseLayoutModule } from 'app/layout/layouts/vertical/dense/dense.module';

const layoutModules = [
    // Empty
    EmptyLayoutModule,

    // Vertical navigation
    ClassyInLayoutModule,
    ClassyOutLayoutModule,
    DenseLayoutModule
];

@NgModule({
    declarations: [
        LayoutComponent
    ],
    imports     : [
        SharedModule,
        ...layoutModules
    ],
    exports     : [
        LayoutComponent,
        ...layoutModules
    ]
})
export class LayoutModule
{
}
