import { AfterViewChecked, AfterViewInit, Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { Navigation } from 'app/core/navigation/navigation.types';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { User } from 'app/core/user/user.types';
import { UserService } from 'app/core/user/user.service';
import { appConfig } from 'app/core/config/app.config';

@Component({
    selector: 'classy-in-layout',
    templateUrl: './classy-in.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ClassyInLayoutComponent implements OnInit, OnDestroy {
    @Input()
    showMenu: boolean;
    config: any = {};
    isScreenSmall: boolean;
    navigation: Navigation;
    user: User;
    private _unsubscribeAll: Subject<any> = new Subject<any>();


    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private router: Router,
        private _navigationService: NavigationService,
        private _userService: UserService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseNavigationService: FuseNavigationService
    ) {
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
    ngOnInit(): void {
        setTimeout(() => {
            this.config = appConfig;
        }, 0)

        // Subscribe to navigation data


         this._navigationService.get()
             .pipe(takeUntil(this._unsubscribeAll))
             .subscribe((data: any) => {
                 this._navigationService.navigation$
                     .pipe(takeUntil(this._unsubscribeAll))
                     .subscribe((navigation: any) => {
                         console.log(navigation);
                         this.navigation = navigation;
                     });
             });

        // Subscribe to the user service
        this._userService.user$
            .pipe((takeUntil(this._unsubscribeAll)))
            .subscribe((user: User) => {
                this.user = user;
            });

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {
                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
            });
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

     urlYoutube(){
        window.open('www.youtube.com', '_blank')
     }
    toggleNavigation(name: string): void {
        // Get the navigation
        const navigation = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(name);

        if (navigation) {
            // Toggle the opened status
            navigation.toggle();
        }
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
}
