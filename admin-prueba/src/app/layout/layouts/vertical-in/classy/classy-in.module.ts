import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { FuseFullscreenModule } from '@fuse/components/fullscreen/fullscreen.module';
import { FuseLoadingBarModule } from '@fuse/components/loading-bar';
import { FuseNavigationModule } from '@fuse/components/navigation';
import { ClassyInLayoutComponent } from 'app/layout/layouts/vertical-in/classy/classy-in.component';
import { SharedModule } from 'app/shared/shared.module';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
    declarations: [
        ClassyInLayoutComponent,
    ],
    imports: [
        HttpClientModule,
        RouterModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        FuseFullscreenModule,
        FuseLoadingBarModule,
        FuseNavigationModule,
        SharedModule,
        MatProgressBarModule
    ],
    exports: [
        ClassyInLayoutComponent
    ]
})
export class ClassyInLayoutModule {
}
