import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { INote } from 'src/model/note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(public httpClient: HttpClient) { }

  public getNotes() : Observable<INote[]>{
    return this.httpClient.get<INote[]>(`${environment.baseUrl}/notes`);
  }

  public getNote(noteId: number) : Observable<INote>{
    return this.httpClient.get<INote>(`${environment.baseUrl}/notes/${noteId}`);
  }
  
  public addNote(note: INote) : Observable<INote>{
    return this.httpClient.post<INote>(`${environment.baseUrl}/notes`, note);
  }

  public updateNote(note: INote) : Observable<INote|null>{
    return this.httpClient.patch<INote>(`${environment.baseUrl}/notes/${note.id}`, note)
    .pipe(
      catchError((err)=>{
        return of(null);
      })
    );
  }
 
  public deleteNote(note: INote) : Observable<boolean>{
    return this.httpClient.delete(`${environment.baseUrl}/notes/${note.id}`)
    .pipe(
      map((result) =>{
        return true;
      }),
      catchError((error) =>{
        return of(false);
      })
    );
  }
}
