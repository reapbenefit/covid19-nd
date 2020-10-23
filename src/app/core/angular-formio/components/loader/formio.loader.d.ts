import { BehaviorSubject } from 'rxjs';
export declare class FormioLoader {
    loading$: BehaviorSubject<boolean>;
    loading: boolean;
    setLoading(loading: boolean): void;
}
