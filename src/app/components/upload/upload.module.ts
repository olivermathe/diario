import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { NzProgressModule } from "ng-zorro-antd/progress";
import { UploadComponent } from "./upload.component";
import { UploadService } from "./upload.service";

@NgModule({
    declarations: [
        UploadComponent
    ],
    imports: [
        CommonModule,
        NzProgressModule,
        MatIconModule,
    ],
    providers: [
        UploadService,
    ],
    exports: [UploadComponent]
  })
  export class UploadModule { }