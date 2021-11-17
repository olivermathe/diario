import { CommonModule, CurrencyPipe } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzInputNumberModule } from "ng-zorro-antd/input-number";
import { NzSelectModule } from "ng-zorro-antd/select";
import { CategoryRepository } from "src/app/repositories/categories.repository";
import { ConfigRepository } from "src/app/repositories/config.repository";
import { OutgoingRepository } from "src/app/repositories/outgoing.repository";
import { LimitService } from "src/app/services/limit.service";
import { SpentService } from "src/app/services/spent.service";
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
    ],
    providers: [
        LimitService,
        SpentService,
        CategoryRepository,
        ConfigRepository,
        OutgoingRepository,
        CurrencyPipe,
    ],
})
export class HomeModule {}