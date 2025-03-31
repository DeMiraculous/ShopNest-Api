
/**
 * The LoggedInUser type is used to represent the logged in user
 */
export type LoggedInUser = {
    id: string;
    email: string;
    name: string;
    token?: string;
};