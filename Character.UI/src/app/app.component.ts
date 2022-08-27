import { Component } from '@angular/core';
import {Character} from "./models/character";
import {CharacterService} from "./services/character.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Character.UI';
  characters: Character[] = [];
  characterToEdit?: Character;

  constructor(private characterService: CharacterService) {}

  ngOnInit() : void {
    this.characterService
      .GetCharacters()
      .subscribe((result: Character[]) => (this.characters = result));
  }

  updateCharacterList(characters: Character[]) {
    this.characters = characters;
  }

  initNewCharacter() {
    this.characterToEdit = new Character();
  }

  editCharacter(character: Character) {
    this.characterToEdit = character;
  }

}
