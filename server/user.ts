interface Name {
    last: string;
    first: string;
}

export enum Job {
    'DEV' = 'dev',
    'QA' = 'qa',
    'MANAGER' = 'manager'
}

export function filterToUser(src: any) {
    const _src = JSON.parse(src);
    const name: Name = {
            'first': _src.firstName,
            'last': _src.lastName,
        };

    const dest = {
        'id': _src.id,
        'name': name,
        'birthDate': _src.birthDate,
        'balance': _src.balance,
        'job': _src.job
    };
    return dest;
}
