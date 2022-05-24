import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, Subject, tap, throwError } from "rxjs";
import { User } from "../auth/user";

export interface authResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registred?: boolean;
}
@Injectable()
export class AuthService {
    constructor(private router: Router, private http: HttpClient) { }
    isLoggedIn = false;
    userSub = new BehaviorSubject<User>(null);
    clearTimeout: any;
    timeout = new BehaviorSubject<any>(null);
    //userSub = new Subject<User>();

    getErrorHandler(errorResp: HttpErrorResponse) {
        let error = 'An error occurred';
        if (!errorResp.error.error || !errorResp.error) {
            return throwError(error);
        }
        switch (errorResp.error.error.message) {
            //signUp
            case 'EMAIL_EXISTS': error = 'the email address is already in use by another account'; break;
            case 'OPERATION_NOT_ALLOWED': error = 'password login is disabled for this project'; break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER': error = 'we have blocked all requests from this device due to unusual activity. Try again later'; break;
            //logIn
            case 'EMAIL_NOT_FOUND': error = 'aucun enregistrement d\'utilisateur ne correspond à cet identifiant. L\'utilisateur a peut-être été supprimé'; break;
            case 'INVALID_PASSWORD': error = 'le mot de passe n\'est pas valide ou l\'utilisateur n\'a pas de mot de passe'; break;
            case 'USER_DISABLED': error = 'le compte d\'utilisateur a été désactivé par un administrateur'; break;
            default: error = 'An error occurred';
        }
        return throwError(error);
    }

    private handleUser(response: authResponseData) {
        const expireDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
        const user = new User(response.email, response.localId, response.idToken, expireDate);
        this.userSub.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
        this.autoLogOut(+response.expiresIn * 1000); // Number(string) <=> +string ==> to number
    }

    signUp(email: string, password: string) {
        return this.http.post<authResponseData>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=`,
            {
                email,
                password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.getErrorHandler), tap(this.handleUser.bind(this)));
    }

    login(email: string, password: string) {

        return this.http.post<authResponseData>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=`,
            {
                email,
                password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.getErrorHandler), tap(this.handleUser.bind(this)));
    }

    autoLogin() {
        let userData: { email: string, _token: string; expirationDate: string; localId: string } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) { // userData is null
            return;
        }
        let user = new User(userData.email, userData.localId, userData._token, new Date(userData.expirationDate));
        if (user.token) { // token non null
            this.userSub.next(user);
            console.log('expiration token dans : ' + +(- new Date().getTime() + new Date(userData.expirationDate).getTime()) / 60);
            this.autoLogOut(+(- new Date().getTime() + new Date(userData.expirationDate).getTime()) / 60); // Number(string) <=> +string ==> to number
        }
    }

    logout() {
        this.userSub.next(null);
        localStorage.removeItem('userData');
        this.router.navigateByUrl('/auth');
        if(this.clearTimeout){
            clearTimeout(this.clearTimeout);
        }
    }

    autoLogOut(expirationDate: number) {
        this.clearTimeout = setTimeout(() => {
            this.logout();
        }, expirationDate);
        this.timeout.next(expirationDate);
    }

    isAuthenticated() {
        return new Promise((resolve, rejects) => {
            setTimeout(() => {
                resolve(this.isLoggedIn)
            }, 100);
        });
    }
}