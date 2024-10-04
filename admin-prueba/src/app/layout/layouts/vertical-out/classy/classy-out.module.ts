import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { FuseFullscreenModule } from '@fuse/components/fullscreen/fullscreen.module';
import { FuseLoadingBarModule } from '@fuse/components/loading-bar';
import { FuseNavigationModule } from '@fuse/components/navigation';
import { ClassyOutLayoutComponent } from 'app/layout/layouts/vertical-out/classy/classy-out.component';
import {MatBadgeModule} from '@angular/material/badge';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
    declarations: [
        ClassyOutLayoutComponent,
    ],
    imports     : [
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
        MatDialogModule,
        MatFormFieldModule,
        MatGridListModule,
        MatInputModule,
        MatProgressBarModule,
        MatBadgeModule
    ],
    exports     : [
        ClassyOutLayoutComponent
    ]
})
export class ClassyOutLayoutModule
{
}
