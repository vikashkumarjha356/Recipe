import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { RecipeService } from '../recipes/recipes.service';
import { Recipe } from '../recipes/recipes.model';
import { map, tap } from 'rxjs/operators'

@Injectable({
    providedIn: 'root'
})
export class DataStorage {
    constructor(private http: HttpClient, private recipeService: RecipeService) { }

    storeRecipe() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ng-course-recipe-book-77789-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(response => {
            console.log(response)
        });
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>('https://ng-course-recipe-book-77789-default-rtdb.firebaseio.com/recipes.json')
            .pipe(map(response => {
                return response.map(recipe => {
                    return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
                })
            }),
                tap(recipes => {
                    this.recipeService.setRecipes(recipes);
                })
            )

    }
}