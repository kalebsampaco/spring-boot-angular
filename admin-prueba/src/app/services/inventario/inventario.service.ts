import { Injectable } from '@angular/core';
import { ApiServiceHttp } from '@fuse/services/api.service';
import { Inventario } from 'app/models/modelInventario';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';

@Injectable()
export class InventarioService
{
    private _prays: BehaviorSubject<Inventario[] | null> = new BehaviorSubject(null);
    /**
     * Constructor
     */
    constructor(
        private _apiServiceHttp: ApiServiceHttp
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for contact
     */
    get prays$(): Observable<Inventario[]> {
        return this._prays.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    getInventario(): Observable<Inventario[]> {


        return this._apiServiceHttp.get('inventario').pipe(
            switchMap((inv: any) => {
                    return of(inv);
            })
        );
    }

    createInv(body): Observable<Inventario[]> {
        return this._apiServiceHttp.post('inventario', body).pipe(
            switchMap((inv: any) =>
                     of(inv)
            )
        );
    }

    updateInv(body: any, id: any): Observable<Inventario[]> {
        return this._apiServiceHttp.put(`inventario/${id}`, body).pipe(
            switchMap((inv: any) =>
                     of(inv)
            )
        );
    }

    deleteInv(id: any): Observable<Inventario[]> {
        return this._apiServiceHttp.delete(`inventario/${id}`).pipe(
            switchMap((inv: any) =>
                     of(inv)
            )
        );
    }

}
