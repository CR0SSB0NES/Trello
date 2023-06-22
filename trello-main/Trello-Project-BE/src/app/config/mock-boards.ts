import { ProjectDetails } from "./project-details";

export const project: ProjectDetails[] = [
    {
        boardId : 1,
        boardName : "Testing",
        boardBackground : '#333',
        boardLabel : [
            {
                tileName: 'To Do',
                cards: [{ cardTitle: 'Test' },
                        { cardTitle: 'Test1' },
                        { cardTitle: 'Test2' }]
            },
            {   tileName: 'Done',
                cards: [{ cardTitle: 'Test3' },
                        { cardTitle: 'Test4' },
                        { cardTitle: 'Test5' }]},
                {tileName: 'Doing',
                cards: [{ cardTitle: 'Test6' },
                        { cardTitle: 'Test7' },
                        { cardTitle: 'Test8' }]
        },
        ]
    },
    {
        boardId : 2,
        boardName: "Testing2",
        boardBackground: '#bf97ff',
        boardLabel: [
            {
                tileName: 'To Do',
                // cards: [{ cardTitle: 'Test',
                //           cardDetails: {
                //               description:'',
                //               comments:[],
                //               checkList:[{
                //                   listTitle:'check',
                //                   listOptions:[
                //                         // {},
                //                         { option:'b', condition: false}
                //                     ],
                //                   listProgress:0
                //               }],
                //               label:[]
                //           } 
                //         }]
            },
            {   tileName: 'Done',
                cards: [{ cardTitle: 'Test1',
                          cardDetails:{
                            description: "This is a test",
                            comments: ["hi", "hello"],
                            checkList: [{
                                listTitle:"Default Checklist", 
                                listOptions:[
                                    // {}, 
                                    {option: "b", condition: false}, 
                                    // {option: "c", condition: false}
                                ],
                                listProgress:0
                            }],
                            attachment: [{}],
                            label: ["#519839", "#f2d600", "#ff9f1a", "#eb5a46", "#0079bf"]
                            }
                        }
                    ]
            },
            {   tileName: 'Doing',
            },
        ]
    }
]