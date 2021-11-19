import { CommonModule, CurrencyPipe } from "@angular/common";
import { NgModule } from "@angular/core";
import { NzGridModule } from "ng-zorro-antd/grid";
import { CategoryRepository } from "src/app/repositories/categories.repository";
import { ConfigRepository } from "src/app/repositories/config.repository";
import { OutgoingRepository } from "src/app/repositories/outgoing.repository";
import { LimitService } from "src/app/services/limit.service";
import { SpentService } from "src/app/services/spent.service";
import { MonthRoutingModule } from "./month-routing.module";
import { MonthComponent } from "./month.component";
import { NzTimelineModule } from 'ng-zorro-antd/timeline';

@NgModule({
    declarations: [
        MonthComponent
    ],
    imports: [
        CommonModule,
        NzTimelineModule,
        MonthRoutingModule,
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
export class MonthModule {}