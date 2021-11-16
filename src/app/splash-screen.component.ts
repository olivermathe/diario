import { animate, animateChild, query, style, transition, trigger } from "@angular/animations";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { SwUpdate } from "@angular/service-worker";
import { interval } from "rxjs";

@Component({
    selector: 'app-splash-screen',
    template: `
        <div class="splash-screen" *ngIf="show" @fadeOut>
            testeasdasda
        </div>
    `,
    animations: [
        // the fade-in/fade-out animation.
        trigger('fadeOut', [
            transition(':leave', [
                query(':leave', animateChild(), {optional: true}),
                animate(300, style({opacity: 0}))
            ]),
        ]),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SplashScreenComponent implements OnInit {
    show = true;

    constructor(private readonly updates: SwUpdate, private cdr: ChangeDetectorRef) {}

    ngOnInit() {
        if (this.updates.isEnabled) {
            interval(2000).subscribe(() => {
                this.show = false;
                this.cdr.detectChanges();
            });
        } else {
            this.show = false;
            this.cdr.detectChanges();
        }
    }
}