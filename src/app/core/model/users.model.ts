interface Name {
    last: string;
    first: string;
}

export enum Job {
    'DEV' = 'dev',
    'QA' = 'qa',
    'MANAGER' = 'manager'
}

export interface UsersModel {
    id: string;
    name: Name;
    job: Job;
    birthDate: Date;
    balance: number;
}

export function dtoToFilterUser(src: any) {
    let _id = src.id===undefined ?  [] : src.id;
    let _job = src.job===undefined ?  [] : src.job;
    let _birthDate = src.birthDate===undefined ?  [] : src.birthDate;
    let _balance = src.balance===undefined ?  [] : src.balance;

    let strSrc: string = JSON.stringify(src).toString();
    strSrc = strSrc.replace('name.first', 'firstName');
    strSrc = strSrc.replace('name.last', 'lastName');
    let _src = JSON.parse(strSrc);
    let _firstName = _src.firstName===undefined ?  [] : _src.firstName;
    let _lastName = _src.lastName===undefined ?  [] : _src.lastName;

    let id: string = (Array.isArray(_id) && _id.length) ? _id[0].value : '';
    let firstName: string = (Array.isArray(_firstName) && _firstName.length) ? _firstName[0].value : '';
    let lastName: string = (Array.isArray(_lastName) && _lastName.length) ? _lastName[0].value : '';
    let job: string = (Array.isArray(_job) && _job.length) ? _job[0].value : '';
    let birthDate: string = (Array.isArray(_birthDate) && _birthDate.length) ? _birthDate[0].value : '';
    let balance: number = (Array.isArray(_balance) && _balance.length) ? _balance[0].value : '';

    const dest = {
        'id': id,
        'firstName': firstName,
        'lastName': lastName,
        'job': job,
        'birthDate': birthDate,
        'balance': balance
    };
    return dest;
}
