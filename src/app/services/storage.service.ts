import { Injectable } from "@angular/core";
import { StorageMap } from "@ngx-pwa/local-storage";

@Injectable({ providedIn: 'root' })
export class StorageService extends StorageMap {}