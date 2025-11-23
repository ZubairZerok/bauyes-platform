export const XP_RULES = {
    LOGIN: 10,
    COMPLETE_PROFILE: 50,
    FIRST_POST: 20,
    DAILY_STREAK: 15,
} as const;

export const LEVELS = {
    1: 0,
    2: 100,
    3: 300,
    4: 600,
    5: 1000,
} as const;

export const BADGES = {
    EARLY_ADOPTER: {
        id: "early-adopter",
        name: "Early Adopter",
        description: "Joined during the beta phase",
        icon: "rocket",
    },
    CONTRIBUTOR: {
        id: "contributor",
        name: "Contributor",
        description: "Made first contribution",
        icon: "star",
    },
} as const;

export const APP_NAME = "BAUYES";
export const APP_DESCRIPTION = "The Cyber-Agrarian Platform";
