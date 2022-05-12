import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes';
  private httpOptions = {
    headers : new HttpHeaders({'Content-Type': 'application/json'} )
  };

  constructor(
    private http: HttpClient,  
    private messageService: MessageService
  ) { }

  getHeroes(): Observable<Hero[]> {
    //const heroes = of(HEROES);
    const heroes = this.http.get<Hero[]>(this.heroesUrl)
                    .pipe( 
                      tap(_ => this.log('fetched heroes')),
                      catchError( this.handleError<Hero[]>('getHeroes', [] ))
                    )
    this.messageService.addMessage("HeroService: Fetched message from server");
    return heroes;
  }

  getHero(id:Number): Observable<Hero>{
    /*const hero = HEROES.find( h => h.id === id)!;
    this.messageService.addMessage(`HeroService: Fetched hero with id = ${id}`);
    return of(hero); */
    const url = `${this.heroesUrl}/${id}`
    return this.http.get<Hero>(url)
              .pipe(
                tap(_ => this.log(`fetched hero id: ${id}`)),
                catchError( this.handleError<Hero>(`getHero id: ${id}`))
              );
  }

  updateHero(hero:Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
              tap(_ => this.log(`updated hero id: ${hero.id}"`) ),
              catchError( this.handleError<any>(`updatehero ${hero.id} `) )
            );
  }

  addHero(hero:Hero): Observable<Hero>{
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap( (newHero:Hero) => this.log(`add hero id: ${newHero.id}`) ),
      catchError( this.handleError<Hero>('addHero'))
    );
  }

  handleError<T>( operation = "operation", result?: T){
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(` $(operation) failed: $(error.mmessage)`);
      return of(result as T);
    }
  }

  log(message:string){
    this.messageService.addMessage(`HeroService: ${message}`);
  }
}
