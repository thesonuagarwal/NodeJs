import {Component, OnInit } from '@angular/core';



import {Hero} from '../hero';
//import {HEROES} from '../mock-heroes';
import {HeroService} from '../hero.service';




@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  selectedHero : Hero;

  hero : Hero = {
    id:1,
    name:'Windstorm'
  };

  heroes: Hero[];
  // /heroes = HEROES;

  onSelect(hero: Hero):void{
    this.selectedHero = hero;
  }

  constructor(private heroService:HeroService) { }

  getHeroes():void{
     this.heroService.getHeroes().subscribe(heroes=>this.heroes = heroes);
  }
  ngOnInit() {
    this.getHeroes();
  }


}
