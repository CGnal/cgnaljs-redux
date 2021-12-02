import { immutable } from "./helpers";

export const fakeStore = immutable({
    "users.old": [
        { id: 5, name: "Maria", surname: "Verdi", active: false }
    ],
    "users": {
        active: [
            { id: 2, name: "John", surname: "Doe", active: true },
            { id: 3, name: "Mario", surname: "Rossi", active: true }
        ],
        inactive: [
            { id: 1, name: "Jane", surname: "Doe", active: false },
            { id: 4, name: "Paolo", surname: "Bianchi", active: false }
        ]
    }
});

export const fakeAction = {
    payload: {}
};

export const httpState = immutable({
    app: {
        users: [],
        usersError: null,
        usersIsLoading: false
    },
    data: {},
    error: null,
    extraPropertyA: {
        id: 10,
        name: "some-property"
    },
    extaPropertyB: [4, 5, 6],
    isLoading: false
});
