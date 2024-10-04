import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';


import { PrayerS } from 'app/models/modelInventario';
import { ComunidadService } from '../../../services/inventario/inventario.service';

@Injectable({
  providedIn: 'root',
})
export class PraysResolver  {
  /**
   * Constructor
   */
  constructor(private _praysService: ComunidadService) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PrayerS[]> {
    return this._praysService.getPrays();
  }
}



