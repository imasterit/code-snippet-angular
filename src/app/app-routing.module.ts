import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Guards
import { AuthGuardService } from './shared/guards/auth-guard.service';

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
import { WebviewComponent } from './views/webview/webview.component';
import { OverwolfComponent } from './views/overwolf/overwolf.component';
    import { OverwolfResultsComponent } from './views/overwolf/overwolf-results/overwolf-results.component';
    import { OverwolfMiniComponent } from './views/overwolf/overwolf-mini/overwolf-mini.component';
import { NotFoundComponent } from './views/not-found/not-found.component';

const routes: Routes = [

    // Root
    { path: '', redirectTo: 'tournaments', pathMatch: 'full' },

    // Hidden Routes
    {path: 'testlab', component: TestComponent}, // , canActivate: [AuthGuardService]

    // Auth
    {
        path: '', component: AuthComponent, children: [
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'reset/:hash', component: ResetComponent },
            { path: 'register/affiliate/:affiliate', component: RegisterComponent }
        ]
    },

    // Tournaments
    {
        path: 'tournaments', component: TournamentsComponent, children: [
            { path: '', component: TournamentListComponent },
            { path: ':id', component: TournamentDetailsComponent },
            // { path: ':id/fullscreen', component: TournamentDetailsComponent }
        ]
    },

    // Games
    {
        path: 'games', component: GamesComponent, children: [
            { path: '', component: GameListComponent },
            { path: ':id', component: GameDetailsComponent }
        ]
    },

    // Sync (QR Scanner)
    {
        path: 'sync', component: SyncComponent, canActivateChild: [AuthGuardService],
    },

    // The Hub
    { path: 'hub', component: HubComponent },

    // Account
    {
        path: 'account', component: AccountComponent, canActivateChild: [AuthGuardService], children: [
            { path: '', component: AccountComponent },
        ]
    },

    // Overwolf
    {
        path: 'overwolf', component: OverwolfComponent, children: [
            { path: '', component: OverwolfResultsComponent },
            { path: 'mini', component: OverwolfMiniComponent }
        ]
    },

    // Webviews - see WebviewComponent for data.src usage
    {path: 'support', component: WebviewComponent, data: {src: 0}},
    {path: 'terms', component: WebviewComponent, data: {src: 1}},
    {path: 'website', component: WebviewComponent, data: {src: 2}},

    // Page Not Found
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
