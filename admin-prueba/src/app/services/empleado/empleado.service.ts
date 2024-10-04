import { Injectable } from '@angular/core';
import { ApiServiceHttp } from '@fuse/services/api.service';
import { Cargo, Empleado } from 'app/models/modelInventario';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
    private _empleado: BehaviorSubject<Empleado[] | null> = new BehaviorSubject(null);

  constructor(
    private _apiServiceHttp: ApiServiceHttp
  ) { }

  /**
     * Getter for contact
     */
    get empleado$(): Observable<Empleado[]> {
        return this._empleado.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    getEmpleados(): Observable<Empleado[]> {
        return this._apiServiceHttp.get('employees').pipe(
            switchMap((emp: Empleado) => {
                return of(emp);
            })
        );
    }

    getCargos(): Observable<Cargo[]> {
        return this._apiServiceHttp.get('employees/cargo').pipe(
            switchMap((c: Cargo) => {
                return of(c);
            })
        );
    }

    createEmpleado(body:any): Observable<Empleado[]> {
        return this._apiServiceHttp.post('employees', body).pipe(
            switchMap((emp: Empleado) => {
                return of(emp);
            })
        );
    }


}
