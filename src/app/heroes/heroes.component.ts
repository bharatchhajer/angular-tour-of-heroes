import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  hero:Hero = { id:1, name:'Windstorm'};
  //selectedHero? :  Hero;
  heroes: Hero[] = [];
  constructor(private heroService: HeroService, private messageService: MessageService) {  }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe( heroes => this.heroes = heroes);
  }

  add(name:string): void{
    name = name.trim();
    if( !name ) return;
    this.heroService.addHero( {name} as Hero )
      .subscribe( hero => this.heroes.push(hero));
  }
  
  /*onSelect(hero:Hero): void {
    this.selectedHero = hero;
    this.messageService.addMessage("HeroesComponent: selected hero "+ hero.name);
  }*/

}
