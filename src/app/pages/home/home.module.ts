import { CommonModule, CurrencyPipe } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzInputNumberModule } from "ng-zorro-antd/input-number";
import { NzModalModule } from "ng-zorro-antd/modal";
import { NzNotificationModule } from "ng-zorro-antd/notification";
import { NzSelectModule } from "ng-zorro-antd/select";
import { AppUpdateService } from "./app.update.service";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        NzInputNumberModule,
        FormsModule,
        NzSelectModule,
        NzButtonModule,
        NzGridModule,
        NzModalModule,
        NzNotificationModule,
    ],
    providers: [
        CurrencyPipe,
        AppUpdateService
    ],
})
export class HomeModule {}