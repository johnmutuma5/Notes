# Creating a app
Use Angular CLI
> npm install -g @angular/cli

Create the new app
> ng new my-dream-app

Serve the app
> ng serve

Generate components, routes, services and pipes;
> ng generate


## Angular Basics
### How an Angular CLI apps get loaded
The entry point is at `scr/main.ts`. This file bootstraps the app module which lists sets of declarations, imports, providers and components to bootstrap. The main Component usually the `AppComponent` declares its `selector` a css selector where it is rendered in the DOM in this it is the 'app-route'.

The index.html file which contains the `<app-route>` is served by the server and the script that is injected by the script that is build injects the `AppComponent` within the `<app-route>` custom tag.


## Creating components
Other components are added to the `AppComponent` and not in the index.html.

Components are created by decorating classes with the Component decorator imported from the `angular/core` module.


```ts
import { Component } from '@angular/core';

@Compenent({
  selector: '<a-unique-css-selector>',
  templateUrl: '<the component\'s view file>'
})
export class NewComponent {
  myAttribute: 'value';
}
```

## The role of AppModule and component declarations
Angular uses the AppModule to bundle the pieces together. We can register our declarations, imports and providers and bootstrap all the Components that we'd like loaded in the index.html when the app starts.

In imports, we can bring in other sub-modules to include as part of the main AppModule.

## Data binding in Angular
We can communicate data between the component and the view through binding:

- String interpolation - `{{ value }}` - component to view
- Property binding - `[property] = "data"` - component to view
- Event binding - `(event) = "expression"` - view to component
- Two way binding - `[(ngModel)] = "data"` - both ways


## Directives
Directives are instructions in the DOM.
Types of directives
- Structural Directives
- Attribute Directives

### ngIf directive
This is used to load templates based on certain conditions.

```html
<p *ngIf="show; else ifFalse">This should be shown if true</p>
<ng-template #ifFalse>
  <p></p>
</ng-template>
```
This is an example of a structural directive since it adds or removes components from the DOM. Structural directives begin with an asterisk.

### Styling dynamically with ngStyle
```html
<p [ngStyle]="{color: getColor()}">My name</p>
```

### Adding class dynamically with ngClass
```html
<p [ngClass]="{online: status === 'online'}">My name</p>
```
ngStyle and ngClass are attribute directives. They do not add items to the DOM

### Outputting multiple components with ngFor
This is a structural directive, it adds items to the DOM.

```html
<p *ngFor="let server of servers; let i = index">{{ server.name }} {{ i + 1 }}</p>
```

### Passing custom properties to

```html
<!-- parent.component.html -->
<child-element
  *ngFor="let item of items; item.index=index"
  [itemDetails]="item"
></child-element>
```

```ts
import { Input, Component } from '@angular/core';

@Component({
  selector: 'child-element',
  template: `<p>{{itemDetails.index}}</p>`
})
export class ChildComponent {
  @Input() itemDetails: { index: number };
}
```

#### Using an alias for custom properties

```html
<!-- parent.component.html -->
<child-element
  *ngFor="let item of items; item.index=index"
  [customName]="item"
></child-element>
```

```ts
// ...
@Component({
  selector: 'child-element',
  template: `<p>{{details.index}}</p>`
})
export class ChildComponent {
  @Input('customName') details: { index: number };
}
```

### Creating custom events
Sometimes we'd like to call a method in the parent component in the child components. We can do so by creating custom events as opposed to passing the method via custom properties.

```html
<!-- parent.component.html -->
<child-element
  *ngFor="let item of items; item.index=index"
  (onAddUser)="handleAddUser($event)"
></child-element>
```

```ts
import { EventEmitter } from '@angular/core';

// ...
@Component({
  selector: 'child-element',
  templateUrl: `./child.component.html`
})
export class ChildComponent {
  @Output() onAddUser: EventEmitter<Object> = new EventEmitter<Object>();

  onSubmit() {
    this.onAddUser.emit({name: 'Lazuli'});
  }
}
```

### Element references in templates
Sometimes we'd want to access elements within a template. We can do this by creating an ElementRef.

```html
<input #myReferenceId></input>
<button (click)="console.log(myReferenceId)"></button>
```

#### Accessing the element references with @ViewChild and @ContentChild
```html
<input type="text" name="name" #myReferenceId></input>
<button (click)="onAddUser()"></button>
```


```ts

@Component({
  selector: 'my-component',
  templateUrl: './my-component.html'
})
export class MyComponent {
  @ViewChild('myReferenceId') userNameInput: ElementRef;

  handleAddUser(name: string): void {
    // ... emit custom event
  }

  onAddUser(): void {
    const userName: string = this.userNameInput.nativeElement.value;
    return this.handleAddUser(userName);
  }
}
```
`@ContentChild` is useful when we'd like to access in a component references that are coming through it's view's `ng-content`.


### Rendering children content of custom component
We can use `ng-content` to render items passed between components' tags:

```html
<!-- parent.html -->
<my-component>
  <p>This is a child element</p>
</my-component>
```

```html
<!-- my-component.html -->
<div>
  <ng-content></ng-content>
</div>
```


### Lifecycle hooks
#### ngOnChanges
This is called at first initialisation and whenever bound properties receive new values; these are properties decorated with `@Input` decorator. This receives an argument of type `SimpleChanges` that can be imported from `@angular/core`.

#### ngOnInit
This is called once the component has been initialised. Runs after the constructor

#### ngDoCheck
This is called whenever change detection runs.

#### ngAfterContentInit
Called once the `ng-content` has been projected into view.

#### ngAfterContentChecked
Called every time the projected content has been checked.

#### ngAfterViewInit
Called after the component's view (and child views) has been initialised.

#### ngAfterViewChecked
Called every time the component's view (and child views) has been checked.

#### ngOnDestroy
Called when a component is removed from the DOM e.g. if \*ngIf turns false.


## Directives
### Creating a basic attribute directive
Directives are created by decorating a class with the `Directive` decorator imported from `@angular/core`.

```ts
import { Directive, ngOnInit } from '@angular/core';


@Directive({
  selector: '[myCustomDirective]'
})
export class MyCustomDirective implements ngOnInit {
  constructor ( private elemRef: ElementRef) {}

  ngOnInit () {
    this.elemRef.nativeElement.style.backgroundColor = 'red';
    // demo purpose only not proper to manipulate DOM elements directly like this
    // it'd be much better to use the Renderer2 that gets into the Directive
    // constructor along with the ElementRef.
    // constructor(private: elemRef: ElementRef, private renderer: Renderer2)
  }
}
```
Usage in template:

```html
<p myCustomDirective></p>
```

Learn more about `Renderer2` [here](https://angular.io/api/core/Renderer2).

Directives like components are imported in the AppModule and included in the Declarations array.


### Using @HostListener to listen to host events
We can listen to native and custom events with the `@HostListener` decorator.

```ts

@Directive({
  selector: 'button[countable]'
})
export class MyCountDirective {
  buttonClicks = 0;

  @HostListener('click', ['$event.target'])
  onClick(button) {
    console.log('This has been clicked', ++this.buttonClicks, 'times!')
  }
}
```

### Using @HostBinding to bind a directive's host DOM property to a member of the directive class
```ts

@Directive({
  selector: 'input[highlightActive]'
})
export class MyCountDirective {
  @HostBinding('style.backgroundColor') backgroundColor: string;

  @HostListner('focus')
  onFocus(event: Event) {
    this.backgroundColor = 'aqua';
  }
}
```

### Binding data to a directive's host property to a member of the directive class with the @Input decorator

```ts

@Directive({
  selector: 'input[highlightActive]'
})
export class MyCountDirective {
  @Input() focusColor: string;
  @HostBinding('style.backgroundColor') backgroundColor: string;

  @HostListner('focus')
  onFocus(event: Event) {
    this.backgroundColor = this.focusColor;
  }
}
```

Usage in template
```html
<input highlightActive [focusColor]="'aqua'" ></input>
```

We can set the alias of the `@Input` in the directive and use the same name as the directive selector attribute. That way we'd only use a single directive on the element;

```ts
@Directive({
  selector: 'input[highlightActive]'
})
export class MyCountDirective {
  @Input('highlightActive') focusColor: string;
  //..
}
```

Usage in template:
```html
<input [highlightActive]="'aqua'" ></input>
```

### Understanding Structural Directives
Structural directives are set by preceding their identity with a `*`. They get evaluated to directives with usual syntax by rendering them through the `ng-template`. `ng-template` renders it's contents as guided by the directive.

This:
```html
<div *ngIf="loggedIn">My name</name>
```
...  is evaluated into usual directive syntax as follows:
```html
<ng-template [ngIf]="loggedIn">
  <div>My name</div>
</ng-template>
```

All directive constructors receive a reference to the host and in this case, they receive a reference to `TemplateRef` as opposed to `ElementRef` as seen earlier. Additionally, they receive the `ViewContainerContainer` for working with the `TemplateRef`.

```ts

@Directive({
  selector: 'unless'
})
export class UnlessDirective {
  constructor(
    private tempRef: TemplateRef,
    private vcRef: ViewContainerContainer
  ) {}

  @Input set unless(condition: boolean): void {
    if(!condition) return this.vcRef.createEmbededView(this.TemplateRef);
    vcRef.clear();
  }
}
```

usage:
```html
<ng-template [unless]="loggedIn">
  <div>Please login</div>
</ng-template>
```
More structurally:

```html
<div *unless="loggedIn">Please login</div>
```


## Using Services and Dependency injections
Services are injected into the components via the `providers` array in the Compenent decorator.
In the component's constructor, we pass as an argument a private variable with a type of the Service class.

```ts
import { MyService } from './path/to/my-service';

@Compenent({
  selector: '<selector>',
  templateUrl: './path/to/template.html',
  providers: [MyService]
})
export class My Component {
  constructor(private myService: MyService) {}

  doSomething() {
    // ...do something
    this.myService.doSomethingElse();
  }
}
```

The Dependency injector is a hierarchical injecor. A service provider add to a compents's array of providers is available to that component and it's descendants; we only need to declare it in the dependencies' contructors and not in their array of providers but usually depending on how they're supposed to manipulate and access data in that provider. For instance, if they are making changes to the data, they need to access the same instance of the provider hence they should share the same instance of the provider.

### Injecting services into services
To do this, we need to make the receiving service an injectable itself. We do this by decorating the service with `@Injectable`.

```ts
import { Injectable } from '@angular/core';
import { AnotherService } from './path/to/another-service';

@Injectable()
export class MyService {
  constructor(private anotherSrvc: AnotherService) {}

  getAnotherService() {
    this.anotherSrvc.getSomeService();
  }
}
```

# Routing
We can register routes in the AppModule.

Define our routes in an Array of route objects

  ```ts
    import { Routes, RouterModule } from '@angular/router';

    const routes: Routes = [
      { path: 'home' component: UserComponent }
    ]

    @ngModule({
      // ...
      imports: [
        // ...
        RouterModule.forRoot(routes)
      ]
    })
  ```
In the AppComponent template, render the `router-outlet` directive.

```html
<div class="container">
  <router-outlet></router-outlet>
</div>
```

Links are added to routing by including including the `routerLink` directive to the elements;

```html
<a routerLink='/home'>Home</a>
```
Without a preceding `/` the paths are relative to the path of the parent component.

### Style the active link
We can use the `routerLinkActive` directive to specify a class for the active link. The `routerLinkActiveOptions` specifies the options. These can be passed even on the element wrapping the `routerLink`

```html
<li
  routerLinkActive="active"
  [routerLinkActiveOptions]="{exact: true}"
>
  <a routerLink="/home"></a>
</li>
```

### Injecting the router into components and directives
The router can be injected for dynamic navigation:

```ts
@Component({
  //...
})
export class MyComponent {
  constructor(private router: Router) {}

  onLoadServers() {
    this.router.navigate(['/servers']);
  }
}
```

### Accessing the activated route in components for dynamic relative navigation using `ActivatedRoute`
```ts
import { ActivatedRoute } from '@angular/router';


@Component({
  //...
})
export class MyComponent {
  constructor(private router: Router,
              private route: ActivatedRoute) {}

  onLoadServers() {
    this.router.navigate(['servers'], { relativeTo: this.route });
  }
}
```
### Passing url parameters with `:<param>`
```ts
const routes: Routes = [
  { path: 'user/:id' component: UserComponent }
]
```

The paramaeters can be accessed by injecting the matched route as follow;
```ts
import { ActivatedRoute } from '@angular/router';


@Component({
  //...
})
export class MyComponent {
  user: {id: number};

  constructor(private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    const userId = this.router.snapshot.params.id;
    this.user = {id: userId}
  }
}
```

#### Fetching parameters reactively by subscribing to the params observable

The snapshot approach above doesn't rerender the component if we're already in its view. It doesn't trigger a rerender of the component, for instance, if we try to load a user with a different id by clicking on a link on this page. Servives don't trigger rerenders unless we've subscribed listeners that will update the state of the component when something in the service changes. The following will work;

```ts
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  //...
})
export class MyComponent {
  user: {id: number};

  constructor(private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    const userId = this.router.snapshot.params.id;
    this.user = {id: userId}
    this.router.params
      .subscribe(params: Params => this.user = {id: params.id} );
  }
}
```

Angular automatically clears this subscription from the router params observable once the component is destroyed. If this weren't the case, we'd need to unsubsribe the listener from the params observable in the `ngOnDestroy` lifecycle hook. As follows, though not important in this case;

```ts
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';


@Component({
  //...
})
export class MyComponent {
  user: {id: number};
  paramsSubscription: Subscription;

  constructor(private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    const userId = this.router.snapshot.params.id;
    this.user = {id: userId}
    this.paramsSubscripiton = this.router.params
      .subscribe(params: Params => this.user = {id: params.id} );
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
```

### Passing query parameters and hash fragements
The `routerLink` directive has bound properties, the `queryParams` and `fragment` that we can use; NB: these are not new directive, they are properties of the `routerLink` directive;

```html
<a
  [routerLink]="['/users', 10, 'edit']"
  [queryParams]="{allowEdit: 1}"
  [fragment]="loading"
></a>
```

The above constructs a link in this form;

`/users/10/edit?allowEdit=1#loading`

In the component, we can navigate programatically too;

```ts
// ...
onLoadServers() {
  this.router.navigate(['servers'], {
    queryParams: {allowEdit: '1'},
    fragment: 'loading',
    relativeTo: this.route,
  });
}

// ...
```

#### Retreiving the query paramaeters and hash fragment
Similarly, we can access the query params and fragement from the `ActivatedRoute` snapshot.
```ts
    const { queryParams, fragment } = this.router.snapshot;
```

Alternatively, we can subscribe to the `queryParams` and `fragment` observables. For these too, Angular unsubscribes on destroy.

## Setting up nested routes
In the routes, we can add chilren routes as follows;

```ts
const routes: Routes = [
  { path: '/users', component: UsersComponent, children: [
    { path: ':id', component: UserComponent }
  ] }
]
```

In the `UsersComponent`, we also need to add a router outlet for the children routes;

```html
<!-- users.component.html -->
<div class="wrapper users">
  <!-- users component content here; could be a list of users  -->
  <router-outlet></router-outlet>
</div>
```
### Handling query params from a previous route
We can use the `queryParamsHandling` option to control how query params are transferred from the previous route.

```ts
// ...
onLoadServers() {
  this.router.navigate(['servers'], {
    queryParams: {allowEdit: '1'},
    queryParamsHandling: 'preserve',
    fragment: 'loading',
    relativeTo: this.route,
  });
}

// ...
```

- `preserve` - overwrites the queryParams in the new route with the incoming ones
- `merge` - merges the queryParams in the new route with the incomin ones

## Redirecting
We can use `redirectTo` in place of `component` to send another route.

```ts
const routes: Routes = [
  { path: '/users/all', redirectTo: '/users' }
]
```

#### Redirecting not found routes
Use the wildcard `**` as path to capture all unknown routes;

```ts
const routes: Routes = [
  { path: '/not-found', NotFoundComponent }
  { path: '**', redirectTo: '/not-found' }
]
```
### Route guards
These are like route decorators; code that is run before a the router component is rendered, or when leaving. e.g. to check authentication status or anything else that'd be necessary to check before rendering or after leaving a component.

### To update with canDeactivate, resolvers and location notes


## Using Pipes to transform some output
Important for transforming output before displaying it to the view.

```html
<p>{{ name | uppercase }}</p>
```
- Add pipe decorator, specifying an access name
- `class` must have a `transform` method to define the logic
- Add pipe to declarations

```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten',
  // pure: false
})
class ShortenText implements PipeTransform {
  transform (value: any) {
    return value.substr(0, 10)
  }
}
```

```ts
@ngModule {
  declarations: [
    // ...
    ShortenText
  ],
  // ...
}
```
Usage: NB: Pipes can be chained;
```html
<p>{{ name | shorten | uppercase }}
```

There is a built in `async` pipe that is able to display async attributes after their values have resolved.

## Angular Modules
