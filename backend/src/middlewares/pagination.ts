import { Request, Response, NextFunction } from 'express';

export default (req : Request, res : Response, next : NextFunction) => {

    // Receiving how much users with be listed in our pagination
    let pageAsNumber : Number = Number.parseInt(req.query.page as string);
    let sizeAsNumber : Number = Number.parseInt(req.query.size as string);
  
    let size = Number.isNaN(sizeAsNumber) ? 10 : sizeAsNumber;
    if (size > 10 || size < 1) {
      size = 10;
    }
    //Receiving the page param and convert it to integer or assign to 0
    let page = Number.isNaN(pageAsNumber) ? 0 : pageAsNumber;
  
    if (page < 0) {
      page = 0;
    }
  
    req.pagination = { page, size };
    next();
};
  