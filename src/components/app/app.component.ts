import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { INote } from 'src/model/note';
import { NotesService } from 'src/services/notes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'notes';

  public notes! : Array<INote>;


  constructor(private notesService: NotesService){}

  ngOnInit(): void {
    this.getNotes();  
  }

  private getNotes() : void{

    this.notesService.getNotes()
    .subscribe({
     
      next : (result)=>{
        this.notes = result;    
       
        this.notes.push({
          id: 0,
          title: "",
          content: ""
        });

      }

    });

  }

  public onSubmit(noteForm: NgForm, note: INote): void{

    if(noteForm.valid){

      if(note.id !== 0){

        this.onUpdate(noteForm, note);

      } else {

        this.onAdd(noteForm, note);

      }

    }
    
  }

  public onAdd(noteForm: NgForm, note: INote) : void {
   
    this.notesService.addNote(note)
    .subscribe({
     
      next : (result)=>{
        Object.assign(note, result);
        
        noteForm.resetForm(note);

        this.notes.push({ 
          id: 0,
          title: "",
          content: ""
        });

      }

    });

  }

  public onUpdate(noteForm: NgForm, note: INote) : void {

    this.notesService.updateNote(note)
    .subscribe({
      next : (result)=>{
       
        if(result){

          Object.assign(note, result);
          noteForm.resetForm(note);

        } else {

          this.notesService.getNote(note.id)
          .subscribe({

            next : (refreshNote) =>{              
              Object.assign(note, refreshNote);
              noteForm.resetForm(note);
            } 

          });

        }

      }
    });

  }

  public onDelete(note: INote) : void {

    this.notesService.deleteNote(note)
    .subscribe({

      next : (result)=>{
        this.notes = this.notes.filter(e => e !== note);
      }

    });

  }

}
