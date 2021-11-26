import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { IFile, UploadService } from "./upload.service";

@Component({
    selector: 'upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss']
  })
  export class UploadComponent {

        files: Observable<IFile>[] = [];

        constructor(private readonly uploadService: UploadService) {
            this.uploadService.onNewFile.subscribe(file => {
                this.files.push(file.asObservable());
            });
        }

        close() {
            this.files = [];
        }
  
  }