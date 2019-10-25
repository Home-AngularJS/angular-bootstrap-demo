import { Request, Response } from 'express';
import { USERS } from './db-data';
import { filterToUser } from "./user";

export function searchUsers(req: Request, res: Response) {
    const queryParams = req.query;
    const filterUser = filterToUser(queryParams.filter);

    console.log( queryParams )
    // console.log( filterUser )

    /* receive request query params */
    const filter = queryParams.filter || '',
          sortOrder = queryParams.sortOrder,
          pageNumber = parseInt(queryParams.pageNumber) || 0,
          pageSize = parseInt(queryParams.pageSize);

    /* do filter to records receive db ORDER BY id */
    let users = Object.values(USERS)
        .filter(user => {
            if (filterUser.id=='' && filterUser.name.first=='' && filterUser.name.last=='' && filterUser.birthDate=='' && filterUser.balance=='' && filterUser.job=='') return true;
            let countFilter: number = 0;
            let isFilterCount: number = 0;
            if (filterUser.id!='') { countFilter++; if (user.id == filterUser.id) isFilterCount++; }
            if (filterUser.name.first!='') { countFilter++; if (user.name.first.indexOf(filterUser.name.first) !== -1) isFilterCount++; }
            if (filterUser.name.last!='') { countFilter++; if (user.name.last.indexOf(filterUser.name.last) !== -1) isFilterCount++; }
            if (filterUser.birthDate!='') { countFilter++; if (user.birthDate.indexOf(filterUser.birthDate) !== -1) isFilterCount++; }
            if (filterUser.balance!='') { countFilter++; if (user.balance == filterUser.balance) isFilterCount++; }
            if (filterUser.job!='') { countFilter++; if (user.job == filterUser.job) isFilterCount++; }
            return 0<countFilter && countFilter==isFilterCount;
        })
        .sort((l1, l2) => l1.id - l2.id);
    // console.log( users )

    /* do sort order to records receive db */
    if (sortOrder == "desc") {
        users = users.reverse();
    }

    /* select page by position to records receive db */
    const initialPos = pageNumber * pageSize;
    const usersPage = users.slice(initialPos, initialPos + pageSize);
    console.log( usersPage )

    res.setHeader('Access-Control-Allow-Origin', '*'); //TODO:  https://wanago.io/2018/11/05/cors-cross-origin-resource-sharing
    res.status(200)
        .json({ payload: usersPage });
}
