export interface Structure {
    userName: string,
    password: string,
    email: string,
    board: [{
        boardId: number,
        boardName: string,
        boardBackground: any,
        boardLabel?: [{
            tileName: string,
            cards?: [{
                title: string,
                cardColor?: string,
                cardDetails?: [{
                    description?: string,
                    comments?: string,
                    checklist?: any,
                    attachments?: any,
                    label?: any
                }]
            }]
        }]
    }]
}


// *****************************Project details in divided class*********************************

export class ProjectDetails {
    boardId: any;
    boardName: string = '';
    boardBackground: any;
    boardLabel?: mockBoardLabel[] = []
}

export class mockBoardLabel {
    tileName: string = '';
    cards?: mockCards[]
}

export class mockCards {
    cardTitle: string = '';
    cardColor?: string;
    cardDetails?: {
        description?: string;
        comments?: string[];
        checkList?: [{
            listTitle: any,
            listOptions?: [{}],
            listProgress: number
        }];
        attachment?: any[];
        label?: any[];
    }
}

export class mockComments {
    comments: string = ''
}
