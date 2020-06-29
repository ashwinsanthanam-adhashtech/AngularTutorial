export class LoginContainer {
    loginName: String;
    password: String;
    resultMessage: String;

    private _submitHit: boolean;
    private _valid: string = 'valid';
    private _invalid: string = 'invalid';

    constructor() {
        this.loginName = '';
        this.password = '';
        this._submitHit = false;
    }

    get isValidLoginName(): boolean {
        return this.loginName != null && this.loginName != '';
    }

    get isValidPassword(): boolean {
        return this.password != null && this.password != '';
    }

    get isValid(): boolean {
        return this.isValidLoginName && this.isValidPassword;
    }

    get loginNameValidityClass(): string {
        return !this._submitHit || this.isValidLoginName ? this._valid : this._invalid;
    }

    get passwordValidityClass() : string {
        return !this._submitHit || this.isValidPassword ? this._valid : this._invalid;
    }

    public hitSubmit(): void {
        this._submitHit = true;
    }
}