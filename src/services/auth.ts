interface Response {
    token: string;
    user: {
        name: string;
        email: string;
    }
}

export function signIn(): Promise<Response>{
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                token: '(3*LjP4&[DN4Zjw@&das*dsd',
                user: {
                    name: 'Danilo',
                    email: 'danilosataide@gmail.com'
                },
            });
        }, 2000); 
    });
}