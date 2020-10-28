// Interface: Overwolf Global Store

export enum OverwolfAppState {
    NoGame = 0,
    GameActive = 1,
    MatchActive = 2
}

export interface OverwolfStat {
    key: string;
    value: number;
    type: string; // ex: 'number' (let's review this!)
}

export interface OverwolfGlobalStore {
    app_state: OverwolfAppState;
    overwolf: {
        user: any; // https://overwolf.github.io/docs/api/overwolf-profile
        game: any; // https://overwolf.github.io/docs/api/overwolf-games
        match: {
            duration: string;
            stats: OverwolfStat[];
        };
        umt: any; // https://en.wikipedia.org/wiki/UTM_parameters
    };
    jackpotrising: {
        iframe_route: string;
        game_id: number; // Might not be needed
    };
}
