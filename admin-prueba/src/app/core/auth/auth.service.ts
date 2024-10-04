import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, switchMap, throwError } from 'rxjs';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { ApiServiceHttp } from '@fuse/services/api.service';

@Injectable()
export class AuthService
{
    private _authenticated: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService,
        private _apiServiceHttp: ApiServiceHttp
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string)
    {
        sessionStorage.setItem('accessToken', token);
    }

    get accessToken(): string
    {
        return sessionStorage.getItem('accessToken') ?? '';
    }

     /**
     * Setter & getter for access token
     */
    set userData(user: string)
    {
        sessionStorage.setItem('userData', JSON.stringify(user));
    }

    get getUserData(): any
    {
        return JSON.parse(sessionStorage.getItem('userData')) ?? '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any>
    {
        return this._apiServiceHttp.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any>
    {
        return this._apiServiceHttp.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string; password: string }): Observable<any>
    {
        // Throw error, if the user is already logged in
        if ( this._authenticated )
        {
            return throwError('User is already logged in.');
        }
        return this._apiServiceHttp.post('auth/local', credentials).pipe(
            switchMap((response: any) => {

                // Store the access token in the local storage
                this.accessToken = response.jwt;

                // Set the authenticated flag to true
                this._authenticated = true;
                this.userData = response.user;

                // Store the user on the user service
                this._userService.user = response.user;

                // Return a new observable with the response
                return of(response);
            })
        );
    }

    signInProvider(provider: string): Observable<any>
    {
        // Throw error, if the user is already logged in
        if ( this._authenticated )
        {
            return throwError('User is already logged in.');
        }
        return this._apiServiceHttp.get(`auth/google/callback/${provider}`).pipe(
            switchMap((response: any) => {
                // Store the access token in the local storage
                this.accessToken = response.jwt;

                // Set the authenticated flag to true
                this._authenticated = true;
                this.userData = response.user;

                // Store the user on the user service
                this._userService.user = response.user;

                // Return a new observable with the response
                return of(response);
            })
        );
    }


    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any>
    {
        // Renew token
        return this._apiServiceHttp.post('api/auth/refresh-access-token', {
            accessToken: this.accessToken
        }).pipe(
            catchError(() =>

                // Return false
                of(false)
            ),
            switchMap((response: any) => {

                // Store the access token in the local storage
                this.accessToken = response.accessToken;

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.user;

                // Return true
                return of(true);
            })
        );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any>
    {
        // Remove the access token from the local storage
        sessionStorage.removeItem('accessToken');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { username: string; email: string; password: string; agreements: string }): Observable<any>
    {
        return this._apiServiceHttp.post('auth/local/register', user).pipe(
            switchMap((response: any) => {
                console.log(response);
                // Store the access token in the local storage
                this.accessToken = response.data.jwt;

                // Set the authenticated flag to true
                this._authenticated = true;
                this.userData = response.data.user;

                // Store the user on the user service
                this._userService.user = response.data.user;

                // Return a new observable with the response
                return of(response);
            })
        );
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any>
    {
        return this._apiServiceHttp.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean>
    {
        if (this.accessToken && !AuthUtils.isTokenExpired(this.accessToken)) {
          return of(true);
        } else {
          return of(false);
        }
    }
}
