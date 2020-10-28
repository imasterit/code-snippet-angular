// Custom Component Interfaces

// Banner
export interface Banner {
    icon?: string;
    text: string;
    later: boolean;
    action?: {
        label: string;
        route?: string;
        callback?: any;
    };
}

// Leaderboard
export interface Leaderboard {
    avatar: number;
    color?: string;
    rank: string;
    username: string;
    score: string;
    payout?: string;
}

// Credit Card
export interface CreditCard {
    id: number;
    is_active: boolean;
    card_type: string;
    last4: string;
    expiration_month: number;
    expiration_year: number;
    user_id: number;
    developer_id: number;
    customer_profile_id: string;
    payment_profile_id: string;
}

// Icon Button Set
export interface IconButtonSet {
    icon?: string;
    iconfas?: string;
    iconfar?: string;
    iconfal?: string;
    iconfab?: string;
    label?: string;
    title?: string;
    action: any;
}

// Sheet: Side
export interface SheetSide {
    title: string;
    component: string;
}
