import { EventEmitter, Injectable } from "@angular/core";
import { BehaviorSubject, EMPTY, Observable } from "rxjs";

export interface IFile {
    name: string;
    progress: number;
    status: 'P' | 'S' | 'E';
}

@Injectable({ providedIn: 'root' })
export class UploadService {

    onNewFile: EventEmitter<BehaviorSubject<IFile>> = new EventEmitter<BehaviorSubject<IFile>>();

    add(name: string) {
        const file = new BehaviorSubject<IFile>({ name, progress: 0, status: 'P' });
        this.onNewFile.emit(file);
        this.track(file);
    };

    track(file: BehaviorSubject<IFile>) {
        setInterval(() => {

            const value = file.value;

            file.next({
                ...value,
                progress: file.value.progress < 100 ? file.value.progress + 10 : 100,
                status: file.value.progress < 100 ? 'P' : 'S'
            });
        }, 1000);
    }

}