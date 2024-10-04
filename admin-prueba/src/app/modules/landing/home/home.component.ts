import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
import { MatTableDataSource } from '@angular/material/table';
import { Inventario } from 'app/models/modelInventario';
import { EmpleadoService } from 'app/services/empleado/empleado.service';
import { InventarioService } from 'app/services/inventario/inventario.service';



@Component({
    selector     : 'landing-home',
    templateUrl  : './home.component.html',
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class LandingHomeComponent
{
    mobileQuery: MediaQueryList;
    private _mobileQueryListener: () => void;

    horizontalPosition: MatSnackBarHorizontalPosition = "center";
    verticalPosition: MatSnackBarVerticalPosition = "top";
    durationInSeconds = 5;
    accountForm: FormGroup;
    clientes: any;
    ELEMENT_DATA: Inventario[] = [];
    displayedColumns: string[] = ['nombreProducto', 'cantidad', 'fechaIngreso', 'userRegisterN', 'userModifiedN', 'fechaModified', 'actions'];
    columnsToDisplay: string[] = this.displayedColumns.slice();
    data: MatTableDataSource<Inventario>;
    empleadosList: any;

    /**
     * Constructor
     */
    constructor(
        changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
        private _formBuilder: FormBuilder,
        private _inventarioService: InventarioService,
        private _empleadoService: EmpleadoService,
        private _snackBar: MatSnackBar,
    )
    {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    async ngOnInit() {
        // Create the form
        this.accountForm = this._formBuilder.group({
            nombreProducto: ['', Validators.required],
            cantidad: ['', Validators.required],
            fechaIngreso: [''],
            userRegister: ['', Validators.required],
            userModified: [1, Validators.required],
            fechaModified: [''],
        });

        await this.traerEmpleados();
        await this.traerInv();
    }

    async traerInv(){
        this._inventarioService.getInventario().subscribe((inv:any) =>{
            inv.forEach(async (inv) => {
                inv.isEditing= false;
                const nombreRegister =  await this.empleadosList.filter((el:any) => el.id === inv.userRegister);
                const nombreModified=  await this.empleadosList.filter((el:any) => el.id === inv.userModified);
                inv.userRegisterN = nombreRegister ? nombreRegister[0].firstName : inv.userRegister;
                inv.userModifiedN = nombreModified ? nombreModified[0].firstName : inv.userRegister;
            })

            inv.sort(function (a, b) {
              if (a.id > b.id) {
                return 1;
              }
              if (a.id < b.id) {
                return -1;
              }
              return 0;
            });
            this.ELEMENT_DATA = inv
            this.data = new MatTableDataSource(this.ELEMENT_DATA);
        })

    }

    async traerEmpleados(){
        this._empleadoService.getEmpleados().subscribe((emp:any) =>{
            this.empleadosList = emp;
        })
    }

    crearInventario(){
        const body = this.accountForm.getRawValue()
        if (body.cantidad <= 0) {
            this._snackBar.open('La cantidad no puede ser mnenor o igual a cero', "", {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: this.durationInSeconds * 1000,
            });
            return
        }
        body.fechaIngreso = new Date().toISOString();
        this._inventarioService.createInv(body).subscribe((inv:any) =>{
            this._snackBar.open('Inventario creado exitosamente', "", {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: this.durationInSeconds * 1000,
            });
             this.accountForm.reset();
             this.ngOnInit();
        });
    }

    // Método para activar la edición
    onEdit(element: any) {
      element.isEditing = true;
    }

    // Método para guardar los cambios y salir del modo edición
    onSave(element: any) {
      element.isEditing = false;
        if (element.cantidad <= 0) {
            this._snackBar.open('La cantidad no puede ser mnenor o igual a cero', "", {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: this.durationInSeconds * 1000,
            });
            return
        }
        element.fechaModified = new Date().toISOString()
        const body = element;
        delete body.isEditing
        this._inventarioService.updateInv(element, element.id).subscribe((inv:any) =>{
            this._snackBar.open('Inventario editado exitosamente', "", {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: this.durationInSeconds * 1000,
            });
            this.accountForm.reset();
            this.ngOnInit();
        });
    }

    // Método para eliminar
    onDelete(element: any) {
        this._inventarioService.deleteInv(element.id).subscribe((inv:any) =>{
            this._snackBar.open('Inventario eliminado exitosamente', "", {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: this.durationInSeconds * 1000,
            });
            this.accountForm.reset();
            this.ngOnInit();
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.data.filter = filterValue.trim().toLowerCase();
    }



}
