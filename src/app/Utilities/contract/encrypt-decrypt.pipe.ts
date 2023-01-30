import { Pipe, PipeTransform } from '@angular/core';
import * as CryptoJS from 'crypto-js';

const key = 'TUc0emRqRXpkdw=='; // btoa(btoa(myKey));

@Pipe({name: 'encrypted'})
export class EncryptPipe implements PipeTransform {
  transform(value: string) {
    if (value) {
      return CryptoJS.AES.encrypt(value, key).toString();
    }
  }
}

@Pipe({name: 'decrypted'})
export class DecryptPipe implements PipeTransform {
  transform(encrypted: string) {
    if (encrypted) {
      const decrypted = CryptoJS.AES.decrypt(encrypted, key);
      return decrypted.toString(CryptoJS.enc.Utf8);
    }
  }
}
