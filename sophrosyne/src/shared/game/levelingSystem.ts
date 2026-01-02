export interface LevelInfo {
    level: number;
    xpForNextLevel: number;
    rank: string;
}

// XP required for next level: 100 + (level * 50)
// Level 1→2: 150 XP, Level 10→11: 600 XP, Level 50→51: 2,600 XP
export const getXPForNextLevel = (level: number): number => {
    return 100 + level * 50;
};

// Rank based on level
export const getRank = (level: number): string => {
    if (level <= 10) return 'E-Rank';
    if (level <= 25) return 'D-Rank';
    if (level <= 50) return 'C-Rank';
    if (level <= 75) return 'B-Rank';
    if (level <= 95) return 'A-Rank';
    return 'S-Rank';
};

// Calculate level ups from XP gain
export const calculateLevelUp = (
    currentLevel: number,
    currentXP: number,
    earnedXP: number
): { newLevel: number; newXP: number } => {
    let level = currentLevel;
    let xp = currentXP + earnedXP;

    while (xp >= getXPForNextLevel(level) && level < 100) {
        xp -= getXPForNextLevel(level);
        level++;
    }

    return { newLevel: level, newXP: xp };
};

// Get level info
export const getLevelInfo = (level: number): LevelInfo => {
    return {
        level,
        xpForNextLevel: getXPForNextLevel(level),
        rank: getRank(level),
    };
};
