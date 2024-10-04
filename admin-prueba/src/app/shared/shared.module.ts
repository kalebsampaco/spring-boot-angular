import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmpleadoService } from 'app/services/empleado/empleado.service';
import { InventarioService } from 'app/services/inventario/inventario.service';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [InventarioService, EmpleadoService,]
})
export class SharedModule
{
}
