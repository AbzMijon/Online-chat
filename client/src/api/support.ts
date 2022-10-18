import fakeServerInstance from "./instanse";

export const fetchSupportMessage = (groupOfProblem: number | string, problemMessage: string, email: string) => fakeServerInstance.post(`/supportMessages`, {
    problemGroup:groupOfProblem,
    problem: problemMessage,
    userEmail: email,
})