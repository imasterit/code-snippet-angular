// Property (Single) Model
export interface PropertyModel {
    id?: number;
    organization: {
        id?: number;
        name: string;
    };
    name: string;
    website: string;
    email: string;
    phone_number: {
        id?: number;
        number: number;
        phone_type: string;
    };
    revenue: number;
    tournament_availability: number;
    ip_whitelist: any; // TODO: should be string[]
    support: {
        website: string;
        phone_number: number;
        email: string;
    };
    brand: {
        logo: string;
        primary: string;
        secondary: string;
        warn: string;
        surface: string;
    };
    address: {
        id?: number;
        address_line_1: string;
        address_line_2: string;
        city: string;
        country_id: number;
        country?: {
            id?: number;
            name: string;
            code: string;
            can_play_for_money: boolean;
            can_play_for_free_money: boolean;
            can_play_for_free: boolean;
        };
        state_id: number;
        state?: {
            id?: number;
            name: string;
            code: string;
            country_code: string;
            can_play_for_money: boolean;
            can_play_for_free_money: boolean;
            can_play_for_free: boolean;
            can_play_sweeps: boolean;
        };
        zip: string;
        latitude?: number;
        longitude?: number;
    };
    account?: {
        id?: number;
        balance: number;
        balance_formatted: string;
    };
}
