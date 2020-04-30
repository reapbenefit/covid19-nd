import { Observable, Subject } from 'rxjs';
export class CommonService {

    private subject = new Subject<any>();
    private subjectCord = new Subject<any>();

    sendZoom(data: string) {
        this.subject.next({ data: data });
    }

    ClearZoom() {
        this.subject.next();
    }

    getZoom(): Observable<any> {
        return this.subject.asObservable();
    }

    sendCord(data: any) {
        this.subjectCord.next({ data: data });
    }

    ClearCord() {
        this.subjectCord.next();
    }

    getCord(): Observable<any> {
        return this.subjectCord.asObservable();
    }


    private username = new Subject<any>();
    private userRole = new Subject<any>();
    setusername(user){
        this.username.next({ data: user });
    }
    getusername(){
        return this.username.asObservable();
    }

    setUserrole(role){
        this.userRole.next({ data: role });
    }
    getUserrole(){
        return this.userRole.asObservable();
    }


}