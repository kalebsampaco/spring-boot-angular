import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { finalize, Subject, takeUntil, takeWhile, tap, timer } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import {
    FuseNavigationService,
    FuseVerticalNavigationComponent,
} from '@fuse/components/navigation';
import { appConfig } from 'app/core/config/app.config';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { AuthService } from 'app/core/auth/auth.service';
import { environment } from '../../../../../environments/environment';
import { ApiServiceHttp } from '@fuse/services/api.service';
import { MediaMatcher } from '@angular/cdk/layout';
import moment from 'moment';
@Component({
    selector: 'classy-out-layout',
    templateUrl: './classy-out.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ClassyOutLayoutComponent
    implements OnInit, OnDestroy, AfterViewInit
{
    @Input()
    showSidebar: boolean;
    @Input()
    showMenu: boolean;
    @Input()
    session: boolean;
    user: any;
    config: any = {};
    isScreenSmall: boolean;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    showPyme: boolean = false;
    userPlan: boolean = false;
    countdown: number = 5;
      private _mobileQueryListener: () => void;
    mobileQuery: MediaQueryList;
    token: any;
    rol: string;
    proximasSesiones: any[];
    hoy: moment.Moment;
    /**
     * Constructor
     */
    constructor(
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseNavigationService: FuseNavigationService,
        private router: Router,
        private _userService: UserService,
        public dialog: MatDialog,
        private _authService: AuthService,
        private apiService: ApiServiceHttp,
        changeDetectorRef: ChangeDetectorRef, media: MediaMatcher
    ) {
        this.mobileQuery = media.matchMedia('(max-width: 1112px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for current year
     */
    get currentYear(): number {
        return new Date().getFullYear();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
   async ngOnInit() {
        setTimeout(() => {
            this.config = appConfig;
        }, 0);


        /* this.token = jwt_decode(localStorage.getItem('accessToken'));
        // Subscribe to media changes
        //this.token.rol = 'ABAGADO'
        if(this.token.rol === 'ABOGADO_PYME'){
            this.plans = this.plans.filter(el => el.rol.includes('ABOGADO_PYME'));
            this.userPlan =true;
        } else {
            this.plans = this.plans.filter(el => el.rol.includes('PYMES_DIR'));
        }
            this._userService.get(this.token.rol).subscribe((resp: any) => {
                const dataUser = this.token.rol === 'ABOGADO_PYME' ? resp.data.infoEmpleado : resp.data.infoClient
                localStorage.setItem(
                    'user',
                    JSON.stringify(dataUser)
                );
            }); */

        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {
                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
            });

        /* this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(async (user: User) => {
                this.user = await user;
                if (this.token.rol !== 'ABOGADO_PYME') this.userPlan = Object.keys(user.infoPlanesCli || {}).length !== 0;
            }); */

        this.session = localStorage.getItem('accessToken') ? true : false;
        const today = Date.now();
        this.hoy = moment(today);
        this.rol = localStorage.getItem('rol')
        const urlAgenda = this.rol === 'ABOGADO_PYME' ? 'clientes/getagenda' : 'customers/pymes/getagenda'
        this.apiService.get(urlAgenda).subscribe(
            async (res:any) => {
               /*  res.data.map((item:any) => {
                    item.fechasesion = moment(item.fechasesion).add(1, 'days').format('YYYY-MM-DD');
                }); */
                this.proximasSesiones = res.data.sort(function (a, b) {
                    if (Date.parse(a.fechasesion.split('T')[0]) > Date.parse(b.fechasesion.split('T')[0])) {
                      return 1;
                    }
                    if (Date.parse(a.fechasesion.split('T')[0]) < Date.parse(b.fechasesion.split('T')[0])) {
                      return -1;
                    }
                    // a must be equal to b
                    return 0;
                  }).filter(item => (moment(item.fechasesion).diff(this.hoy) / 3600000) > 0);

             },
             (response) => {
                 console.log(response)
             }
         );
    }

    async ngAfterViewInit() {

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle navigation
     *
     * @param name
     */
    toggleNavigation(name: string): void {
        // Get the navigation
        const navigation =
            this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(
                name
            );

        if (navigation) {
            // Toggle the opened status
            this.apiService.toogleSide = navigation.opened;
            navigation.toggle();

        }
    }

    urlYoutube(){
        window.open('https://www.youtube.com', '_blank')
     }
    goTo(url, params = false): void {
        if (params) {
            this.router.navigate([url], { queryParams: { paquete: params } });
            setTimeout(() => {
                location.reload();
            }, 2000);
        } else {
            this.router.navigate([url]);
        }
    }

   toggleMenu(item) {
        if (item.url !== '') {
            if(this.userPlan || item.id == 4){
                this.goTo(item.url);
            }
        }
    }

    signOut(){
        this._authService.signOut();

        timer(100, 100)
            .pipe(
                finalize(() => {
                    const rol = localStorage.getItem('rol');
                    //window.location.href= rol == 'PYMES_DIR' ? environment.urlLogin : environment.urlLoginAbogado;
                }),
                takeWhile(() => this.countdown > 0),
                takeUntil(this._unsubscribeAll),
                tap(() => this.countdown--)
            )
            .subscribe();
    }


}
