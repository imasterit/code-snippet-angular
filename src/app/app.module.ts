// Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LayoutModule } from '@angular/cdk/layout';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Environment
import { environment } from '../environments/environment';

// Third Party Modules
import { MaterialModule } from './material.module'; // Angular Material
import { CookieModule } from 'ngx-cookie';

// Directives
import { ScrollerDirective } from './shared/directives/scroller.directive';

// Pipes
import { SafePipe } from './shared/pipes/safe.pipe';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { HtmlPipe } from './shared/pipes/html.pipe';
import { LinkifyPipe } from './shared/pipes/linkify.pipe';

// Components
import { AppComponent } from './app.component';

// Components: Dialogs
import { DialogMessageComponent } from './shared/components/dialogs/dialog-message/dialog-message.component';
import { DialogListComponent } from './shared/components/dialogs/dialog-list/dialog-list.component';
import { DialogImageComponent } from './shared/components/dialogs/dialog-image/dialog-image.component';

// Components: Layout
import { LayoutCoreComponent } from './shared/components/layouts/layout-core/layout-core.component';

// Components: Custom
import { CardComponent } from './shared/components/custom/card/card.component';
import { DrawerComponent } from './shared/components/custom/drawer/drawer.component';
import { BottomNavigationComponent } from './shared/components/custom/bottom-navigation/bottom-navigation.component';
import { CarouselComponent } from './shared/components/custom/carousel/carousel.component';
import { AvatarsComponent } from './shared/components/custom/avatars/avatars.component';
import { JumbotronComponent } from './shared/components/custom/jumbotron/jumbotron.component';
import { TwitchComponent } from './shared/components/custom/twitch/twitch.component';

// Views
import { AuthComponent } from './views/auth/auth.component';
    import { LoginComponent } from './views/auth/login/login.component';
    import { ResetComponent } from './views/auth/reset/reset.component';
    import { RegisterComponent } from './views/auth/register/register.component';
import { TestComponent } from './views/test/test.component';
import { TournamentsComponent } from './views/tournaments/tournaments.component';
    import { TournamentListComponent } from './views/tournaments/tournament-list/tournament-list.component';
    import { TournamentDetailsComponent } from './views/tournaments/tournament-details/tournament-details.component';
import { GamesComponent } from './views/games/games.component';
    import { GameListComponent } from './views/games/game-list/game-list.component';
    import { GameDetailsComponent } from './views/games/game-details/game-details.component';
import { HubComponent } from './views/hub/hub.component';
import { SyncComponent } from './views/sync/sync.component';
import { AccountComponent } from './views/account/account.component';
    import { AccountPaymentMethodsComponent } from './views/account/account-payment-methods/account-payment-methods.component';
    import { AccountDepositComponent } from './views/account/account-deposit/account-deposit.component';
    import { AccountWithdrawComponent } from './views/account/account-withdraw/account-withdraw.component';
    import { AccountProfileComponent } from './views/account/account-profile/account-profile.component';
    import { AccountConnectEpicComponent } from './views/account/account-connect-epic/account-connect-epic.component';
import { WebviewComponent } from './views/webview/webview.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { OverwolfComponent } from './views/overwolf/overwolf.component';
    import { OverwolfResultsComponent } from './views/overwolf/overwolf-results/overwolf-results.component';
    import { OverwolfMiniComponent } from './views/overwolf/overwolf-mini/overwolf-mini.component';
import { AccountDepositPaypalComponent } from './views/account/account-deposit-paypal/account-deposit-paypal.component';

@NgModule({
    declarations: [
        // Directives
        ScrollerDirective,

        // Pipes
        SafePipe,
        FilterPipe,
        HtmlPipe,
        LinkifyPipe,

        AppComponent,

        // Dialogs
        DialogMessageComponent,
        DialogListComponent,
        DialogImageComponent,

        // Layouts
        LayoutCoreComponent,

        // Custom Components
        CardComponent,
        DrawerComponent,
        BottomNavigationComponent,
        CarouselComponent,
        AvatarsComponent,
        JumbotronComponent,
        TwitchComponent,

        // Route Views
        AuthComponent,
        LoginComponent,
        ResetComponent,
        RegisterComponent,
        TestComponent,
        TournamentsComponent,
        TournamentListComponent,
        TournamentDetailsComponent,
        GamesComponent,
        GameListComponent,
        GameDetailsComponent,
        HubComponent,
        SyncComponent,
        AccountComponent,
        AccountPaymentMethodsComponent,
        AccountDepositComponent,
        AccountWithdrawComponent,
        AccountProfileComponent,
        AccountConnectEpicComponent,
        WebviewComponent,
        NotFoundComponent,
        OverwolfComponent,
        OverwolfResultsComponent,
        OverwolfMiniComponent,
        AccountDepositPaypalComponent,
        SyncComponent,
    ],
    entryComponents: [
        DialogMessageComponent,
        DialogListComponent,
        DialogImageComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule, HttpClientJsonpModule,
        FormsModule, ReactiveFormsModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.useServiceWorker }), // was .production
        CookieModule.forRoot(),

        // Angular Material
        MaterialModule,

        // CDK
        LayoutModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
