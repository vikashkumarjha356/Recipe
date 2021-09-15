import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorage } from "../shared/data-storage-service";
import { Recipe } from "./recipes.model";
import { RecipeService } from "./recipes.service";

@Injectable({
    providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]>{
    constructor(private dataStorageService: DataStorage, private recipeService: RecipeService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const recipes = this.recipeService.getRecipes();
        if (!recipes.length)
            return this.dataStorageService.fetchRecipes();
        else{
            return recipes;
        }
    }
}