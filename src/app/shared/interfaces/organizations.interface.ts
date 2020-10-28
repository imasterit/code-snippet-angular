// Organization Property List Model
// TODO: work with Nick to remove keys with null values
interface OrgPropListModel {
    id: number;
    organization: null;
    name: string;
    address: null;
    phone_number: null;
    email: string | null;
    support: null;
    brand: null;
    account: {
        id: number;
        balance: number;
        balance_formatted: string;
    };
}

// Organization (List) Model
export interface OrganizationListModel {
    id: number;
    pinned: boolean;
    name: string;
    properties: OrgPropListModel[];
}

// Organization (Single) Model
export interface OrganizationModel {
    id?: number;
    pinned: boolean;
    name: string;
    website: string;
    email: string;
    phone_number: {
        id?: number;
        number: number;
        phone_type: string;
    };
    revenue: number;
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
}
