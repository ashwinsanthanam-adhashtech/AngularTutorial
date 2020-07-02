import { Injectable } from '@angular/core';
import { Range } from '../models/range.model';
import { StringBuilder } from 'typescript-string-operations';

@Injectable({
  providedIn: 'root'
})
export class RandomPasswordCreatorService {

  private readonly _specialCharacters: string[] = ['@', '#', '$', '%', '!'];

  private readonly _smallLettersRange: Range;
  private readonly _capitalLettersRange: Range;
  private readonly _specialCharactersRange: Range;
  private readonly _numbersRange: Range;

	constructor(
    smallLettersRange: Range, 
    capitalLettersRange: Range, 
    specialCharactersRange: Range, 
    numbersRange: Range) {
		this._smallLettersRange = smallLettersRange;
		this._capitalLettersRange = capitalLettersRange;
		this._specialCharactersRange = specialCharactersRange;
		this._numbersRange = numbersRange;
  }
  
  // public generatePassword(): string {
  //   var passwordBuider = new StringBuilder();
  //   passwordBuider.Append(this.generateSmallLetters());
  //   passwordBuider.Append(this.generateCapitalLetters());
  //   passwordBuider.Append(this.generateNumbers());
  //   passwordBuider.Append(this.generateSpecialCharacters());
  //   return this.shufflePassword(passwordBuider.ToString());
  // }

  // private generateSmallLetters(): string {
  //   const len: number = this._smallLettersRange.randomNumber;
  //   const smallLetters = new Range('a'.charCodeAt(0), 'z'.charCodeAt(0));
  //   for(var i = 0; i < len; i++) {
  //     const character: string = smallLetters.randomNumber;
  //   }
  // }

  // private generateCapitalLetters(): string {

  // }

  // private generateNumbers(): string {

  // }

  // private generateSpecialCharacters(): string {

  // }

  // private shufflePassword(unshuffledPassword: string): string {

  // }

}
