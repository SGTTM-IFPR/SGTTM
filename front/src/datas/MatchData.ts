export interface Match {
    id: number;
    name: string;
    nextMatchId: number | null;
    tournamentRoundText: string;
    startTime: string;
    state: string;
    participants: Participant[];
};

export interface Participant {
    id: number;
    resultText: string;
    isWinner: boolean;
    status: null;
    name: string;
};