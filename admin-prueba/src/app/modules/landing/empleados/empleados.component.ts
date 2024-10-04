/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadoService } from 'app/services/empleado/empleado.service';

export interface Categoria {
    idCategoria: number,
    categoria: string,
}

@Component({
    selector     : 'landing-empleados',
    templateUrl  : './empleados.component.html',
    encapsulation: ViewEncapsulation.None,
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmpleadosComponent implements OnInit
{
    mobileQuery: MediaQueryList;
    private _mobileQueryListener: () => void;
    accountForm: FormGroup;
    ELEMENT_DATA: Categoria[] = [];
    displayedColumns: string[] = ['firstName', 'lastName', 'emailAddress', 'edad', 'cargoN', 'fechaIngreso'];
    columnsToDisplay: string[] = this.displayedColumns.slice();
    data: Categoria[]
    CargosList: any;

    /**
     * Constructor
     */
    constructor(
        changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
        private _formBuilder: FormBuilder,
        private _empleadoService: EmpleadoService,
    )
    {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    async ngOnInit() {
        // Create the form
        this.accountForm = this._formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            emailAddress: ['', Validators.required],
            edad: ['', Validators.required],
            cargo: ['', Validators.required],
            fechaIngreso: [''],
        });
        await this.traerCargos();
        await this.traerEmpleados();
    }

    async traerEmpleados(){
        this._empleadoService.getEmpleados().subscribe((emp:any) =>{
            emp.forEach(async (e) => {
                const nombreCargo =  await this.CargosList.filter((el:any) => el.id == e.cargo);
                e.cargoN = nombreCargo ? nombreCargo[0].cargo : e.cargo;
            })

            emp.sort(function (a, b) {
              if (a.id > b.id) {
                return 1;
              }
              if (a.id < b.id) {
                return -1;
              }
              return 0;
            });
            this.ELEMENT_DATA = emp
            this.data = this.ELEMENT_DATA;
        });
    }

    crearEmpleado(){
        const body = this.accountForm.getRawValue()
        body.fechaIngreso = new Date().toISOString();
        this._empleadoService.createEmpleado(body).subscribe((cat:any) =>{
             this.accountForm.reset();
             this.ngOnInit();
        })
    }

    async traerCargos(){
        this._empleadoService.getCargos().subscribe((c:any) =>{
             this.CargosList = c
        })
    }


}
