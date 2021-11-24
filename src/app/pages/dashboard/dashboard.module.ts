import { CommonModule, CurrencyPipe } from "@angular/common";
import { NgModule } from "@angular/core";
import { ChartsModule } from "ng2-charts";
import { CategoryRepository } from "src/app/repositories/categories.repository";
import { ConfigRepository } from "src/app/repositories/config.repository";
import { OutgoingRepository } from "src/app/repositories/outgoing.repository";
import { SpentService } from "src/app/services/spent.service";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard.component";

@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports: [
        ChartsModule,
        CommonModule,
        DashboardRoutingModule,
    ],
    providers: [
        ConfigRepository,
        OutgoingRepository,
        SpentService,
        CategoryRepository,
        CurrencyPipe,
    ],
})
export class DashboardModule {}