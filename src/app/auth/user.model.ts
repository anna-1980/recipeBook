export class UserModel {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  //-- to access the _token etc... user cannot overrite it

  get token(){
// -- compare the current token with the current date to see if token is expired or not
    if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
        return null;
    }
    return this._token;
  }
}
