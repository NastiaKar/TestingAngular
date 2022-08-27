import { Injectable } from '@angular/core';
import {Character} from "../models/character";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private url = "Character";
  constructor(private http: HttpClient) { }

  public GetCharacters() : Observable<Character[]> {
    return this.http.get<Character[]>(`${environment.apiUrl}/${this.url}`);
  }

  public updateCharacter(character: Character) : Observable<Character[]> {
    return this.http.put<Character[]>(
      `${environment.apiUrl}/${this.url}`,
      character
    );
  }

  public createCharacter(character: Character) : Observable<Character[]> {
    return this.http.post<Character[]>(
      `${environment.apiUrl}/${this.url}`,
      character
    );
  }

  public deleteCharacter(character: Character) : Observable<Character[]> {
    return this.http.delete<Character[]>(
      `${environment.apiUrl}/${character.id}`
    );
  }
}
