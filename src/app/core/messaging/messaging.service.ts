import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";
import { SeverityType } from "./severity-type.enum";

@Injectable()
export class MessagingService {

  constructor(
    private primeMessageService: MessageService,
  ) { }

  showToast(message: string, severity: any = SeverityType.INFO): any {
    this.primeMessageService.add({
      key: "app",
      severity: severity.toString(),
      detail: message});
  }

  showMessage(message: string, severity: any = SeverityType.INFO, key?: string): any {
    this.primeMessageService.clear();
    this.primeMessageService.add({
      key: key || "appMessage",
      severity: severity.toString(),
      detail: message});
  }
  
  
}
