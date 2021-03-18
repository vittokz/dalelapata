"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HomeComponent = void 0;
var core_1 = require("@angular/core");
var environment_prod_1 = require("src/environments/environment.prod");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(router, bannerService) {
        this.router = router;
        this.bannerService = bannerService;
        this.isCollapsed = true;
        this.url = environment_prod_1.environment.url;
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.cargarBanner();
        this.router.events.subscribe(function (event) {
            _this.isCollapsed = true;
        });
    };
    HomeComponent.prototype.inicio = function () {
        this.router.navigateByUrl("/home");
    };
    HomeComponent.prototype.cargarBanner = function () {
        var _this = this;
        this.bannerService.getBannerActivos().subscribe(function (resul) {
            _this.listaBanner = resul;
            console.log('LISTA:', _this.listaBanner);
        });
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.css']
        })
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
